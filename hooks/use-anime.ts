"use client"

import { useEffect, useRef, useCallback } from "react"

interface AnimeInstance {
  pause: () => void
  resume: () => void
  restart: () => void
  seek: (time: number) => void
  finished: Promise<void>
}

type AnimeParams = {
  targets?: HTMLElement | HTMLElement[] | string
  [key: string]: unknown
}

export function useAnime(params: AnimeParams, deps: unknown[] = []) {
  const instanceRef = useRef<AnimeInstance | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      const anime = (await import("animejs")).default

      if (cancelled) return

      if (instanceRef.current) {
        instanceRef.current.pause()
      }

      if (cleanupRef.current) {
        cleanupRef.current()
      }

      const instance = anime(params)
      instanceRef.current = instance

      cleanupRef.current = () => {
        if (instanceRef.current) {
          instanceRef.current.pause()
        }
      }
    }

    init()

    return () => {
      cancelled = true
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, deps)

  return instanceRef
}

export function useAnimeOnMount(params: AnimeParams) {
  return useAnime(params, [])
}

export function useAnimeOnView(params: AnimeParams, options?: { threshold?: number }) {
  const ref = useRef<HTMLElement | null>(null)
  const instanceRef = useRef<AnimeInstance | null>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const anime = (await import("animejs")).default
            instanceRef.current = anime({
              ...params,
              targets: ref.current!,
            })
          }
        })
      },
      { threshold: options?.threshold ?? 0.1 }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return ref
}

export function useStaggerAnimation(
  selector: string,
  params: Partial<AnimeParams>,
  deps: unknown[] = []
) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let cancelled = false

    const init = async () => {
      const anime = (await import("animejs")).default

      if (cancelled) return

      const elements = containerRef.current!.querySelectorAll(selector)

      anime({
        targets: elements,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(50),
        duration: 500,
        easing: "easeOutCubic",
        ...params,
      })
    }

    init()

    return () => {
      cancelled = true
    }
  }, deps)

  return containerRef
}

export function useMagneticButton(strength = 0.3) {
  const ref = useRef<HTMLButtonElement | null>(null)

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

  return ref
}

export function useTypingEffect(text: string, speed = 50) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    let cancelled = false

    const init = async () => {
      const anime = (await import("animejs")).default

      if (cancelled) return

      const el = ref.current!
      el.textContent = ""

      const chars = text.split("")

      anime({
        targets: el,
        innerHTML: chars.map((c, i) => ({
          value: text.substring(0, i + 1),
          duration: speed,
        })),
        easing: "linear",
      })
    }

    init()

    return () => {
      cancelled = true
    }
  }, [text, speed])

  return ref
}

export function useSpotlight() {
  const ref = useRef<HTMLElement | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    el.style.setProperty("--mouse-x", `${x}px`)
    el.style.setProperty("--mouse-y", `${y}px`)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.addEventListener("mousemove", handleMouseMove)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  return ref
}
