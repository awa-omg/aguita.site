"use client"

import Image from 'next/image'
import { PixelGlitch } from './chrome'

const META: { k: string; v: string; url?: string }[] = [
  { k: 'Handle', v: '@awa-omg', url: 'https://github.com/awa-omg' },
  { k: 'Org', v: 'OpceanAI', url: 'https://github.com/OpceanAI' },
  { k: 'Models', v: 'huggingface.co/OpceanAI', url: 'https://huggingface.co/OpceanAI' },
  { k: 'Web', v: 'opceanai.com', url: 'https://opceanai.com' },
]

export function ProfileRail() {
  return (
    <aside className="rail-side" aria-label="Dossier" style={{ width: 280, flexShrink: 0 }}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="cobalt-ink" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
                            <feComponentTransfer>
                              <feFuncR type="table" tableValues="0.122 0.941" />
                              <feFuncG type="table" tableValues="0.169 0.922" />
                              <feFuncB type="table" tableValues="0.878 0.871" />
                            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <p className="label" style={{ margin: '0 0 12px' }}>Dossier — 000</p>
      <div className="rule" style={{ padding: 12 }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dc7400c23d37c9ad79dd17854be3e1e3-07BbTYGInv9LEf0CGZm4XzB18yi2OC.jpg"
          alt="Portrait of awa, printed cobalt on paper"
          width={256}
          height={256}
          style={{ display: 'block', width: '100%', height: 'auto', border: '1px solid var(--cobalt)', filter: 'url(#cobalt-ink)' }}
          priority
        />
        <p className="font-display" style={{ fontSize: 34, letterSpacing: '-0.02em', margin: '14px 0 0' }}>
          awa
        </p>
        <p className="label" style={{ margin: '4px 0 12px', opacity: 0.7 }}>awa-omg</p>
        <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
          Full Stack Developer &amp; AI Engineer. Creator of Doki, ToS, Yuuki
          and Imprint Theory. Open source advocate.
        </p>
        <a className="btn-solid" href="https://github.com/awa-omg" target="_blank" rel="noopener noreferrer" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
          Follow
        </a>
      </div>
      <dl style={{ margin: '20px 0 0' }}>
        {META.map((m) => (
          <div key={m.k} className="rule-top" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0' }}>
            <dt className="label" style={{ opacity: 0.65 }}>{m.k}</dt>
            <dd style={{ margin: 0, fontSize: 13, textAlign: 'right' }}>
              {m.url ? (
                <a className="u-link" href={m.url} target="_blank" rel="noopener noreferrer">{m.v}</a>
              ) : m.v}
            </dd>
          </div>
        ))}
        <div className="rule-top rule-bottom" style={{ padding: '9px 0' }} />
      </dl>
      <div style={{ marginTop: 20 }}>
        <PixelGlitch rows={4} cols={6} />
      </div>
    </aside>
  )
}
