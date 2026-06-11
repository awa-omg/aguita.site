"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
  children: React.ReactNode
}

export function MagneticButton({ strength = 0.3, children, className = "", ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = async (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const anime = (await import("animejs")).default

      anime({
        targets: el,
        translateX: x * strength,
        translateY: y * strength,
        duration: 300,
        easing: "easeOutCubic",
      })
    }

    const handleMouseLeave = async () => {
      const anime = (await import("animejs")).default

      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: "easeOutElastic(1, 0.5)",
      })
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.95 }}
      className={`magnetic-button ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
