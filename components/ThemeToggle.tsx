"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    if (stored === "light") {
      setDark(false)
      document.documentElement.setAttribute("data-theme", "light")
    } else {
      setDark(true)
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    const theme = next ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  if (!mounted) {
    return <div className="w-[32px] h-[32px]" />
  }

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
