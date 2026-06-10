"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"

interface AIMessageProps {
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
  timestamp?: number
  toolUsed?: string
}

function formatMarkdown(text: string): string {
  // Simple markdown formatting
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#21262d;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;">$1</code>')
    .replace(/\n/g, '<br/>')
}

function formatTime(timestamp?: number): string {
  if (!timestamp) return ""
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function AIMessage({ role, content, isStreaming, timestamp, toolUsed }: AIMessageProps) {
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#388bfd] to-[#1f6feb] flex items-center justify-center mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? "order-1" : "order-2"}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-gradient-to-br from-[#388bfd] to-[#1f6feb] text-white rounded-br-sm"
              : "bg-[#161b22] border border-[#30363d] text-[#e6edf3] rounded-bl-sm"
          }`}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
            className="whitespace-pre-wrap"
          />
          {isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-[#8b949e] animate-pulse rounded-sm align-middle" />
          )}
        </div>
        
        {/* Metadata */}
        <div className={`flex items-center gap-1 mt-1 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className="text-[10px] text-[#8b949e]">
            {formatTime(timestamp)}
          </span>
          {toolUsed && (
            <span className="text-[10px] text-[#388bfd] bg-[#388bfd]/10 px-1.5 py-0.5 rounded-full">
              {toolUsed}
            </span>
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#30363d] flex items-center justify-center mt-1 order-2">
          <User className="w-4 h-4 text-[#8b949e]" />
        </div>
      )}
    </motion.div>
  )
}
