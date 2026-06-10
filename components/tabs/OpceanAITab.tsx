import { ExternalLink, Box, Database, FileText, Zap, Shield, Heart, Globe, Cpu, CheckCircle } from "lucide-react"

const products = [
  {
    name: "Doki",
    description: "Universal container engine — OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.",
    icon: Box,
    color: "#00ADD8",
    stats: [
      { label: "Binary", value: "13MB" },
      { label: "RAM idle", value: "12MB" },
      { label: "Start time", value: "<15ms" },
      { label: "Runners", value: "12" },
    ],
    url: "https://github.com/OpceanAI/Doki",
  },
  {
    name: "ToS",
    description: "Translation of Service — an open P2P protocol for moving and synchronizing structured data between any source and any destination in real-time.",
    icon: Zap,
    color: "#f78166",
    stats: [
      { label: "Type", value: "Protocol" },
      { label: "Broker", value: "None" },
      { label: "Sync", value: "Real-time" },
    ],
    url: "https://github.com/OpceanAI/ToS",
  },
  {
    name: "Shadow",
    description: "Local-first CLI for instant codebase intelligence. Point it at any project and get full understanding in seconds.",
    icon: Shield,
    color: "#a371f7",
    stats: [
      { label: "Type", value: "CLI" },
      { label: "Data", value: "Local-only" },
      { label: "Speed", value: "Instant" },
    ],
    url: "https://github.com/OpceanAI/Shadow",
  },
]

const aiModels = [
  { name: "Yuuki", description: "Conversational honest model — 96.6% on TruthfulQA", url: "https://huggingface.co/OpceanAI/Yuuki-best" },
  { name: "Yumo", description: "Mathematical reasoning and problem solving", url: "https://huggingface.co/YU-MO/Yumo" },
  { name: "ELIZA", description: "Ultralight 248M params for edge devices", url: "https://huggingface.co/OpceanAI/ELIZA" },
  { name: "Yaki", description: "Multimodal 8B (text + image) based on LLaVA", url: "https://huggingface.co/Openllava/Yaki" },
  { name: "Yuuki VL", description: "Vision-language variant of Yuuki", url: "https://huggingface.co/OpceanAI/Yuuki-NxG-vl" },
  { name: "OwO / OvO", description: "General reasoning and code generation", url: "https://huggingface.co/OpceanAI" },
]

const datasets = [
  { name: "Ixari", description: "140GB+ corpus for Spanish + 10 indigenous languages", url: "https://huggingface.co/datasets/OpceanAI/Ixari" },
  { name: "Yuuki-dataset", description: "Training data for Yuuki models", url: "https://huggingface.co/datasets/OpceanAI/Yuuki-dataset" },
  { name: "SOTA", description: "General, hard, math, and coding datasets", url: "https://huggingface.co/datasets/OpceanAI/sota-general" },
]

const benchmarks = [
  { name: "NHE", description: "Not Humanity Exam — metacognition benchmark", url: "https://huggingface.co/Not-Humanity-Exam" },
  { name: "YHE", description: "Yuuki Humanity Exam", url: "https://huggingface.co/OpceanAI" },
  { name: "BHE", description: "Benchmark for cognitive structure", url: "https://huggingface.co/OpceanAI" },
]

const achievements = [
  "Execute OCI containers on Android without root",
  "Train competitive LLMs on a $150 smartphone with zero cloud budget",
  "Build a 12-level isolation system from WASM to pKVM",
  "Create a 140GB+ corpus covering 10 indigenous languages",
  "Publish 3 peer-reviewed papers with DOI on Zenodo",
  "Maintain 20+ open-source models under Apache 2.0 / MIT",
  "Respond to bug reports within hours, not days",
]

export function OpceanAITab() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-[#21262d] flex items-center justify-center">
            <Globe size={20} className="text-[#388bfd]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#e6edf3]">OpceanAI</h2>
            <a
              href="https://opceanai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#388bfd] hover:underline"
            >
              opceanai.com
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-0.5 text-xs bg-[#388bfd]/10 text-[#388bfd] rounded-full border border-[#388bfd]/20">
            Apache 2.0
          </span>
          <span className="px-2 py-0.5 text-xs bg-[#3fb950]/10 text-[#3fb950] rounded-full border border-[#3fb950]/20">
            Open Source
          </span>
          <span className="px-2 py-0.5 text-xs bg-[#f78166]/10 text-[#f78166] rounded-full border border-[#f78166]/20">
            Rootless
          </span>
          <span className="px-2 py-0.5 text-xs bg-[#a371f7]/10 text-[#a371f7] rounded-full border border-[#a371f7]/20">
            Zero Budget
          </span>
        </div>
        <p className="text-sm text-[#8b949e] leading-relaxed">
          OpceanAI is an independent, open-source technology organization that builds accessible infrastructure and AI
          for environments where traditional solutions don't reach: mobile devices, resource-constrained systems, and edge
          computing scenarios. Everything is free, transparent, and developed under open licenses.
        </p>
      </div>

      {/* Infrastructure */}
      <div>
        <h3 className="text-base font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
          <Box size={18} className="text-[#00ADD8]" />
          Infrastructure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#388bfd]/50 hover:shadow-[0_0_10px_rgba(56,139,253,0.1)] transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <product.icon size={16} style={{ color: product.color }} />
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#388bfd] font-semibold text-sm hover:underline"
                >
                  {product.name}
                </a>
              </div>
              <p className="text-xs text-[#8b949e] mb-3 line-clamp-2">{product.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 bg-[#161b22] rounded">
                    <div className="text-xs font-bold font-mono text-[#e6edf3]">{stat.value}</div>
                    <div className="text-[10px] text-[#8b949e]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI & Models */}
      <div>
        <h3 className="text-base font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
          <Cpu size={18} className="text-[#a371f7]" />
          AI & Models
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModels.map((model) => (
            <a
              key={model.name}
              href={model.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#a371f7]/50 hover:shadow-[0_0_10px_rgba(163,113,247,0.1)] transition-all block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#e6edf3]">{model.name}</span>
                <ExternalLink size={12} className="text-[#8b949e]" />
              </div>
              <p className="text-xs text-[#8b949e]">{model.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Datasets & Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
            <Database size={18} className="text-[#3fb950]" />
            Datasets
          </h3>
          <div className="space-y-3">
            {datasets.map((dataset) => (
              <a
                key={dataset.name}
                href={dataset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#3fb950]/50 hover:shadow-[0_0_10px_rgba(63,185,80,0.1)] transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-[#21262d] flex items-center justify-center flex-shrink-0">
                  <Database size={14} className="text-[#3fb950]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#e6edf3] truncate">{dataset.name}</div>
                  <div className="text-xs text-[#8b949e] truncate">{dataset.description}</div>
                </div>
                <ExternalLink size={12} className="text-[#8b949e] flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#f78166]" />
            Benchmarks
          </h3>
          <div className="space-y-3">
            {benchmarks.map((benchmark) => (
              <a
                key={benchmark.name}
                href={benchmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#f78166]/50 hover:shadow-[0_0_10px_rgba(247,129,102,0.1)] transition-all"
              >
                <div className="w-8 h-8 rounded-md bg-[#21262d] flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-[#f78166]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#e6edf3] truncate">{benchmark.name}</div>
                  <div className="text-xs text-[#8b949e] truncate">{benchmark.description}</div>
                </div>
                <ExternalLink size={12} className="text-[#8b949e] flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
        <h3 className="text-base font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
          <Heart size={18} className="text-[#f78166]" />
          Philosophy
        </h3>
        <blockquote className="text-sm text-[#e6edf3] italic border-l-2 border-[#f78166] pl-4 mb-4">
          "Si tienes que pagar por algo, ¿por qué no hacerlo tú mismo y gratis?"
        </blockquote>
        <ul className="space-y-2 text-sm text-[#8b949e]">
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="text-[#3fb950] mt-0.5 flex-shrink-0" />
            <span><strong className="text-[#e6edf3]">Zero Budget</strong> — Train models on consumer hardware (phones, old laptops), no cloud required.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="text-[#3fb950] mt-0.5 flex-shrink-0" />
            <span><strong className="text-[#e6edf3]">Rootless-First</strong> — Every product runs without root privileges. No exceptions.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="text-[#3fb950] mt-0.5 flex-shrink-0" />
            <span><strong className="text-[#e6edf3]">Quality over Quantity</strong> — Better training data beats bigger compute. Always.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="text-[#3fb950] mt-0.5 flex-shrink-0" />
            <span><strong className="text-[#e6edf3]">Full Transparency</strong> — All weights, datasets, and code published under permissive licenses.</span>
          </li>
        </ul>
      </div>

      {/* Impact */}
      <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
        <h3 className="text-base font-semibold text-[#e6edf3] mb-4">Impact</h3>
        <ul className="space-y-2">
          {achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
              <CheckCircle size={14} className="text-[#388bfd] mt-0.5 flex-shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#21262d]">
        <a
          href="https://github.com/OpceanAI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#388bfd] hover:underline"
        >
          <Box size={14} />
          GitHub / OpceanAI
        </a>
        <a
          href="https://huggingface.co/OpceanAI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#388bfd] hover:underline"
        >
          <Database size={14} />
          Hugging Face / OpceanAI
        </a>
      </div>
    </div>
  )
}
