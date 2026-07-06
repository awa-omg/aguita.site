"use client"

import { motion } from "framer-motion"
import { Bot, FileText, Database, ExternalLink, BookOpen } from "lucide-react"

const models = [
  {
    name: "Yuuki-82M",
    description: "Small language model trained from scratch on a Redmi 12 smartphone.",
    tags: ["GPT-2", "82M", "Text Generation", "Zero-Budget"],
    url: "https://huggingface.co/OpceanAI/Yuuki-best",
  },
  {
    name: "Yumo-1.5B",
    description: "Lightweight language model.",
    tags: ["LFM-1.5B", "1.5B", "Text Generation"],
    url: "https://huggingface.co/YU-MO/Yumo",
  },
  {
    name: "ELIZA",
    description: "Classic NLP chatbot reimplementation.",
    tags: ["NLP", "Pattern Matching", "Dialogue"],
    url: "https://huggingface.co/OpceanAI/ELIZA",
  },
  {
    name: "Iris",
    description: "First model (renamed to Yuuki).",
    tags: ["GPT-2", "Experimental"],
    url: "https://huggingface.co/OpceanAI/Yuuki-best",
  },
  {
    name: "Ixari",
    description: "140GB multilingual corpus.",
    tags: ["Dataset", "Multilingual", "140GB"],
    url: "https://huggingface.co/datasets/OpceanAI/Ixari",
  },
  {
    name: "Yuuki-MoE",
    description: "Mixture of Experts variant (planned).",
    tags: ["MoE", "Experimental", "Planned"],
    url: "#",
  },
]

const papers = [
  {
    title: "Flux",
    subtitle: "A Novel Architecture for Efficient Neural Network Training on Resource-Constrained Devices",
    url: "https://zenodo.org/records/19042895",
    doi: "10.5281/zenodo.19042895",
    tags: ["Architecture", "Efficiency", "Edge AI"],
  },
  {
    title: "Imprint Theory",
    subtitle: "A Framework for Understanding Consciousness Through Information Integration Patterns",
    url: "https://zenodo.org/records/18993995",
    doi: "10.5281/zenodo.18993995",
    tags: ["Theory", "Consciousness", "Information Theory"],
  },
  {
    title: "NHE (Not Humanity Exam)",
    subtitle: "Benchmark for Measuring Metacognition and Reasoning Patterns in Large Language Models",
    url: "https://huggingface.co/datasets/OpceanAI/NHE",
    doi: "",
    tags: ["Benchmark", "Metacognition", "LLMs"],
  },
]

const datasets = [
  { name: "Ixari", description: "140GB multilingual corpus" },
  { name: "Alpaca-ko", description: "Korean instruction dataset" },
  { name: "NHE benchmark dataset", description: "Metacognition and reasoning benchmark" },
]

export function ResearchTab() {
  return (
    <div>
      {/* AI Models Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#e6edf3] mb-2 flex items-center gap-2">
          <Bot size={22} className="text-[#a371f7]" />
          AI Models
        </h2>
        <p className="text-sm text-[#8b949e] mb-5">
          Open-source models and datasets from the OpceanAI lab.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model, i) => (
            <motion.a
              key={model.name}
              href={model.url}
              target={model.url !== "#" ? "_blank" : undefined}
              rel={model.url !== "#" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="group block p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#a371f7]/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#a371f7] transition-colors">
                  {model.name}
                </h3>
                <ExternalLink size={14} className="text-[#8b949e] group-hover:text-[#e6edf3] flex-shrink-0 mt-0.5 transition-colors" />
              </div>
              <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">{model.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] bg-[#21262d] text-[#8b949e] rounded-full border border-[#30363d]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Papers Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#e6edf3] mb-2 flex items-center gap-2">
          <BookOpen size={22} className="text-[#f78166]" />
          Papers
        </h2>
        <p className="text-sm text-[#8b949e] mb-5">
          Research publications and technical papers.
        </p>
        <div className="space-y-4">
          {papers.map((paper, i) => (
            <motion.a
              key={paper.title}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="group block p-5 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#f78166]/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#21262d] rounded-md flex-shrink-0 mt-0.5">
                  <FileText size={14} className="text-[#8b949e]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#f78166] transition-colors">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-[#8b949e] mt-1 leading-relaxed">{paper.subtitle}</p>
                    </div>
                    <ExternalLink size={14} className="text-[#8b949e] group-hover:text-[#e6edf3] flex-shrink-0 mt-1 transition-colors" />
                  </div>
                  {paper.doi && (
                    <p className="text-[10px] text-[#484f58] mt-2 font-mono">DOI: {paper.doi}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] bg-[#21262d] text-[#8b949e] rounded-full border border-[#30363d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Datasets Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#e6edf3] mb-2 flex items-center gap-2">
          <Database size={22} className="text-[#3fb950]" />
          Datasets
        </h2>
        <p className="text-sm text-[#8b949e] mb-5">
          Public datasets used in research and model training.
        </p>
        <div className="border border-[#30363d] rounded-md bg-[#0d1117] divide-y divide-[#30363d]">
          {datasets.map((ds, i) => (
            <motion.div
              key={ds.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#161b22] transition-colors"
            >
              <Database size={14} className="text-[#3fb950] flex-shrink-0" />
              <div>
                <span className="text-sm text-[#e6edf3]">{ds.name}</span>
                <span className="text-xs text-[#8b949e] ml-2">{ds.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
