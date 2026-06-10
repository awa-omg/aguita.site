"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2, Bot, Sparkles, Terminal, Zap } from "lucide-react"
import { useTransformers } from "@/hooks/use-transformers"
import { AIMessage } from "@/components/AIMessage"
import { AITypingIndicator } from "@/components/AITypingIndicator"
import { MobileToggle } from "@/components/MobileToggle"
import {
  SUGGESTED_PROMPTS,
  WELCOME_MESSAGE,
  UNSUPPORTED_MESSAGE,
} from "@/lib/assistant-context"

interface AIAssistantProps {
  onNavigate: (tab: string) => void
  onOpenTerminal: () => void
  terminalOpen: boolean
}

export function AIAssistant({ onNavigate, onOpenTerminal, terminalOpen }: AIAssistantProps) {
  const toolCallbacks = {
    navigate: onNavigate,
    scrollToSection: (section: string) => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
    },
    highlightRepo: (name: string) => {
      const repo = document.querySelector(`[data-repo="${name}"]`)
      if (repo) {
        repo.classList.add("highlight-pulse")
        repo.scrollIntoView({ behavior: "smooth", block: "center" })
        setTimeout(() => repo.classList.remove("highlight-pulse"), 3000)
      }
    },
    openLink: (url: string) => window.open(url, "_blank", "noopener,noreferrer"),
    openApp: (type: "email" | "whatsapp" | "telegram", data?: string) => {
      const urls = {
        email: `mailto:aguitachan3@gmail.com?subject=${data || "Hello"}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(data || "Hello")}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`
      }
      window.open(urls[type], "_blank")
    },
    copyToClipboard: (text: string) => navigator.clipboard.writeText(text),
    openTerminal: onOpenTerminal,
    setChatOpen: (open: boolean) => setIsOpen(open),
  }

  const { status, progress, messages, modelInfo, initialize, sendMessage, addMessage, clearMessages } =
    useTransformers(toolCallbacks)
  
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [hasOpened, setHasOpened] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Check first visit
  useEffect(() => {
    const visited = localStorage.getItem("ai-assistant-visited-v2")
    if (!visited) {
      localStorage.setItem("ai-assistant-visited-v2", "true")
      setIsOpen(true)
      setHasOpened(true)
    }
  }, [])

  // Initialize model when opened
  useEffect(() => {
    if (isOpen && status === "idle") {
      initialize()
    }
  }, [isOpen, status, initialize])

  // Auto welcome message
  useEffect(() => {
    if (isOpen && hasOpened && status === "ready" && messages.length === 0) {
      addMessage({ role: "assistant", content: WELCOME_MESSAGE, timestamp: Date.now() })
    }
  }, [isOpen, hasOpened, status, messages.length, addMessage])

  // Keyboard shortcut Ctrl+Shift+A / Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Scroll detection
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
    }
  }, [])

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = useCallback(() => {
    const text = inputValue.trim()
    if (!text || status !== "ready") return
    setInputValue("")
    sendMessage(text)
  }, [inputValue, status, sendMessage])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const handleSuggestion = useCallback(
    (prompt: string) => {
      if (status !== "ready") return
      sendMessage(prompt)
    },
    [status, sendMessage]
  )

  const isLoading = status === "loading"
  const isReady = status === "ready"
  const isGenerating = status === "generating"
  const isUnsupported = status === "unsupported"
  const isError = status === "error"

  return (
    <>
      {/* Mobile Toggle Buttons */}
      <MobileToggle
        onOpenTerminal={onOpenTerminal}
        onOpenChat={() => {
          setIsOpen(true)
          setHasOpened(true)
        }}
        chatOpen={isOpen}
        terminalOpen={terminalOpen}
      />

      {/* Floating Button - Desktop */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpen(true)
              setHasOpened(true)
            }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
                       bg-gradient-to-br from-[#388bfd] to-[#1f6feb]
                       text-white shadow-[0_0_20px_rgba(56,139,253,0.4)]
                       flex items-center justify-center
                       border border-[#388bfd]/30 cursor-pointer
                       hover:shadow-[0_0_30px_rgba(56,139,253,0.6)]
                       transition-shadow hidden md:flex"
            aria-label="Open AI Assistant"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 
                       w-full h-[100dvh] md:w-[400px] md:h-[550px]
                       bg-[#0d1117]/98 backdrop-blur-xl
                       border-0 md:border border-[#30363d] md:rounded-2xl
                       shadow-[0_0_40px_rgba(0,0,0,0.5)]
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 
                            border-b border-[#30363d] bg-[#161b22]/80 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#388bfd] to-[#1f6feb] 
                                flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#e6edf3]">OpceanBot</h3>
                  <p className="text-[10px] text-[#8b949e]">
                    {isReady && modelInfo ? `${modelInfo.label} • 100% Local` : "AI Assistant"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Terminal quick button */}
                <button
                  onClick={() => {
                    onOpenTerminal()
                  }}
                  className="p-1.5 rounded-lg hover:bg-[#30363d] text-[#8b949e] 
                             hover:text-[#3fb950] transition-colors md:hidden"
                  title="Open Terminal"
                >
                  <Terminal className="w-4 h-4" />
                </button>
                {/* Clear chat */}
                {messages.length > 0 && (
                  <button
                    onClick={() => clearMessages()}
                    className="p-1.5 rounded-lg hover:bg-[#30363d] text-[#8b949e] 
                               hover:text-[#f0883e] transition-colors"
                    title="Clear chat"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#30363d] text-[#8b949e] 
                             hover:text-[#e6edf3] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            >
              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="relative w-12 h-12">
                    <Loader2 className="w-12 h-12 text-[#388bfd] animate-spin" />
                    <Sparkles className="w-4 h-4 text-[#388bfd] absolute top-0 right-0 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#e6edf3] font-medium">Loading AI model...</p>
                    <p className="text-xs text-[#8b949e] mt-1">
                      {modelInfo?.label} (~{modelInfo?.type === "mobile" ? "200" : "850"}MB)
                    </p>
                  </div>
                  <div className="w-full max-w-[200px] h-2 bg-[#21262d] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#388bfd] to-[#1f6feb]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-[#8b949e]">{progress}%</p>
                </div>
              )}

              {/* Unsupported State */}
              {isUnsupported && (
                <div className="flex flex-col items-center justify-center h-full gap-3 px-2">
                  <div className="w-12 h-12 rounded-full bg-[#f0883e]/20 flex items-center justify-center">
                    <span className="text-2xl">😿</span>
                  </div>
                  <div className="text-center whitespace-pre-wrap text-sm text-[#e6edf3]">
                    {UNSUPPORTED_MESSAGE}
                  </div>
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#da3633]/20 flex items-center justify-center">
                    <span className="text-2xl">💥</span>
                  </div>
                  <p className="text-sm text-[#e6edf3] text-center">
                    Something broke. Try refreshing the page.
                  </p>
                </div>
              )}

              {/* Messages */}
              {(isReady || isGenerating) && (
                <>
                  {messages.map((msg, i) => (
                    <AIMessage
                      key={i}
                      role={msg.role}
                      content={msg.content}
                      isStreaming={isGenerating && i === messages.length - 1 && msg.role === "assistant"}
                      timestamp={msg.timestamp}
                      toolUsed={msg.toolUsed}
                    />
                  ))}
                  {isGenerating && (
                    <AITypingIndicator />
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-20 right-4 z-10 p-2 rounded-full bg-[#21262d] 
                             border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3]
                             shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Suggestions */}
            {(isReady || isGenerating) && messages.length <= 2 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-[#30363d]/50 flex-shrink-0">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestion(prompt)}
                    disabled={isGenerating}
                    className="px-3 py-1.5 text-xs rounded-full border border-[#30363d] 
                               text-[#8b949e] hover:bg-[#388bfd] hover:text-white 
                               hover:border-[#388bfd] transition-all disabled:opacity-50
                               disabled:cursor-not-allowed cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            {(isReady || isGenerating) && (
              <div className="px-4 py-3 border-t border-[#30363d] bg-[#161b22]/80 flex-shrink-0">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything... (try /help)"
                    disabled={isGenerating}
                    rows={1}
                    className="flex-1 bg-[#21262d] border border-[#30363d] rounded-xl 
                               px-3 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e]
                               focus:outline-none focus:border-[#388bfd] resize-none
                               disabled:opacity-50 transition-colors"
                    style={{ maxHeight: "100px", minHeight: "40px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isGenerating}
                    className="p-2.5 rounded-xl bg-[#388bfd] text-white 
                               hover:bg-[#1f6feb] disabled:opacity-50 
                               disabled:cursor-not-allowed transition-colors
                               cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-[#8b949e] mt-1.5 text-center">
                  Runs 100% on your device. No cloud, no servers. • Ctrl+Shift+A to toggle
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
