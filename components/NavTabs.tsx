"use client"

/* Octicon paths — 16px fill */
const OcticonBook = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" />
  </svg>
)

const OcticonRepo = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
  </svg>
)

const OcticonPackage = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z" />
  </svg>
)

const OcticonBeaker = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M5 5.782V2.5h-.25a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 0 1.5H11v3.282l2.915 5.291a1.25 1.25 0 0 1-1.105 1.927H3.19a1.25 1.25 0 0 1-1.104-1.927L5 5.782ZM9.5 2.5h-3V6a.75.75 0 0 1-.093.362L5.177 9h5.646L9.593 6.362A.75.75 0 0 1 9.5 6Zm-1.75 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM7 11.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
  </svg>
)

const OcticonMail = () => (
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "currentColor" }}>
    <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
  </svg>
)

interface Tab {
  id: string
  label: string
  Icon: () => JSX.Element
  count?: number
}

const TABS: Tab[] = [
  { id: "overview",     label: "Overview",      Icon: OcticonBook },
  { id: "repositories", label: "Repositories",  Icon: OcticonRepo,    count: 4 },
  { id: "products",     label: "Products",      Icon: OcticonPackage, count: 3 },
  { id: "research",     label: "Research",      Icon: OcticonBeaker,  count: 9 },
  { id: "contact",      label: "Contact",       Icon: OcticonMail },
]

interface NavTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <nav
      aria-label="Profile tabs"
      style={{
        position: "sticky",
        top: "62px",
        zIndex: 40,
        backgroundColor: "var(--color-canvas-default)",
        marginBottom: "0",
      }}
    >
      <ul
        className="UnderlineNav"
        role="tablist"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {TABS.map(({ id, label, Icon, count }) => {
          const isActive = activeTab === id
          return (
            <li key={id} role="presentation">
              <button
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${id}`}
                id={`tab-${id}`}
                onClick={() => onTabChange(id)}
                className={`UnderlineNav-item${isActive ? " selected" : ""}`}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <Icon />
                <span>{label}</span>
                {count !== undefined && (
                  <span
                    className="Counter"
                    style={
                      isActive
                        ? { backgroundColor: "var(--color-neutral-emphasis)", color: "var(--color-fg-on-emphasis)" }
                        : undefined
                    }
                  >
                    {count}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
