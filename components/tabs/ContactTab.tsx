"use client"

import { SectionHead } from '@/components/chrome'

const EMAILS = [
  ['Business', 'contact@opceanai.com'],
  ['OpceanAI', 'opceanai@gmail.com'],
  ['Personal', 'aguitachan3@gmail.com'],
]

const PROFILES = [
  ['GitHub — awa-omg', '@awa-omg', 'https://github.com/awa-omg'],
  ['GitHub — OpceanAI', '@OpceanAI', 'https://github.com/OpceanAI'],
  ['GitLab', '@aguitauwu', 'https://gitlab.com/aguitauwu'],
  ['Hugging Face', 'OpceanAI', 'https://huggingface.co/OpceanAI'],
  ['Twitter / X', '@awa_omg', 'https://twitter.com/awa_omg'],
  ['Reddit', 'u/agua_omg', 'https://www.reddit.com/u/agua_omg'],
]

const SITES = [
  ['OpceanAI', 'https://opceanai.com'],
  ['Portfolio', 'https://aguita.site'],
]

export function ContactTab() {
  return (
    <div style={{ maxWidth: 720 }}>
      <SectionHead no="05" title="Contact" note="replies in the open" />
      <p style={{ fontSize: 15, lineHeight: 1.65, margin: '18px 0 30px' }}>
        Open to collaborations, research inquiries, and open source
        contributions. Business goes by email; code topics belong in a GitHub
        issue on the relevant repo.
      </p>

      <p className="label" style={{ margin: '0 0 4px' }}>Email</p>
      <div style={{ marginBottom: 30 }}>
        {EMAILS.map(([k, v]) => (
          <div key={v} className="ledger-row" style={{ display: 'flex', gap: 16, paddingTop: 12, paddingBottom: 12 }}>
            <span className="label" style={{ minWidth: 110, opacity: 0.65 }}>{k}</span>
            <a className="u-link" style={{ fontSize: 16 }} href={`mailto:${v}`}>{v}</a>
          </div>
        ))}
      </div>

      <p className="label" style={{ margin: '0 0 4px' }}>Profiles</p>
      <div style={{ marginBottom: 30 }}>
        {PROFILES.map(([label, handle, url]) => (
          <div key={url} className="ledger-row" style={{ display: 'flex', gap: 16, paddingTop: 12, paddingBottom: 12, alignItems: 'baseline' }}>
            <span className="label" style={{ minWidth: 170, opacity: 0.65 }}>{label}</span>
            <a className="u-link" style={{ fontSize: 16 }} href={url} target="_blank" rel="noopener noreferrer">{handle} ↗</a>
          </div>
        ))}
      </div>

      <p className="label" style={{ margin: '0 0 4px' }}>Elsewhere</p>
      <div>
        {SITES.map(([label, url]) => (
          <div key={url} className="ledger-row" style={{ display: 'flex', gap: 16, paddingTop: 12, paddingBottom: 12, alignItems: 'baseline' }}>
            <span className="label" style={{ minWidth: 110, opacity: 0.65 }}>{label}</span>
            <a className="u-link" style={{ fontSize: 16 }} href={url} target="_blank" rel="noopener noreferrer">
              {url.replace('https://', '')} ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
