"use client"

import { RepoCard } from "@/components/RepoCard"

/* ------------------------------------------------------------------
   Pinned repositories — same data as before, no animation wrappers
   ------------------------------------------------------------------ */
const pinnedRepos = [
  {
    name: "yuuki-training",
    description:
      "Training pipeline for Yuuki-82M — a small language model trained from scratch on a Redmi 12 smartphone with zero cloud budget.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    forks: 0,
    url: "https://github.com/YuuKi-OS/yuuki-training",
    starUrl: "https://github.com/YuuKi-OS/yuuki-training/stargazers",
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
    starUrl: "https://github.com/OpceanAI/Doki/stargazers",
  },
  {
    name: "NHE",
    description:
      "Not Humanity Exam — A benchmark for measuring metacognition and reasoning patterns in large language models.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 156,
    forks: 23,
    url: "https://huggingface.co/Not-Humanity-Exam",
  },
  {
    name: "OpceanAI",
    description:
      "Open-source AI models and research. Fine-tuned LLMs and novel training methodologies for resource-constrained environments.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 234,
    forks: 45,
    url: "https://huggingface.co/OpceanAI",
  },
]

/* ------------------------------------------------------------------
   Static contribution pattern — 53 weeks × 7 days
   Levels 0-4 map to the Primer calendar day colors
   ------------------------------------------------------------------ */
const PATTERN =
  "0123401230123012340123012340123401230123012340123012340123401230123012340123012340123401234012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401234012340123"

function ContributionGraph() {
  const cells = PATTERN.slice(0, 371).split("")

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(53, 1fr)",
          gap: "3px",
        }}
      >
        {cells.map((level, i) => {
          const lvl = parseInt(level, 10)
          const varName =
            lvl === 0
              ? "var(--color-calendar-graph-day-bg)"
              : lvl === 1
              ? "var(--color-calendar-graph-day-L1-bg)"
              : lvl === 2
              ? "var(--color-calendar-graph-day-L2-bg)"
              : lvl === 3
              ? "var(--color-calendar-graph-day-L3-bg)"
              : "var(--color-calendar-graph-day-L4-bg)"
          return (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: "2px",
                backgroundColor: varName,
              }}
              aria-hidden="true"
            />
          )
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "4px",
          marginTop: "8px",
          fontSize: "12px",
          color: "var(--color-fg-muted)",
        }}
      >
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <div
            key={lvl}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              backgroundColor:
                lvl === 0
                  ? "var(--color-calendar-graph-day-bg)"
                  : lvl === 1
                  ? "var(--color-calendar-graph-day-L1-bg)"
                  : lvl === 2
                  ? "var(--color-calendar-graph-day-L2-bg)"
                  : lvl === 3
                  ? "var(--color-calendar-graph-day-L3-bg)"
                  : "var(--color-calendar-graph-day-L4-bg)",
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Timeline milestones
   ------------------------------------------------------------------ */
const milestones = [
  {
    year: "2023",
    title: "Personal Origins",
    description:
      "Starts a personal project called 'Ocean' — a Telegram and Discord bot monolith of 11,000 lines. Discovers Podroid (QEMU on Android) but finds it too slow. Begins researching proot, syscalls, and Linux namespaces.",
  },
  {
    year: "Jun 2024",
    title: "OpceanAI founded. Doki begins.",
    description:
      "Official founding of OpceanAI as an open organization. Designs the first architecture of Doki in Go — a rootless OCI runtime specifically for Android. First tests in Termux.",
  },
  {
    year: "Dec 2025",
    title: "Yuuki v0.1",
    description:
      "First functional prototype of Yuuki v0.1, based on GPT-2 (82M parameters). Trained entirely on a Snapdragon 685 mobile phone with zero cloud cost — proof of concept for the zero-budget training methodology.",
  },
  {
    year: "May 2026",
    title: "Doki goes public",
    description:
      "First public Doki commit. June: v0.9.2 stable with DokiLink-Lite, 190+ bugs fixed. v0.9.3 adds 12 runners, 244 CLI commands, and ARMv7 support. Planned: 0.10 with Podman, Kubernetes, and native macOS.",
  },
]

function Timeline() {
  return (
    <div
      style={{
        position: "relative",
        paddingLeft: "24px",
        borderLeft: "2px solid var(--color-border-default)",
      }}
    >
      {milestones.map((m, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            marginBottom: i < milestones.length - 1 ? "24px" : 0,
          }}
        >
          {/* Dot */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-31px",
              top: "4px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "2px solid var(--color-accent-fg)",
              backgroundColor: "var(--color-canvas-default)",
            }}
          />
          <div
            style={{
              fontSize: "12px",
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
              fontWeight: 600,
              color: "var(--color-accent-fg)",
              marginBottom: "2px",
            }}
          >
            {m.year}
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-fg-default)",
              marginBottom: "4px",
            }}
          >
            {m.title}
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-fg-muted)",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {m.description}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------
   Main component
   ------------------------------------------------------------------ */
export function OverviewTab() {
  return (
    <div>
      {/* Pinned repositories */}
      <section aria-labelledby="pinned-heading" style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <h2
            id="pinned-heading"
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-fg-default)",
              margin: 0,
            }}
          >
            Pinned
          </h2>
          <a
            href="https://github.com/awa-omg"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              color: "var(--color-accent-fg)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
          >
            Customize your pins
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {pinnedRepos.map((repo) => (
            <RepoCard key={repo.name} {...repo} />
          ))}
        </div>
      </section>

      {/* Contribution activity */}
      <section aria-labelledby="contributions-heading" style={{ marginBottom: "32px" }}>
        <h2
          id="contributions-heading"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "16px",
          }}
        >
          Contribution activity
        </h2>
        <div className="Box" style={{ padding: "16px" }}>
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-fg-muted)",
              marginBottom: "12px",
            }}
          >
            Contributions in the last year
          </p>
          <ContributionGraph />
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading">
        <h2
          id="timeline-heading"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color-fg-default)",
            marginBottom: "16px",
          }}
        >
          Timeline
        </h2>
        <div className="Box" style={{ padding: "24px" }}>
          <Timeline />
        </div>
      </section>
    </div>
  )
}
