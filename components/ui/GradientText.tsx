"use client"

import { useRef, useEffect } from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  animated?: boolean
}

export function GradientText({ 
  children, 
  className = "", 
  as: Tag = "span",
  animated = true 
}: GradientTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || !animated) return

    let animation: any = null

    const init = async () => {
      try {
        const anime = (await import("animejs")).default

        animation = anime({
          targets: ref.current,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          duration: 8000,
          easing: "linear",
          loop: true,
        })
      } catch (e) {
        console.warn("animejs not available, gradient animation disabled")
      }
    }

    init()

    return () => {
      if (animation) {
        animation.pause()
      }
    }
  }, [animated])

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`gradient-text ${className}`}
      style={{ backgroundSize: "200% 200%" }}
    >
      {children}
    </Tag>
  )
}
