export const COMMANDS = {
  "/help": {
    description: "Show all available commands",
    example: "/help"
  },
  "/navigate": {
    description: "Navigate to a specific tab (overview, repos, models, papers, lab, now, stars, contact)",
    example: "/navigate lab"
  },
  "/search": {
    description: "Search the portfolio knowledge base",
    example: "/search doki"
  },
  "/web": {
    description: "Search the web using DuckDuckGo",
    example: "/web latest AI news"
  },
  "/repo": {
    description: "Show details about a specific repository",
    example: "/repo doki"
  },
  "/stats": {
    description: "Show portfolio statistics",
    example: "/stats"
  },
  "/clear": {
    description: "Clear chat history",
    example: "/clear"
  },
  "/terminal": {
    description: "Open the terminal overlay",
    example: "/terminal"
  },
  "/email": {
    description: "Copy email to clipboard or open email app",
    example: "/email"
  },
  "/github": {
    description: "Open awa's GitHub profile",
    example: "/github"
  },
  "/joke": {
    description: "Tell a coding joke",
    example: "/joke"
  },
  "/easter": {
    description: "Discover hidden secrets",
    example: "/easter"
  }
}

export function getHelpText(): string {
  return Object.entries(COMMANDS)
    .map(([cmd, info]) => `${cmd} - ${info.description}`)
    .join("\n")
}

export function parseCommand(input: string): { command: string; args: string } | null {
  if (!input.startsWith("/")) return null
  const parts = input.split(" ")
  const command = parts[0]
  const args = parts.slice(1).join(" ")
  return { command, args }
}

export const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "I told my computer I needed a break, and now it won't stop sending me Kit-Kats. 🍫",
  "Why do Java developers wear glasses? Because they don't C#! 👓",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
  "Why did the AI break up with the neural network? Too many layers of problems. 💔",
  "What do you call a nervous jQuery function? $( '.scared' ).hide(); 😱",
  "Why don't programmers like nature? It has too many bugs. 🌲",
  "I would tell you a UDP joke, but you might not get it. 📡"
]

export function getRandomJoke(): string {
  return JOKES[Math.floor(Math.random() * JOKES.length)]
}
