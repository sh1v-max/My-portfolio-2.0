# SHIV — Developer Portfolio

A single-page-scroll developer portfolio built with React 18 and Tailwind CSS v4. The home page answers every question — who I am, what I've shipped, what I'm building daily, how to reach me — at summary depth in one scroll; each section's "door" leads to a dedicated page that goes deeper. Six switchable themes, a live GitHub dashboard with a real, interactive contribution calendar, per-project case studies, a searchable build archive of 33 UI experiments, and a serverless contact form embedded directly on the page you're already on.

**Live:** [singhshiv.netlify.app](https://singhshiv.netlify.app/)
**Source:** [github.com/sh1v-max/My-portfolio-2.0](https://github.com/sh1v-max/My-portfolio-2.0)

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | One scroll: hero → About → Work → Build Archive → GitHub → Contact, each section a summary of its own deep-dive page |
| `/about` | About | Full bio, `aboutMe.json` code block, journey timeline, services, tech stack, education |
| `/projects/:slug` | Case Study | Deep-dive per project — screenshots, lightbox, tech stack, lessons. (`/projects` itself redirects to `/#projects`; the work section on home *is* the projects page, so a second identical route was retired) |
| `/frontend-lab` | Build Archive | 33 UI experiments, filterable by level and category |
| `/github` | GitHub Dashboard | Live GitHub API data — profile, stats, repos, and the full interactive contribution calendar |
| `/contact` | Contact | The same contact form embedded on home, plus every social channel |
| `/settings` | Settings | Theme picker with live preview |

---

## Features

**Theme System** — 6 hand-crafted themes persisted to `localStorage`. All colors are CSS custom properties mapped through Tailwind v4's `@theme inline`; switching themes repaints the entire UI instantly, verified for WCAG AA contrast across every token in every theme.

| Theme name | Key | Accent |
|---|---|---|
| Code Abyss | `github` | Salmon / orange |
| Polar Breeze | `nord` | Ice blue / teal |
| Midnight Velvet | `dracula` | Purple |
| Nocturnal Echo | `nightOwl` | Slate blue |
| Golden Mirage | `ayuMirage` | Gold |
| Stellar Onyx | `ayuDark` | Deep gold |

**GitHub Dashboard, honestly** — Every number traces to a real GitHub API response; nothing is invented. The contribution calendar is fully interactive: hover any day for a glassmorphic tooltip with the exact count and date, click a day to open it on GitHub itself. The one figure the REST API can't provide (a contributions total) is read back out of the calendar's own computed footer rather than faked or skipped.

**Copy-to-clipboard everywhere** — Email addresses across the site (Footer, nav mega-menu, sidebar, About, Contact) are one click to copy, since `mailto:` links don't reliably open a compose window on every browser/OS.

**Contact Form, embedded** — The same `ContactForm` component mounts both on `/contact` and inline in home's Contact section, so a visitor never has to leave the page to reach out. `react-hook-form` for validation → Netlify serverless function → Resend API → delivered to `singhshiv0427@gmail.com`.

**Case Studies** — Dedicated pages for TaskForge, Netflix-GPT, BiteSwift, BookVerse, and Portfolio. Desktop + mobile screenshots with a click-to-enlarge lightbox (keyboard nav: `←`, `→`, `Esc`), tech stack, key features, architecture decisions, roadmap.

**Build Archive** — 33 focused UI experiments categorized by difficulty (Beginner / Intermediate / Advanced) and category (UI / API / Games / Forms / Logic), filterable and searchable. Surfaces on home as a full-bleed, counter-scrolling marquee.

**Section rail navigation** — On home, a vertical dot rail (desktop, ≥1280px) tracks scroll position across all six sections and jumps to any of them; it takes the place of the floating email link on that one route, since the contact form is already on the page.

**Performance** — Route-level code splitting (`React.lazy` + `Suspense`) keeps every page but Home out of the initial bundle. Images pass through `vite-imagetools` at build time (WebP, capped width) with no call-site changes. Lenis-driven smooth scroll.

**Navigation** — Sticky navbar with a spring-animated mega-menu (focus-trapped, keyboard-navigable) and a scrolling identity ticker on home. Mobile: persistent bottom tab bar. Theme switcher lives in the navbar itself, next to the resume button, on every page.

---

## Tech Stack

**Framework:** React 18.2
**Styling:** Tailwind CSS v4 (Vite plugin)
**Animation:** Framer Motion 12
**Smooth scroll:** Lenis
**Build:** Vite 8 (rolldown)
**Routing:** React Router v6 (`createBrowserRouter`, lazy-loaded routes)
**State:** React Context API — `ThemeContext`, `GithubContext`
**Forms:** react-hook-form
**HTTP:** axios
**Icons:** @iconify/react, lucide-react
**Carousel:** Swiper.js
**SEO:** react-helmet-async
**Toasts:** react-hot-toast
**Serverless:** Netlify Functions
**Email:** Resend API
**GitHub Calendar:** react-github-calendar
**Image pipeline:** vite-imagetools
**Linting:** ESLint + eslint-plugin-react-hooks
**Formatting:** Prettier + prettier-plugin-tailwindcss

---

## Project Structure

```
src/
├── App.jsx                          # Router definition — all routes, lazy-split
├── main.jsx                         # React entry point
├── index.css                        # Theme tokens (@theme inline), global resets (@layer base)
├── data/
│   └── config.js                    # Single source of truth — personal info, skill groups, pinned repos
├── context/
│   ├── ThemeContext.jsx             # Theme state + localStorage persistence
│   └── GithubContext.jsx            # GitHub API data, fetched once at app root
├── hooks/
│   ├── useActiveSection.js          # IntersectionObserver-driven active section (home scroll rail, bottom nav)
│   └── useCopyToClipboard.js        # Shared copy-to-clipboard + "Copied!" state
├── lib/
│   └── motion.js                    # Shared Framer Motion tokens — springs, easing, durations, reveal variants
├── components/
│   ├── Main.jsx                     # Root layout — NavBar, Pages outlet, Footer, BottomNav, FloatingThemeButton
│   ├── NavBar.jsx                   # Sticky nav, mega-menu (focus-trapped), identity ticker
│   ├── SocialSidebar.jsx            # Fixed left/right rails — social icons + section rail (home) or email (elsewhere)
│   ├── SectionRail.jsx              # Vertical dot nav tracking scroll position on home
│   ├── SectionHeader.jsx            # Shared eyebrow/title/lede header used by every home section
│   ├── BottomNav.jsx                # Mobile-only tab bar
│   ├── Footer.jsx
│   ├── PageNavigator.jsx            # Prev / Next page navigation
│   ├── ScrollToTop.jsx              # Scrolls to top on route change
│   ├── BackButton.jsx
│   ├── RouteFallback.jsx            # Suspense fallback for lazy routes
│   ├── Skeleton.jsx                 # Loading-state placeholder, sized to the real content it precedes
│   ├── ImagePlaceholder.jsx
│   └── ProjectButton.jsx            # Reusable demo/GitHub link button
├── features/
│   ├── home/
│   │   ├── MainScrollPage.jsx       # Assembles the six home sections; scrolls to a section on /#hash
│   │   ├── Home.jsx                 # Hero — full-bleed name, StatRail, scroll cue (mounted `asSection`)
│   │   ├── StatRail.jsx             # "5 projects · 33 builds · 6 themes · MERN + AI" under the hero socials
│   │   ├── AboutTeaser.jsx          # Home's About section
│   │   ├── LabTeaser.jsx            # Home's Build Archive section (marquee)
│   │   ├── GithubTeaser.jsx         # Home's GitHub section
│   │   ├── ContactTeaser.jsx        # Home's Contact section — mounts the real ContactForm
│   │   ├── github/                  # Home-scoped GitHub sub-components (LanguageBar, languageMix.js)
│   │   └── Illustration*.jsx        # SVG hero illustration (multiple zoom levels)
│   ├── about/
│   │   ├── About.jsx                # Full bio, journey, services, education (/about)
│   │   ├── BentoSkills.jsx          # Bento-grid tech stack display
│   │   └── MarqueeSkills.jsx        # Auto-scrolling skill marquee
│   ├── projects/
│   │   ├── Projects.jsx             # Editorial project list — renders standalone AND as home's work section
│   │   ├── MiniProjectsCarousel.jsx # Dual counter-scrolling marquee (Build Archive)
│   │   ├── MiniProjectCard.jsx
│   │   ├── project.js               # Featured project data + image imports
│   │   ├── miniProjects.js          # Build Archive data
│   │   ├── TaskForgeDetail.jsx
│   │   ├── NetflixGPTDetail.jsx
│   │   ├── BiteSwiftDetail.jsx
│   │   ├── BookVerseDetail.jsx
│   │   └── PortfolioDetail.jsx
│   ├── github/
│   │   ├── Github.jsx               # GitHub dashboard page (/github)
│   │   └── components/
│   │       ├── HeroProfile.jsx
│   │       ├── StatsGrid.jsx
│   │       ├── FeaturedRepos.jsx
│   │       ├── ContributionGraph.jsx  # Real calendar — hover tooltips, click-through, shared by home + /github
│   │       ├── SkillsAndLearning.jsx
│   │       └── QuickLinks.jsx
│   ├── frontend-lab/
│   │   ├── UIExperiments.jsx        # Build Archive page (/frontend-lab)
│   │   ├── data/uiExperimentsData.js  # 33 experiment entries
│   │   ├── utils/filterUtils.js     # Level + category + search filtering
│   │   └── components/              # HeroSection, StatsCards, FilterTabs, SearchBar, ExperimentsGrid, ...
│   ├── contact/
│   │   ├── Contact.jsx              # /contact page
│   │   ├── ContactForm.jsx          # Shared form — mounted here AND on home, never forked
│   │   └── ContactSocials.jsx
│   ├── theme/
│   │   ├── Settings.jsx             # Full theme picker page (/settings)
│   │   ├── ThemeCard.jsx
│   │   ├── FloatingThemeButton.jsx  # Theme switcher, mounted in the navbar
│   │   └── ThemePreview.jsx
│   └── error/
│       ├── ErrorPage.jsx            # Router-level error boundary
│       └── GithubError.jsx          # GitHub-specific error state
├── services/
│   └── apiGithub.js                 # axios wrapper for GitHub API calls
└── assets/
    ├── images/                      # Project screenshots, profile photo
    ├── docs/resume.pdf              # Downloadable resume
    └── frontend-lab/                # Thumbnail images for lab experiments

netlify/
└── functions/
    └── contact.js                   # Serverless function — validates input, calls Resend API
```

---

## Local Development

```bash
git clone https://github.com/sh1v-max/My-portfolio-2.0.git
cd My-portfolio-2.0
npm install
npm run dev
```

The contact form requires the `RESEND_API_KEY` environment variable, which only works in the Netlify deployment context. The function will return a 500 locally unless you run `netlify dev`.

---

## Deployment

Deployed on **Netlify** with continuous deployment from the `main` branch.

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `RESEND_API_KEY` (set in Netlify dashboard)

---

## Contact

**Email:** [singhshiv0427@gmail.com](mailto:singhshiv0427@gmail.com)
**LinkedIn:** [shiv-shankar-singh-](https://www.linkedin.com/in/shiv-shankar-singh-/)
**GitHub:** [sh1v-max](https://github.com/sh1v-max/)

---

<div align="center">
  <p>Built from scratch by Shiv Shankar Singh</p>
</div>
