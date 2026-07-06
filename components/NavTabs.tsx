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
    <nav className="border-b border-default mb-4 overflow-x-auto sticky top-14 z-40 bg-canvas">
      <ul className="flex gap-0 -mb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`tab ${isActive ? "tab-active" : ""}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`badge ${isActive ? "bg-canvas-muted text-primary" : ""}`}>
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
