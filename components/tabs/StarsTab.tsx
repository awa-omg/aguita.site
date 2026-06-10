"use client"

import { Star, GitFork, Circle } from "lucide-react"

const starredRepos = [
  {
    owner: "containerd",
    name: "containerd",
    description: "An open and reliable container runtime",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 16800,
    forks: 3200,
    url: "https://github.com/containerd/containerd",
  },
  {
    owner: "opencontainers",
    name: "runc",
    description: "CLI tool for spawning and running containers according to the OCI specification",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 11900,
    forks: 2100,
    url: "https://github.com/opencontainers/runc",
  },
  {
    owner: "moby",
    name: "moby",
    description: "An open-source project to enable containerization on Linux",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 68800,
    forks: 18500,
    url: "https://github.com/moby/moby",
  },
  {
    owner: "huggingface",
    name: "transformers",
    description: "State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 134000,
    forks: 26800,
    url: "https://github.com/huggingface/transformers",
  },
  {
    owner: "unslothai",
    name: "unsloth",
    description: "Finetune Llama 3.1, Mistral, Phi-4 & Gemma 2 LLMs 2-5x faster with 70% less memory",
    language: "Python",
    languageColor: "#3572A5",
    stars: 20300,
    forks: 1400,
    url: "https://github.com/unslothai/unsloth",
  },
  {
    owner: "ggerganov",
    name: "llama.cpp",
    description: "LLM inference in C/C++",
    language: "C++",
    languageColor: "#f34b7d",
    stars: 72000,
    forks: 10300,
    url: "https://github.com/ggerganov/llama.cpp",
  },
  {
    owner: "rust-lang",
    name: "rust",
    description: "Empowering everyone to build reliable and efficient software.",
    language: "Rust",
    languageColor: "#dea584",
    stars: 98200,
    forks: 12700,
    url: "https://github.com/rust-lang/rust",
  },
  {
    owner: "vercel",
    name: "next.js",
    description: "The React Framework",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 127000,
    forks: 27000,
    url: "https://github.com/vercel/next.js",
  },
]

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return num.toString()
}

export function StarsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#8b949e]">
          {starredRepos.length} repositories
        </p>
      </div>

      <ul className="divide-y divide-[#21262d]">
        {starredRepos.map((repo) => (
          <li key={`${repo.owner}/${repo.name}`} className="py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <a
                    href={`https://github.com/${repo.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b949e] text-sm hover:text-[#388bfd]"
                  >
                    {repo.owner}
                  </a>
                  <span className="text-[#8b949e]">/</span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#388bfd] font-semibold text-sm hover:underline"
                  >
                    {repo.name}
                  </a>
                </div>
                <p className="text-sm text-[#8b949e] mb-2">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <Circle size={12} fill={repo.languageColor} stroke="none" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={14} />
                    {formatNumber(repo.stars)}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={14} />
                    {formatNumber(repo.forks)}
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-[3px] text-xs font-medium bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#8b949e] transition-colors">
                <Star size={14} className="text-[#e3b341]" fill="#e3b341" />
                Starred
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
