"use client"

import { useState } from "react"
import { Search, Star, GitFork, Circle } from "lucide-react"

const repositories = [
  {
    name: "gitsune",
    description: "A lightweight, privacy-focused Forgejo fork with enhanced performance and modern UI components.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 42,
    forks: 8,
    url: "https://github.com/awa-omg/gitsune",
    updatedAt: "Updated 2 days ago",
  },
  {
    name: "NHE",
    description: "Not Humanity Exam - A benchmark for measuring metacognition and reasoning patterns in large language models.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 156,
    forks: 23,
    url: "https://huggingface.co/Not-Humanity-Exam",
    updatedAt: "Updated last week",
  },
  {
    name: "koe-protocol",
    description: "Decentralized P2P communication protocol with end-to-end encryption and minimal latency.",
    language: "Rust",
    languageColor: "#dea584",
    stars: 89,
    forks: 12,
    url: "https://github.com/Koe-chat",
    updatedAt: "Updated 3 days ago",
  },
  {
    name: "opcean-models",
    description: "Open source AI models and research. Fine-tuned LLMs for specific tasks and domains.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 234,
    forks: 45,
    url: "https://huggingface.co/OpceanAI",
    updatedAt: "Updated yesterday",
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
          <input
            type="text"
            placeholder="Find a repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-[5px] text-sm bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-[5px] text-sm bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:border-[#388bfd]"
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
            className="px-3 py-[5px] text-sm bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:border-[#388bfd]"
          >
            <option value="all">Language</option>
            <option value="Python">Python</option>
            <option value="Rust">Rust</option>
            <option value="Go">Go</option>
            <option value="TypeScript">TypeScript</option>
          </select>
        </div>
      </div>

      {/* Repository list */}
      <ul className="divide-y divide-[#21262d]">
        {filteredRepos.map((repo) => (
          <li key={repo.name} className="py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#388bfd] font-semibold text-xl hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-xs text-[#8b949e] border border-[#30363d] rounded-full px-2 py-0.5">
                    Public
                  </span>
                </div>
                <p className="text-sm text-[#8b949e] mb-2 max-w-2xl">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
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
              <button className="flex items-center gap-1 px-3 py-[3px] text-xs font-medium bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#8b949e] transition-colors">
                <Star size={14} />
                Star
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
