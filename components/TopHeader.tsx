"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"

/* GitHub Octicons — inline SVG, 16px, stroke-free fill paths */
const OcticonMarkGithub = () => (
  <svg aria-hidden="true" height="32" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" style={{ fill: "var(--color-header-logo)" }}>
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
)

const OcticonSearch = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{ fill: "rgba(255,255,255,0.5)", position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)" }}>
    <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
  </svg>
)

const OcticonStar = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{ fill: "currentColor" }}>
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.749.749 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
  </svg>
)

export function TopHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault()
        document.getElementById("global-search")?.focus()
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [])

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        height: "62px",
        padding: "0 16px",
        backgroundColor: "var(--color-header-bg)",
      }}
      role="banner"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          gap: "16px",
        }}
      >
        {/* Left: logo + search */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: "1 1 0", minWidth: 0 }}>
          {/* GitHub mark */}
          <a
            href="/"
            aria-label="awa — Home"
            style={{ display: "flex", alignItems: "center", flexShrink: 0, color: "var(--color-header-logo)" }}
          >
            <OcticonMarkGithub />
          </a>

          {/* Search bar — exact GitHub header search dimensions */}
          <div style={{ position: "relative", flex: 1, maxWidth: "280px" }} className="header-search-hidden-mobile">
            <OcticonSearch />
            <input
              id="global-search"
              type="search"
              autoComplete="off"
              aria-label="Search"
              placeholder="Search or jump to..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "28px",
                padding: "3px 8px 3px 30px",
                fontSize: "14px",
                lineHeight: "20px",
                color: "var(--color-header-logo)",
                backgroundColor: "var(--color-header-search-bg)",
                border: "1px solid var(--color-header-search-border)",
                borderRadius: "6px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-canvas-default)"
                e.currentTarget.style.color = "var(--color-fg-default)"
                e.currentTarget.style.borderColor = "var(--color-accent-fg)"
                e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-accent-muted)"
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-header-search-bg)"
                e.currentTarget.style.color = "var(--color-header-logo)"
                e.currentTarget.style.borderColor = "var(--color-header-search-border)"
                e.currentTarget.style.boxShadow = "none"
              }}
            />
            <kbd
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "0 4px",
                fontSize: "11px",
                lineHeight: "16px",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                fontFamily: "inherit",
                background: "none",
                pointerEvents: "none",
              }}
            >
              /
            </kbd>
          </div>

          {/* Nav links — visible on md+ */}
          <nav aria-label="Global" className="header-nav-hidden-mobile">
            <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, gap: 0 }}>
              {["Product", "Community", "Research"].map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0 16px",
                      height: "62px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      transition: "color 80ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff" }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: controls — desktop shows GitHub + Sponsor, mobile only shows theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
          {/* Theme toggle — always visible */}
          <ThemeToggle />

          {/* Divider — hidden on mobile */}
          <div
            className="header-cta-hidden-mobile"
            style={{
              width: "1px",
              height: "24px",
              backgroundColor: "rgba(255,255,255,0.15)",
              margin: "0 4px",
            }}
            aria-hidden="true"
          />

          {/* Star CTA — hidden on mobile */}
          <a
            href="https://github.com/awa-omg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm header-cta-hidden-mobile"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.9)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.15)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)" }}
          >
            <OcticonStar />
            <span>GitHub</span>
          </a>

          {/* Sponsor — hidden on mobile */}
          <a
            href="https://github.com/sponsors/awa-omg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm header-cta-hidden-mobile"
          >
            Sponsor
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .header-search-hidden-mobile { display: none !important; }
          .header-nav-hidden-mobile    { display: none !important; }
          .header-cta-hidden-mobile    { display: none !important; }
        }
      `}</style>
    </header>
  )
}
