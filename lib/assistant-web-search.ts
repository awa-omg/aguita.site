export async function searchWeb(query: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
      { headers: { "Accept": "application/json" } }
    )
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    const abstract = data.AbstractText || data.Abstract || ""
    const related = data.RelatedTopics?.[0]?.Text || ""
    
    if (abstract) {
      return `🔍 Web result: ${abstract}`
    } else if (related) {
      return `🔍 Related: ${related}`
    } else {
      return `🔍 No web results found for "${query}". Try a different query.`
    }
  } catch (error) {
    console.error("Web search error:", error)
    return `🔍 Web search temporarily unavailable. But I can answer from my local knowledge! Ask me about awa's projects.`
  }
}

export async function searchLatestNews(topic: string): Promise<string> {
  return searchWeb(`${topic} latest news 2026`)
}

export async function searchDefinition(term: string): Promise<string> {
  return searchWeb(`what is ${term} definition`)
}
