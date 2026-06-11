# AGENTS.md - AI Agent Configuration

This file provides guidance for AI coding agents working with this project.

## Project Overview

**aguita.site** - Personal portfolio and AI assistant for awa (Full Stack Developer & AI Engineer)

### Tech Stack
- **Framework**: Next.js 16.2.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: anime.js 3.2.2 + GSAP 3.15.0
- **AI**: Transformers.js (local AI in browser)
- **Database**: Supabase (Realtime for ncmpcpp music sync)
- **Deployment**: Vercel

### Key Features
- 9-tab portfolio (Overview, Repositories, Models, Papers, OpceanAI, Lab, Now, Stars, Contact)
- Local AI assistant "awa" with multi-agent architecture
- Real-time music display from ncmpcpp via Supabase
- WebGL background effects
- Custom cursor with magnetic effects
- Easter eggs (type "doki", "hack", "42")

## Project Structure

```
aguita.site/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with tabs
│   └── globals.css         # Global styles
├── components/
│   ├── TopHeader.tsx       # Header with gradient text
│   ├── ProfileSidebar.tsx  # Sidebar with file tree
│   ├── NavTabs.tsx         # Navigation tabs
│   ├── WebGLBackground.tsx # WebGL effects
│   ├── CustomCursor.tsx    # Custom cursor
│   ├── TerminalOverlay.tsx # Terminal overlay
│   ├── AIAssistant.tsx     # AI chat interface
│   ├── NowPlaying.tsx      # Music display
│   ├── EasterEggs.tsx      # Easter eggs
│   └── ui/                 # Reusable UI components
│       ├── MagneticButton.tsx
│       ├── GradientText.tsx
│       ├── AnimatedCounter.tsx
│       ├── ScrollReveal.tsx
│       └── TypingEffect.tsx
├── hooks/
│   ├── use-anime.ts        # anime.js hooks
│   └── use-gsap.ts         # GSAP hooks
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── assistant-context.ts
│   ├── assistant-knowledge.ts
│   ├── assistant-commands.ts
│   ├── assistant-commands-tools.ts
│   ├── assistant-web-search.ts
│   ├── assistant-router.ts
│   └── use-ai-tools.ts
├── scripts/
│   ├── ncmpcpp-sync.py     # Music sync script
│   ├── setup-ncmpcpp.sh    # Setup script
│   └── supabase-setup.sql  # Database schema
└── supabase/               # Supabase Agent Skill
    ├── SKILL.md
    └── references/
```

## Commands

### Development
```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
```

### Database
```bash
# Run SQL in Supabase dashboard
# Or use the SQL in scripts/supabase-setup.sql
```

### Music Sync (ncmpcpp)
```bash
# Setup
bash scripts/setup-ncmpcpp.sh

# Run sync
python scripts/ncmpcpp-sync.py
```

## Environment Variables

Required in `.env.local` and Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=https://fpnndflqpwgxbhjbtaas.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Agent Skills

This project includes Supabase Agent Skills:

### supabase
Comprehensive Supabase development skill covering all Supabase products and integrations.

**Use when:**
- Working with Supabase products (Database, Auth, Edge Functions, Realtime, Storage)
- Using client libraries (supabase-js, @supabase/ssr)
- Troubleshooting auth issues
- Using Supabase CLI or MCP server

### supabase-postgres-best-practices
Postgres performance optimization guidelines from Supabase.

**Use when:**
- Writing SQL queries or designing schemas
- Implementing indexes or query optimization
- Reviewing database performance issues
- Configuring connection pooling or scaling

## MCP Configuration

Supabase MCP is configured in `~/.config/opencode/opencode.json`:
```json
{
  "mcp": {
    "supabase": {
      "type": "remote",
      "url": "https://mcp.supabase.com/mcp?project_ref=fpnndflqpwgxbhjbtaas&read_only=true&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching",
      "enabled": true
    }
  }
}
```

## Build Notes

- Uses `--webpack` flag for builds (Turbopack not supported on Android)
- `typescript: { ignoreBuildErrors: true }` in next.config.mjs
- Static export with `output: 'export'`
- Images unoptimized for static hosting

## Key Patterns

### Animation Hooks
```typescript
// anime.js
import { useAnime } from '@/hooks/use-anime'

// GSAP
import { useScrollReveal } from '@/hooks/use-gsap'
```

### Supabase Realtime
```typescript
import { subscribeToNowPlaying } from '@/lib/supabase'

const unsubscribe = subscribeToNowPlaying((data) => {
  // Handle real-time updates
})
```

### AI Assistant
```typescript
// Multi-agent routing
import { routeMessage } from '@/lib/assistant-router'

// Available agents: command, knowledge, web, tool, chat
```

## Common Tasks

### Adding a new tab
1. Create component in `components/tabs/`
2. Add to tabs array in `app/page.tsx`
3. Update `NavTabs.tsx` if needed

### Modifying AI behavior
1. Edit `lib/assistant-context.ts` for system prompt
2. Edit `lib/assistant-knowledge.ts` for knowledge base
3. Edit `lib/assistant-commands.ts` for commands

### Updating database schema
1. Edit `scripts/supabase-setup.sql`
2. Run SQL in Supabase dashboard
3. Update TypeScript types in `lib/supabase.ts`

## Deployment

```bash
git add -A
git commit -m "feat: description"
git push origin master
# Auto-deploys to Vercel
```

## Troubleshooting

### Build fails with Turbopack error
Use `pnpm build --webpack` instead of `pnpm build`

### anime.js or supabase not found
Run `pnpm install` to ensure dependencies are installed

### ncmpcpp sync not working
1. Check MPD is running: `mpc status`
2. Check script is running: `ps aux | grep ncmpcpp-sync`
3. Check Supabase credentials in script

## Resources

- **Live site**: https://aguita.site
- **GitHub**: https://github.com/awa-omg/aguita.site
- **Supabase**: https://supabase.com/dashboard/project/fpnndflqpwgxbhjbtaas
- **Vercel**: https://vercel.com/dashboard
