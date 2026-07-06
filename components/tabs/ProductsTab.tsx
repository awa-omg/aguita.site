"use client"

const OcticonPackage = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)" }}>
    <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z" />
  </svg>
)

const OcticonLinkExternal = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
  </svg>
)

const OcticonServer = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-fg-muted)" }}>
    <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v3c0 .832-.507 1.542-1.25 1.833v.167c.743.291 1.25 1.001 1.25 1.833v3A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-3c0-.832.507-1.542 1.25-1.833V7.583C.507 7.292 0 6.582 0 5.75v-3C0 1.784.784 1 1.75 1ZM1.5 2.75v3c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-3a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Zm.25 5.75a.25.25 0 0 0-.25.25v3c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-3a.25.25 0 0 0-.25-.25Zm11 .5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-5.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM7.25 5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
)

const products = [
  {
    name: "Doki",
    tagline: "Universal container engine for Android, Linux, and macOS",
    description:
      "OCI-native, Docker & Podman compatible, rootless container runtime. Runs on Linux, macOS, and Android via Termux without requiring root privileges.",
    stats: [
      { label: "Stars",            value: "20+" },
      { label: "Isolation levels", value: "12" },
      { label: "CLI commands",     value: "244" },
      { label: "Runners",          value: "12" },
    ],
    topics: ["Go", "OCI", "Containers", "Android", "Linux", "Rootless"],
    links: [
      { label: "GitHub",  url: "https://github.com/OpceanAI/Doki" },
      { label: "Readme",  url: "https://github.com/OpceanAI/Doki#readme" },
    ],
  },
  {
    name: "ToS",
    tagline: "Open P2P protocol for real-time structured data synchronization",
    description:
      "Translation of Service — decentralized protocol for moving and synchronizing structured data between any source and destination without a central broker.",
    stats: [
      { label: "Architecture", value: "P2P" },
      { label: "Language",     value: "Go" },
    ],
    topics: ["Go", "P2P", "Distributed", "Protocol"],
    links: [
      { label: "GitHub", url: "https://github.com/OpceanAI/ToS" },
    ],
  },
  {
    name: "Shadow",
    tagline: "Local-first CLI for codebase intelligence",
    description:
      "Point Shadow at a file, folder, or running service and it tells you what the project does, how files connect, and where the risky parts are — without sending code to the cloud.",
    stats: [
      { label: "Mode",   value: "Local-first" },
      { label: "Status", value: "Active dev" },
    ],
    topics: ["TypeScript", "CLI", "Code Analysis", "Privacy"],
    links: [
      { label: "GitHub", url: "https://github.com/OpceanAI/Shadow" },
    ],
  },
]

const infrastructure = [
  { name: "doki-proot",        description: "Custom proot fork for Android namespace emulation" },
  { name: "DokiLink-Lite",     description: "Lightweight container networking layer" },
  { name: "Internal DNS",      description: "Container name resolution without external dependencies" },
  { name: "12 Runners",        description: "Distributed build and test execution environments" },
  { name: "244 CLI commands",  description: "Complete operator toolchain via a single binary" },
  { name: "ARMv7 support",     description: "32-bit ARM target coverage for older Android devices" },
]

export function ProductsTab() {
  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", margin: 0, lineHeight: "1.5" }}>
          Open-source infrastructure built for environments where traditional solutions don&apos;t reach:
          mobile devices, resource-constrained systems, and edge computing.
          Every project is permissively licensed and developed in the open.
        </p>
      </div>

      {/* Product cards */}
      <div style={{ marginBottom: "32px" }}>
        {products.map((p, i) => (
          <div
            key={p.name}
            className="Box"
            style={{ marginBottom: i < products.length - 1 ? "16px" : 0 }}
          >
            {/* Card header */}
            <div className="Box-header">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <OcticonPackage />
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "var(--color-fg-default)" }}>
                    {p.name}
                  </h3>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {p.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-default btn-sm"
                      style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      {link.label}
                      <OcticonLinkExternal />
                    </a>
                  ))}
                </div>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--color-fg-muted)" }}>
                {p.tagline}
              </p>
            </div>

            {/* Card body */}
            <div className="Box-body">
              <p style={{ fontSize: "14px", color: "var(--color-fg-default)", lineHeight: "1.5", margin: "0 0 16px" }}>
                {p.description}
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "16px" }}>
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--color-fg-default)", lineHeight: 1.2 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-fg-muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Topics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {p.topics.map((t) => (
                  <span key={t} className="topic-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Infrastructure list */}
      <section aria-labelledby="infra-heading">
        <h2
          id="infra-heading"
          style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)", marginBottom: "8px" }}
        >
          <OcticonServer />
          Infrastructure components
        </h2>
        <div className="Box">
          {infrastructure.map((item, i) => (
            <div
              key={item.name}
              className="Box-row"
              style={{ borderTop: i === 0 ? "none" : undefined }}
            >
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)", minWidth: "180px" }}>
                {item.name}
              </span>
              <span style={{ fontSize: "14px", color: "var(--color-fg-muted)", marginLeft: "16px" }}>
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
