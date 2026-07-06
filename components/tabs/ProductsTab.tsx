"use client"

import { Box, ArrowUpRight, Network, Globe, Server, Terminal, Package, Layers, GitFork, Star } from "lucide-react"
import { motion } from "framer-motion"

const products = [
  {
    name: "Doki",
    emoji: "🐳",
    description:
      "OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.",
    stats: [
      { label: "Stars", value: "20+" },
      { label: "Isolation Levels", value: "12" },
      { label: "Releases", value: "9" },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/OpceanAI/Doki" },
      { label: "Docs", url: "https://github.com/OpceanAI/Doki#readme" },
    ],
  },
  {
    name: "ToS",
    emoji: "🔄",
    description: "Decentralized synchronization protocol for distributed systems.",
    stats: [
      { label: "Stars", value: "5+" },
      { label: "Architecture", value: "P2P" },
    ],
    links: [{ label: "GitHub", url: "https://github.com/OpceanAI/ToS" }],
  },
  {
    name: "Shadow",
    emoji: "👁️",
    description: "System monitoring and management daemon for Doki infrastructure.",
    stats: [{ label: "Status", value: "Active development" }],
    links: [{ label: "GitHub", url: "https://github.com/OpceanAI/Shadow" }],
  },
]

const infrastructure = [
  { name: "doki-proot", description: "proot for Android", icon: Package },
  { name: "DokiLink-Lite", description: "Lightweight container networking", icon: Network },
  { name: "Internal DNS", description: "Container name resolution", icon: Globe },
  { name: "12 Runners", description: "Distributed build and test runners", icon: Server },
  { name: "244 CLI Commands", description: "Complete command-line toolchain", icon: Terminal },
]

const architecture = [
  "Rootless-first design — no root privileges required anywhere",
  "WASM isolation support — sandbox any workload with WebAssembly",
  "pKVM support (future) — hardware-backed isolation for Android",
  "Multi-platform — runs on Linux, macOS, and Android via Termux",
]

export function ProductsTab() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border border-[#3d444d] rounded-md p-6 bg-[#0d1117]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-[#151b23] flex items-center justify-center">
            <Box size={20} className="text-[#f0f6fc]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#f0f6fc]">Products</h2>
            <p className="text-xs text-[#9198a1]">Open-source infrastructure by OpceanAI</p>
          </div>
        </div>
        <p className="text-sm text-[#9198a1] leading-relaxed">
          Open-source products built for environments where traditional solutions don't reach:
          mobile devices, resource-constrained systems, and edge computing. Every project is free,
          transparent, and developed under permissive licenses.
        </p>
      </div>

      {/* Hero Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="border border-[#3d444d] rounded-md bg-[#0d1117] hover:border-[#4493f8]/50 transition-colors"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl leading-none">{product.emoji}</span>
                <h3 className="text-base font-semibold text-[#f0f6fc]">{product.name}</h3>
              </div>

              {/* Description */}
              <p className="text-xs text-[#9198a1] mb-4 leading-relaxed">{product.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.stats.map((stat) => (
                  <span
                    key={stat.label}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-[#151b23] border border-[#3d444d] rounded-md text-[#9198a1]"
                  >
                    <span className="font-medium text-[#f0f6fc]">{stat.value}</span>
                    {stat.label}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#3d444d]">
                {product.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#4493f8] hover:underline font-medium"
                  >
                    {link.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infrastructure */}
      <div className="border border-[#3d444d] rounded-md bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#3d444d]">
          <h3 className="text-base font-semibold text-[#f0f6fc] flex items-center gap-2">
            <Server size={16} className="text-[#9198a1]" />
            Infrastructure
          </h3>
        </div>
        <div className="divide-y divide-[#3d444db3]">
          {infrastructure.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-3 px-5 py-3 hover:bg-[#151b23] transition-colors"
              >
                <Icon size={14} className="text-[#9198a1] flex-shrink-0" />
                <span className="text-sm font-medium text-[#f0f6fc]">{item.name}</span>
                <span className="text-xs text-[#9198a1] ml-auto">{item.description}</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Architecture */}
      <div className="border border-[#3d444d] rounded-md bg-[#0d1117] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#3d444d]">
          <h3 className="text-base font-semibold text-[#f0f6fc] flex items-center gap-2">
            <Layers size={16} className="text-[#9198a1]" />
            Architecture
          </h3>
        </div>
        <div className="p-5">
          <p className="text-xs text-[#9198a1] mb-4">
            Doki is built on a rootless-first architecture designed for maximum portability across
            devices and environments:
          </p>
          <ul className="space-y-3">
            {architecture.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 text-sm text-[#f0f6fc]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4493f8] mt-1.5 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#3d444d]">
        <a
          href="https://github.com/OpceanAI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#4493f8] hover:underline"
        >
          <GitFork size={14} />
          GitHub / OpceanAI
        </a>
        <a
          href="https://github.com/OpceanAI/Doki"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#4493f8] hover:underline"
        >
          <Star size={14} />
          Star Doki
        </a>
      </div>
    </div>
  )
}
