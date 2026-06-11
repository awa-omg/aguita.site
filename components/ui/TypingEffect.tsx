"use client"

import { useRef, useEffect, useState } from "react"

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
  cursor?: boolean
  delay?: number
}

export function TypingEffect({
  text,
  speed = 50,
  className = "",
  cursor = true,
  delay = 0,
}: TypingEffectProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    let timeout: NodeJS.Timeout
    let index = 0

    const startTyping = () => {
      const typeNext = () => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1))
          index++
          timeout = setTimeout(typeNext, speed)
        } else {
          setIsComplete(true)
        }
      }

      typeNext()
    }

    timeout = setTimeout(startTyping, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <span className="inline-block w-0.5 h-[1em] bg-[#388bfd] ml-0.5 animate-pulse" />
      )}
    </span>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const words = text.split(" ")
      ref.current!.innerHTML = words
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block;transform:translateY(100%)">${word}</span></span>`
        )
        .join(" ")

      const spans = ref.current!.querySelectorAll("span > span")

      gsap.to(spans, {
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          once: true,
        },
      })
    }

    init()
  }, [text, delay])

  return <span ref={ref} className={className} />
}
