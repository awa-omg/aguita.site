"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { pipeline, TextStreamer } from "@huggingface/transformers"
import { SYSTEM_PROMPT, WELCOME_MESSAGE } from "@/lib/assistant-context"
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
  const toolCallbacksRef = useRef(toolCallbacks)
  const statusRef = useRef(status)

  // Keep refs in sync
  useEffect(() => {
    toolCallbacksRef.current = toolCallbacks
    if (toolCallbacks) {
      toolExecutorRef.current = createToolExecutor(toolCallbacks)
    }
  }, [toolCallbacks])

  useEffect(() => {
    statusRef.current = status
  }, [status])

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
    } catch (err: any) {
      console.error("Failed to load model:", err)
      setError(err.message || "Failed to load AI model")
      setStatus("error")
    }
  }, [])

  const handleCommand = useCallback((command: string, args: string): string | null => {
    const executor = toolExecutorRef.current
    switch (command) {
      case "/help":
        return getHelpText()
      case "/navigate":
        if (executor) return executor.navigate(args)
        return "Navigation not available"
      case "/search":
        const results = searchKnowledge(args)
        return results.length > 0 ? results.join("\n\n") : "No results found in knowledge base."
      case "/web":
        // Web search is async, handled separately
        return null
      case "/repo":
        const repoResults = searchKnowledge(args)
        return repoResults.length > 0 ? repoResults[0] : "Repository not found."
      case "/stats":
        return "Portfolio Stats:\n- 20+ Models\n- 4+ Repositories\n- 3 Papers\n- 12 Isolation Levels\n- 0$ Cloud Budget"
      case "/clear":
        setMessages([])
        return "Chat history cleared!"
      case "/terminal":
        if (executor) return executor.openTerminal()
        return "Terminal not available"
      case "/email":
        if (executor) {
          executor.openApp("email")
          return "Email app opened! Contact: aguitachan3@gmail.com"
        }
        return "Email not available"
      case "/github":
        if (executor) {
          executor.openLink("https://github.com/awa-omg")
          return "Opened awa's GitHub!"
        }
        return "GitHub not available"
      case "/joke":
        return getRandomJoke()
      case "/easter":
        return "Easter Eggs:\n- Konami code (up up down down left right left right B A) for matrix rain\n- Press backtick for terminal\n- Ctrl+Shift+A for this chat\n- Try asking about 'zero budget' or 'Redmi 12'"
      default:
        return null
    }
  }, [])

  const handleToolUse = useCallback((message: string): string => {
    const toolUse = detectToolUse(message)
    const executor = toolExecutorRef.current
    if (toolUse && executor) {
      const exec = executor as any
      if (exec[toolUse.tool]) {
        return exec[toolUse.tool](toolUse.args)
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

  // Stable sendMessage - uses refs to avoid dependency issues
  const sendMessage = useCallback(
    async (userMessage: string) => {
      // Welcome message
      if (userMessage === "__welcome__") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: WELCOME_MESSAGE, timestamp: Date.now(), agent: "system" },
        ])
        return
      }

      const timestamp = Date.now()
      const intent = classifyIntent(userMessage)

      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: userMessage, timestamp }])

      // COMMANDS - no model needed
      if (intent === "command") {
        const parsed = parseCommand(userMessage)
        if (!parsed) return

        // /web is async
        if (parsed.command === "/web") {
          const webResult = await searchWeb(parsed.args)
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: webResult, timestamp: Date.now(), agent: "web", toolUsed: "/web" },
          ])
          return
        }

        const response = handleCommand(parsed.command, parsed.args)
        if (response !== null) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: response, timestamp: Date.now(), agent: "command", toolUsed: parsed.command },
          ])
          return
        }
      }

      // TOOL USE - no model needed
      if (intent === "tool") {
        const toolResponse = handleToolUse(userMessage)
        if (toolResponse) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Action: " + toolResponse, timestamp: Date.now(), agent: "tool" },
          ])
          return
        }
        // If tool use didn't match, fall through to knowledge
        const knowledgeResponse = handleKnowledge(userMessage)
        if (knowledgeResponse) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "From knowledge base:\n" + knowledgeResponse, timestamp: Date.now(), agent: "knowledge" },
          ])
          return
        }
      }

      // KNOWLEDGE - no model needed
      if (intent === "knowledge") {
        const knowledgeResponse = handleKnowledge(userMessage)
        if (knowledgeResponse) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "From knowledge base:\n" + knowledgeResponse, timestamp: Date.now(), agent: "knowledge" },
          ])
          return
        }
      }

      // WEB SEARCH - no model needed
      if (intent === "web") {
        const webResult = await searchWeb(userMessage)
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: webResult, timestamp: Date.now(), agent: "web" },
        ])
        return
      }

      // CHAT - requires model
      if (!generatorRef.current || !modelReady) {
        // Try loading model
        if (statusRef.current === "idle" || statusRef.current === "error") {
          await loadModel()
        }

        // If still not ready, fallback
        if (!generatorRef.current) {
          const fallback = handleKnowledge(userMessage)
          const response = fallback
            ? "AI model offline. From knowledge base:\n" + fallback
            : "AI model offline. Ask me about awa's projects or use /help for commands."
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: response, timestamp: Date.now(), agent: "offline" },
          ])
          return
        }
      }

      // Generate with model
      if (generatorRef.current && modelReady) {
        setStatus("generating")

        const knowledge = searchKnowledge(userMessage)
        const knowledgeCtx = knowledge.length > 0 ? "\n\nRelevant knowledge:\n" + knowledge.join("\n") : ""

        const chatMessages = [
          { role: "system", content: SYSTEM_PROMPT + knowledgeCtx },
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
                  return [...prev.slice(0, -1), { ...last, content: assistantText }]
                }
                return [...prev, { role: "assistant", content: assistantText, timestamp: Date.now(), agent: "chat" }]
              })
            },
          })

          await generatorRef.current(chatMessages, {
            max_new_tokens: 256,
            temperature: 0.7,
            streamer,
          })

          setStatus("ready")
        } catch (err: any) {
          console.error("Generation error:", err)
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Oops, generation failed. Try again?", timestamp: Date.now(), agent: "error" },
          ])
          setStatus("ready")
        }
      }
    },
    [modelReady, handleCommand, handleToolUse, handleKnowledge, loadModel]
  )

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
    clearMessages,
    modelReady,
  }
}
