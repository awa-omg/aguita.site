"use client"

import { useState } from "react"

const OcticonSearch = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>
    <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
  </svg>
)

const OcticonStar = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.749.749 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
  </svg>
)

const OcticonFork = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
  </svg>
)

const repositories = [
  {
    name: "yuuki-training",
    description:
      "Training pipeline for Yuuki-82M — a small language model trained from scratch on a Redmi 12 smartphone with zero cloud budget.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    forks: 0,
    url: "https://github.com/YuuKi-OS/yuuki-training",
    updatedAt: "Updated Jun 2026",
  },
  {
    name: "Doki",
    description:
      "Universal container engine — OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 20,
    forks: 2,
    url: "https://github.com/OpceanAI/Doki",
    updatedAt: "Updated Jun 2026",
  },
  {
    name: "ToS",
    description:
      "Translation of Service — an open P2P protocol for moving and synchronizing structured data between any source and any destination in real-time, without a central broker.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 0,
    forks: 0,
    url: "https://github.com/OpceanAI/ToS",
    updatedAt: "Updated May 2026",
  },
  {
    name: "Shadow",
    description:
      "Local-first CLI for instant codebase intelligence. Point it at a file, folder, or running service and Shadow will tell you what the project does, how files connect, and where the risky parts are.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "https://github.com/OpceanAI/Shadow",
    updatedAt: "Updated Apr 2026",
  },
]

const languages = ["Python", "Go", "TypeScript", "C++", "Rust"]

export function RepositoriesTab() {
  const [search, setSearch] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")

  const filtered = repositories.filter((r) => {
    const q = search.toLowerCase()
    const matchSearch =
      r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    const matchLang =
      languageFilter === "all" || r.language === languageFilter
    return matchSearch && matchLang
  })

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <OcticonSearch />
          <input
            type="search"
            aria-label="Find a repository"
            placeholder="Find a repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ paddingLeft: "34px" }}
          />
        </div>

        {/* Language filter */}
        <select
          aria-label="Filter by language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="btn btn-default"
          style={{ cursor: "pointer" }}
        >
          <option value="all">Language</option>
          {languages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Repository list */}
      <ul
        aria-label="Repositories"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {filtered.length === 0 ? (
          <li
            style={{
              padding: "32px 0",
              textAlign: "center",
              fontSize: "14px",
              color: "var(--color-fg-muted)",
            }}
          >
            No repositories match your search.
          </li>
        ) : (
          filtered.map((repo, i) => (
            <li
              key={repo.name}
              style={{
                padding: "24px 0",
                borderTop: i > 0
                  ? "1px solid var(--color-border-muted)"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name + badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "var(--color-accent-fg)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
                      onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
                    >
                      {repo.name}
                    </a>
                    <span className="Label Label--secondary">Public</span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--color-fg-muted)",
                      margin: "0 0 8px",
                      lineHeight: "1.5",
                      maxWidth: "600px",
                    }}
                  >
                    {repo.description}
                  </p>

                  {/* Meta row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "12px",
                      color: "var(--color-fg-muted)",
                      flexWrap: "wrap",
                    }}
                  >
                    {repo.language && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span
                          aria-label={`Written in ${repo.language}`}
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: repo.languageColor,
                            display: "inline-block",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <a
                        href={`${repo.url}/stargazers`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "var(--color-fg-muted)",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-accent-fg)" }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-fg-muted)" }}
                      >
                        <OcticonStar />
                        {repo.stars}
                      </a>
                    )}
                    {repo.forks > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <OcticonFork />
                        {repo.forks}
                      </span>
                    )}
                    <span>{repo.updatedAt}</span>
                  </div>
                </div>

                {/* Star button */}
                <button
                  className="btn btn-default btn-sm"
                  style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <OcticonStar />
                  Star
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
