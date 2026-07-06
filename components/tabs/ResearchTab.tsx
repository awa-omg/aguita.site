"use client"

const OcticonCpu = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-done-fg)" }}>
    <path d="M6.5.75V2H5.75a.75.75 0 0 0 0 1.5H6.5v1H5a2 2 0 0 0-2 2v1H1.75a.75.75 0 0 0 0 1.5H3v1H1.75a.75.75 0 0 0 0 1.5H3v1a2 2 0 0 0 2 2h1v.75a.75.75 0 0 0 1.5 0V14H9v.75a.75.75 0 0 0 1.5 0V14H11a2 2 0 0 0 2-2v-1h1.25a.75.75 0 0 0 0-1.5H13v-1h1.25a.75.75 0 0 0 0-1.5H13V6.5a2 2 0 0 0-2-2H9.5v-1h.75a.75.75 0 0 0 0-1.5H9.5V.75a.75.75 0 0 0-1.5 0V2h-1V.75A.75.75 0 0 0 6.5.75ZM5 5.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5ZM6 7v4h4V7Z" />
  </svg>
)

const OcticonFile = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-danger-fg)" }}>
    <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
  </svg>
)

const OcticonDatabase = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--color-success-fg)" }}>
    <path d="M1 3.5c0-.626.292-1.165.7-1.59.406-.422.956-.767 1.579-1.041C4.525.32 6.195 0 8 0c1.805 0 3.475.32 4.722.869.622.274 1.172.62 1.578 1.04.408.426.7.965.7 1.591v9c0 .626-.292 1.165-.7 1.59-.406.422-.956.767-1.579 1.041C11.476 15.68 9.806 16 8 16c-1.805 0-3.475-.32-4.721-.869-.623-.274-1.173-.619-1.579-1.04-.408-.426-.7-.965-.7-1.591Zm1.5 0c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 5.205 6.353 5.5 8 5.5c1.646 0 3.101-.295 4.118-.742.508-.224.873-.47 1.1-.707.224-.233.282-.418.282-.551 0-.133-.058-.318-.282-.551-.227-.237-.591-.483-1.101-.707C11.102 1.795 9.647 1.5 8 1.5c-1.646 0-3.101.295-4.118.742-.508.224-.873.47-1.1.707-.224.233-.282.418-.282.551Z" />
  </svg>
)

const OcticonLinkExternal = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
  </svg>
)

const models = [
  {
    name: "Yuuki-82M",
    description: "Small language model trained from scratch on a Redmi 12 (Snapdragon 685). GPT-2 architecture, 82M parameters, zero cloud budget.",
    tags: ["GPT-2", "82M params", "Mobile training", "Text generation"],
    url: "https://huggingface.co/OpceanAI/Yuuki-best",
  },
  {
    name: "Yumo-1.5B",
    description: "Lightweight language model based on LFM-1.5B architecture. Optimized for resource-constrained inference.",
    tags: ["LFM-1.5B", "1.5B params", "Text generation"],
    url: "https://huggingface.co/YU-MO/Yumo",
  },
  {
    name: "ELIZA",
    description: "Classic NLP chatbot reimplemented with modern tooling. Pattern matching and rule-based dialogue system.",
    tags: ["NLP", "Pattern matching", "Dialogue"],
    url: "https://huggingface.co/OpceanAI/ELIZA",
  },
  {
    name: "Ixari",
    description: "140 GB multilingual corpus used for pre-training and fine-tuning experiments across multiple model families.",
    tags: ["Dataset", "Multilingual", "140 GB"],
    url: "https://huggingface.co/datasets/OpceanAI/Ixari",
  },
  {
    name: "Yuuki-MoE",
    description: "Mixture of Experts variant — planned. Architecture exploration for improved inference efficiency on mobile hardware.",
    tags: ["MoE", "Planned", "Mobile inference"],
    url: "#",
  },
  {
    name: "Iris",
    description: "First model (internally renamed to Yuuki). GPT-2 based experimental checkpoint from early 2025.",
    tags: ["GPT-2", "Experimental", "Historical"],
    url: "https://huggingface.co/OpceanAI/Yuuki-best",
  },
]

const papers = [
  {
    title: "Flux",
    subtitle:
      "A Novel Architecture for Efficient Neural Network Training on Resource-Constrained Devices",
    doi: "10.5281/zenodo.19042895",
    url: "https://zenodo.org/records/19042895",
    tags: ["Architecture", "Efficiency", "Edge AI"],
  },
  {
    title: "Imprint Theory",
    subtitle:
      "A Framework for Understanding Consciousness Through Information Integration Patterns",
    doi: "10.5281/zenodo.18993995",
    url: "https://zenodo.org/records/18993995",
    tags: ["Theory", "Consciousness", "Information theory"],
  },
  {
    title: "NHE — Not Humanity Exam",
    subtitle:
      "Benchmark for Measuring Metacognition and Reasoning Patterns in Large Language Models",
    doi: "",
    url: "https://huggingface.co/datasets/OpceanAI/NHE",
    tags: ["Benchmark", "Metacognition", "LLMs"],
  },
]

const datasets = [
  { name: "Ixari",              description: "140 GB multilingual pre-training corpus" },
  { name: "Alpaca-ko",          description: "Korean instruction-following dataset" },
  { name: "NHE benchmark",      description: "Metacognition and reasoning evaluation set" },
]

export function ResearchTab() {
  return (
    <div>
      {/* Models section */}
      <section aria-labelledby="models-heading" style={{ marginBottom: "32px" }}>
        <h2
          id="models-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "4px",
          }}
        >
          <OcticonCpu />
          AI Models
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", margin: "0 0 16px" }}>
          Open-source models and datasets published by the OpceanAI lab.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {models.map((model) => (
            <a
              key={model.name}
              href={model.url === "#" ? undefined : model.url}
              target={model.url !== "#" ? "_blank" : undefined}
              rel={model.url !== "#" ? "noopener noreferrer" : undefined}
              className="Box"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
                textDecoration: "none",
                cursor: model.url === "#" ? "default" : "pointer",
                transition: "border-color 80ms ease",
              }}
              onMouseEnter={(e) => {
                if (model.url !== "#") {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-fg)"
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-default)"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)" }}>
                  {model.name}
                </h3>
                {model.url !== "#" && (
                  <span style={{ color: "var(--color-fg-muted)", flexShrink: 0 }}>
                    <OcticonLinkExternal />
                  </span>
                )}
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-fg-muted)", lineHeight: "1.5", margin: "0 0 12px", flex: 1 }}>
                {model.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {model.tags.map((tag) => (
                  <span key={tag} className="topic-tag">{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Papers section */}
      <section aria-labelledby="papers-heading" style={{ marginBottom: "32px" }}>
        <h2
          id="papers-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "4px",
          }}
        >
          <OcticonFile />
          Papers
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", margin: "0 0 16px" }}>
          Research publications and technical papers.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {papers.map((paper) => (
            <a
              key={paper.title}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="Box"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
                textDecoration: "none",
                transition: "border-color 80ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-fg)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-default)"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)" }}>
                    {paper.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", margin: "0 0 8px", lineHeight: "1.5" }}>
                    {paper.subtitle}
                  </p>
                  {paper.doi && (
                    <p style={{ fontSize: "12px", color: "var(--color-fg-muted)", fontFamily: "ui-monospace, monospace", margin: "0 0 10px" }}>
                      DOI: {paper.doi}
                    </p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {paper.tags.map((tag) => (
                      <span key={tag} className="topic-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <span style={{ color: "var(--color-fg-muted)", flexShrink: 0 }}>
                  <OcticonLinkExternal />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Datasets section */}
      <section aria-labelledby="datasets-heading">
        <h2
          id="datasets-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "4px",
          }}
        >
          <OcticonDatabase />
          Datasets
        </h2>
        <p style={{ fontSize: "14px", color: "var(--color-fg-muted)", margin: "0 0 16px" }}>
          Public datasets used in research and model training.
        </p>
        <div className="Box">
          {datasets.map((ds, i) => (
            <div
              key={ds.name}
              className="Box-row"
              style={{ borderTop: i === 0 ? "none" : undefined }}
            >
              <OcticonDatabase />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-fg-default)", marginLeft: "8px" }}>
                {ds.name}
              </span>
              <span style={{ fontSize: "14px", color: "var(--color-fg-muted)", marginLeft: "12px" }}>
                {ds.description}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
