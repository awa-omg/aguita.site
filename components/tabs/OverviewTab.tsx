"use client"

import { useEffect, useState } from "react"
import { RepoCard } from "@/components/RepoCard"

const pinnedRepos = [
  {
    name: "gitsune",
    description: "A lightweight, privacy-focused Forgejo fork with enhanced performance and modern UI components.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 42,
    forks: 8,
    url: "https://github.com/awa-omg/gitsune",
    starUrl: "https://github.com/awa-omg/gitsune",
  },
  {
    name: "NHE",
    description: "Not Humanity Exam - A benchmark for measuring metacognition and reasoning patterns in large language models.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 156,
    forks: 23,
    url: "https://huggingface.co/Not-Humanity-Exam",
    starUrl: "https://huggingface.co/Not-Humanity-Exam",
  },
  {
    name: "koe",
    description: "Decentralized P2P communication protocol with end-to-end encryption and minimal latency.",
    language: "Rust",
    languageColor: "#dea584",
    stars: 89,
    forks: 12,
    url: "https://github.com/Koe-chat/koe",
    starUrl: "https://github.com/Koe-chat/koe",
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
        <div
          key={i}
          className="aspect-square rounded-sm"
          style={{ backgroundColor: levelColors[parseInt(level)] }}
        />
      ))}
    </div>
  )
}

export function OverviewTab() {
  return (
    <div>
      {/* Pinned repos section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base text-[#e6edf3]">Pinned</h2>
          <a href="#" className="text-xs text-[#8b949e] hover:text-[#388bfd]">
            Customize your pins
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pinnedRepos.map((repo) => (
            <RepoCard key={repo.name} {...repo} />
          ))}
        </div>
      </div>

      {/* Contribution graph */}
      <div className="mb-6">
        <h2 className="text-base text-[#e6edf3] mb-4">Contribution activity</h2>
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
    </div>
  )
}
