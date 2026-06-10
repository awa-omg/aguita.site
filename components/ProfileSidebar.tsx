"use client"

import Image from "next/image"
import { MapPin, Link as LinkIcon, Building2, Users } from "lucide-react"
import { BadgesSection } from "./BadgesSection"

const organizations = [
  {
    name: "OpceanAI",
    href: "https://github.com/OpceanAI",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/227894459-2oQ1baq2VgHBM9rxZMomnFNe2r9Rn7.jpeg"
  },
  {
    name: "Koe-chat",
    href: "https://github.com/Koe-chat",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/262720249-JRsnKEbwow4EHvSpH1cKzbgp5WapeX.jpeg"
  },
  {
    name: "YuuKi-OS",
    href: "https://github.com/YuuKi-OS",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/245765428-eThYIv5iIR2dR98QxF2JzFND9f2whK.jpeg"
  }
]

export function ProfileSidebar() {
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
          className="flex-1 px-4 py-[5px] text-sm font-medium bg-[#21262d] text-[#c9d1d9] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#8b949e] transition-colors text-center"
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
      <ul className="space-y-1 text-sm">
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
            className="text-[#e6edf3] hover:text-[#388bfd] hover:underline"
          >
            opceanai.com
          </a>
        </li>
      </ul>

      {/* Badges/Achievements */}
      <BadgesSection />

      {/* Organizations */}
      <div className="mt-6 pt-4 border-t border-[#21262d]">
        <h2 className="text-xs font-semibold text-[#8b949e] mb-2">Organizations</h2>
        <div className="flex gap-1 flex-wrap">
          {organizations.map((org) => (
            <a 
              key={org.name}
              href={org.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80"
              title={org.name}
            >
              <Image
                src={org.image}
                alt={org.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded border border-[#30363d]"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
