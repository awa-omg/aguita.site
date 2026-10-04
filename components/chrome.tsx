"use client"

/* Shared Cobalt Grid chrome: hairlines, pixel-glitch + QR-block decor,
   section heads, ledger primitives. Two inks only: paper + cobalt. */

export function PixelGlitch({ rows = 4, cols = 8 }: { rows?: number; cols?: number }) {
  const cells: boolean[] = []
  let seed = 7
  for (let i = 0; i < rows * cols; i++) {
    seed = (seed * 13 + 5) % 17
    cells.push(seed % 3 === 0)
  }
  return (
    <div className="glitch-block" aria-hidden="true" style={{ display: 'inline-block', lineHeight: 0 }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
          {Array.from({ length: cols }).map((__, c) => {
            const on = cells[r * cols + c]
            return (
              <span
                key={c}
                style={{
                  width: 9,
                  height: 9,
                  display: 'inline-block',
                  background: on ? 'var(--cobalt)' : 'transparent',
                  border: on ? 'none' : '1px solid var(--cobalt)',
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function QRBlock({ size = 104 }: { size?: number }) {
  // Decorative registry mark — not a scannable code.
  const n = 13
  const cell = size / n
  const on = (r: number, c: number) => {
    const finder =
      (r < 4 && c < 4) || (r < 4 && c >= n - 4) || (r >= n - 4 && c < 4)
    if (finder) {
      const lr = r < 4 ? (r >= n - 4 ? r - (n - 4) : r) : r - (n - 4)
      const lc = c < 4 ? c : c - (n - 4)
      const rr = r < 4 ? r : r - (n - 4)
      void lr
      void lc
      const edge = rr === 0 || rr === 3 || (c < 4 ? c % 4 === 0 || c % 4 === 3 : (c - (n - 4)) === 0 || (c - (n - 4)) === 3)
      void edge
      return true
    }
    return (r * 7 + c * 11 + ((r * c) % 5)) % 3 === 0
  }
  return (
    <div aria-hidden="true" style={{ lineHeight: 0 }}>
      <svg width={size} height={size} style={{ display: 'block' }}>
        {Array.from({ length: n }).map((_, r) =>
          Array.from({ length: n }).map((__, c) =>
            on(r, c) ? (
              <rect
                key={`${r}-${c}`}
                x={c * cell}
                y={r * cell}
                width={cell - 0.5}
                height={cell - 0.5}
                fill="var(--cobalt)"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}

export function SectionHead({ no, title, note }: { no: string; title: string; note?: string }) {
  return (
    <div className="rule-bottom" style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 10, marginBottom: 4 }}>
      <span className="label" style={{ minWidth: 32 }}>{no}</span>
      <h2 className="label" style={{ margin: 0, fontSize: 13 }}>{title}</h2>
      {note && (
        <span className="label" style={{ marginLeft: 'auto', opacity: 0.65, textAlign: 'right' }}>
          {note}
        </span>
      )}
    </div>
  )
}

export function ChromeTop() {
  return (
    <div className="rule-bottom" style={{ borderTop: '3px solid var(--cobalt)' }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 10, paddingBottom: 10 }}>
        <span className="label">aguita.site — index nº 001</span>
        <span className="label" style={{ textAlign: 'right' }}>awa-omg / opceanai</span>
      </div>
    </div>
  )
}

export function Masthead() {
  return (
    <header className="wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 720 }}>
          <p className="label" style={{ margin: '0 0 18px' }}>
            Full-stack × AI — founder, OpceanAI
          </p>
          <h1
            className="font-display hero-title"
            style={{
              fontWeight: 400,
              fontSize: 68,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              margin: '0 0 22px',
            }}
          >
            Containers and models for places they were never supposed to run.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 26px', maxWidth: 600 }}>
            awa is a full-stack developer and AI engineer building open-source
            infrastructure for resource-constrained environments — OCI containers
            on Android, small language models trained on a phone, protocols
            without a center.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn-solid" href="https://github.com/OpceanAI/Doki" target="_blank" rel="noopener noreferrer">
              Doki on GitHub
            </a>
            <a className="btn-ghost" href="https://huggingface.co/OpceanAI" target="_blank" rel="noopener noreferrer">
              Models on HF
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-end' }}>
          <QRBlock />
          <span className="label" style={{ opacity: 0.65 }}>registry mark — decor</span>
          <PixelGlitch rows={3} cols={10} />
        </div>
      </div>
      <div className="rule-top" style={{ marginTop: 44, paddingTop: 12, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <span className="label">EST. 2023 — Ocean bot</span>
        <span className="label">ORG — OpceanAI</span>
        <span className="label">BASE — open source</span>
      </div>
    </header>
  )
}
