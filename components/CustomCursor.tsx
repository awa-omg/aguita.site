"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const dotSpringConfig = { damping: 30, stiffness: 500 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect hover on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveElement = target.closest('a, button, [role="button"], [data-cursor]')
      
      if (interactiveElement) {
        setIsHovering(true)
        const text = interactiveElement.getAttribute('data-cursor-text') || ''
        setCursorText(text)
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementHover)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY])

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border flex items-center justify-center"
          animate={{
            width: isHovering ? 60 : 32,
            height: isHovering ? 60 : 32,
            borderColor: isHovering ? 'rgba(56, 139, 253, 0.5)' : 'rgba(56, 139, 253, 0.3)',
            backgroundColor: isHovering ? 'rgba(56, 139, 253, 0.1)' : 'transparent',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {cursorText && (
            <motion.span
              className="text-[8px] font-medium text-[#388bfd] uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#388bfd]"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
