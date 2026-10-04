"use client"

import { SectionHead } from '@/components/chrome'

const MODELS = [
  {
    name: 'Yuuki-82M',
    description:
      'Small language model trained from scratch on a Redmi 12 (Snapdragon 685). GPT-2 architecture, 82M parameters, zero cloud budget.',
    tags: ['GPT-2', '82M params', 'Mobile training'],
    url: 'https://huggingface.co/OpceanAI/Yuuki-best',
  },
  {
    name: 'Yumo-1.5B',
    description: 'Lightweight language model based on LFM-1.5B architecture. Optimized for resource-constrained inference.',
    tags: ['LFM-1.5B', '1.5B params'],
    url: 'https://huggingface.co/YU-MO/Yumo',
  },
  {
    name: 'ELIZA',
    description: 'Classic NLP chatbot reimplemented with modern tooling. Pattern matching and rule-based dialogue system.',
    tags: ['NLP', 'Dialogue'],
    url: 'https://huggingface.co/OpceanAI/ELIZA',
  },
  {
    name: 'Ixari',
    description: '140 GB multilingual corpus used for pre-training and fine-tuning experiments across multiple model families.',
    tags: ['Dataset', 'Multilingual', '140 GB'],
    url: 'https://huggingface.co/datasets/OpceanAI/Ixari',
  },
  {
    name: 'Yuuki-MoE',
    description: 'Mixture of Experts variant — planned. Architecture exploration for improved inference efficiency on mobile hardware.',
    tags: ['MoE', 'Planned'],
    url: '',
  },
  {
    name: 'Iris',
    description: 'First model (internally renamed to Yuuki). GPT-2 based experimental checkpoint from early 2025.',
    tags: ['GPT-2', 'Experimental'],
    url: 'https://huggingface.co/OpceanAI/Yuuki-best',
  },
]

const PAPERS = [
  {
    title: 'Flux',
    subtitle: 'A Novel Architecture for Efficient Neural Network Training on Resource-Constrained Devices',
    ref: 'DOI 10.5281/zenodo.19042895',
    url: 'https://zenodo.org/records/19042895',
  },
  {
    title: 'Imprint Theory',
    subtitle: 'A Framework for Understanding Consciousness Through Information Integration Patterns',
    ref: 'DOI 10.5281/zenodo.18993995',
    url: 'https://zenodo.org/records/18993995',
  },
  {
    title: 'NHE — Not Humanity Exam',
    subtitle: 'Benchmark for Measuring Metacognition and Reasoning Patterns in Large Language Models',
    ref: 'huggingface.co/datasets/OpceanAI/NHE',
    url: 'https://huggingface.co/datasets/OpceanAI/NHE',
  },
]

const DATASETS = [
  ['Ixari', '140 GB multilingual pre-training corpus'],
  ['Alpaca-ko', 'Korean instruction-following dataset'],
  ['NHE benchmark', 'Metacognition and reasoning evaluation set'],
]

export function ResearchTab() {
  return (
    <div>
      <section aria-label="Models" style={{ marginBottom: 44 }}>
        <SectionHead no="04-A" title="Models & corpora" note="huggingface.co/OpceanAI" />
        <div>
          {MODELS.map((m) => (
            <article key={m.name} className="ledger-row">
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>
                  {m.url ? (
                    <a className="u-link" href={m.url} target="_blank" rel="noopener noreferrer">{m.name} ↗</a>
                  ) : m.name}
                </h3>
                <span className="label" style={{ marginLeft: 'auto', opacity: 0.7 }}>{m.tags.join(' · ')}</span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.6, maxWidth: 680 }}>{m.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Papers" style={{ marginBottom: 44 }}>
        <SectionHead no="04-B" title="Papers" note="zenodo" />
        <div>
          {PAPERS.map((p) => (
            <article key={p.title} className="ledger-row">
              <h3 className="font-display" style={{ margin: 0, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em' }}>
                <a className="u-link" href={p.url} target="_blank" rel="noopener noreferrer">{p.title} ↗</a>
              </h3>
              <p style={{ margin: '6px 0', fontSize: 14, lineHeight: 1.6, maxWidth: 680 }}>{p.subtitle}</p>
              <p className="label" style={{ margin: 0, opacity: 0.65 }}>{p.ref}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Datasets">
        <SectionHead no="04-C" title="Datasets" note="3 entries" />
        <div>
          {DATASETS.map(([k, v]) => (
            <div key={k} className="ledger-row" style={{ display: 'flex', gap: 16, paddingTop: 12, paddingBottom: 12 }}>
              <span className="label" style={{ minWidth: 140 }}>{k}</span>
              <span style={{ fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
