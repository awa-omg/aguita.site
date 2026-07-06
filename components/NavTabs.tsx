"use client"

import { motion } from "framer-motion"
import { BookMarked, GitBranch, Package, FlaskConical, Mail } from "lucide-react"

interface NavTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "overview", label: "Overview", icon: BookMarked },
  { id: "repositories", label: "Repositories", icon: GitBranch, count: 4 },
  { id: "products", label: "Products", icon: Package, count: 3 },
  { id: "research", label: "Research", icon: FlaskConical, count: 9 },
  { id: "contact", label: "Contact", icon: Mail },
]

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <nav className="border-b border-[#3d444d] mb-4 overflow-x-auto sticky top-14 z-40 bg-[#0d1117]">
      <ul className="flex gap-0 -mb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-[#f0f6fc] border-[#f78166]"
                    : "text-[#9198a1] border-transparent hover:text-[#f0f6fc] hover:border-[#3d444d]"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#f78166]" : ""} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                    isActive ? "bg-[#3d444d] text-[#f0f6fc]" : "bg-[#151b23] text-[#9198a1]"
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
