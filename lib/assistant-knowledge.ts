export interface KnowledgeEntry {
  id: string
  category: "project" | "philosophy" | "paper" | "skill" | "contact" | "about"
  title: string
  content: string
  keywords: string[]
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "doki-overview",
    category: "project",
    title: "Doki Container Engine",
    content: "Doki is a universal container engine for Android that runs OCI containers without root access. It's only 13MB and supports 12 isolation levels. Built because Docker doesn't work on mobile devices. Uses the host kernel directly for maximum efficiency. 20+ stars on GitHub.",
    keywords: ["doki", "container", "docker", "android", "root", "oci", "engine", "mobile"]
  },
  {
    id: "yuuki-overview",
    category: "project",
    title: "Yuuki AI Models",
    content: "Yuuki is a family of 'honest' AI models trained entirely on a Redmi 12 smartphone with zero cloud budget. Uses GPT-2 architecture with 82M parameters. The best checkpoint was achieved on mobile hardware without expensive GPUs. Named after 'courage' in Japanese.",
    keywords: ["yuuki", "ai", "model", "training", "redmi", "mobile", "gpt-2", "honest", "courage"]
  },
  {
    id: "opceanai-philosophy",
    category: "philosophy",
    title: "OpceanAI Philosophy",
    content: "OpceanAI believes in zero cloud budget, training AI on modest hardware, and open source everything. The cloud is just someone else's computer. Why pay for cloud when you can run locally? Democratize AI for everyone. Built by awa.",
    keywords: ["opceanai", "philosophy", "cloud", "budget", "open source", "local", "democratize"]
  },
  {
    id: "yumo-overview",
    category: "project",
    title: "Yumo",
    content: "Yumo is a mathematical reasoning model focused on solving complex math problems. Part of the OpceanAI model family. Trained with zero cloud budget on mobile hardware.",
    keywords: ["yumo", "math", "mathematical", "reasoning", "model", "ai"]
  },
  {
    id: "eliza-overview",
    category: "project",
    title: "ELIZA",
    content: "ELIZA is an edge AI model designed to run on the smallest devices. Part of the OpceanAI family. Can run on phones, IoT devices, and embedded systems with minimal resources.",
    keywords: ["eliza", "edge", "iot", "embedded", "small", "model", "ai"]
  },
  {
    id: "tos-overview",
    category: "project",
    title: "ToS (P2P Sync)",
    content: "ToS is a peer-to-peer synchronization protocol. No central servers needed. Data syncs directly between devices. Open source and built with zero cloud dependency.",
    keywords: ["tos", "p2p", "sync", "peer", "protocol", "decentralized"]
  },
  {
    id: "ixari-overview",
    category: "project",
    title: "Ixari Corpus",
    content: "Ixari is a 140GB multilingual corpus for training language models. Open dataset created by awa. Used to train Yuuki and other models.",
    keywords: ["ixari", "corpus", "dataset", "multilingual", "140gb", "training"]
  },
  {
    id: "imprint-theory",
    category: "paper",
    title: "Imprint Theory",
    content: "Imprint Theory is awa's research on how AI models can be trained to be 'honest' and avoid hallucinations. Published research paper. Part of the OpceanAI research program.",
    keywords: ["imprint", "theory", "honest", "hallucination", "research", "paper"]
  },
  {
    id: "awa-about",
    category: "about",
    title: "About awa",
    content: "awa (aguita) is a full-stack developer and AI engineer. Founder of OpceanAI. Creator of Doki, Yuuki, Yumo, ELIZA, ToS, and Ixari. Passionate about chess, programming, music, and democratizing AI. Trains AI models on phones with zero cloud budget.",
    keywords: ["awa", "aguita", "about", "developer", "engineer", "creator", "founder"]
  },
  {
    id: "contact-info",
    category: "contact",
    title: "Contact Information",
    content: "Email: aguitachan3@gmail.com | GitHub: @awa-omg | Website: aguita.site | Open to collaborations and interesting projects.",
    keywords: ["contact", "email", "github", "website", "collaborate"]
  },
  {
    id: "tech-stack",
    category: "skill",
    title: "Tech Stack",
    content: "awa uses: Python, Go, Rust, TypeScript, React, Next.js, Docker, Kubernetes, PyTorch, TensorFlow, ONNX, WebGPU. Specializes in edge AI, mobile development, and container technology.",
    keywords: ["tech", "stack", "python", "go", "rust", "typescript", "react", "pytorch"]
  },
  {
    id: "zero-budget",
    category: "philosophy",
    title: "Zero Cloud Budget",
    content: "Why pay for cloud when you can build it yourself? awa trains models on Redmi 12, runs containers on Android, and builds everything with zero cloud spending. Open source is the way.",
    keywords: ["zero", "budget", "cloud", "cheap", "free", "redmi", "phone"]
  }
]

export function searchKnowledge(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/)
  const matches = KNOWLEDGE_BASE.filter(entry =>
    entry.keywords.some(k => words.includes(k) || query.toLowerCase().includes(k))
  )
  return matches.slice(0, 3).map(m => `[${m.category.toUpperCase()}] ${m.title}: ${m.content}`)
}

export function getAllKeywords(): string[] {
  return [...new Set(KNOWLEDGE_BASE.flatMap(k => k.keywords))]
}
