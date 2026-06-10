import { Search, Bell, Plus } from "lucide-react"

export function TopHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-[#30363d]/50">
      <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a href="/" className="text-[#e6edf3] hover:opacity-80 transition-opacity">
            <svg height="32" viewBox="0 0 16 16" width="32" fill="currentColor">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
          </a>

          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Type / to search"
                className="w-[280px] pl-9 pr-3 py-[5px] text-sm bg-[#0d1117]/80 border border-[#30363d] rounded-md text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all duration-200"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded">
                /
              </kbd>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-[#8b949e] hover:text-[#e6edf3] transition-colors hover:scale-110 duration-200">
            <Bell size={20} />
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-[#8b949e] hover:text-[#e6edf3] transition-colors">
            <Plus size={18} />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" />
            </svg>
          </button>
          <a href="https://github.com/awa-omg" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#30363d] hover:border-[#388bfd] hover:shadow-[0_0_10px_rgba(56,139,253,0.3)] transition-all duration-300">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc7400c23d37c9ad79dd17854be3e1e3-07BbTYGInv9LEf0CGZm4XzB18yi2OC.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}
