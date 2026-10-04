"use client"

import { useState } from 'react'
import { SectionHead } from '@/components/chrome'

const REPOS = [
  {
    name: 'yuuki-training',
    description:
      'Training pipeline for Yuuki-82M — a small language model trained from scratch on a Redmi 12 smartphone with zero cloud budget.',
    lang: 'Python',
    stars: 1,
    forks: 0,
    updated: 'Jun 2026',
    url: 'https://github.com/YuuKi-OS/yuuki-training',
  },
  {
    name: 'Doki',
    description:
      'Universal container engine — OCI native, Docker & Podman compatible, rootless. Runs on Linux, macOS, and Android via Termux.',
    lang: 'Go',
    stars: 20,
    forks: 2,
    updated: 'Jun 2026',
    url: 'https://github.com/OpceanAI/Doki',
  },
  {
    name: 'ToS',
    description:
      'Translation of Service — an open P2P protocol for moving and synchronizing structured data between any source and any destination in real-time, without a central broker.',
    lang: 'Go',
    stars: 0,
    forks: 0,
    updated: 'May 2026',
    url: 'https://github.com/OpceanAI/ToS',
  },
  {
    name: 'Shadow',
    description:
      'Local-first CLI for instant codebase intelligence. Point it at a file, folder, or running service and Shadow will tell you what the project does, how files connect, and where the risky parts are.',
    lang: 'TypeScript',
    stars: 0,
    forks: 0,
    updated: 'Apr 2026',
    url: 'https://github.com/OpceanAI/Shadow',
  },
]

const LANGS = ['Python', 'Go', 'TypeScript']

export function RepositoriesTab() {
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('all')
  const query = q.toLowerCase()
  const filtered = REPOS.filter(
    (r) =>
      (r.name.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)) &&
      (lang === 'all' || r.lang === lang)
  )

  return (
    <div>
      <SectionHead no="02" title="Repositories" note={`${filtered.length} of ${REPOS.length} shown`} />
      <div style={{ display: 'flex', gap: 10, margin: '18px 0 6px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <input
            type="search"
            aria-label="Find a repository"
            placeholder="FIND A REPOSITORY…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="field"
          />
        </div>
        <div>
          <select aria-label="Filter by language" value={lang} onChange={(e) => setLang(e.target.value)} className="field">
            <option value="all">ALL LANGUAGES</option>
            {LANGS.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {filtered.length === 0 ? (
          <p className="ledger-row" style={{ fontSize: 14 }}>No repositories match — clear the filter.</p>
        ) : (
          filtered.map((r) => (
            <article key={r.name} className="ledger-row">
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                  <a className="u-link" href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                </h3>
                <span className="label" style={{ marginLeft: 'auto' }}>{r.updated}</span>
              </div>
              <p style={{ margin: '8px 0 10px', fontSize: 14, lineHeight: 1.6, maxWidth: 680 }}>{r.description}</p>
              <p className="label" style={{ margin: 0, opacity: 0.75 }}>
                {r.lang} · ★ {r.stars} · {r.forks} forks
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
