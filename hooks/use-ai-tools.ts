export interface ToolCallbacks {
  navigate: (tab: string) => void
  scrollToSection: (section: string) => void
  highlightRepo: (name: string) => void
  openLink: (url: string) => void
  openApp: (type: "email" | "whatsapp" | "telegram", data?: string) => void
  copyToClipboard: (text: string) => void
  openTerminal: () => void
  setChatOpen: (open: boolean) => void
}

export const AVAILABLE_TABS = [
  "overview", "repositories", "models", "papers", 
  "opceanai", "lab", "now", "stars", "contact"
]

export function createToolExecutor(callbacks: ToolCallbacks) {
  return {
    navigate: (tab: string) => {
      const normalized = tab.toLowerCase().replace(/\s+/g, "")
      const matched = AVAILABLE_TABS.find(t => 
        t === normalized || 
        t.includes(normalized) || 
        normalized.includes(t)
      )
      if (matched) {
        callbacks.navigate(matched)
        return `Navigated to ${matched}`
      }
      return `Tab '${tab}' not found. Available: ${AVAILABLE_TABS.join(", ")}`
    },

    scrollToSection: (section: string) => {
      callbacks.scrollToSection(section)
      return `Scrolled to ${section}`
    },

    highlightRepo: (name: string) => {
      callbacks.highlightRepo(name.toLowerCase())
      return `Highlighted repository: ${name}`
    },

    openLink: (url: string) => {
      if (!url.startsWith("http")) {
        url = "https://" + url
      }
      callbacks.openLink(url)
      return `Opened ${url}`
    },

    openApp: (type: "email" | "whatsapp" | "telegram", data?: string) => {
      callbacks.openApp(type, data)
      return `Opened ${type}`
    },

    copyToClipboard: (text: string) => {
      callbacks.copyToClipboard(text)
      return `Copied to clipboard: ${text}`
    },

    openTerminal: () => {
      callbacks.openTerminal()
      return `Terminal opened. Press \` to toggle.`
    },

    closeChat: () => {
      callbacks.setChatOpen(false)
      return `Chat closed. Press Ctrl+Shift+A to reopen.`
    }
  }
}

export type ToolExecutor = ReturnType<typeof createToolExecutor>

export function detectToolUse(message: string): { tool: string; args: string } | null {
  const patterns = [
    { regex: /(?:navigate|go to|show me|switch to|open)\s+(?:the\s+)?(overview|repositories|repos|models|papers|opceanai|lab|now|stars|contact)/i, tool: "navigate" },
    { regex: /(?:scroll to|find|show)\s+(?:section\s+)?(.+)/i, tool: "scrollToSection" },
    { regex: /(?:highlight|show|where is|find)\s+(?:repo\s+)?(.+)/i, tool: "highlightRepo" },
    { regex: /(?:open|visit|go to)\s+(?:website\s+)?(https?:\/\/.+|github\.com\/.+|\w+\.\w+)/i, tool: "openLink" },
    { regex: /(?:copy|send)\s+(?:email\s+)?(?:to\s+)?(.+)/i, tool: "openApp" },
    { regex: /(?:open|show)\s+(?:terminal|console)/i, tool: "openTerminal" },
  ]

  for (const pattern of patterns) {
    const match = message.match(pattern.regex)
    if (match) {
      return { tool: pattern.tool, args: match[1] || "" }
    }
  }

  return null
}
