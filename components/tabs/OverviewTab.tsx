"use client"

import { SectionHead } from '@/components/chrome'

const PINNED = [
  {
    name: 'Doki',
    description:
      'Universal container engine — OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.',
    lang: 'Go',
    stars: 20,
    forks: 2,
    url: 'https://github.com/OpceanAI/Doki',
  },
  {
    name: 'yuuki-training',
    description:
      'Training pipeline for Yuuki-82M — a small language model trained from scratch on a Redmi 12 smartphone with zero cloud budget.',
    lang: 'Python',
    stars: 1,
    forks: 0,
    url: 'https://github.com/YuuKi-OS/yuuki-training',
  },
  {
    name: 'NHE',
    description:
      'Not Humanity Exam — a benchmark for measuring metacognition and reasoning patterns in large language models.',
    lang: 'Python',
    stars: 156,
    forks: 23,
    url: 'https://huggingface.co/Not-Humanity-Exam',
  },
  {
    name: 'OpceanAI',
    description:
      'Open-source AI models and research. Fine-tuned LLMs and novel training methodologies for resource-constrained environments.',
    lang: 'Python',
    stars: 234,
    forks: 45,
    url: 'https://huggingface.co/OpceanAI',
  },
]

const MILESTONES = [
  {
    year: '2023',
    title: 'Personal Origins',
    description:
      "Starts a personal project called 'Ocean' — a Telegram and Discord bot monolith of 11,000 lines. Discovers Podroid (QEMU on Android) but finds it too slow. Begins researching proot, syscalls, and Linux namespaces.",
  },
  {
    year: 'Jun 2024',
    title: 'OpceanAI founded. Doki begins.',
    description:
      'Official founding of OpceanAI as an open organization. Designs the first architecture of Doki in Go — a rootless OCI runtime specifically for Android. First tests in Termux.',
  },
  {
    year: 'Dec 2025',
    title: 'Yuuki v0.1',
    description:
      'First functional prototype of Yuuki v0.1, based on GPT-2 (82M parameters). Trained entirely on a Snapdragon 685 mobile phone with zero cloud cost — proof of concept for the zero-budget training methodology.',
  },
  {
    year: 'May 2026',
    title: 'Doki goes public',
    description:
      'First public Doki commit. June: v0.9.2 stable with DokiLink-Lite, 190+ bugs fixed. v0.9.3 adds 12 runners, 244 CLI commands, and ARMv7 support. Planned: 0.10 with Podman, Kubernetes, and native macOS.',
  },
]

const PATTERN =
  '0123401230123012340123012340123401230123012340123012340123401230123012340123012340123401234012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401230123012340123012340123401234012340123'

function levelFill(level: number): string {
  if (level === 4) return 'var(--cobalt)'
  if (level === 3) return 'color-mix(in srgb, var(--cobalt) 66%, var(--paper))'
  if (level === 2) return 'color-mix(in srgb, var(--cobalt) 42%, var(--paper))'
  if (level === 1) return 'color-mix(in srgb, var(--cobalt) 20%, var(--paper))'
  return 'transparent'
}

function CadenceMap() {
  const COLS = 53
  const ROWS = 7
  const cells = PATTERN.slice(0, COLS * ROWS).split('')
  const CELL = 10
  const GAP = 3
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <svg
          role="img"
          aria-label="Illustrative activity cadence map"
          width={COLS * (CELL + GAP) - GAP}
          height={ROWS * (CELL + GAP) - GAP}
          style={{ display: 'block' }}
        >
          {cells.map((level, i) => {
            const col = Math.floor(i / ROWS)
            const row = i % ROWS
            const lv = parseInt(level, 10)
            return (
              <rect
                key={i}
                x={col * (CELL + GAP)}
                y={row * (CELL + GAP)}
                width={CELL}
                height={CELL}
                fill={levelFill(lv)}
                stroke="var(--cobalt)"
                strokeWidth={lv === 0 ? 1 : 0}
              />
            )
          })}
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5, marginTop: 10 }}>
        <span className="label" style={{ opacity: 0.65 }}>Less</span>
        {[0, 1, 2, 3, 4].map((lv) => (
          <span key={lv} style={{ width: 10, height: 10, display: 'inline-block', background: levelFill(lv), border: '1px solid var(--cobalt)' }} />
        ))}
        <span className="label" style={{ opacity: 0.65 }}>More</span>
      </div>
    </div>
  )
}

export function OverviewTab() {
  return (
    <div>
      <section aria-labelledby="pinned-h" style={{ marginBottom: 44 }}>
        <SectionHead no="01-A" title="Pinned" note="github.com/awa-omg" />
        <div id="pinned-h">
          {PINNED.map((r) => (
            <article key={r.name} className="ledger-row" style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span aria-hidden="true" style={{ width: 10, height: 10, background: 'var(--cobalt)', flexShrink: 0, alignSelf: 'center' }} />
              <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>
                  <a className="u-link" href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                </h3>
                <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.6 }}>{r.description}</p>
              </div>
              <div className="label" style={{ marginLeft: 'auto', textAlign: 'right', whiteSpace: 'nowrap' }}>
                {r.lang} · ★ {r.stars} · {r.forks} forks
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="cadence-h" style={{ marginBottom: 44 }}>
        <SectionHead no="01-B" title="Cadence" note="illustrative — not measured" />
        <div id="cadence-h" className="rule" style={{ padding: 18 }}>
          <CadenceMap />
        </div>
      </section>

      <section aria-labelledby="record-h">
        <SectionHead no="01-C" title="Record" note="2023 → 2026" />
        <div id="record-h">
          {MILESTONES.map((m) => (
            <div key={m.year + m.title} className="ledger-row" style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16 }}>
              <span className="label" style={{ paddingTop: 3 }}>{m.year}</span>
              <div>
                <h3 className="font-display" style={{ margin: 0, fontSize: 24, fontWeight: 400, letterSpacing: '-0.01em' }}>{m.title}</h3>
                <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.65, maxWidth: 640 }}>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
