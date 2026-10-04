"use client"

const TABS: { id: string; no: string; label: string; count?: number }[] = [
  { id: 'overview', no: '01', label: 'Overview' },
  { id: 'repositories', no: '02', label: 'Repositories', count: 4 },
  { id: 'products', no: '03', label: 'Products', count: 3 },
  { id: 'research', no: '04', label: 'Research', count: 9 },
  { id: 'contact', no: '05', label: 'Contact' },
]

export function NavTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  return (
    <nav aria-label="Sections" style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--paper)', borderTop: '1px solid var(--cobalt)', borderBottom: '1px solid var(--cobalt)' }}>
      <div className="wrap tab-scroll" role="tablist" aria-label="Sections" style={{ display: 'flex', paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ display: 'flex' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              className="tab-btn"
              onClick={() => onTabChange(t.id)}
            >
              {t.no} · {t.label}{t.count !== undefined ? ` (${t.count})` : ''}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
