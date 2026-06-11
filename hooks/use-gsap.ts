"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollReveal(options?: {
  trigger?: string
  start?: string
  end?: string
  y?: number
  opacity?: number
  duration?: number
  stagger?: number
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        y: options?.y ?? 30,
        opacity: options?.opacity ?? 0,
        duration: options?.duration ?? 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current!,
          start: options?.start ?? "top 85%",
          end: options?.end ?? "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}

export function useScrollStagger(
  selector: string,
  options?: {
    start?: string
    y?: number
    opacity?: number
    duration?: number
    stagger?: number
  }
) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const elements = containerRef.current!.querySelectorAll(selector)

      gsap.from(elements, {
        y: options?.y ?? 30,
        opacity: options?.opacity ?? 0,
        duration: options?.duration ?? 0.5,
        stagger: options?.stagger ?? 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current!,
          start: options?.start ?? "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => ctx.revert()
  }, [selector])

  return containerRef
}

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        yPercent: speed * -100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}

export function useAnimatedCounter(
  target: number,
  options?: {
    duration?: number
    delay?: number
    format?: (n: number) => string
  }
) {
  const ref = useRef<HTMLElement | null>(null)
  const valueRef = useRef({ value: 0 })

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(valueRef.current, {
        value: target,
        duration: options?.duration ?? 2,
        delay: options?.delay ?? 0,
        ease: "power2.out",
        onUpdate: () => {
          const formatted = options?.format
            ? options.format(Math.round(valueRef.current.value))
            : Math.round(valueRef.current.value).toString()
          ref.current!.textContent = formatted
        },
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [target, options])

  return { ref, value: valueRef.current }
}

export function useTextReveal(text: string, options?: { delay?: number }) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
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
        delay: options?.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [text, options])

  return ref
}

export function useHorizontalScroll() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const el = ref.current!
      const scrollWidth = el.scrollWidth - el.clientWidth

      gsap.to(el, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          pin: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}
