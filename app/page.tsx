"use client"

import { useState } from "react"
import { TopHeader } from "@/components/TopHeader"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { NavTabs } from "@/components/NavTabs"
import { Footer } from "@/components/Footer"
import { OverviewTab } from "@/components/tabs/OverviewTab"
import { RepositoriesTab } from "@/components/tabs/RepositoriesTab"
import { ProductsTab } from "@/components/tabs/ProductsTab"
import { ResearchTab } from "@/components/tabs/ResearchTab"
import { ContactTab } from "@/components/tabs/ContactTab"

const tabs = [
  { id: "overview",      component: OverviewTab },
  { id: "repositories",  component: RepositoriesTab },
  { id: "products",      component: ProductsTab },
  { id: "research",      component: ResearchTab },
  { id: "contact",       component: ContactTab },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  const ActiveComponent =
    tabs.find((t) => t.id === activeTab)?.component ?? OverviewTab

  return (
    <div
      style={{ backgroundColor: "var(--color-canvas-default)", minHeight: "100vh" }}
    >
      <TopHeader />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "24px 16px 0",
        }}
      >
        {/* Two-column profile layout — collapses to one on mobile */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
          }}
          className="profile-layout"
        >
          {/* Sidebar — 296px wide, collapses below on mobile */}
          <ProfileSidebar />

          {/* Main content column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div style={{ paddingTop: "16px" }}>
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .profile-layout {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
