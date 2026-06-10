"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, MessageSquare, Command } from "lucide-react"

interface MobileToggleProps {
  onOpenTerminal: () => void
  onOpenChat: () => void
  chatOpen: boolean
  terminalOpen: boolean
}

export function MobileToggle({ onOpenTerminal, onOpenChat, chatOpen, terminalOpen }: MobileToggleProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <>
      {/* Floating action button */}
      <AnimatePresence>
        {!showMenu && !chatOpen && !terminalOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(true)}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full 
                       bg-[#21262d] border border-[#30363d] text-[#e6edf3]
                       shadow-lg flex items-center justify-center
                       hover:bg-[#30363d] transition-colors"
            aria-label="Open menu"
          >
            <Command className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Menu overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-6 z-50 flex flex-col gap-2"
          >
            <button
              onClick={() => {
                onOpenTerminal()
                setShowMenu(false)
              }}
              className="flex items-center gap-3 px-4 py-3 bg-[#21262d] border border-[#30363d] 
                         rounded-xl text-[#e6edf3] shadow-lg active:scale-95 transition-transform"
            >
              <Terminal className="w-5 h-5 text-[#3fb950]" />
              <span className="text-sm font-medium">Terminal</span>
            </button>
            <button
              onClick={() => {
                onOpenChat()
                setShowMenu(false)
              }}
              className="flex items-center gap-3 px-4 py-3 bg-[#21262d] border border-[#30363d] 
                         rounded-xl text-[#e6edf3] shadow-lg active:scale-95 transition-transform"
            >
              <MessageSquare className="w-5 h-5 text-[#388bfd]" />
              <span className="text-sm font-medium">AI Chat</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  )
}
