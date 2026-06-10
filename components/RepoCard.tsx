import { Star, GitFork, Circle } from "lucide-react"

interface RepoCardProps {
  name: string
  description: string
  language?: string
  languageColor?: string
  stars?: number
  forks?: number
  url: string
  starUrl?: string
  isPublic?: boolean
}

export function RepoCard({
  name,
  description,
  language,
  languageColor = "#3572A5",
  stars = 0,
  forks = 0,
  url,
  starUrl,
  isPublic = true,
}: RepoCardProps) {
  return (
    <div className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#388bfd]/50 hover:shadow-[0_0_15px_rgba(56,139,253,0.15)] hover:bg-[#161b22] transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <svg className="w-4 h-4 text-[#8b949e] flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#388bfd] font-semibold text-sm hover:underline truncate relative group"
          >
            {name}
          </a>
        </div>
        <span className="text-xs text-[#8b949e] border border-[#30363d] rounded-full px-2 py-0.5 flex-shrink-0">
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      <p className="text-xs text-[#8b949e] mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center gap-4 text-xs text-[#8b949e]">
        {language && (
          <span className="flex items-center gap-1">
            <Circle size={12} fill={languageColor} stroke="none" />
            {language}
          </span>
        )}
        {stars > 0 && (
          <a 
            href={starUrl || `${url}/stargazers`} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#388bfd]"
            title="Star this repository"
          >
            <Star size={14} />
            {stars}
          </a>
        )}
        {forks > 0 && (
          <a href={`${url}/forks`} className="flex items-center gap-1 hover:text-[#388bfd]">
            <GitFork size={14} />
            {forks}
          </a>
        )}
      </div>
    </div>
  )
}
