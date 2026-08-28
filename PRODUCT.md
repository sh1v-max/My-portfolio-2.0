# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers, senior engineers, and technical recruiters evaluating a full-stack/frontend developer for roles or freelance work. They arrive with a short attention span, high pattern-recognition for generic portfolios, and a real need to assess craft, depth, and personality from a single session.

## Product Purpose

A developer portfolio for Shiv Singh — a full-stack developer who builds production-grade React/Node applications. The portfolio's job is to make a hiring decision easy: demonstrate taste and craft through the design itself, surface real project depth, and make contact obvious. Success is an inbound message or offer.

## Positioning

The portfolio is itself a demonstration of the work — the craft of the UI is the first proof that the developer can build quality software. Most developer portfolios are identical grids of cards; this one uses motion, theme switching, and component quality as live evidence of skill.

## Operating Context

Viewed primarily on desktop (recruiters at a desk), secondarily on mobile (engineers checking a link). The visitor skims in under 90 seconds the first time; the projects page is where they slow down to actually evaluate. The page must reward depth without requiring it.

## Capabilities and Constraints

- Stack: React 18.2 + Vite 8 (rolldown) + Tailwind CSS v4 + Framer Motion 12 + React Router v6, Lenis smooth scroll
- Design system: CSS custom properties with 6 switchable themes (github, dracula, ayuDark, ayuMirage, nord, nightOwl), mapped through Tailwind v4's `@theme inline`
- Token set: `accentColor`, `textColor`, `textSecondary`, `textMuted`, `mainBg`, `articleBg`, `explorerBorder`, `dangerText`, `successText/Bg/Border`
- Projects data: static JS array in `project.js` and `miniProjects.js`
- Home (`/`) is a single continuous scroll assembling six sections via `MainScrollPage.jsx`: hero, About, Work (the retired `/projects` page's exact UI, reused), Build Archive, GitHub, Contact. `/projects` itself redirects to `/#projects` — it was retired, not duplicated, once its content moved onto home.
- Shared infra: `src/hooks/useActiveSection.js`, `src/hooks/useCopyToClipboard.js`, `src/lib/motion.js` (shared motion tokens), `src/components/SectionHeader.jsx`/`SectionRail.jsx`
- All visual design must work across all 6 themes via CSS tokens — no hardcoded palette

## Brand Commitments

- Name: Shiv (Shiv Singh), GitHub: sh1v-max
- Email: singhshiv0427@gmail.com
- The portfolio's own design is part of the portfolio's argument — it must be visually exceptional

## Evidence on Hand

- 5 featured projects: Portfolio, TaskForge, BookVerse, Cinegraph, BiteSwift
- 33+ mini/practice projects in Frontend Lab
- All project images exist as PNGs in `src/assets/images/`
- Live demo URLs exist for all featured projects

## Product Principles

1. **The design is the proof** — every pixel is the argument; generic is disqualifying
2. **Depth rewards the curious** — surface-level scan works; deeper engagement reveals more
3. **Motion earns its place** — no decorative animation; every transition carries meaning
4. **Theme agnostic** — the design must look exceptional across all 6 color themes
5. **Mobile-ready, desktop-first** — recruiters use desktops; the mobile experience is complete but secondary
