"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  format?: (n: number) => string
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  format,
  className = "",
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const valueRef = useRef({ value: 0 })

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(valueRef.current, {
        value,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          const formatted = format
            ? format(Math.round(valueRef.current.value))
            : Math.round(valueRef.current.value).toString()
          ref.current!.textContent = `${prefix}${formatted}${suffix}`
        },
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [value, duration, delay, format, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
