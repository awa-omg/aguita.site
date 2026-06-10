export type AgentType = "command" | "knowledge" | "web" | "chat" | "tool"

export interface AgentResult {
  agent: AgentType
  response: string
  toolUsed?: string
  skipModel?: boolean
}

export function classifyIntent(message: string): AgentType {
  const trimmed = message.trim().toLowerCase()

  // Command patterns (highest priority)
  if (trimmed.startsWith("/")) {
    return "command"
  }

  // Tool/navigation patterns
  const toolPatterns = [
    /^(show|navigate|go to|open|switch to|display|bring up|take me to)/,
    /^(scroll|find|search for|locate|where is)/,
    /^(highlight|point to|show me)/,
  ]
  if (toolPatterns.some(p => p.test(trimmed))) {
    return "tool"
  }

  // Web search patterns
  const webPatterns = [
    /^(search web|web search|google|find online|what is the latest|news about)/,
    /^(search the internet|look up|research)/,
  ]
  if (webPatterns.some(p => p.test(trimmed))) {
    return "web"
  }

  // Knowledge patterns (specific keywords about awa/projects)
  const knowledgeKeywords = [
    "doki", "yuuki", "yumo", "eliza", "tos", "ixari", "opceanai",
    "awa", "aguita", "portfolio", "project", "repo", "model",
    "paper", "research", "container", "android", "ai", "training",
    "redmi", "zero budget", "cloud", "open source",
  ]
  if (knowledgeKeywords.some(k => trimmed.includes(k))) {
    return "knowledge"
  }

  // Default to chat (requires AI model)
  return "chat"
}

export function getAgentPriority(agent: AgentType): number {
  const priorities: Record<AgentType, number> = {
    command: 1,
    tool: 2,
    knowledge: 3,
    web: 4,
    chat: 5,
  }
  return priorities[agent] || 5
}
