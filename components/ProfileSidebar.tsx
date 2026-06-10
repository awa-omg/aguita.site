"use client"

import Image from "next/image"
import { MapPin, Building2, Link as LinkIcon, Users, ChevronRight, ChevronDown, FileText, Folder, FolderOpen, GitBranch, Brain, Star, Mail, FlaskConical, Clock, BookMarked } from "lucide-react"
import { useState } from "react"

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
      <button
        onClick={() => item.tab && onTabChange(item.tab)}
        className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left transition-all duration-150 ${
          isActive 
            ? "bg-[#388bfd]/10 text-[#e6edf3]" 
            : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isActive && (
          <div className="absolute left-0 w-[2px] h-5 bg-[#388bfd] rounded-r" />
        )}
        <Icon size={14} className={isActive ? "text-[#388bfd]" : "text-[#8b949e]"} />
        <span className="text-[13px] truncate">{item.name}</span>
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all duration-150"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isOpen ? (
          <ChevronDown size={12} className="text-[#8b949e]" />
        ) : (
          <ChevronRight size={12} className="text-[#8b949e]" />
        )}
        <Icon size={14} className="text-[#e3b341]" />
        <span className="text-[13px] font-medium">{item.name}</span>
      </button>
      {isOpen && item.children && (
        <div>
          {item.children.map((child, i) => (
            <FileTreeItem
              key={i}
              item={child}
              activeTab={activeTab}
              onTabChange={onTabChange}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <aside className="w-full md:w-[296px] flex-shrink-0">
      {/* Avatar */}
      <div className="mb-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc7400c23d37c9ad79dd17854be3e1e3-07BbTYGInv9LEf0CGZm4XzB18yi2OC.jpg"
          alt="awa"
          width={296}
          height={296}
          className="rounded-full border border-[#30363d] w-full max-w-[296px]"
          priority
        />
      </div>

      {/* Name */}
      <div className="mb-4">
        <h1 className="text-[24px] font-semibold text-[#e6edf3] leading-tight">awa</h1>
        <p className="text-[20px] font-light text-[#8b949e]">awa-omg</p>
      </div>

      {/* Bio */}
      <p className="text-[#e6edf3] text-sm mb-4">
        Full Stack Developer and AI Engineer. Creator of Doki (OCI containers on Android), ToS (P2P sync), Ixari (140GB multilingual corpus), Yuuki/Yumo/ELIZA models, and Imprint Theory. Open source advocate and founder of OpceanAI. Passionate about chess, programming, music, and democratizing AI for everyone.
      </p>

      {/* Follow button / Sponsor */}
      <div className="flex gap-2 mb-4">
        <a
          href="https://github.com/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-[5px] text-sm font-medium bg-[#21262d] text-[#c9d1d9] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#8b949e] transition-all duration-200 text-center card-glow"
        >
          Follow
        </a>
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

      {/* Stats */}
      <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-4">
        <Users size={16} />
        <span className="text-[#e6edf3] font-semibold">1</span>
        <span>follower</span>
        <span className="mx-1">·</span>
        <span className="text-[#e6edf3] font-semibold">20</span>
        <span>following</span>
      </div>

      {/* Info */}
      <ul className="space-y-1 text-sm mb-6">
        <li className="flex items-center gap-2 text-[#8b949e]">
          <Building2 size={16} className="flex-shrink-0" />
          <span className="text-[#e6edf3]">OpceanAI</span>
        </li>
        <li className="flex items-center gap-2 text-[#8b949e]">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-[#e6edf3]">Remote</span>
        </li>
        <li className="flex items-center gap-2 text-[#8b949e]">
          <LinkIcon size={16} className="flex-shrink-0" />
          <a 
            href="https://opceanai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6edf3] hover:text-[#388bfd] hover:underline transition-colors"
          >
            opceanai.com
          </a>
        </li>
      </ul>

      {/* IDE File Explorer */}
      <div className="border border-[#30363d] rounded-md overflow-hidden">
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
      </div>
    </aside>
  )
}
