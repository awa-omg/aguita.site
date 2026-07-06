"use client"

const footerLinks: { heading: string; links: { label: string; url: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Doki",   url: "https://github.com/OpceanAI/Doki" },
      { label: "ToS",    url: "https://github.com/OpceanAI/ToS" },
      { label: "Shadow", url: "https://github.com/OpceanAI/Shadow" },
      { label: "Yuuki",  url: "https://github.com/YuuKi-OS/yuuki-training" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "GitHub",       url: "https://github.com/awa-omg" },
      { label: "Hugging Face", url: "https://huggingface.co/OpceanAI" },
      { label: "Sponsor",      url: "https://github.com/sponsors/awa-omg" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "Flux Paper",     url: "https://zenodo.org/records/19042895" },
      { label: "Imprint Theory", url: "https://zenodo.org/records/18993995" },
      { label: "NHE Benchmark",  url: "https://huggingface.co/Not-Humanity-Exam" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "OpceanAI", url: "https://opceanai.com" },
      { label: "About",    url: "https://github.com/awa-omg" },
      { label: "Source",   url: "https://github.com/awa-omg/aguita.site" },
    ],
  },
]

export function Footer() {
  return (
    <footer
      style={{
        marginTop: "64px",
        borderTop: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-canvas-default)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 16px",
        }}
      >
        {/* Link columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
          }}
          className="footer-grid"
        >
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--color-fg-default)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: "12px",
                }}
              >
                {col.heading}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        color: "var(--color-fg-muted)",
                        textDecoration: "none",
                        transition: "color 80ms ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent-fg)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-fg-muted)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-border-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--color-fg-muted)", margin: 0 }}>
            &copy; {new Date().getFullYear()} awa &middot; OpceanAI
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="https://github.com/awa-omg"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "var(--color-fg-muted)", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent-fg)" }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-fg-muted)" }}
            >
              Terms
            </a>
            <a
              href="https://github.com/awa-omg/aguita.site"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "var(--color-fg-muted)", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent-fg)" }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-fg-muted)" }}
            >
              Privacy
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 400px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
