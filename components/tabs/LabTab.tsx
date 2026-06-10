"use client"

import { motion } from "framer-motion"
import { Box, Zap, Cpu, Layers, Shield, Globe, Microscope, Activity } from "lucide-react"

const runners = [
  { level: 12, name: "WASM", description: "Sandbox (user-space) — minimal overhead", color: "#a371f7" },
  { level: 11, name: "pKVM", description: "Hardware-level VM (Android 15+)", color: "#a371f7" },
  { level: 10, name: "MicroVM", description: "KVM, Gunyah, GenieZone, Halla", color: "#a371f7" },
  { level: 9, name: "Sysbox", description: "Rootless Docker-in-Docker", color: "#388bfd" },
  { level: 8, name: "Namespaces", description: "Standard Linux namespace isolation", color: "#388bfd" },
  { level: 7, name: "gVisor", description: "User-space kernel (Google runsc)", color: "#388bfd" },
  { level: 6, name: "FEX-Emu", description: "x86 emulation on ARM", color: "#e3b341" },
  { level: 5, name: "QEMU User", description: "Cross-arch emulation", color: "#e3b341" },
  { level: 4, name: "Proot", description: "Ptrace-based chroot (Android default)", color: "#f78166" },
  { level: 3, name: "Legacy32", description: "ARMv7 on ARM64 compat", color: "#f78166" },
  { level: 2, name: "Chroot", description: "Filesystem-level isolation", color: "#8b949e" },
  { level: 1, name: "Native", description: "Direct host execution", color: "#8b949e" },
]

function RunnerVisualizer() {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
        <Layers size={20} className="text-[#388bfd]" />
        Doki Isolation Levels
      </h3>
      <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
        <p className="text-sm text-[#8b949e] mb-6">
          Doki automatically selects the strongest isolation mode available on your hardware.
          From WASM sandboxes to hardware-level pKVM VMs.
        </p>
        <div className="space-y-2">
          {runners.map((runner, i) => (
            <motion.div
              key={runner.level}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center gap-4 p-3 rounded-md hover:bg-[#161b22] transition-colors group cursor-pointer"
            >
              <div 
                className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold font-mono"
                style={{ backgroundColor: `${runner.color}20`, color: runner.color, border: `1px solid ${runner.color}40` }}
              >
                {runner.level}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#388bfd] transition-colors">
                    {runner.name}
                  </span>
                </div>
                <div className="text-xs text-[#8b949e]">{runner.description}</div>
              </div>
              <div className="w-24 h-1.5 rounded-full bg-[#21262d] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: runner.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(runner.level / 12) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrainingVisualizer() {
  const checkpoints = [
    { step: 0, loss: 2.5, label: "Start" },
    { step: 500, loss: 2.1, label: "500" },
    { step: 1000, loss: 1.9, label: "1000" },
    { step: 1400, loss: 1.75, label: "1400" },
    { step: 2000, loss: 1.69, label: "2000 (Yuuki-best)" },
    { step: 3000, loss: 1.5, label: "3000" },
    { step: 37500, loss: 1.2, label: "37500 (target)" },
  ]

  const maxLoss = 2.5
  const minLoss = 1.2

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-2">
        <Activity size={20} className="text-[#3fb950]" />
        Yuuki Training Progress
      </h3>
      <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-[#8b949e]">Current checkpoint</div>
            <div className="text-2xl font-bold font-mono text-[#3fb950]">2000 / 37,500</div>
            <div className="text-xs text-[#8b949e]">5.3% complete</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#8b949e]">Best loss</div>
            <div className="text-2xl font-bold font-mono text-[#388bfd]">1.69</div>
          </div>
        </div>

        {/* Loss graph */}
        <div className="relative h-48 mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#21262d" strokeWidth="0.5" />
            ))}
            
            {/* Loss line */}
            <motion.path
              d={`M ${checkpoints.map((cp, i) => {
                const x = (i / (checkpoints.length - 1)) * 100
                const y = ((cp.loss - minLoss) / (maxLoss - minLoss)) * 100
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}`}
              fill="none"
              stroke="#3fb950"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Points */}
            {checkpoints.map((cp, i) => {
              const x = (i / (checkpoints.length - 1)) * 100
              const y = ((cp.loss - minLoss) / (maxLoss - minLoss)) * 100
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="1.5" fill={i === 4 ? '#388bfd' : '#3fb950'} />
                </g>
              )
            })}
          </svg>
        </div>

        <div className="flex justify-between text-xs text-[#8b949e]">
          <span>0</span>
          <span>10k</span>
          <span>20k</span>
          <span>30k</span>
          <span>37.5k</span>
        </div>

        <div className="mt-4 p-3 bg-[#161b22] rounded-md border border-[#30363d]">
          <div className="text-xs text-[#8b949e] mb-2">Training hardware</div>
          <div className="flex items-center gap-3 text-sm">
            <Cpu size={14} className="text-[#388bfd]" />
            <span className="text-[#e6edf3]">Redmi 12</span>
            <span className="text-[#8b949e]">·</span>
            <span className="text-[#e6edf3]">Snapdragon 685</span>
            <span className="text-[#8b949e]">·</span>
            <span className="text-[#e6edf3]">6GB RAM</span>
            <span className="text-[#8b949e]">·</span>
            <span className="text-[#e6edf3]">CPU only</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LabTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#e6edf3] mb-2">Experiments</h2>
        <p className="text-sm text-[#8b949e]">
          Interactive visualizations and experiments from the OpceanAI lab.
        </p>
      </div>

      <RunnerVisualizer />
      <TrainingVisualizer />
    </div>
  )
}
