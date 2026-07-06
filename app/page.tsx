"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TopHeader } from "@/components/TopHeader"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { NavTabs } from "@/components/NavTabs"
import { Footer } from "@/components/Footer"
import { OverviewTab } from "@/components/tabs/OverviewTab"
import { RepositoriesTab } from "@/components/tabs/RepositoriesTab"
import { ProductsTab } from "@/components/tabs/ProductsTab"
import { ResearchTab } from "@/components/tabs/ResearchTab"
import { ContactTab } from "@/components/tabs/ContactTab"
import { ChevronRight, ArrowUpRight } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", component: OverviewTab },
    { id: "repositories", label: "Repositories", component: RepositoriesTab },
    { id: "products", label: "Products", component: ProductsTab },
    { id: "research", label: "Research", component: ResearchTab },
    { id: "contact", label: "Contact", component: ContactTab },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || OverviewTab

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <TopHeader />

      <section className="border-b border-[#3d444d]">
        <div className="max-w-[1280px] mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-mono text-[#3fb950] mb-4 tracking-wide"
              >
                awa &middot; OpceanAI
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[40px] md:text-[56px] font-semibold leading-[1.1] text-[#f0f6fc] tracking-[-0.02em]"
              >
                Infrastructure and AI for the{" "}
                <span className="text-[#4493f8]">next billion devices</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg text-[#9198a1] max-w-xl leading-relaxed"
              >
                Building open source infrastructure — from OCI containers on Android to LLMs
                trained on $150 phones. Creator of Doki, Yuuki, ToS, and the Imprint Theory framework.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <a
                  href="https://github.com/awa-omg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#238636] border border-[#2ea043] rounded-md hover:bg-[#29903b] hover:border-[#3fb950] transition-all duration-200"
                >
                  Follow on GitHub
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://github.com/sponsors/awa-omg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#f0f6fc] bg-[#151b23] border border-[#3d444d] rounded-md hover:bg-[#3d444d] transition-all duration-200"
                >
                  Sponsor
                  <ChevronRight size={16} />
                </a>
                <a
                  href="https://github.com/OpceanAI/Doki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#4493f8] hover:text-[#4493f8] hover:underline transition-all duration-200"
                >
                  Explore Doki &rarr;
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden md:flex items-center justify-center w-[340px] h-[340px] rounded-xl border border-[#3d444d] bg-[#151b23] flex-shrink-0"
            >
              <div className="text-center">
                <svg height="80" viewBox="0 0 16 16" width="80" fill="#9198a1" className="mx-auto mb-3">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                </svg>
                <p className="text-sm text-[#9198a1]">awa-omg</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 min-w-0">
            <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
