"use client"

import { useState } from "react"
import { Search, Star, GitFork, Circle } from "lucide-react"
import { motion } from "framer-motion"

const repositories = [
  {
    name: "yuuki-training",
    description: "Training pipeline for Yuuki-82M — a small language model trained from scratch on a Redmi 12 smartphone with zero cloud budget.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    forks: 0,
    url: "https://github.com/YuuKi-OS/yuuki-training",
    updatedAt: "Updated recently",
  },
  {
    name: "Doki",
    description: "Universal container engine — OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 20,
    forks: 2,
    url: "https://github.com/OpceanAI/Doki",
    updatedAt: "Updated recently",
  },
  {
    name: "ToS",
    description: "Translation of Service — an open P2P protocol for moving and synchronizing structured data between any source and any destination in real-time, without a central broker.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0,
    url: "https://github.com/OpceanAI/ToS",
    updatedAt: "Updated recently",
  },
  {
    name: "Shadow",
    description: "Local-first CLI for instant codebase intelligence. Point it at a file, folder, or running service and Shadow will tell you what the project does, how files connect, and where the risky parts are.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "https://github.com/OpceanAI/Shadow",
    updatedAt: "Updated recently",
  },
]

export function RepositoriesTab() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) ||
                          repo.description.toLowerCase().includes(search.toLowerCase())
    const matchesLanguage = languageFilter === "all" || repo.language === languageFilter
    return matchesSearch && matchesLanguage
  })

  return (
    <div>
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Find a repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-[5px] text-sm bg-canvas border border-default rounded-md text-primary placeholder-[var(--text-muted)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-[5px] text-sm bg-canvas-muted border border-default rounded-md text-primary focus:outline-none focus:border-accent"
          >
            <option value="all">Type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="sources">Sources</option>
            <option value="forks">Forks</option>
          </select>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-[5px] text-sm bg-canvas-muted border border-default rounded-md text-primary focus:outline-none focus:border-accent"
          >
            <option value="all">Language</option>
            <option value="Python">Python</option>
            <option value="Go">Go</option>
            <option value="TypeScript">TypeScript</option>
            <option value="C++">C++</option>
            <option value="Rust">Rust</option>
          </select>
        </div>
      </div>

      {/* Repository list */}
      <ul className="divide-y divide-[var(--border-muted)]">
        {filteredRepos.map((repo, i) => (
          <motion.li 
            key={repo.name} 
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold text-xl hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-xs text-muted border border-default rounded-full px-2 py-0.5">
                    Public
                  </span>
                </div>
                <p className="text-sm text-muted mb-2 max-w-2xl">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <Circle size={12} fill={repo.languageColor} stroke="none" />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork size={14} />
                      {repo.forks}
                    </span>
                  )}
                  <span>{repo.updatedAt}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-[3px] text-xs font-medium bg-canvas-muted border border-default rounded-md text-primary hover:bg-canvas-muted transition-colors">
                <Star size={14} />
                Star
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
