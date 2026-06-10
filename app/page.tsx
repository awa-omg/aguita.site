"use client"

import { useState } from "react"
import { TopHeader } from "@/components/TopHeader"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { NavTabs } from "@/components/NavTabs"
import { OverviewTab } from "@/components/tabs/OverviewTab"
import { RepositoriesTab } from "@/components/tabs/RepositoriesTab"
import { ModelsTab } from "@/components/tabs/ModelsTab"
import { PapersTab } from "@/components/tabs/PapersTab"
import { OpceanAITab } from "@/components/tabs/OpceanAITab"
import { StarsTab } from "@/components/tabs/StarsTab"
import { ContactTab } from "@/components/tabs/ContactTab"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <TopHeader />
      
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <ProfileSidebar />
          
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="animate-fade-in">
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "repositories" && <RepositoriesTab />}
              {activeTab === "models" && <ModelsTab />}
              {activeTab === "papers" && <PapersTab />}
              {activeTab === "opceanai" && <OpceanAITab />}
              {activeTab === "stars" && <StarsTab />}
              {activeTab === "contact" && <ContactTab />}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
