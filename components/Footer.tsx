"use client"

export function Footer() {
  return (
    <footer className="border-t border-[#3d444d] mt-16">
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs font-semibold text-[#9198a1] uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="https://github.com/OpceanAI/Doki" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Doki</a></li>
              <li><a href="https://github.com/OpceanAI/ToS" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">ToS</a></li>
              <li><a href="https://github.com/OpceanAI/Shadow" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Shadow</a></li>
              <li><a href="https://github.com/awa-omg/yuuki-training" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Yuuki</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#9198a1] uppercase tracking-wider mb-4">Community</h3>
            <ul className="space-y-3">
              <li><a href="https://github.com/awa-omg" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">GitHub</a></li>
              <li><a href="https://huggingface.co/OpceanAI" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Hugging Face</a></li>
              <li><a href="https://github.com/sponsors/awa-omg" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Sponsor</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#9198a1] uppercase tracking-wider mb-4">Research</h3>
            <ul className="space-y-3">
              <li><a href="https://zenodo.org/records/15095465" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Flux Paper</a></li>
              <li><a href="https://zenodo.org/records/14897879" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Imprint Theory</a></li>
              <li><a href="https://huggingface.co/Not-Humanity-Exam" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">NHE Benchmark</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#9198a1] uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="https://opceanai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">OpceanAI</a></li>
              <li><a href="https://github.com/awa-omg" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">About</a></li>
              <li><a href="https://github.com/awa-omg/aguita.site" target="_blank" rel="noopener noreferrer" className="text-sm text-[#f0f6fc] hover:text-[#4493f8] transition-colors">Source</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-[#3d444d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9198a1]">&copy; {new Date().getFullYear()} awa &middot; OpceanAI</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/awa-omg" target="_blank" rel="noopener noreferrer" className="text-xs text-[#9198a1] hover:text-[#4493f8] transition-colors">Terms</a>
            <a href="https://github.com/awa-omg/aguita.site" target="_blank" rel="noopener noreferrer" className="text-xs text-[#9198a1] hover:text-[#4493f8] transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
