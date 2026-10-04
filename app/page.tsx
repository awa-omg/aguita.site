"use client"

import { useState } from 'react'
import { ChromeTop, Masthead } from '@/components/chrome'
import { ProfileRail } from '@/components/ProfileRail'
import { NavTabs } from '@/components/NavTabs'
import { Footer } from '@/components/Footer'
import { OverviewTab } from '@/components/tabs/OverviewTab'
import { RepositoriesTab } from '@/components/tabs/RepositoriesTab'
import { ProductsTab } from '@/components/tabs/ProductsTab'
import { ResearchTab } from '@/components/tabs/ResearchTab'
import { ContactTab } from '@/components/tabs/ContactTab'

const TAB_IDS = ['overview', 'repositories', 'products', 'research', 'contact']

function initialTab(): string {
  if (typeof window === 'undefined') return 'overview'
  const t = new URLSearchParams(window.location.search).get('tab')
  return t && TAB_IDS.includes(t) ? t : 'overview'
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div style={{ minHeight: '100vh' }}>
      <ChromeTop />
      <Masthead />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="wrap" style={{ paddingTop: 36 }}>
        <div className="rail-grid" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          <ProfileRail />
          <main id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} style={{ flex: 1, minWidth: 0 }}>
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'repositories' && <RepositoriesTab />}
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'research' && <ResearchTab />}
            {activeTab === 'contact' && <ContactTab />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
