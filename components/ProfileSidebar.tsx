"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Building2, Link as LinkIcon, Users, ChevronRight, ChevronDown, FileText, Folder, GitBranch, Brain, Star, Mail, FlaskConical, Clock, BookMarked } from "lucide-react"
import { useState } from "react"
import { GradientText } from "@/components/ui/GradientText"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { TypingEffect } from "@/components/ui/TypingEffect"

interface ProfileSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const fileTree = [
  {
    name: "README.md",
    icon: FileText,
    tab: "overview",
    isFile: true,
  },
  {
    name: "repos",
    icon: Folder,
    isFile: false,
    children: [
      { name: "yuuki-training", icon: GitBranch, tab: "repositories", isFile: true },
      { name: "Doki", icon: GitBranch, tab: "repositories", isFile: true },
      { name: "ToS", icon: GitBranch, tab: "repositories", isFile: true },
      { name: "Shadow", icon: GitBranch, tab: "repositories", isFile: true },
    ],
  },
  {
    name: "models",
    icon: Folder,
    isFile: false,
    children: [
      { name: "Yuuki", icon: Brain, tab: "models", isFile: true },
      { name: "Yumo", icon: Brain, tab: "models", isFile: true },
      { name: "ELIZA", icon: Brain, tab: "models", isFile: true },
      { name: "datasets", icon: Folder, tab: "models", isFile: true },
    ],
  },
  {
    name: "papers",
    icon: Folder,
    isFile: false,
    children: [
      { name: "Flux.md", icon: FileText, tab: "papers", isFile: true },
      { name: "Imprint-Theory.md", icon: FileText, tab: "papers", isFile: true },
      { name: "NHE.md", icon: FileText, tab: "papers", isFile: true },
    ],
  },
  {
    name: "OpceanAI",
    icon: Folder,
    tab: "opceanai",
    isFile: true,
  },
  {
    name: "lab",
    icon: Folder,
    isFile: false,
    children: [
      { name: "Runner-Viz", icon: FlaskConical, tab: "lab", isFile: true },
      { name: "Training-Graph", icon: FlaskConical, tab: "lab", isFile: true },
    ],
  },
  {
    name: "now",
    icon: Clock,
    tab: "now",
    isFile: true,
  },
  {
    name: "stars",
    icon: Star,
    tab: "stars",
    isFile: true,
  },
  {
    name: "contact.md",
    icon: Mail,
    tab: "contact",
    isFile: true,
  },
]

function FileTreeItem({ 
  item, 
  activeTab, 
  onTabChange, 
  depth = 0 
}: { 
  item: typeof fileTree[0]
  activeTab: string
  onTabChange: (tab: string) => void
  depth?: number
}) {
  const [isOpen, setIsOpen] = useState(true)
  const isActive = item.tab === activeTab
  const Icon = item.icon
  
  if (item.isFile) {
    return (
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => item.tab && onTabChange(item.tab)}
        className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition-all duration-150 relative ${
          isActive 
            ? "bg-[#388bfd]/10 text-[#e6edf3]" 
            : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute left-0 w-[2px] h-5 bg-gradient-to-b from-[#388bfd] to-[#00d4ff] rounded-r"
          />
        )}
        <Icon size={14} className={isActive ? "text-[#388bfd]" : "text-[#8b949e]"} />
        <span className="text-[13px] truncate">{item.name}</span>
      </motion.button>
    )
  }

  return (
    <div>
      <motion.button
        whileHover={{ x: 4 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all duration-150"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={12} className="text-[#8b949e]" />
        </motion.div>
        <Icon size={14} className="text-[#e3b341]" />
        <span className="text-[13px] font-medium">{item.name}</span>
      </motion.button>
      {isOpen && item.children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.children.map((child, i) => (
            <FileTreeItem
              key={i}
              item={child}
              activeTab={activeTab}
              onTabChange={onTabChange}
              depth={depth + 1}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full md:w-[296px] flex-shrink-0"
    >
      {/* Avatar with glow */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mb-4 relative group"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc7400c23d37c9ad79dd17854be3e1e3-07BbTYGInv9LEf0CGZm4XzB18yi2OC.jpg"
          alt="awa"
          width={296}
          height={296}
          className="rounded-full border border-[#30363d] w-full max-w-[296px] pulse-glow"
          priority
        />
        <div className="absolute inset-0 rounded-full bg-[#388bfd]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {/* Name with gradient */}
      <div className="mb-4">
        <GradientText className="text-[24px] font-semibold font-display leading-tight" as="h1">
          awa
        </GradientText>
        <p className="text-[20px] font-light text-[#8b949e]">awa-omg</p>
      </div>

      {/* Bio with typing effect */}
      <div className="text-[#e6edf3] text-sm mb-4">
        <TypingEffect
          text="Full Stack Developer and AI Engineer. Creator of Doki (OCI containers on Android), ToS (P2P sync), Ixari (140GB multilingual corpus), Yuuki/Yumo/ELIZA models, and Imprint Theory. Open source advocate and founder of OpceanAI."
          speed={20}
          delay={500}
        />
      </div>

      {/* Follow button / Sponsor */}
      <div className="flex gap-2 mb-4">
        <motion.a
          href="https://github.com/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-[5px] text-sm font-medium bg-[#21262d] text-[#c9d1d9] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#388bfd] hover:shadow-[0_0_20px_rgba(56,139,253,0.2)] transition-all duration-300 text-center"
        >
          Follow
        </motion.a>
        <div className="flex-shrink-0">
          <iframe 
            src="https://github.com/sponsors/awa-omg/button" 
            title="Sponsor awa-omg" 
            height="32" 
            width="114" 
            style={{ border: 0, borderRadius: '6px' }}
          />
        </div>
      </div>

      {/* Stats with animated counters */}
      <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-4">
        <Users size={16} />
        <span className="text-[#e6edf3] font-semibold">
          <AnimatedCounter value={1} duration={1} />
        </span>
        <span>follower</span>
        <span className="mx-1">·</span>
        <span className="text-[#e6edf3] font-semibold">
          <AnimatedCounter value={20} duration={1.5} />
        </span>
        <span>following</span>
      </div>

      {/* Info */}
      <ul className="space-y-1 text-sm mb-6">
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 text-[#8b949e]"
        >
          <Building2 size={16} className="flex-shrink-0" />
          <span className="text-[#e6edf3]">OpceanAI</span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-[#8b949e]"
        >
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-[#e6edf3]">Remote</span>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-[#8b949e]"
        >
          <LinkIcon size={16} className="flex-shrink-0" />
          <a 
            href="https://opceanai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6edf3] hover:text-[#388bfd] hover:underline transition-colors"
          >
            opceanai.com
          </a>
        </motion.li>
      </ul>

      {/* IDE File Explorer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="border border-[#30363d] rounded-md overflow-hidden glass-light"
      >
        <div className="px-3 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
          <BookMarked size={14} className="text-[#8b949e]" />
          <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Explorer</span>
        </div>
        <div className="py-2">
          <div className="px-3 py-1 text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
            awa-omg
          </div>
          <div className="space-y-0.5">
            {fileTree.map((item, i) => (
              <FileTreeItem
                key={i}
                item={item}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.aside>
  )
}
