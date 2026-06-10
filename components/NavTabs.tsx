"use client"

import { BookMarked, GitBranch, Brain, Star, FileText, Mail, Building2, FlaskConical, Clock } from "lucide-react"

interface NavTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "overview", label: "Overview", icon: BookMarked },
  { id: "repositories", label: "Repositories", icon: GitBranch, count: 4 },
  { id: "models", label: "Models", icon: Brain, count: 20 },
  { id: "papers", label: "Papers", icon: FileText, count: 3 },
  { id: "opceanai", label: "OpceanAI", icon: Building2 },
  { id: "lab", label: "Lab", icon: FlaskConical },
  { id: "now", label: "Now", icon: Clock },
  { id: "stars", label: "Stars", icon: Star },
  { id: "contact", label: "Contact", icon: Mail },
]

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <nav className="border-b border-[#21262d] mb-4 overflow-x-auto sticky top-16 z-40 bg-[#0d1117]/95 backdrop-blur-sm">
      <ul className="flex gap-0 -mb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap hover:text-[#e6edf3] ${
                  isActive
                    ? "text-[#e6edf3] border-[#f78166]"
                    : "text-[#8b949e] border-transparent hover:border-[#30363d]"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#f78166]" : ""} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 text-xs rounded-full transition-colors ${
                    isActive ? "bg-[#30363d] text-[#e6edf3]" : "bg-[#21262d] text-[#8b949e]"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
