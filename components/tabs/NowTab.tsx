"use client"

import { motion } from "framer-motion"
import { Activity, GitCommit, Clock, MapPin, Music, Zap, Radio, Terminal, TrendingUp } from "lucide-react"

const nowData = {
  workingOn: {
    project: "Doki 0.10",
    description: "Adding Podman support, Kubernetes CRI, and native macOS",
    progress: 65,
  },
  lastCommit: {
    message: "feat: add doki-os kernel custom build",
    repo: "OpceanAI/Doki",
    time: "2 hours ago",
  },
  streak: 365,
  location: "Remote",
  setup: [
    { name: "Redmi 12", icon: "📱", category: "Phone" },
    { name: "Termux", icon: "📟", category: "Terminal" },
    { name: "Neovim", icon: "📝", category: "Editor" },
    { name: "Go 1.22", icon: "🐹", category: "Language" },
    { name: "Python 3.11", icon: "🐍", category: "Language" },
    { name: "Unsloth", icon: "🦥", category: "ML" },
  ],
  recentActivity: [
    { type: "commit", message: "fix: resolve LD_PRELOAD issue in Termux", repo: "Doki", time: "2h ago" },
    { type: "train", message: "Checkpoint 2000 reached — loss: 1.69", repo: "yuuki-training", time: "1d ago" },
    { type: "paper", message: "Published Imprint Theory on Zenodo", repo: "papers", time: "3d ago" },
    { type: "release", message: "Doki v0.9.3 stable released", repo: "Doki", time: "1w ago" },
  ],
}

export function NowTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#e6edf3] mb-2">Now</h2>
        <p className="text-sm text-[#8b949e]">
          What I'm currently working on, using, and thinking about.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Working on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] card-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-[#388bfd]" />
            <h3 className="text-sm font-semibold text-[#e6edf3]">Working on</h3>
          </div>
          <div className="text-lg font-bold text-[#e6edf3] mb-1">{nowData.workingOn.project}</div>
          <div className="text-xs text-[#8b949e] mb-3">{nowData.workingOn.description}</div>
          <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#388bfd] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${nowData.workingOn.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="text-xs text-[#8b949e] mt-1">{nowData.workingOn.progress}% complete</div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] card-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-[#3fb950]" />
            <h3 className="text-sm font-semibold text-[#e6edf3]">Streak</h3>
          </div>
          <div className="text-3xl font-bold font-mono text-[#3fb950]">{nowData.streak}</div>
          <div className="text-xs text-[#8b949e]">days of contributions</div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: i < 12 ? '#26a641' : '#161b22',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Last commit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] card-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <GitCommit size={16} className="text-[#a371f7]" />
            <h3 className="text-sm font-semibold text-[#e6edf3]">Last commit</h3>
          </div>
          <div className="text-sm font-mono text-[#e6edf3] mb-1">
            <span className="text-[#3fb950]">feat:</span> {nowData.lastCommit.message}
          </div>
          <div className="text-xs text-[#8b949e]">
            {nowData.lastCommit.repo} · {nowData.lastCommit.time}
          </div>
        </motion.div>

        {/* Location & Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] card-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-[#f78166]" />
            <h3 className="text-sm font-semibold text-[#e6edf3]">Location</h3>
          </div>
          <div className="text-sm text-[#e6edf3] mb-3">{nowData.location}</div>
          <div className="text-xs text-[#8b949e] mb-2">Current setup</div>
          <div className="flex flex-wrap gap-2">
            {nowData.setup.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-[#161b22] rounded border border-[#30363d]"
              >
                <span>{item.icon}</span>
                <span className="text-[#e6edf3]">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 p-4 border border-[#30363d] rounded-md bg-[#0d1117]"
      >
        <div className="flex items-center gap-2 mb-4">
          <Radio size={16} className="text-[#388bfd]" />
          <h3 className="text-sm font-semibold text-[#e6edf3]">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {nowData.recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-[#388bfd]" />
              <div className="flex-1">
                <div className="text-sm text-[#e6edf3]">{activity.message}</div>
                <div className="text-xs text-[#8b949e]">
                  {activity.repo} · {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
