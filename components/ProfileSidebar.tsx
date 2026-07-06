"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Building2, Link as LinkIcon, Users } from "lucide-react"

interface ProfileSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-[280px] flex-shrink-0"
    >
      <div className="mb-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc7400c23d37c9ad79dd17854be3e1e3-07BbTYGInv9LEf0CGZm4XzB18yi2OC.jpg"
          alt="awa"
          width={280}
          height={280}
          className="rounded-full border border-[#30363d] w-full max-w-[280px]"
          priority
        />
      </div>

      <div className="mb-4">
        <h1 className="text-[22px] font-semibold text-[#e6edf3] leading-tight">awa</h1>
        <p className="text-[16px] text-[#8b949e]">awa-omg</p>
      </div>

      <p className="text-sm text-[#e6edf3] mb-4 leading-relaxed">
        Full Stack Developer &amp; AI Engineer. Creator of Doki, ToS, Yuuki, and Imprint Theory.
        Open source advocate and founder of OpceanAI.
      </p>

      <div className="flex gap-2 mb-4">
        <a
          href="https://github.com/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-[5px] text-sm font-medium text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] transition-all duration-200 text-center"
        >
          Follow
        </a>
        <a
          href="https://github.com/sponsors/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-[5px] text-sm font-medium text-white bg-[#238636] border border-[#2ea043] rounded-md hover:bg-[#2c974b] transition-all duration-200 text-center"
        >
          Sponsor
        </a>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-4">
        <Users size={16} />
        <span className="text-[#e6edf3] font-semibold">1</span>
        <span>follower</span>
        <span className="mx-1">&middot;</span>
        <span className="text-[#e6edf3] font-semibold">20</span>
        <span>following</span>
      </div>

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
            className="text-[#58a6ff] hover:text-[#79c0ff] hover:underline transition-colors"
          >
            opceanai.com
          </a>
        </li>
      </ul>
    </motion.aside>
  )
}
