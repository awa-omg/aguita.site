"use client"

const OcticonMail = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
  </svg>
)

const OcticonGlobe = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)", flexShrink: 0 }}>
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75a9.64 9.64 0 0 0 1.363 4.177c.255.426.542.832.857 1.215.245-.296.551-.705.857-1.215A9.64 9.64 0 0 0 10.22 8.75Zm4.44-1.5a9.64 9.64 0 0 0-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 0 0-.857 1.215A9.64 9.64 0 0 0 5.78 7.25Zm-5.944 1.5H1.543a6.507 6.507 0 0 0 4.498 5.sreq Zm0-1.5a6.507 6.507 0 0 0-4.73 5.25H4.276A11.154 11.154 0 0 1 4.276 7.25Zm6.196 0c-.195.826-.329 1.726-.395 2.635a14.21 14.21 0 0 1 3.855.615A6.507 6.507 0 0 0 14.457 7.25Zm0 1.5h-2.725c.066.909.2 1.809.395 2.635a6.507 6.507 0 0 0 2.33-2.635Z" />
  </svg>
)

const OcticonLinkExternal = () => (
  <svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" style={{ fill: "currentColor" }}>
    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
  </svg>
)

/* Platform icon SVGs */
const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" style={{ fill: "var(--color-fg-default)" }}>
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
)

const profiles = [
  {
    label: "GitHub — awa-omg",
    username: "@awa-omg",
    url: "https://github.com/awa-omg",
    Icon: GitHubIcon,
  },
  {
    label: "GitHub — OpceanAI",
    username: "@OpceanAI",
    url: "https://github.com/OpceanAI",
    Icon: GitHubIcon,
  },
  {
    label: "GitLab",
    username: "@aguitauwu",
    url: "https://gitlab.com/aguitauwu",
    Icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: "#fc6d26" }}>
        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
      </svg>
    ),
  },
  {
    label: "Hugging Face — OpceanAI",
    username: "OpceanAI",
    url: "https://huggingface.co/OpceanAI",
    Icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <circle cx="12" cy="12" r="12" fill="#FFD21E" />
        <text x="12" y="17" textAnchor="middle" fontSize="13" style={{ fontFamily: "serif" }}>🤗</text>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    username: "@awa_omg",
    url: "https://twitter.com/awa_omg",
    Icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: "var(--color-fg-default)" }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Reddit",
    username: "u/agua_omg",
    url: "https://www.reddit.com/u/agua_omg",
    Icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: "#ff4500" }}>
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
      </svg>
    ),
  },
]

const emails = [
  { label: "Business",  email: "contact@opceanai.com" },
  { label: "OpceanAI", email: "opceanai@gmail.com" },
  { label: "Personal",  email: "aguitachan3@gmail.com" },
]

const websites = [
  { label: "OpceanAI", url: "https://opceanai.com" },
  { label: "Portfolio", url: "https://aguita.site" },
]

export function ContactTab() {
  return (
    <div style={{ maxWidth: "680px" }}>
      <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", marginBottom: "24px", lineHeight: "1.5" }}>
        Open to collaborations, research inquiries, and open source contributions.
        Preferred contact for business is email; for code-related topics, open a GitHub issue on the relevant repo.
      </p>

      {/* Sponsor */}
      <section aria-labelledby="sponsor-heading" style={{ marginBottom: "24px" }}>
        <h2
          id="sponsor-heading"
          style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)", marginBottom: "8px" }}
        >
          Support open source work
        </h2>
        <div
          className="Box"
          style={{ padding: "16px" }}
        >
          <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", margin: "0 0 12px" }}>
            Funding helps sustain development on Doki, Yuuki, and OpceanAI infrastructure.
          </p>
          <iframe
            src="https://github.com/sponsors/awa-omg/button"
            title="Sponsor awa-omg"
            height="32"
            width="114"
            style={{ border: 0, borderRadius: "6px", display: "block" }}
          />
        </div>
      </section>

      {/* Email */}
      <section aria-labelledby="email-heading" style={{ marginBottom: "24px" }}>
        <h2
          id="email-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "8px",
          }}
        >
          <OcticonMail />
          Email
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          {emails.map((item) => (
            <li key={item.email} style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <a
                href={`mailto:${item.email}`}
                style={{
                  fontSize: "14px",
                  color: "var(--color-accent-fg)",
                  fontFamily: "ui-monospace, monospace",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
              >
                {item.email}
              </a>
              <span style={{ fontSize: "12px", color: "var(--color-fg-muted)" }}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Websites */}
      <section aria-labelledby="websites-heading" style={{ marginBottom: "24px" }}>
        <h2
          id="websites-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "8px",
          }}
        >
          <OcticonGlobe />
          Websites
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          {websites.map((site) => (
            <li key={site.url} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "14px",
                  color: "var(--color-accent-fg)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
              >
                {site.url}
                <OcticonLinkExternal />
              </a>
              <span style={{ fontSize: "12px", color: "var(--color-fg-muted)" }}>{site.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Profiles */}
      <section aria-labelledby="profiles-heading">
        <h2
          id="profiles-heading"
          style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)", marginBottom: "8px" }}
        >
          Profiles
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "8px",
          }}
        >
          {profiles.map((p) => (
            <li key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="Box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  textDecoration: "none",
                  transition: "border-color 80ms ease, background-color 80ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = "var(--color-canvas-subtle)"
                  el.style.borderColor = "var(--color-border-default)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = "var(--color-canvas-default)"
                  el.style.borderColor = "var(--color-border-default)"
                }}
              >
                <p.Icon />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", color: "var(--color-fg-default)", fontWeight: 500, lineHeight: 1.3 }}>
                    {p.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-fg-muted)",
                      fontFamily: "ui-monospace, monospace",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.username}
                  </div>
                </div>
                <span style={{ color: "var(--color-fg-muted)" }}>
                  <OcticonLinkExternal />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
