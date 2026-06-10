"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { pipeline, TextStreamer } from "@huggingface/transformers"
import { SYSTEM_PROMPT } from "@/lib/assistant-context"
import { searchKnowledge } from "@/lib/assistant-knowledge"
import { searchWeb } from "@/lib/assistant-web-search"
import { parseCommand, getHelpText, getRandomJoke } from "@/lib/assistant-commands"
import { createToolExecutor, detectToolUse, ToolExecutor } from "@/hooks/use-ai-tools"
import { classifyIntent } from "@/lib/assistant-router"

export type Message = {
  role: "user" | "assistant"
  content: string
  timestamp?: number
  agent?: string
  toolUsed?: string
}

export type AIStatus = "idle" | "loading" | "ready" | "generating" | "error" | "unsupported" | "offline"

export type ModelInfo = {
  type: "mobile" | "desktop"
  model: string
  label: string
  size: string
}

function detectModel(): ModelInfo | null {
  const hasWebGPU = typeof navigator !== "undefined" && !!navigator.gpu
  const isMobile =
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
  const isLowPower =
    typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4

  if (!hasWebGPU) return null

  if (isMobile || isLowPower) {
    return {
      type: "mobile",
      model: "onnx-community/LFM2.5-350M-ONNX",
      label: "LFM2.5-350M",
      size: "~200MB",
    }
  }

  return {
    type: "desktop",
    model: "onnx-community/Qwen3.5-0.8B-ONNX-OPT",
    label: "Qwen3.5-0.8B",
    size: "~850MB",
  }
}

export function useTransformers(toolCallbacks: any) {
  const [status, setStatus] = useState<AIStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [modelReady, setModelReady] = useState(false)
  const generatorRef = useRef<any>(null)
  const toolExecutorRef = useRef<ToolExecutor | null>(null)
  const isInitialized = useRef(false)
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null)

  // Initialize tool executor
  useEffect(() => {
    if (toolCallbacks) {
      toolExecutorRef.current = createToolExecutor(toolCallbacks)
    }
  }, [toolCallbacks])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current)
      }
    }
  }, [])

  const loadModel = useCallback(async (force = false) => {
    if (isInitialized.current && !force) return
    isInitialized.current = true

    const detected = detectModel()
    if (!detected) {
      setStatus("unsupported")
      return
    }

    setModelInfo(detected)
    setStatus("loading")
    setProgress(0)
    setError(null)

    // Timeout: if loading takes >30s, show message
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
    loadingTimeout.current = setTimeout(() => {
      setMessages((prev) => {
        // Only add if still loading
        const lastLoading = prev.find(m => m.role === "assistant" && m.content.includes("Still downloading"))
        if (!lastLoading && status === "loading") {
          return [...prev, {
            role: "assistant",
            content: "⏳ Still downloading... This can take 1-2 minutes on mobile. You can chat with my knowledge base while waiting!",
            timestamp: Date.now(),
            agent: "system",
          }]
        }
        return prev
      })
    }, 15000)

    try {
      const generator = await pipeline("text-generation", detected.model, {
        dtype: "q4",
        device: "webgpu",
        progress_callback: (x: any) => {
          if (x.status === "progress" && x.total) {
            const percent = Math.round((x.loaded / x.total) * 100)
            setProgress(percent)
          } else if (x.status === "done") {
            setProgress(100)
          }
        },
      })

      generatorRef.current = generator
      setStatus("ready")
      setModelReady(true)
      setProgress(100)
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
    } catch (err: any) {
      console.error("Failed to load model:", err)
      setError(err.message || "Failed to load AI model")
      setStatus("error")
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
    }
  }, [])

  const handleCommand = useCallback(async (command: string, args: string): Promise<string | null> => {
    switch (command) {
      case "/help":
        return getHelpText()
      case "/navigate":
        if (toolExecutorRef.current) {
          return toolExecutorRef.current.navigate(args)
        }
        return "Navigation not available"
      case "/search":
        const results = searchKnowledge(args)
        return results.length > 0 ? results.join("\n\n") : "No results found in portfolio knowledge base."
      case "/web":
        return await searchWeb(args)
      case "/repo":
        const repoResults = searchKnowledge(args)
        return repoResults.length > 0 ? repoResults[0] : "Repository not found."
      case "/stats":
        return `Portfolio Stats:\n- 20+ Models\n- 4+ Repositories\n- 3 Papers\n- 12 Isolation Levels\n- 0$ Cloud Budget`
      case "/clear":
        setMessages([])
        return "Chat history cleared!"
      case "/terminal":
        if (toolExecutorRef.current) {
          return toolExecutorRef.current.openTerminal()
        }
        return "Terminal not available"
      case "/email":
        if (toolExecutorRef.current) {
          toolExecutorRef.current.openApp("email")
          return "Email app opened! Contact: aguitachan3@gmail.com"
        }
        return "Email not available"
      case "/github":
        if (toolExecutorRef.current) {
          toolExecutorRef.current.openLink("https://github.com/awa-omg")
          return "Opened awa's GitHub!"
        }
        return "GitHub not available"
      case "/joke":
        return getRandomJoke()
      case "/easter":
        return "🥚 Easter Eggs:\n- Press the Konami code (↑↑↓↓←→←→BA) for matrix rain\n- Press ` for terminal\n- Ctrl+Shift+A for this chat\n- Try asking about 'zero budget' or 'Redmi 12'"
      default:
        return null
    }
  }, [])

  const handleToolUse = useCallback((message: string): string => {
    const toolUse = detectToolUse(message)
    if (toolUse && toolExecutorRef.current) {
      const executor = toolExecutorRef.current as any
      if (executor[toolUse.tool]) {
        return executor[toolUse.tool](toolUse.args)
      }
    }
    return ""
  }, [])

  const handleKnowledge = useCallback((message: string): string => {
    const knowledge = searchKnowledge(message)
    if (knowledge.length > 0) {
      return knowledge.join("\n\n")
    }
    return ""
  }, [])

  const sendMessage = useCallback(
    async (userMessage: string) => {
      const intent = classifyIntent(userMessage)
      const timestamp = Date.now()

      // Always add user message
      setMessages((prev) => [...prev, { role: "user", content: userMessage, timestamp }])

      // Handle commands (no model needed)
      if (intent === "command") {
        const command = parseCommand(userMessage)
        if (command) {
          const response = await handleCommand(command.command, command.args)
          if (response !== null) {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: response,
                timestamp: Date.now(),
                agent: "command",
                toolUsed: command.command,
              },
            ])
            return
          }
        }
      }

      // Handle tool use (no model needed)
      if (intent === "tool") {
        const toolResponse = handleToolUse(userMessage)
        if (toolResponse) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `🔧 Action: ${toolResponse}`,
              timestamp: Date.now(),
              agent: "tool",
            },
          ])
          return
        }
      }

      // Handle knowledge queries (no model needed)
      if (intent === "knowledge") {
        const knowledgeResponse = handleKnowledge(userMessage)
        if (knowledgeResponse) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `📚 From knowledge base:\n${knowledgeResponse}`,
              timestamp: Date.now(),
              agent: "knowledge",
            },
          ])
          return
        }
      }

      // Handle web search (no model needed)
      if (intent === "web") {
        const webResponse = await searchWeb(userMessage)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: webResponse,
            timestamp: Date.now(),
            agent: "web",
          },
        ])
        return
      }

      // Chat (requires model)
      if (!generatorRef.current || !modelReady) {
        // Try to load model if not loaded
        if (status === "idle" || status === "error") {
          await loadModel()
        }

        // If still not ready, use knowledge fallback
        if (!generatorRef.current) {
          const fallbackResponse = handleKnowledge(userMessage)
          const response = fallbackResponse
            ? `⚡ AI model offline. Using knowledge base:\n${fallbackResponse}`
            : "⚡ AI model offline. Ask me about awa's projects or use /search <query>"

          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: response, timestamp: Date.now(), agent: "offline" },
          ])
          return
        }
      }

      // Use model for chat
      if (generatorRef.current && modelReady) {
        setStatus("generating")

        const recentMessages = messages.slice(-4)
        const knowledge = searchKnowledge(userMessage)
        const knowledgeContext = knowledge.length > 0 ? `\n\nRelevant knowledge:\n${knowledge.join("\n")}` : ""

        const currentMessages = [
          { role: "system", content: SYSTEM_PROMPT + knowledgeContext },
          ...recentMessages.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: userMessage },
        ]

        let assistantText = ""

        try {
          const streamer = new TextStreamer(generatorRef.current.tokenizer, {
            skip_prompt: true,
            skip_special_tokens: true,
            callback_function: (token: string) => {
              assistantText += token
              setMessages((prev) => {
                const last = prev[prev.length - 1]
                if (last && last.role === "assistant") {
                  return [...prev.slice(0, -1), {
                    ...last,
                    content: assistantText,
                    timestamp: Date.now(),
                    agent: "chat",
                  }]
                }
                return [...prev, {
                  role: "assistant",
                  content: assistantText,
                  timestamp: Date.now(),
                  agent: "chat",
                }]
              })
            },
          })

          await generatorRef.current(currentMessages, {
            max_new_tokens: 256,
            temperature: 0.7,
            streamer,
          })

          setStatus("ready")
        } catch (err: any) {
          console.error("Generation error:", err)
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Oops, something went wrong. Try again?", timestamp: Date.now(), agent: "error" },
          ])
          setStatus("ready")
        }
      } else {
        // Offline fallback
        const fallbackResponse = handleKnowledge(userMessage)
        const response = fallbackResponse
          ? `⚡ AI model offline. Using knowledge base:\n${fallbackResponse}`
          : "⚡ AI model offline. Ask me about awa's projects or use /search <query>"

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response, timestamp: Date.now(), agent: "offline" },
        ])
      }
    },
    [status, modelReady, modelInfo, messages, handleCommand, handleToolUse, handleKnowledge, loadModel]
  )

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    status,
    progress,
    messages,
    modelInfo,
    error,
    loadModel,
    sendMessage,
    addMessage,
    clearMessages,
    modelReady,
  }
}
