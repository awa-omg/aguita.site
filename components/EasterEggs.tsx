"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EasterEgg {
  trigger: string
  component: React.ReactNode
}

export function EasterEggs() {
  const [activeEgg, setActiveEgg] = useState<string | null>(null)
  const [inputBuffer, setInputBuffer] = useState("")

  const eggs: Record<string, React.ReactNode> = {
    "doki": (
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: -100 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🐱
        </motion.div>
        <p className="text-center text-[#388bfd] font-bold mt-2">Doki is watching...</p>
      </motion.div>
    ),
    "hack": (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      >
        <div className="text-green-500 font-mono text-sm p-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>{">"} Accessing mainframe...</p>
            <p>{">"} Bypassing firewall...</p>
            <p>{">"} Downloading source code...</p>
            <p>{">"} Decrypting files...</p>
            <p>{">"} Access granted!</p>
            <p className="mt-4 text-green-300">Just kidding. This is an easter egg. 🥚</p>
          </motion.div>
        </div>
      </motion.div>
    ),
    "42": (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl font-bold text-[#388bfd]"
        >
          42
        </motion.div>
        <p className="text-center text-[#8b949e] mt-4">The answer to life, the universe, and everything.</p>
      </motion.div>
    ),
  }

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key.length === 1) {
      const newBuffer = (inputBuffer + e.key.toLowerCase()).slice(-10)
      setInputBuffer(newBuffer)

      for (const trigger of Object.keys(eggs)) {
        if (newBuffer.endsWith(trigger)) {
          setActiveEgg(trigger)
          setTimeout(() => setActiveEgg(null), 5000)
          setInputBuffer("")
          break
        }
      }
    }
  }, [inputBuffer, eggs])

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [handleKeyPress])

  return (
    <AnimatePresence>
      {activeEgg && eggs[activeEgg]}
    </AnimatePresence>
  )
}

export function DevMode() {
  const [clickCount, setClickCount] = useState(0)
  const [showDev, setShowDev] = useState(false)

  useEffect(() => {
    const handleClick = () => {
      setClickCount((prev) => {
        const newCount = prev + 1
        if (newCount >= 5) {
          setShowDev(true)
          setTimeout(() => setShowDev(false), 10000)
          return 0
        }
        return newCount
      })
    }

    const logo = document.querySelector("[data-logo]")
    logo?.addEventListener("click", handleClick)

    return () => logo?.removeEventListener("click", handleClick)
  }, [])

  if (!showDev) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] glass rounded-lg p-4 text-xs font-mono"
    >
      <div className="text-[#388bfd] font-bold mb-2">🔧 Dev Mode</div>
      <div className="space-y-1 text-[#8b949e]">
        <p>Viewport: {typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "N/A"}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
        <p>Memory: {typeof performance !== "undefined" ? `${(performance as any).memory?.usedJSHeapSize || 0} bytes` : "N/A"}</p>
      </div>
    </motion.div>
  )
}
