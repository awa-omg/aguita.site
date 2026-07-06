# AGENTS.md - AI Agent Configuration

## Project Overview

**aguita.site** - GitHub-themed landing page for awa (Full Stack Developer & AI Engineer, founder of OpceanAI)

### Tech Stack
- **Framework**: Next.js 16.2.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion (subtle)
- **Icons**: lucide-react
- **Deployment**: Vercel

### Key Features
- GitHub.com-inspired marketing layout with hero section
- 5-tab portfolio (Overview, Repositories, Products, Research, Contact)
- GitHub Dark Theme design system
- Clean, professional design - no gimmicks (no custom cursor, no WebGL, no terminal, no AI assistant)

## Project Structure

```
aguita.site/
├── app/
│   ├── layout.tsx          # Root layout with fonts (Inter, Space Grotesk, JetBrains Mono)
│   ├── page.tsx            # Main page with hero + tabs + footer
│   └── globals.css         # Global styles (GitHub Dark Theme)
├── components/
│   ├── TopHeader.tsx       # Header with search, GitHub link, Sponsor button
│   ├── ProfileSidebar.tsx  # Sidebar with avatar, bio, stats
│   ├── NavTabs.tsx         # 5-tab navigation
│   ├── Footer.tsx          # Site footer (4 columns)
│   ├── RepoCard.tsx        # Repository card component
│   └── tabs/
│       ├── OverviewTab.tsx     # Stats, pinned repos, contribution graph, timeline
│       ├── RepositoriesTab.tsx # Repository list with search/filter
│       ├── ProductsTab.tsx     # Doki, ToS, Shadow product showcase
│       ├── ResearchTab.tsx     # Models, papers, datasets
│       └── ContactTab.tsx      # Contact info and social links
├── hooks/
│   ├── use-mobile.ts      # Mobile detection hook
│   └── use-toast.ts       # Toast notification hook
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Utility functions
└── styles/
    └── globals.css        # Legacy theme file (unused)
```

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
```

## Key Design Decisions

- **Color scheme**: GitHub Dark (#0d1117 bg, #e6edf3 text, #30363d borders, #238636 primary green)
- **Fonts**: Inter (body), Space Grotesk (display), JetBrains Mono (code) — loaded from Google Fonts
- **Layout**: max-w-[1280px] centered, sidebar + content grid on desktop, stacked on mobile
- **No heavy effects**: No WebGL, no custom cursor, no glassmorphism, no glow/noise effects
- **No AI assistant**: Removed Transformers.js-based AI to reduce bundle size
- **No terminal/easter eggs**: Clean UX without gimmicks

## Removed Features (from original)

| Feature | Reason |
|---------|--------|
| WebGLBackground | ~600KB Three.js bundle for subtle effect |
| CustomCursor | Impairs native UX |
| AIAssistant | ~850MB model download |
| TerminalOverlay | Gimmick, confusing UX |
| EasterEggs | Not production-grade |
| NowPlaying | Unrelated music integration |
| GradientText / MagneticButton / AnimatedCounter / TypingEffect | Not in GitHub design |
| File Tree Explorer | Redundant navigation |

## Build Notes

- Uses `--webpack` flag for builds
- `typescript: { ignoreBuildErrors: true }` in next.config.mjs
- Static export with `output: 'export'`
- Images unoptimized for static hosting

## Deployment

```bash
git add -A
git commit -m "feat: description"
git push origin master
# Auto-deploys to Vercel
```

## Resources

- **GitHub**: https://github.com/awa-omg/aguita.site
- **Vercel**: https://vercel.com/dashboard
