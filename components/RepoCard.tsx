import * as React from "react"

const OcticonRepo = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
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

export interface RepoCardProps {
  name: string
  description: string
  language?: string
  languageColor?: string
  stars?: number
  forks?: number
  url: string
  starUrl?: string
  isPublic?: boolean
}

export function RepoCard({
  name,
  description,
  language,
  languageColor = "#3572A5",
  stars = 0,
  forks = 0,
  url,
  starUrl,
  isPublic = true,
}: RepoCardProps) {
  return (
    /* Exact dimensions of github.com pinned-item card */
    <div
      className="Box"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        minHeight: "120px",
      }}
    >
      {/* Row 1: icon + repo name + visibility badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <OcticonRepo />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-accent-fg)",
            textDecoration: "none",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
        >
          {name}
        </a>
        <span
          className="Label Label--secondary"
          style={{ flexShrink: 0, fontSize: "12px" }}
        >
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* Row 2: description */}
      <p
        style={{
          fontSize: "12px",
          color: "var(--color-fg-muted)",
          lineHeight: "1.5",
          margin: "0 0 16px",
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {description}
      </p>

      {/* Row 3: language + stars + forks */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "12px",
          color: "var(--color-fg-muted)",
        }}
      >
        {language && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              aria-label={`Written in ${language}`}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: languageColor,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {language}
          </span>
        )}
        {stars > 0 && (
          <a
            href={starUrl ?? `${url}/stargazers`}
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
            aria-label={`${stars} stars`}
          >
            <OcticonStar />
            {stars}
          </a>
        )}
        {forks > 0 && (
          <span
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            aria-label={`${forks} forks`}
          >
            <OcticonFork />
            {forks}
          </span>
        )}
      </div>
    </div>
  )
}
