# SHIV — Developer Portfolio

A cinematic, motion-heavy developer portfolio built with React and Tailwind CSS v4. Features 6 switchable themes, a live GitHub dashboard, per-project case studies with screenshot lightboxes, a cross-project timeline, 33+ UI experiments in a searchable lab, and a serverless contact form.

**Live:** [singhshiv.netlify.app](https://singhshiv.netlify.app/)  
**Source:** [github.com/sh1v-max/My-portfolio-2.0](https://github.com/sh1v-max/My-portfolio-2.0)

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Full-viewport hero with cinematic typography, CTA buttons, social links |
| `/about` | About | Bio, `aboutMe.json` code block, journey timeline, services, tech stack, education |
| `/projects` | Projects | Project cards, cross-project timeline, mini-projects carousel |
| `/projects/:slug` | Case Study | Deep-dive for each project with screenshots, lightbox, tech stack, lessons |
| `/frontend-lab` | Frontend Lab | 33+ UI experiments filterable by level and category |
| `/github` | GitHub Dashboard | Live GitHub API data — profile, stats, repos, contribution graph |
| `/contact` | Contact | Contact form (serverless) + social links |
| `/settings` | Settings | Theme picker with live preview |

---

## Features

**Theme System** — 6 hand-crafted themes persisted to `localStorage`. All colors are CSS custom properties; switching themes repaints the entire UI instantly with zero flickering.

| Theme name | Key | Accent |
|---|---|---|
| Code Abyss | `github` | Salmon / orange |
| Polar Breeze | `nord` | Ice blue / teal |
| Midnight Velvet | `dracula` | Purple |
| Nocturnal Echo | `nightOwl` | Slate blue |
| Golden Mirage | `ayuMirage` | Gold |
| Stellar Onyx | `ayuDark` | Deep gold |

**GitHub Dashboard** — Live data fetched from the GitHub REST API on page load via `GithubContext`. Displays profile card, repository stats (stars, forks, public repos, followers), skills panel, featured repos, contribution graph (`react-github-calendar`), and quick links. Error state handled gracefully.

**Contact Form** — `react-hook-form` for validation → Netlify serverless function → Resend API → email delivered to `singhshiv0427@gmail.com`. Toast notifications (react-hot-toast) for send progress, success, and error states.

**Case Studies** — Dedicated pages for TaskForge, Netflix-GPT, BiteSwift, BookVerse, and Portfolio. Each includes desktop + mobile screenshots with a click-to-enlarge lightbox (keyboard nav: `←`, `→`, `Esc`), tech stack, key features, architecture decisions, and a roadmap section.

**Project Timeline** — A vertical alternating timeline on the projects page showing all 5 projects in chronological order (newest first) with date ranges, status badges (Completed / Ongoing), tech tags, and Framer Motion scroll-triggered animations.

**Frontend Lab** — 33+ focused UI experiments categorized by difficulty (Beginner / Intermediate / Advanced) and category (UI / API / Games / Forms / Logic). Filterable and searchable, with stats on total projects per level.

**Navigation** — Sticky top navbar with a spring-animated active-link indicator (DOM-measured, unaffected by scroll position), live clock on large screens, and a resume download button. Mobile: slide-in drawer from the right. Persistent bottom nav bar on mobile. Floating theme picker fixed to the bottom-left corner of every page.

---

## Tech Stack

**Framework:** React 18  
**Styling:** Tailwind CSS v4 (Vite plugin)  
**Animation:** Framer Motion v12  
**Build:** Vite v8  
**Routing:** React Router v6 (`createBrowserRouter`)  
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
**Linting:** ESLint + eslint-plugin-react-hooks  
**Formatting:** Prettier + prettier-plugin-tailwindcss  

---

## Project Structure

```
src/
├── App.jsx                     # Router definition (all routes)
├── main.jsx                    # React entry point
├── data/
│   └── config.js               # Single source of truth — personal info, pinned repos, skills
├── context/
│   ├── ThemeContext.jsx         # Theme state + localStorage persistence
│   └── GithubContext.jsx       # GitHub API data, fetched once at app root
├── components/
│   ├── Main.jsx                # Root layout — NavBar, Pages outlet, Footer, BottomNav, FloatingThemeButton
│   ├── NavBar.jsx              # Sticky nav with spring indicator, mobile drawer
│   ├── BottomNav.jsx           # Mobile-only tab bar
│   ├── Footer.jsx
│   ├── Pages.jsx               # <Outlet /> wrapper
│   ├── PageNavigator.jsx       # Prev / Next page navigation
│   ├── ScrollToTop.jsx         # Scrolls to top on route change
│   ├── LiveClock.jsx           # Real-time clock in navbar
│   ├── Explorer.jsx            # VS Code-style sidebar (decorative)
│   ├── SideBar.jsx
│   ├── Tabs.jsx
│   └── ProjectButton.jsx       # Reusable demo/GitHub link button
├── features/
│   ├── home/
│   │   ├── Home.jsx            # Full-viewport hero
│   │   └── Illustration*.jsx   # SVG hero illustration (multiple zoom levels)
│   ├── about/
│   │   ├── About.jsx           # Bio, journey, services, education
│   │   ├── BentoSkills.jsx     # Bento-grid tech stack display
│   │   └── MarqueeSkills.jsx   # Auto-scrolling skill marquee
│   ├── projects/
│   │   ├── Projects.jsx        # Project grid + Timeline + Carousel
│   │   ├── ProjectCard.jsx     # Individual project card
│   │   ├── ProjectTimeline.jsx # Cross-project vertical alternating timeline
│   │   ├── MiniProjectsCarousel.jsx # Swiper carousel of mini projects
│   │   ├── MiniProjectCard.jsx
│   │   ├── Tag.jsx             # Tech tag chip
│   │   ├── project.js          # Featured project data + image imports
│   │   ├── miniProjects.js     # Mini project data
│   │   ├── TaskForgeDetail.jsx
│   │   ├── NetflixGPTDetail.jsx
│   │   ├── BiteSwiftDetail.jsx
│   │   ├── BookVerseDetail.jsx
│   │   └── PortfolioDetail.jsx
│   ├── github/
│   │   ├── Github.jsx          # GitHub dashboard page
│   │   └── components/
│   │       ├── HeroProfile.jsx
│   │       ├── StatsGrid.jsx
│   │       ├── StatCard.jsx
│   │       ├── FeaturedRepos.jsx
│   │       ├── RepoCardItem.jsx
│   │       ├── ContributionGraph.jsx
│   │       ├── SkillsAndLearning.jsx
│   │       ├── QuickLinks.jsx
│   │       ├── Badge.jsx
│   │       └── SectionTitle.jsx
│   ├── frontend-lab/
│   │   ├── UIExperiments.jsx   # Frontend lab page
│   │   ├── data/
│   │   │   └── uiExperimentsData.js  # 33+ experiment entries
│   │   ├── utils/
│   │   │   └── filterUtils.js  # Level + category + search filtering
│   │   └── components/
│   │       ├── HeroSection.jsx
│   │       ├── StatsCards.jsx
│   │       ├── FilterTabs.jsx
│   │       ├── SearchBar.jsx
│   │       ├── ExperimentsGrid.jsx
│   │       ├── ExperimentCard.jsx
│   │       └── EmptyState.jsx
│   ├── contact/
│   │   ├── Contact.jsx         # Form + socials
│   │   └── ContactSocials.jsx
│   ├── theme/
│   │   ├── Settings.jsx        # Full theme picker page (/settings)
│   │   ├── ThemeCard.jsx       # Theme preview card in settings
│   │   ├── FloatingThemeButton.jsx  # Fixed bottom-left theme switcher
│   │   ├── ThemeIllustration.jsx
│   │   └── ThemePreview.jsx
│   └── error/
│       ├── ErrorPage.jsx       # Router-level error boundary
│       └── GithubError.jsx     # GitHub-specific error state
├── services/
│   └── apiGithub.js            # axios wrapper for GitHub API calls
└── assets/
    ├── images/                 # Project screenshots, profile photo
    ├── docs/
    │   └── resume.pdf          # Downloadable resume
    └── frontend-lab/           # Thumbnail images for lab experiments

netlify/
└── functions/
    └── contact.js              # Serverless function — validates input, calls Resend API
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
