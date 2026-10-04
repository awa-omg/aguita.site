"use client"

import { PixelGlitch } from './chrome'

const COLS: { heading: string; links: { label: string; url: string }[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Doki', url: 'https://github.com/OpceanAI/Doki' },
      { label: 'ToS', url: 'https://github.com/OpceanAI/ToS' },
      { label: 'Shadow', url: 'https://github.com/OpceanAI/Shadow' },
      { label: 'Yuuki', url: 'https://github.com/YuuKi-OS/yuuki-training' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'GitHub', url: 'https://github.com/awa-omg' },
      { label: 'Hugging Face', url: 'https://huggingface.co/OpceanAI' },
      { label: 'Sponsor', url: 'https://github.com/sponsors/awa-omg' },
    ],
  },
  {
    heading: 'Research',
    links: [
      { label: 'Flux paper', url: 'https://zenodo.org/records/19042895' },
      { label: 'Imprint Theory', url: 'https://zenodo.org/records/18993995' },
      { label: 'NHE benchmark', url: 'https://huggingface.co/Not-Humanity-Exam' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'OpceanAI', url: 'https://opceanai.com' },
      { label: 'About', url: 'https://github.com/awa-omg' },
      { label: 'Source', url: 'https://github.com/awa-omg/aguita.site' },
    ],
  },
]

export function Footer() {
  return (
    <footer style={{ borderTop: '3px solid var(--cobalt)', marginTop: 72 }}>
      <div className="wrap" style={{ paddingTop: 36, paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28 }}>
          {COLS.map((c) => (
            <div key={c.heading}>
              <p className="label" style={{ margin: '0 0 12px' }}>{c.heading}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {c.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: 8, fontSize: 14 }}>
                    <a className="u-link" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="label" style={{ margin: '0 0 12px' }}>Colophon</p>
            <PixelGlitch rows={3} cols={7} />
          </div>
        </div>
        <div className="rule-top" style={{ marginTop: 32, paddingTop: 12, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span className="label">© 2026 awa — aguita.site</span>
          <span className="label" style={{ opacity: 0.65 }}>Newsreader · Hanken Grotesk · DM Mono — cobalt on paper</span>
        </div>
      </div>
    </footer>
  )
}
