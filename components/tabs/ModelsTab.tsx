"use client"

import { useState } from "react"
import { Search, ExternalLink, Database, Box, Rocket } from "lucide-react"

const models = [
  {
    name: "Yuuki-best",
    description: "Best checkpoint of Yuuki-82M — trained on a smartphone with zero cloud budget.",
    category: "Model",
    tags: ["GPT-2", "82M", "code", "mobile-training"],
    url: "https://huggingface.co/OpceanAI/Yuuki-best",
  },
  {
    name: "Yuuki-3.7",
    description: "Intermediate checkpoint of the Yuuki model family.",
    category: "Model",
    tags: ["GPT-2", "82M", "code"],
    url: "https://huggingface.co/OpceanAI/Yuuki-3.7",
  },
  {
    name: "Yuuki-NxG",
    description: "Next generation of Yuuki models.",
    category: "Model",
    tags: ["GPT-2", "next-gen"],
    url: "https://huggingface.co/OpceanAI/Yuuki-NxG",
  },
  {
    name: "Yuuki-NxG-vl",
    description: "Vision-language variant of Yuuki-NxG.",
    category: "Model",
    tags: ["multimodal", "vl"],
    url: "https://huggingface.co/OpceanAI/Yuuki-NxG-vl",
  },
  {
    name: "Yuuki-NxG-nano",
    description: "Ultra-lightweight variant of Yuuki-NxG for edge devices.",
    category: "Model",
    tags: ["nano", "edge"],
    url: "https://huggingface.co/OpceanAI/Yuuki-NxG-nano",
  },
  {
    name: "Yuuki-RxG",
    description: "Reasoning-enhanced Yuuki model.",
    category: "Model",
    tags: ["reasoning", "CoT"],
    url: "https://huggingface.co/OpceanAI/Yuuki-RxG",
  },
  {
    name: "Yuuki-RxG-vl",
    description: "Vision-language variant of Yuuki-RxG.",
    category: "Model",
    tags: ["reasoning", "multimodal", "vl"],
    url: "https://huggingface.co/OpceanAI/Yuuki-RxG-vl",
  },
  {
    name: "Yuuki-RxG-nano",
    description: "Ultra-lightweight reasoning variant.",
    category: "Model",
    tags: ["reasoning", "nano", "edge"],
    url: "https://huggingface.co/OpceanAI/Yuuki-RxG-nano",
  },
  {
    name: "Yumo-nano",
    description: "Nano variant of Yumo — mathematical reasoning model.",
    category: "Model",
    tags: ["math", "reasoning", "nano"],
    url: "https://huggingface.co/YU-MO/Yumo-nano",
  },
  {
    name: "Yumo",
    description: "YuuKi Mathematical Omnisolving — 15B parameter model for mathematical reasoning.",
    category: "Model",
    tags: ["math", "reasoning", "15B"],
    url: "https://huggingface.co/YU-MO/Yumo",
  },
  {
    name: "Yumo-RxG",
    description: "Hybrid model combining RxG reasoning with the Yumo line.",
    category: "Model",
    tags: ["math", "reasoning", "hybrid"],
    url: "https://huggingface.co/YU-MO/Yumo-RxG",
  },
  {
    name: "ELIZA",
    description: "Ultralight model (248M params) for edge devices with structured reasoning and truth-critical protocol.",
    category: "Model",
    tags: ["edge", "248M", "truthful"],
    url: "https://huggingface.co/OpceanAI/ELIZA",
  },
  {
    name: "Tsuki",
    description: "Token compressor achieving 57% less token cost.",
    category: "Model",
    tags: ["compression", "token-efficiency"],
    url: "https://huggingface.co/tsuki-team/Tsuki",
  },
  {
    name: "Yaki",
    description: "8B multimodal model combining Yuuki with LLaVA architecture.",
    category: "Model",
    tags: ["multimodal", "8B", "llava"],
    url: "https://huggingface.co/Openllava/Yaki",
  },
]

const datasets = [
  {
    name: "Yuuki-dataset",
    description: "Training dataset for Yuuki models.",
    category: "Dataset",
    tags: ["code", "training"],
    url: "https://huggingface.co/datasets/OpceanAI/Yuuki-dataset",
  },
  {
    name: "Yuuki-Personality",
    description: "Personality dataset for Yuuki conversational models.",
    category: "Dataset",
    tags: ["personality", "conversation"],
    url: "https://huggingface.co/datasets/OpceanAI/Yuuki-Personality",
  },
  {
    name: "Yuuki-Personality-v2",
    description: "Updated personality dataset for Yuuki.",
    category: "Dataset",
    tags: ["personality", "v2"],
    url: "https://huggingface.co/datasets/OpceanAI/Yuuki-Personality-v2",
  },
  {
    name: "sota-general",
    description: "State-of-the-art general reasoning dataset.",
    category: "Dataset",
    tags: ["sota", "reasoning"],
    url: "https://huggingface.co/datasets/OpceanAI/sota-general",
  },
  {
    name: "sota-hard",
    description: "Hard reasoning problems dataset.",
    category: "Dataset",
    tags: ["sota", "hard"],
    url: "https://huggingface.co/datasets/OpceanAI/sota-hard",
  },
  {
    name: "sota-math",
    description: "Mathematical reasoning dataset.",
    category: "Dataset",
    tags: ["sota", "math"],
    url: "https://huggingface.co/datasets/OpceanAI/sota-math",
  },
  {
    name: "sota-coding",
    description: "Coding problems dataset.",
    category: "Dataset",
    tags: ["sota", "code"],
    url: "https://huggingface.co/datasets/OpceanAI/sota-coding",
  },
  {
    name: "Ixari",
    description: "Massive monolingual corpus for Spanish and 10 indigenous Latin American languages — 140GB+.",
    category: "Dataset",
    tags: ["spanish", "indigenous", "140GB", "multilingual"],
    url: "https://huggingface.co/datasets/OpceanAI/Ixari",
  },
  {
    name: "Ixari-CoT",
    description: "Chain-of-Thought variant of the Ixari corpus.",
    category: "Dataset",
    tags: ["spanish", "CoT", "reasoning"],
    url: "https://huggingface.co/datasets/OpceanAI/Ixari-CoT",
  },
]

const spaces = [
  {
    name: "Yuuki-RxG",
    description: "Try Yuuki-RxG through Featherless AI.",
    category: "Space",
    tags: ["demo", "chat"],
    url: "https://huggingface.co/spaces/OpceanAI/Yuuki-RxG",
  },
  {
    name: "Yuuki-api",
    description: "Free API for Yuuki models.",
    category: "Space",
    tags: ["api", "free"],
    url: "https://huggingface.co/spaces/OpceanAI/Yuuki-api",
  },
]

const allItems = [...models, ...datasets, ...spaces]

const categoryColors: Record<string, string> = {
  Model: "#a371f7",
  Dataset: "#3fb950",
  Space: "#f78166",
}

const categoryIcons: Record<string, React.ReactNode> = {
  Model: <Box size={14} />,
  Dataset: <Database size={14} />,
  Space: <Rocket size={14} />,
}

export function ModelsTab() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filtered = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof allItems>)

  return (
    <div>
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
          <input
            type="text"
            placeholder="Find a model, dataset, or space..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-[5px] text-sm bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-[5px] text-sm bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:border-[#388bfd]"
          >
            <option value="all">All</option>
            <option value="Model">Models</option>
            <option value="Dataset">Datasets</option>
            <option value="Space">Spaces</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span style={{ color: categoryColors[category] }}>{categoryIcons[category]}</span>
              {category}s
              <span className="text-[#8b949e] font-normal">({items.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#388bfd]/50 hover:shadow-[0_0_10px_rgba(56,139,253,0.1)] transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span style={{ color: categoryColors[category] }}>
                        {categoryIcons[category]}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#388bfd] font-semibold text-sm hover:underline truncate"
                      >
                        {item.name}
                      </a>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8b949e] hover:text-[#e6edf3] flex-shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <p className="text-xs text-[#8b949e] mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] bg-[#21262d] text-[#8b949e] rounded-full border border-[#30363d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
