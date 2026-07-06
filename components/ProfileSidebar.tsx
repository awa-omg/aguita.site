"use client"

import Image from "next/image"

/* -------------------------------------------------------
   Octicon SVG paths — 16px, filled, 1:1 with github.com
   ------------------------------------------------------- */
const OcticonOrganization = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5A1.75 1.75 0 0 1 10.25 16h-8.5A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM3.5 6.25a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75Zm.75 2.25h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5ZM6.25 3.5h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5ZM7 6.25a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1A.75.75 0 0 1 7 6.25Zm.75 2.25h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5ZM3.5 3.5h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5Z" />
  </svg>
)

const OcticonLocation = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z" />
  </svg>
)

const OcticonLink = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 2 2 0 0 0 2.83 0l2.5-2.5a2 2 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a2 2 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 2 2 0 0 0-2.83 0l-2.5 2.5a2 2 0 0 0 0 2.83Z" />
  </svg>
)

const OcticonPeople = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.83.75.75 0 0 1-.565-.552A3.507 3.507 0 0 0 11 9.5l-.5.001a.75.75 0 0 1-.013-1.5H11c.375 0 .728.102 1.03.283A4.001 4.001 0 0 0 7.604 8a.75.75 0 0 1-.498-1.333A3.5 3.5 0 0 1 5.5 5.5a3.5 3.5 0 0 1 .894-2.328 4.5 4.5 0 0 0 1.444 1.64A2 2 0 1 0 11 6a2 2 0 0 0-.589-.085A.75.75 0 0 1 11 4Zm-5.5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  </svg>
)

const s: Record<string, React.CSSProperties> = {
  sidebar: {
    width: "296px",
    flexShrink: 0,
  },
  avatar: {
    display: "block",
    width: "100%",
    maxWidth: "296px",
    borderRadius: "50%",
    border: "1px solid var(--color-border-default)",
    marginBottom: "16px",
  },
  h1: {
    fontSize: "26px",
    fontWeight: 600,
    lineHeight: 1.25,
    color: "var(--color-fg-default)",
    marginBottom: "2px",
  },
  username: {
    fontSize: "20px",
    fontWeight: 300,
    lineHeight: 1.25,
    color: "var(--color-fg-muted)",
    marginBottom: "16px",
    display: "block",
  },
  bio: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "var(--color-fg-default)",
    marginBottom: "16px",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  followRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
    color: "var(--color-fg-muted)",
    marginBottom: "16px",
  },
  metaList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginBottom: "16px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "var(--color-fg-muted)",
    lineHeight: "24px",
  },
  metaText: {
    color: "var(--color-fg-default)",
  },
  accentLink: {
    color: "var(--color-accent-fg)",
    textDecoration: "none",
  },
  divider: {
    height: "1px",
    backgroundColor: "var(--color-border-muted)",
    border: "none",
    margin: "16px 0",
  },
  sectionLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--color-fg-default)",
    marginBottom: "8px",
  },
}

export function ProfileSidebar() {
  return (
    <aside style={s.sidebar} aria-label="Profile">
      {/* Avatar */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc7400c23d37c9ad79dd17854be3e1e3-07BbTYGInv9LEf0CGZm4XzB18yi2OC.jpg"
          alt="awa's profile photo"
          width={296}
          height={296}
          style={s.avatar}
          priority
        />
      </div>

      {/* Name + username */}
      <h1 style={s.h1}>awa</h1>
      <span style={s.username}>awa-omg</span>

      {/* Bio */}
      <p style={s.bio}>
        Full Stack Developer &amp; AI Engineer. Creator of Doki, ToS, Yuuki, and
        Imprint Theory. Open source advocate and founder of OpceanAI.
      </p>

      {/* Follow / Sponsor buttons */}
      <div style={s.buttonRow}>
        <a
          href="https://github.com/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-default"
          style={{ flex: 1, justifyContent: "center" }}
        >
          Follow
        </a>
        <a
          href="https://github.com/sponsors/awa-omg"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-default"
          style={{ flex: 1, justifyContent: "center" }}
        >
          Sponsor
        </a>
      </div>

      {/* Follower / following counts */}
      <div style={s.followRow}>
        <OcticonPeople />
        <span>
          <a href="https://github.com/awa-omg?tab=followers" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-fg-default)", fontWeight: 600, textDecoration: "none" }}>
            1
          </a>
          {" "}
          <span>follower</span>
          {" "}&middot;{" "}
          <a href="https://github.com/awa-omg?tab=following" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-fg-default)", fontWeight: 600, textDecoration: "none" }}>
            20
          </a>
          {" "}
          <span>following</span>
        </span>
      </div>

      {/* Meta information list */}
      <ul style={s.metaList}>
        <li style={s.metaItem}>
          <OcticonOrganization />
          <span style={s.metaText}>OpceanAI</span>
        </li>
        <li style={s.metaItem}>
          <OcticonLocation />
          <span style={s.metaText}>Remote</span>
        </li>
        <li style={s.metaItem}>
          <OcticonLink />
          <a
            href="https://opceanai.com"
            target="_blank"
            rel="noopener noreferrer"
            style={s.accentLink}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
          >
            opceanai.com
          </a>
        </li>
      </ul>

      <hr style={s.divider} />

      {/* Skills as topic tags — no progress bars */}
      <div>
        <p style={s.sectionLabel}>Technologies</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {[
            "Go", "Python", "TypeScript", "Rust",
            "Linux", "OCI", "Docker", "WebAssembly",
            "LLMs", "Next.js", "Android",
          ].map((skill) => (
            <span key={skill} className="topic-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
