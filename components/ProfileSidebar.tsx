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
          className="rounded-full border border-default w-full max-w-[280px]"
          priority
        />
      </div>

      <div className="mb-4">
        <h1 className="text-[22px] font-semibold text-primary leading-tight">awa</h1>
        <p className="text-[16px] text-muted">awa-omg</p>
      </div>

      <p className="text-sm text-primary mb-4 leading-relaxed">
        Full Stack Developer &amp; AI Engineer. Creator of Doki, ToS, Yuuki, and Imprint Theory.
        Open source advocate and founder of OpceanAI.
      </p>

      <div className="flex gap-2 mb-4">
        <a
          href="https://github.com/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-default flex-1 text-center"
        >
          Follow
        </a>
        <a
          href="https://github.com/sponsors/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 text-center"
        >
          Sponsor
        </a>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted mb-4">
        <Users size={16} />
        <span className="text-primary font-semibold">1</span>
        <span>follower</span>
        <span className="mx-1">&middot;</span>
        <span className="text-primary font-semibold">20</span>
        <span>following</span>
      </div>

      <ul className="space-y-1 text-sm mb-6">
        <li className="flex items-center gap-2 text-muted">
          <Building2 size={16} className="flex-shrink-0" />
          <span className="text-primary">OpceanAI</span>
        </li>
        <li className="flex items-center gap-2 text-muted">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-primary">Remote</span>
        </li>
        <li className="flex items-center gap-2 text-muted">
          <LinkIcon size={16} className="flex-shrink-0" />
          <a
            href="https://opceanai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline transition-colors"
          >
            opceanai.com
          </a>
        </li>
      </ul>
    </motion.aside>
  )
}
