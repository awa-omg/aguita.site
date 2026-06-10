import { FileText, ExternalLink, Calendar } from "lucide-react"
import { motion } from "framer-motion"

const papers = [
  {
    title: "Flux: A New Architecture for True Language Understanding",
    doi: "10.5281/zenodo.19042895",
    url: "https://doi.org/10.5281/zenodo.19042895",
    abstract: "This paper introduces Flux, a novel architecture designed to achieve true language understanding in AI systems. The architecture represents a paradigm shift from pattern matching to genuine comprehension of semantic meaning and contextual relationships.",
    date: "2025",
    tags: ["AI/ML", "Architecture", "NLU"],
  },
  {
    title: "The Imprint Theory: A Universal Principle of Generative Processes",
    doi: "10.5281/zenodo.18993995",
    url: "https://doi.org/10.5281/zenodo.18993995",
    abstract: "We present the Imprint Theory, a universal principle that explains the fundamental mechanisms underlying generative processes in both artificial and natural systems. This framework provides new insights into how information is encoded, transformed, and generated.",
    date: "2025",
    tags: ["Theory", "Generative AI", "Research"],
  },
  {
    title: "The NHE, YHE, and BHE Benchmark Ecosystem for Cognitive Structure in Large Language Models",
    doi: "10.5281/zenodo.18996850",
    url: "https://doi.org/10.5281/zenodo.18996850",
    abstract: "This research introduces a comprehensive benchmark ecosystem consisting of NHE (Not Humanity Exam), YHE, and BHE, designed to evaluate cognitive structures and metacognitive abilities in large language models. The benchmarks measure how models reason about their own thinking processes.",
    date: "2025",
    tags: ["AI/ML", "Benchmarks", "LLMs"],
  },
]

export function PapersTab() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-[#8b949e]">
          Research publications and technical papers on Zenodo.
        </p>
      </div>

      <ul className="space-y-6">
        {papers.map((paper, i) => (
          <motion.li 
            key={paper.doi} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="p-6 border border-[#30363d] rounded-md bg-[#0d1117] hover:border-[#8b949e] transition-colors card-glow"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#21262d] rounded-md">
                <FileText className="w-6 h-6 text-[#8b949e]" />
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#388bfd] font-semibold text-lg hover:underline flex items-center gap-2"
                >
                  {paper.title}
                  <ExternalLink size={14} className="flex-shrink-0" />
                </a>
                
                <div className="flex items-center gap-3 mt-2 text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {paper.date}
                  </span>
                  <span className="font-mono">DOI: {paper.doi}</span>
                </div>

                <p className="mt-3 text-sm text-[#8b949e] leading-relaxed">
                  {paper.abstract}
                </p>

                <div className="flex gap-2 mt-4">
                  {paper.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs bg-[#388bfd]/10 text-[#388bfd] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
