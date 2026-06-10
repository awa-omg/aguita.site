"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal } from "lucide-react"

interface TerminalOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (tab: string) => void
}

const COMMANDS: Record<string, (args: string[]) => string | string[]> = {
  help: () => [
    "Available commands:",
    "  ls              - List all sections",
    "  cd <section>    - Navigate to a section",
    "  cat <file>      - Display file content",
    "  whoami          - Display user info",
    "  neofetch        - Display system info",
    "  git log         - Show recent activity",
    "  clear           - Clear terminal",
    "  exit            - Close terminal",
  ],
  ls: () => [
    "overview/    - Main dashboard with stats and pinned projects",
    "repositories/ - GitHub repositories",
    "models/      - Hugging Face models and datasets",
    "papers/      - Research publications",
    "opceanai/    - Organization page",
    "lab/         - Experiments and visualizations",
    "now/         - Current status and activity",
    "stars/       - Starred repositories",
    "contact/     - Contact information",
  ],
  whoami: () => [
    "awa - Full Stack Developer & AI Engineer",
    "Founder of OpceanAI",
    "Creator of Doki, Yuuki, Yumo, ELIZA",
    "Open source advocate and researcher",
  ],
  neofetch: () => [
    "                   -`                    awa@opceanai",
    "                  .o+`                   ----------------",
    "                 `ooo/                   OS: Open Source",
    "                `+oooo:                 Kernel: AI/ML",
    "               `+oooooo:                Uptime: 3+ years",
    "               -+oooooo+:               Shell: Doki",
    "             `/:-:++oooo+:             DE: Termux",
    "            `/++++/+++++++:            WM: Neovim",
    "           `/++++++++++++++:           CPU: Snapdragon 685",
    "          `/+++ooooooooooooo/`        GPU: Mobile GPU",
    "         ./ooosssso++osssssso+`      Memory: 6GB RAM",
    "        .oossssso-````/ossssss+`      Languages: Python, Go, Rust, TypeScript",
    "       -osssssso.      :ssssssso.     Projects: 20+ models, 4 repos, 3 papers",
    "      :osssssss/        osssso+++.    ",
    "     /ossssssss/        +ssssooo/-    ",
    "   `/ossssso+/:-        -:/+osssso+-  ",
    "  `+sso+:-`                 `.-/+oso: ",
    " `++:.                           `-/+",
    " .`                                 `/",
  ],
  "git log": () => [
    "commit 05ea1a28 (HEAD -> master, origin/master)",
    "Author: awa <aguitachan3@gmail.com>",
    "Date:   Wed Jun 10 2026",
    "",
    "    feat: translate all content to english",
    "",
    "commit bcb5d72",
    "Author: awa <aguitachan3@gmail.com>",
    "Date:   Wed Jun 10 2026",
    "",
    "    feat: reorganize portfolio with new tabs, models, and opceanai landing page",
    "",
    "commit 2923e87",
    "Author: awa <aguitachan3@gmail.com>",
    "Date:   Wed Jun 10 2026",
    "",
    "    feat: update timeline with detailed OpceanAI history",
  ],
  cat: (args) => {
    const file = args[0]
    if (!file) return "Usage: cat <file>"
    
    const files: Record<string, string[]> = {
      "about.md": [
        "# About awa",
        "",
        "Full Stack Developer and AI Engineer.",
        "Creator of Doki (OCI containers on Android),",
        "ToS (P2P sync), Ixari (140GB multilingual corpus),",
        "Yuuki/Yumo/ELIZA models, and Imprint Theory.",
        "",
        "Open source advocate and founder of OpceanAI.",
        "Passionate about chess, programming, music,",
        "and democratizing AI for everyone.",
      ],
      "README.md": [
        "# awa",
        "",
        "> If you have to pay for something, why not build it yourself for free?",
        "",
        "## Stats",
        "- 20+ Models",
        "- 4 Repositories",
        "- 3 Papers",
        "- 12 Isolation Levels",
        "",
        "## Projects",
        "- Doki - Universal container engine",
        "- Yuuki - Honest conversational AI",
        "- Yumo - Mathematical reasoning",
        "- ELIZA - Edge AI model",
        "- ToS - P2P sync protocol",
        "- Ixari - Multilingual corpus",
        "",
        "## Contact",
        "- GitHub: @awa-omg",
        "- Email: aguitachan3@gmail.com",
        "- Web: aguita.site",
      ],
    }
    
    return files[file] || [`cat: ${file}: No such file or directory`]
  },
}

const NAVIGABLE_SECTIONS = [
  "overview", "repositories", "models", "papers", 
  "opceanai", "lab", "now", "stars", "contact"
]

export function TerminalOverlay({ isOpen, onClose, onNavigate }: TerminalOverlayProps) {
  const [history, setHistory] = useState<{ input: string; output: string[] }[]>([
    { input: "", output: [
      "OpceanAI Terminal v1.0.0",
      "Type 'help' for available commands.",
      "",
    ]}
  ])
  const [input, setInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ')
    const command = parts[0]
    const args = parts.slice(1)

    let output: string[] = []

    if (command === 'cd') {
      const section = args[0]
      if (NAVIGABLE_SECTIONS.includes(section)) {
        onNavigate(section)
        output = [`Navigated to ${section}`]
      } else {
        output = [`cd: ${section || ''}: No such directory`]
      }
    } else if (command === 'clear') {
      setHistory([{ input: "", output: [] }])
      setCommandHistory(prev => [...prev, cmd])
      setInput("")
      return
    } else if (command === 'exit') {
      onClose()
      return
    } else if (COMMANDS[command]) {
      const result = COMMANDS[command](args)
      output = Array.isArray(result) ? result : [result]
    } else if (command) {
      output = [`Command not found: ${command}. Type 'help' for available commands.`]
    }

    setHistory(prev => [...prev, { input: cmd, output }])
    if (command) {
      setCommandHistory(prev => [...prev, cmd])
    }
    setHistoryIndex(-1)
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex)
          setInput(commandHistory[commandHistory.length - 1 - newIndex])
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const availableCommands = Object.keys(COMMANDS)
      const matching = availableCommands.filter(c => c.startsWith(input))
      if (matching.length === 1) {
        setInput(matching[0])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl h-[500px] bg-[#0d1117] border border-[#30363d] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#8b949e]" />
                <span className="text-xs text-[#8b949e] font-mono">Terminal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f78166]" />
                <div className="w-3 h-3 rounded-full bg-[#e3b341]" />
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#3fb950] hover:bg-[#2ea043] transition-colors flex items-center justify-center"
                >
                  <X size={8} className="text-[#0d1117] opacity-0 hover:opacity-100" />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            <div
              ref={scrollRef}
              className="h-[calc(100%-40px)] overflow-y-auto p-4 font-mono text-sm"
            >
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  {entry.input && (
                    <div className="flex items-center gap-2 text-[#e6edf3]">
                      <span className="text-[#3fb950]">➜</span>
                      <span className="text-[#388bfd]">~</span>
                      <span>{entry.input}</span>
                    </div>
                  )}
                  {entry.output.map((line, j) => (
                    <div key={j} className="text-[#8b949e] pl-4">
                      {line}
                    </div>
                  ))}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 text-[#e6edf3]">
                <span className="text-[#3fb950]">➜</span>
                <span className="text-[#388bfd]">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-[#e6edf3] font-mono text-sm"
                  placeholder="Type a command..."
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
