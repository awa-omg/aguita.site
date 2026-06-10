export type AgentType = "command" | "knowledge" | "web" | "chat" | "tool"

export function classifyIntent(message: string): AgentType {
  const trimmed = message.trim()
  const lower = trimmed.toLowerCase()

  // 1. Commands (highest priority) - starts with /
  if (trimmed.startsWith("/")) {
    return "command"
  }

  // 2. Web search patterns
  if (/^(search web|web search|google it|find online|latest news|news about|search the internet)/i.test(lower)) {
    return "web"
  }

  // 3. Tool/navigation patterns - specific actions
  if (/^(navigate to|go to tab|switch to tab|cd |open tab)/i.test(lower)) {
    return "tool"
  }
  if (/^(scroll to|scroll down|scroll up)/i.test(lower)) {
    return "tool"
  }
  if (/^(highlight|show me the repo|find the repo|where is the repo)/i.test(lower)) {
    return "tool"
  }
  if (/^(open (github|email|whatsapp|telegram|link|website))/i.test(lower)) {
    return "tool"
  }
  if (/^(copy email|send email|contact)/i.test(lower)) {
    return "tool"
  }

  // 4. Knowledge patterns - questions about awa's work
  const knowledgeKeywords = [
    "doki", "yuuki", "yumo", "eliza", "tos", "ixari", "opceanai",
    "awa", "aguita", "portfolio", "project", "repo", "model",
    "paper", "research", "container", "android", "training",
    "redmi", "zero budget", "cloud budget", "open source",
    "who are you", "who is awa", "what is opcean", "what is doki",
    "what is yuuki", "what is yumo", "what is eliza",
    "tell me about", "explain", "how does", "how was",
    "tech stack", "skills", "experience",
  ]
  if (knowledgeKeywords.some(k => lower.includes(k))) {
    return "knowledge"
  }

  // 5. Default to chat (requires AI model)
  return "chat"
}
