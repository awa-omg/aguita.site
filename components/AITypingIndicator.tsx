"use client"

import { motion } from "framer-motion"

export function AITypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <motion.div
        className="w-2 h-2 rounded-full bg-[#8b949e]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-[#8b949e]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-[#8b949e]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  )
}
