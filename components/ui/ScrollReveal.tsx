"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className = "",
  y = 30,
  opacity = 0,
  duration = 0.6,
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        y,
        opacity,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      })
    })

    return () => ctx.revert()
  }, [y, opacity, duration, delay, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ScrollStaggerProps {
  children: React.ReactNode
  className?: string
  selector?: string
  y?: number
  opacity?: number
  duration?: number
  stagger?: number
}

export function ScrollStagger({
  children,
  className = "",
  selector = "> *",
  y = 30,
  opacity = 0,
  duration = 0.5,
  stagger = 0.1,
}: ScrollStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll(selector)

      gsap.from(elements, {
        y,
        opacity,
        duration,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => ctx.revert()
  }, [selector, y, opacity, duration, stagger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
