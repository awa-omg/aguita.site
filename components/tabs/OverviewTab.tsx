"use client"

import { useEffect, useRef, useState } from "react"
import { RepoCard } from "@/components/RepoCard"
import { motion } from "framer-motion"

const pinnedRepos = [
  {
    name: "yuuki-training",
    description: "Training pipeline for Yuuki-82M — a small language model trained from scratch on a Redmi 12 smartphone with zero cloud budget.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    forks: 0,
    url: "https://github.com/YuuKi-OS/yuuki-training",
    starUrl: "https://github.com/YuuKi-OS/yuuki-training",
  },
  {
    name: "Doki",
    description: "Universal container engine — OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 20,
    forks: 2,
    url: "https://github.com/OpceanAI/Doki",
    starUrl: "https://github.com/OpceanAI/Doki",
  },
  {
    name: "NHE",
    description: "Not Humanity Exam — A benchmark for measuring metacognition and reasoning patterns in large language models.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 156,
    forks: 23,
    url: "https://huggingface.co/Not-Humanity-Exam",
    starUrl: "https://huggingface.co/Not-Humanity-Exam",
  },
  {
    name: "OpceanAI",
    description: "Open source AI models and research. Fine-tuned LLMs for specific tasks and domains.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 234,
    forks: 45,
    url: "https://huggingface.co/OpceanAI",
    starUrl: "https://huggingface.co/OpceanAI",
  },
]

const milestones = [
  {
    year: "2023",
    title: "Personal Origins",
    description:
      "Agua starts a personal project called 'Ocean' to create Telegram and Discord bots. The code is a main.py monolith of over 11,000 lines. Without knowing Docker or Kubernetes, he uses 'vibe coding' for prototypes. Discovers Podroid (QEMU on Android) but finds it too slow. Begins researching proot, syscalls, and namespaces.",
  },
  {
    year: "2024",
    title: "Birth of OpceanAI and First Steps of Doki",
    description:
      "June 5: Official founding of OpceanAI. The project leaves its personal repository stage and becomes an open organization. Agua designs the first architecture of Doki in Go — a rootless OCI runtime specifically for Android. Begins writing code and testing in Termux.",
  },
  {
    year: "2025",
    title: "Lab Era (AI and Experimentation)",
    description:
      "January – November: First AI training attempts on a Snapdragon 685. Initial tests are slow (2.66 years estimated). Abandons the traditional approach and explores full fine-tuning and lightweight architectures. December: First functional prototype of Yuuki v0.1, based on GPT-2 with 82M parameters. Trained entirely on a mobile phone with zero cloud cost — proof of concept for the 'zero budget' methodology.",
  },
  {
    year: "2026",
    title: "Development Explosion and Releases",
    description:
      "January: First model 'Iris' trained (renamed to Yuuki). March – April: Accelerated Doki development. Rewrite of proot (doki-proot), internal DNS, first runners. May 4: First public Doki commit on GitHub. June 4: Doki v0.9.2 stable release with DokiLink-Lite and 190+ bugs fixed. June 5: Second OpceanAI anniversary. June 6: Doki v0.9.3 release with 12 runners, 244 CLI commands, and ARMv7 support. August (planned): Doki 0.10 with Podman, Kubernetes, native macOS, and doki-os.",
  },
]

function AnimatedCounter({ target, duration = 2, color }: { target: number | string; duration?: number; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const targetNum = typeof target === 'string' ? parseInt(target.replace(/\D/g, '')) || 0 : target
          const startTime = Date.now()
          const endTime = startTime + duration * 1000
          
          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / (duration * 1000), 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * targetNum))
            
            if (now < endTime) {
              requestAnimationFrame(animate)
            } else {
              setCount(targetNum)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  const displayValue = typeof target === 'string' && target.includes('+') 
    ? `${count}+` 
    : count

  return (
    <div ref={ref} className="text-2xl font-bold font-mono" style={{ color }}>
      {displayValue}
    </div>
  )
}

function StatsHero() {
  const stats = [
    { label: "Models", value: "20+", raw: 20, color: "#a371f7" },
    { label: "Repos", value: "4", raw: 4, color: "#3fb950" },
    { label: "Papers", value: "3", raw: 3, color: "#f78166" },
    { label: "Isolation Levels", value: "12", raw: 12, color: "#388bfd" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="p-4 border border-[#30363d] rounded-md bg-[#0d1117]/80 hover:border-[#388bfd]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,139,253,0.1)] cursor-pointer group"
        >
          <AnimatedCounter target={stat.value} color={stat.color} />
          <div className="text-xs text-[#8b949e] mt-1 group-hover:text-[#e6edf3] transition-colors">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="mb-6">
      <h2 className="text-base text-[#e6edf3] mb-4 font-semibold">Timeline</h2>
      <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#30363d]" />
          <ul className="space-y-6">
            {milestones.map((milestone, i) => (
              <motion.li 
                key={i} 
                className="relative pl-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onViewportEnter={() => setActiveIndex(i)}
              >
                <motion.div 
                  className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-[#30363d] bg-[#0d1117]"
                  animate={{
                    borderColor: activeIndex >= i ? '#388bfd' : '#30363d',
                    backgroundColor: activeIndex >= i ? '#388bfd' : '#0d1117',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono font-semibold text-[#388bfd]">{milestone.year}</span>
                  <span className="text-sm font-semibold text-[#e6edf3]">{milestone.title}</span>
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed">{milestone.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Static contribution pattern
const contributionPattern = "0123401230123012340123012340123401230123012340123012340123401230123012340123012340123401234012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401234012340123"

const levelColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

function ContributionGraph() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px]">
        {Array.from({ length: 371 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-sm bg-[#161b22]" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px]">
      {contributionPattern.slice(0, 371).split("").map((level, i) => (
        <motion.div
          key={i}
          className="aspect-square rounded-sm"
          style={{ backgroundColor: levelColors[parseInt(level)] }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.001, duration: 0.2 }}
        />
      ))}
    </div>
  )
}

export function OverviewTab() {
  return (
    <div>
      {/* Stats Hero */}
      <StatsHero />

      {/* Pinned repos section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base text-[#e6edf3] font-semibold">Pinned</h2>
          <span className="text-xs text-[#8b949e]">Customize your pins</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pinnedRepos.map((repo, i) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <RepoCard {...repo} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contribution graph */}
      <div className="mb-6">
        <h2 className="text-base text-[#e6edf3] mb-4 font-semibold">Contribution activity</h2>
        <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#8b949e]">Contributions in the last year</span>
          </div>
          <ContributionGraph />
          <div className="flex items-center justify-end gap-1 mt-2 text-xs text-[#8b949e]">
            <span>Less</span>
            <div className="w-[10px] h-[10px] rounded-sm bg-[#161b22]" />
            <div className="w-[10px] h-[10px] rounded-sm bg-[#0e4429]" />
            <div className="w-[10px] h-[10px] rounded-sm bg-[#006d32]" />
            <div className="w-[10px] h-[10px] rounded-sm bg-[#26a641]" />
            <div className="w-[10px] h-[10px] rounded-sm bg-[#39d353]" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Timeline />
    </div>
  )
}
