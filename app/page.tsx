"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TopHeader } from "@/components/TopHeader"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { NavTabs } from "@/components/NavTabs"
import { CustomCursor } from "@/components/CustomCursor"
import { WebGLBackground } from "@/components/WebGLBackground"
import { TerminalOverlay } from "@/components/TerminalOverlay"
import { OverviewTab } from "@/components/tabs/OverviewTab"
import { RepositoriesTab } from "@/components/tabs/RepositoriesTab"
import { ModelsTab } from "@/components/tabs/ModelsTab"
import { PapersTab } from "@/components/tabs/PapersTab"
import { OpceanAITab } from "@/components/tabs/OpceanAITab"
import { LabTab } from "@/components/tabs/LabTab"
import { NowTab } from "@/components/tabs/NowTab"
import { StarsTab } from "@/components/tabs/StarsTab"
import { ContactTab } from "@/components/tabs/ContactTab"
import dynamic from "next/dynamic"
import Lenis from "lenis"

const AIAssistant = dynamic(() => import("@/components/AIAssistant").then((mod) => mod.AIAssistant), {
  ssr: false,
})

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [konamiActive, setKonamiActive] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Konami code handler
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      // Terminal toggle
      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setTerminalOpen(prev => !prev)
        return
      }

      // Konami code
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          setKonamiActive(true)
          konamiIndex = 0
          // Trigger matrix rain effect
          triggerMatrixRain()
          setTimeout(() => setKonamiActive(false), 5000)
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerMatrixRain = useCallback(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const char = document.createElement('div')
        char.className = 'matrix-char'
        char.textContent = chars[Math.floor(Math.random() * chars.length)]
        char.style.left = Math.random() * 100 + 'vw'
        char.style.top = '-20px'
        char.style.animationDuration = (1 + Math.random() * 2) + 's'
        document.body.appendChild(char)
        setTimeout(() => char.remove(), 3000)
      }, i * 50)
    }
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Scroll to top when changing tabs
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.5 })
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", component: OverviewTab },
    { id: "repositories", label: "Repositories", component: RepositoriesTab },
    { id: "models", label: "Models", component: ModelsTab },
    { id: "papers", label: "Papers", component: PapersTab },
    { id: "opceanai", label: "OpceanAI", component: OpceanAITab },
    { id: "lab", label: "Lab", component: LabTab },
    { id: "now", label: "Now", component: NowTab },
    { id: "stars", label: "Stars", component: StarsTab },
    { id: "contact", label: "Contact", component: ContactTab },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || OverviewTab

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <CustomCursor />
      <WebGLBackground />
      
      <TopHeader />
      
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} />
          
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <NavTabs activeTab={activeTab} onTabChange={handleTabChange} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Terminal Overlay */}
      <TerminalOverlay 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)}
        onNavigate={handleTabChange}
      />

      {/* Konami notification */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-8 left-1/2 z-50 px-6 py-3 bg-[#161b22] border border-[#388bfd] rounded-lg shadow-[0_0_30px_rgba(56,139,253,0.3)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#388bfd] animate-pulse" />
              <span className="text-sm font-medium text-[#e6edf3]">Achievement Unlocked: Konami Master</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant */}
      <AIAssistant 
        onNavigate={handleTabChange}
        onOpenTerminal={() => setTerminalOpen(true)}
        terminalOpen={terminalOpen}
      />
    </div>
  )
}
