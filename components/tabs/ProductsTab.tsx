"use client"

import { SectionHead } from '@/components/chrome'

const PRODUCTS = [
  {
    no: 'P—01',
    name: 'Doki',
    tagline: 'Universal container engine for Android, Linux, and macOS',
    description:
      'OCI-native, Docker & Podman compatible, rootless container runtime. Runs on Linux, macOS, and Android via Termux without requiring root privileges.',
    specs: [
      ['Isolation levels', '12'],
      ['CLI commands', '244'],
      ['Runners', '12'],
      ['Stars', '20+'],
    ],
    topics: ['Go', 'OCI', 'Containers', 'Android', 'Linux', 'Rootless'],
    links: [
      { label: 'GitHub', url: 'https://github.com/OpceanAI/Doki' },
      { label: 'Readme', url: 'https://github.com/OpceanAI/Doki#readme' },
    ],
  },
  {
    no: 'P—02',
    name: 'ToS',
    tagline: 'Open P2P protocol for real-time structured data synchronization',
    description:
      'Translation of Service — decentralized protocol for moving and synchronizing structured data between any source and destination without a central broker.',
    specs: [
      ['Architecture', 'P2P'],
      ['Language', 'Go'],
    ],
    topics: ['Go', 'P2P', 'Distributed', 'Protocol'],
    links: [{ label: 'GitHub', url: 'https://github.com/OpceanAI/ToS' }],
  },
  {
    no: 'P—03',
    name: 'Shadow',
    tagline: 'Local-first CLI for codebase intelligence',
    description:
      'Point Shadow at a file, folder, or running service and it tells you what the project does, how files connect, and where the risky parts are — without sending code to the cloud.',
    specs: [
      ['Mode', 'Local-first'],
      ['Status', 'Active dev'],
    ],
    topics: ['TypeScript', 'CLI', 'Code Analysis', 'Privacy'],
    links: [{ label: 'GitHub', url: 'https://github.com/OpceanAI/Shadow' }],
  },
]

const INFRA = [
  ['doki-proot', 'Custom proot fork for Android namespace emulation'],
  ['DokiLink-Lite', 'Lightweight container networking layer'],
  ['Internal DNS', 'Container name resolution without external dependencies'],
  ['12 runners', 'Distributed build and test execution environments'],
  ['244 CLI commands', 'Complete operator toolchain via a single binary'],
  ['ARMv7 support', '32-bit ARM target coverage for older Android devices'],
]

export function ProductsTab() {
  return (
    <div>
      <SectionHead no="03" title="Products" note="open-source · permissive" />
      <p style={{ fontSize: 15, lineHeight: 1.65, maxWidth: 680, margin: '18px 0 8px' }}>
        Open-source infrastructure built for environments where traditional
        solutions don&apos;t reach: mobile devices, resource-constrained
        systems, and edge computing. Every project is developed in the open.
      </p>
      <div>
        {PRODUCTS.map((p) => (
          <article key={p.name} className="ledger-row" style={{ paddingTop: 26, paddingBottom: 26 }}>
            <p className="label" style={{ margin: '0 0 8px', opacity: 0.65 }}>{p.no}</p>
            <h3 className="font-display" style={{ margin: 0, fontSize: 40, fontWeight: 400, letterSpacing: '-0.02em' }}>
              {p.name}
            </h3>
            <p style={{ margin: '6px 0 12px', fontSize: 14, fontWeight: 600 }}>{p.tagline}</p>
            <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.65, maxWidth: 680 }}>{p.description}</p>
            <dl style={{ margin: '0 0 14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 0 }}>
              {p.specs.map(([k, v]) => (
                <div key={k} className="rule-top" style={{ padding: '8px 12px 8px 0', marginRight: 12 }}>
                  <dt className="label" style={{ opacity: 0.65 }}>{k}</dt>
                  <dd style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 600 }}>{v}</dd>
                </div>
              ))}
            </dl>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {p.topics.map((t) => (
                <span key={t} className="label rule" style={{ padding: '5px 10px' }}>{t}</span>
              ))}
              <span style={{ flexGrow: 1 }} />
              {p.links.map((l) => (
                <a key={l.label} className="btn-ghost" style={{ padding: '7px 14px' }} href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
      <section aria-label="Infrastructure" style={{ marginTop: 36 }}>
        <SectionHead no="03-B" title="Under the hood" note="Doki platform" />
        <div>
          {INFRA.map(([k, v]) => (
            <div key={k} className="ledger-row" style={{ display: 'flex', gap: 16, paddingTop: 12, paddingBottom: 12 }}>
              <span className="label" style={{ minWidth: 170 }}>{k}</span>
              <span style={{ fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
