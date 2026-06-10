"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { pipeline, TextStreamer } from "@huggingface/transformers"
import { SYSTEM_PROMPT } from "@/lib/assistant-context"
import { searchKnowledge } from "@/lib/assistant-knowledge"
import { searchWeb } from "@/lib/assistant-web-search"
import { parseCommand, getHelpText, getRandomJoke } from "@/lib/assistant-commands"
import { createToolExecutor, detectToolUse, ToolExecutor } from "@/hooks/use-ai-tools"

export type Message = {
  role: "user" | "assistant"
  content: string
  timestamp?: number
  toolUsed?: string
}

export type AIStatus = "idle" | "loading" | "ready" | "generating" | "error" | "unsupported"

export type ModelInfo = {
  type: "mobile" | "desktop"
  model: string
  label: string
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
    }
  }

  return {
    type: "desktop",
    model: "onnx-community/Qwen3.5-0.8B-ONNX-OPT",
    label: "Qwen3.5-0.8B",
  }
}

export function useTransformers(toolCallbacks: any) {
  const [status, setStatus] = useState<AIStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const generatorRef = useRef<any>(null)
  const isInitialized = useRef(false)
  const toolExecutorRef = useRef<ToolExecutor | null>(null)

  // Initialize tool executor
  useEffect(() => {
    if (toolCallbacks) {
      toolExecutorRef.current = createToolExecutor(toolCallbacks)
    }
  }, [toolCallbacks])

  const initialize = useCallback(async () => {
    if (isInitialized.current) return
    isInitialized.current = true

    const detected = detectModel()
    if (!detected) {
      setStatus("unsupported")
      return
    }

    setModelInfo(detected)
    setStatus("loading")
    setProgress(0)

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
      setProgress(100)
    } catch (err: any) {
      console.error("Failed to load model:", err)
      setError(err.message || "Failed to load AI model")
      setStatus("error")
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

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!generatorRef.current || status !== "ready") return

      // Check for commands
      const command = parseCommand(userMessage)
      if (command) {
        const response = await handleCommand(command.command, command.args)
        if (response !== null) {
          setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage, timestamp: Date.now() },
            { role: "assistant", content: response, timestamp: Date.now(), toolUsed: command.command },
          ])
          return
        }
      }

      // Check for tool use in natural language
      const toolUse = detectToolUse(userMessage)
      let toolResponse = ""
      if (toolUse && toolExecutorRef.current) {
        const executor = toolExecutorRef.current as any
        if (executor[toolUse.tool]) {
          toolResponse = executor[toolUse.tool](toolUse.args)
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "user", content: userMessage, timestamp: Date.now() },
      ])
      setStatus("generating")

      // Build context
      const recentMessages = messages.slice(-4)
      const knowledge = searchKnowledge(userMessage)
      const knowledgeContext = knowledge.length > 0 ? `\n\nRelevant knowledge:\n${knowledge.join("\n")}` : ""
      const toolContext = toolResponse ? `\n\nAction taken: ${toolResponse}` : ""

      const currentMessages = [
        { role: "system", content: SYSTEM_PROMPT + knowledgeContext + toolContext },
        ...recentMessages.map(m => ({ role: m.role, content: m.content })),
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
                  role: "assistant", 
                  content: assistantText, 
                  timestamp: Date.now(),
                  toolUsed: toolUse?.tool 
                }]
              }
              return [...prev, { 
                role: "assistant", 
                content: assistantText, 
                timestamp: Date.now(),
                toolUsed: toolUse?.tool 
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
          { role: "assistant", content: "Oops, something went wrong. Try again?", timestamp: Date.now() },
        ])
        setStatus("ready")
      }
    },
    [messages, status, handleCommand]
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
    initialize,
    sendMessage,
    addMessage,
    clearMessages,
  }
}
