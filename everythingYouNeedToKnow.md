# Everything You Need to Know — Portfolio

A deep-dive into every technical decision, data flow, component architecture, and design pattern used in this portfolio. This document is intentionally exhaustive — meant for future reference, onboarding, or revisiting months later when you've forgotten how something works.

---

## Table of Contents

1. [Stack & Versions](#stack--versions)
2. [App Bootstrap & Entry Points](#app-bootstrap--entry-points)
3. [Routing](#routing)
4. [Theme System](#theme-system)
5. [Global State — GithubContext](#global-state--githubcontext)
6. [Layout — Main.jsx](#layout--mainjsx)
7. [Shared Infrastructure — hooks/, lib/, and the section components](#shared-infrastructure--hooks-lib-and-the-section-components)
8. [Navigation](#navigation)
9. [Pages in Detail](#pages-in-detail)
   - [Home (the single-scroll page)](#home-the-single-scroll-page)
   - [About](#about)
   - [Work (the retired /projects page, reused)](#work-the-retired-projects-page-reused)
   - [Case Studies](#case-studies)
   - [Build Archive (Frontend Lab)](#build-archive-frontend-lab)
   - [GitHub Dashboard](#github-dashboard)
   - [Contact](#contact)
   - [Settings](#settings)
10. [Contact Form — End-to-End Flow](#contact-form--end-to-end-flow)
11. [Animation System](#animation-system)
12. [Config / Single Source of Truth](#config--single-source-of-truth)
13. [Image Organization](#image-organization)
14. [Deployment & Environment Variables](#deployment--environment-variables)
15. [Known Quirks & Non-Obvious Decisions](#known-quirks--non-obvious-decisions)

---

## Stack & Versions

| Tool | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework |
| Tailwind CSS | 4.2.4 | Styling, via `@tailwindcss/vite` — no config file, tokens live in `index.css` under `@theme inline` |
| Framer Motion | 12.38.0 | All animations |
| Lenis | 1.3.26 | Smooth scroll, driven by a `requestAnimationFrame` loop in `Main.jsx` |
| Vite | 8.0.10 (rolldown) | Build tool + dev server |
| vite-imagetools | 12.0.0 | Build-time image pipeline — converts every import to WebP with no call-site changes |
| React Router DOM | 6.15.0 | Client-side routing, `createBrowserRouter` + `React.lazy` per route |
| axios | 1.4.0 | GitHub API requests |
| react-hook-form | 7.45.4 | Contact form validation |
| react-hot-toast | 2.6.0 | Toast notifications |
| react-helmet-async | 1.3.0 | Dynamic `<title>` / meta tags per page |
| @iconify/react | 6.0.2 | Icon library (lucide icons via `lucide:*` prefix) |
| lucide-react | 1.14.0 | Also imported directly in some places |
| swiper | 12.1.3 | Mini-projects / build-archive carousel |
| react-github-calendar | 4.0.1 | Contribution graph, wrapped by `ContributionGraph.jsx` |
| Prettier | 3.0.2 | Code formatting |
| prettier-plugin-tailwindcss | 0.5.3 | Auto-sorts Tailwind class names |

**Important Tailwind v4 notes:**
- No `tailwind.config.js`. Theme tokens live in CSS: `@theme inline` in `index.css` maps `--color-X: var(--X)`, which is what makes `text-X`/`bg-X` utilities exist for every custom token.
- Opacity modifier syntax: `text-textColor/80` (not `text-textColor opacity-80`).
- `bg-linear-to-r` instead of `bg-gradient-to-r`.
- **`@layer` matters more than it looks.** Anything written as plain CSS outside an explicit `@layer` block sits *above* the whole `@layer theme, base, components, utilities` stack, regardless of specificity — it beats every Tailwind utility unconditionally. `index.css`'s global resets (`html,body,#root`, `h1,h2,p{margin:0}`, etc.) are wrapped in `@layer base` specifically so utilities can override them; three real bugs (font-family not applying, `space-y-*` gaps silently collapsing to zero, a vendored library's own `display:flex` beating a `hidden` class) all traced back to this exact trap before the base layer was fixed.

---

## App Bootstrap & Entry Points

### `src/main.jsx`
Standard React 18 entry point. Mounts `<App />` into `#root`.

### `src/App.jsx`
- Defines the router via `createBrowserRouter`.
- Wraps everything in `<GithubProvider>` (outer) and `<ThemeProvider>` (inner).
- **Home stays eager**; every other route is `React.lazy` + `Suspense`, each wrapped individually (`split(Component)`) so a slow chunk only blanks the page body — nav, footer, and back button stay mounted. The five case-study pages alone are ~2,300 lines and are reached by a minority of visitors, so they have no business in the initial download.
- `RouteFallback.jsx` is the shared Suspense fallback; it waits ~250ms before showing anything so a warm-cache navigation never flashes a spinner.

---

## Routing

All routes are children of a single `<Main />` layout element, so every page shares the same NavBar, Footer, BottomNav, and SocialSidebar.

```
/                          → MainScrollPage — the whole home experience (see below)
/projects                  → redirects to /#projects (retired — see note)
/about                     → About
/projects/taskforge        → TaskForge case study
/projects/cinegraph        → Netflix-GPT / Cinegraph case study
/projects/biteswift        → BiteSwift case study
/projects/bookverse        → BookVerse case study
/projects/portfolio        → Portfolio case study
/github                    → GitHub Dashboard
/frontend-lab              → Build Archive (UIExperiments)
/settings                  → Settings (theme picker)
```

**`/projects` is retired, not missing.** It used to be a standalone page showing the same five projects the home page's Work section now renders (`Projects.jsx` mounted with `asSection`). Keeping both meant maintaining one design twice and giving visitors two URLs for identical content, so the route now does `<Navigate to="/#projects" replace />` and any old links land on the right section of home instead of a dead page.

**Error handling:** The root route has `errorElement: <ErrorPage />`. The `/github` route has an additional `errorElement: <GithubError />` for API-specific errors.

**`features/articles/` no longer exists.** An earlier version of this doc noted a commented-out `/articles` route with an `Articles.jsx`/`ArticleCard.jsx`/`apiArticles.js` feature "on hold." It was deleted outright in a later cleanup pass, along with several other dead components (`CustomCursor`, the standalone `ProjectTimeline.jsx`, `Explorer.jsx`, `SideBar.jsx`, `LiveClock.jsx`, `ProjectCard.jsx`, `Tag.jsx`) — all confirmed to have zero remaining importers before removal. None of them exist in the codebase anymore; don't go looking for them.

---

## Theme System

### How it works

1. `ThemeProvider` (`src/context/ThemeContext.jsx`) stores the active theme key in React state.
2. On change, it writes to `localStorage` under `"portfolio-theme"`.
3. On mount, it reads from `localStorage` or defaults to `"github"`.
4. The theme key is applied as a CSS class on the root `<div>` in `Main.jsx`: `theme-${theme}`.
5. Each `.theme-X` class in `index.css` sets values for `--mainBg`, `--textColor`, `--textSecondary`, `--textMuted`, `--accentColor`, `--explorerBorder`, `--articleBg`, `--dangerText`, `--bgText`, and more.
6. `@theme inline` maps every one of those to a `--color-*` token, which is what makes `text-textColor`, `bg-mainBg`, `text-accentColor`, etc. exist as real Tailwind utilities that resolve to the active theme's values.

### The 6 themes

| Display Name | Key | Background | Accent | Character |
|---|---|---|---|---|
| Code Abyss | `github` | `#24292e` | `#f9826c` (salmon) | GitHub's official dark |
| Polar Breeze | `nord` | `#2e3440` | `#88c0d0` (ice blue) | Arctic, calm |
| Midnight Velvet | `dracula` | `#282a36` | `#bd93f9` (purple) | Vibrant dark |
| Nocturnal Echo | `nightOwl` | `#011627` | `#6d8ca5` (slate) | Deep blue night |
| Golden Mirage | `ayuMirage` | `#1f2430` | `#e6b450` (gold) | Warm-cool balance |
| Stellar Onyx | `ayuDark` | `#0a0e14` | `#e6b450` (gold) | Deepest black |

Every text/background token pair in every theme is verified against WCAG AA (4.5:1 body, 3:1 large text) by sampling *rendered pixels*, not by parsing computed color strings — Tailwind v4 emits `color-mix(in oklab, …)` for opacity modifiers, which a regex-based contrast checker silently gets wrong.

### Accessing the theme in components

```jsx
import { useTheme } from "../../context/ThemeContext";
const { theme, changeTheme } = useTheme();
```

### Where theme can be changed

- **`FloatingThemeButton.jsx`** — despite the name, this is no longer a floating fixed-position button. It's mounted inline in `NavBar.jsx`, next to the resume download button, on every page. Shows a popup with all 6 theme options.
- **Settings page** (`/settings`) — full-page theme picker with larger `ThemeCard` previews showing a mock VS Code-style illustration via `ThemePreview`.

---

## Global State — GithubContext

### Why a context (not just local state in Github.jsx)

GitHub API data is fetched once at the `GithubProvider` level (wraps the entire app in `App.jsx`). Data survives navigation — visit `/github`, leave, come back, and there's no refetch. The loading/error state is also global, which is what lets the home page's GitHub section and the full `/github` dashboard share one fetch.

### What it fetches

`src/services/apiGithub.js` makes two parallel requests via `Promise.all`:
1. `GET https://api.github.com/users/sh1v-max` — user profile
2. `GET https://api.github.com/users/sh1v-max/repos?per_page=100` — all public repos

### Context values exposed

```js
{ user, repos, loading, error }
```

Everything derived from these (total stars, language mix, recently-pushed repos, featured/pinned repos) is computed in the consuming component, not the context — so the raw fetch stays reusable across every place that renders GitHub data.

---

## Layout — Main.jsx

The root layout, rendered once for the whole app:

1. `<ScrollToTop />` — resets scroll on route change.
2. `<Toaster />` (react-hot-toast) — themed per the active theme's bg/accent tokens.
3. A Lenis smooth-scroll instance, driven by its own `requestAnimationFrame` loop, with a `ResizeObserver` on the content wrapper (not `<body>` — Lenis pins `html`/`body` to the viewport height, so a `ResizeObserver` on them never fires) so a client-side route change to a taller/shorter page re-measures the scroll limit instead of keeping the previous page's cached value.
4. The root `<div className="theme-${theme} flex min-h-screen flex-col ...">` — always `min-h-screen`. Home is **not** a special-cased single-viewport `overflow-hidden` page anymore; it's the tallest page on the site (a full scroll of six sections).
5. `<NavBar />` — sticky top, contains the theme switcher.
6. `<main>` wrapping `<Pages />` (the `<Outlet />`).
7. `<Footer />` — always rendered, on every route including home.
8. `<BottomNav />` — mobile-only tab bar.
9. `<SocialSidebar />` — fixed left/right rails, desktop only (`xl:`, ≥1280px). See below.

---

## Shared Infrastructure — hooks/, lib/, and the section components

None of this existed in the earlier single-page-per-route version of the site. It's what makes the six home sections (and their standalone-page counterparts) share behavior instead of each reinventing it.

### `src/hooks/useActiveSection.js`
An `IntersectionObserver`-driven hook that reports which of the six home sections (`home`, `about`, `projects`, `lab`, `github`, `contact`) is currently in view (`rootMargin: "-30% 0px -70% 0px"`), plus whether the current route is `/` at all (`isMainPage`). Powers both `BottomNav`'s active-tab highlighting and `SectionRail`'s active dot.

### `src/hooks/useCopyToClipboard.js`
```js
const [copied, copy] = useCopyToClipboard(resetDelay = 2000);
```
`copy(text)` writes to the clipboard and flips `copied` true for `resetDelay` ms. One hook, reused everywhere an email address is shown as copyable: `Footer`, the nav mega-menu's Connect column, `SocialSidebar`'s vertical email link, `AboutTeaser`/`About.jsx`, `ContactTeaser`/`ContactSocials`. The reasoning (documented inline at every call site): `mailto:` links don't reliably open a compose window on every browser/OS, so copy is the fallback that always works.

### `src/lib/motion.js`
Shared Framer Motion tokens — `SPRING_LEAN`/`SPRING_ARRIVE`/`SPRING_STAGE`, `EASE_OUT`, `DUR_MICRO`/`DUR_STATE`/`DUR_ENTER`/`DUR_EXIT`, `STAGGER`, plus ready-made `sectionHeader`/`sectionItem` variants and a `REVEAL_ONCE` viewport config (`{ once: true, amount: 0.2 }`). Replaces what used to be five near-identical copy-pasted `hc`/`hi` variant objects, one per page.

### `src/components/SectionHeader.jsx`
The eyebrow/title/lede header every non-hero home section uses:
```jsx
<SectionHeader eyebrow="..." title="..." lede="..." size="lg|md|sm" href="/x" cta="..." />
```
`size` sets the type scale (`lg` for the Work section, `md` for About/Contact, `sm` for Build Archive/GitHub) so sections can signal relative importance without every header being visually identical.

### `src/components/SectionRail.jsx`
A vertical dot nav (home only, ≥1280px) tracking `useActiveSection`, styled to match `PageNavigator`'s existing dot language. `SocialSidebar` swaps its right-hand rail to render this in place of the vertical email link specifically on `/` — the contact form is already embedded on that page, so the floating email link would be a redundant second path to the same action.

### `src/features/home/StatRail.jsx`
The "5 projects · 33 builds · 6 themes · MERN + AI" line under the hero's social icons — every figure derived from the same arrays that render elsewhere on the page (project count, build-archive count), so it can't drift out of sync with reality.

### `src/components/Skeleton.jsx` / `ImagePlaceholder.jsx` / `RouteFallback.jsx`
Loading-state placeholders. `Skeleton` in particular is sized to the *exact measured height* of the real content it precedes in each section (documented via comments citing the specific pixel heights), which is what keeps CLS near zero when data arrives asynchronously.

---

## Navigation

### NavBar

**Desktop:**
- Brand: `SHIV.` links to `/`.
- Hamburger opens a mega-menu (not a simple dropdown): a spring-animated `clipPath` reveal with three columns — Navigate (Home/About/Work/Contact), Explore (Archive/GitHub), Connect (social links + copyable email).
- The mega-menu is **focus-trapped**: opening it moves focus to the first link inside; Tab/Shift+Tab wrap within the header card + panel; Escape closes it and returns focus to the hamburger button.
- Resume download button + theme switcher (`ThemeToggle`, formerly `FloatingThemeButton`) sit together on the right.
- A scrolling identity ticker ("FULL STACK DEVELOPER ✦ REACT & NODE.JS ✦ ...") renders **only on home**, fades on scroll, hides while the mega-menu is open.

**Mobile:** Same hamburger/mega-menu, full-width. `BottomNav` (a separate always-mounted component) is the primary mobile navigation surface — a persistent bottom tab bar.

### SocialSidebar

Two fixed rails, `xl:` only (≥1280px):
- **Left:** social icons (GitHub, Instagram, X, LinkedIn, LeetCode).
- **Right:** on `/`, renders `SectionRail` (scroll-position dot nav); on every other route, the vertical rotated email link with a small copy-to-clipboard icon beneath it.

### PageNavigator

A "Previous / Next" navigation shown at the bottom of the four standalone detail pages (`/about`, `/frontend-lab`, `/github`, `/contact`) — deliberately **not** rendered on the home scroll page, which has no "next page" concept of its own.

---

## Pages in Detail

### Home (the single-scroll page)

**Route:** `/` — rendered by `src/features/home/MainScrollPage.jsx`, which assembles six `<section id="...">` blocks in order and, on navigation with a `#hash` (e.g. arriving at `/#projects`), scrolls to that section after a short delay:

```jsx
<section id="home"><Home asSection /></section>
<section id="about"><AboutTeaser /></section>
<section id="projects"><Projects asSection /></section>
<section id="lab"><LabTeaser /></section>
<section id="github"><GithubTeaser /></section>
<section id="contact"><ContactTeaser /></section>
```

This is the core architectural fact about the current site: **home answers every question at summary depth in one scroll, and each section's door promises something genuinely deeper** — never just a smaller copy of the same content.

**`#home` — `Home.jsx` (mounted `asSection`)**
Hero, shortened to `~82dvh` (not a full viewport) so the About section peeks above the fold on load — this used to be a hard `100vh` with no scroll below it; now there's five more sections underneath and the hero deliberately signals that. Contains: status badge, cursive "Hi, I'm" + large `SHIV` heading, role subheading, description, two CTA buttons ("View My Work" scrolls to `#projects`, "Contact Me" → `/contact`), social icon links, `StatRail`, and a bouncing scroll-cue chevron (only rendered when `asSection`, i.e. only ever on this page).

**`#about` — `AboutTeaser.jsx`**
Three-column layout: identity (photo, name, role, location, **copyable email** — new; email wasn't shown here at all in the previous version), story (two paragraphs + quick-stat chips), skill matrix (grouped by `skillGroups` from `config.js`, not a flat list).

**`#projects` — `Projects.jsx` mounted with `asSection`** — see [Work](#work-the-retired-projects-page-reused) below.

**`#lab` — `LabTeaser.jsx`**
A dual counter-scrolling marquee (`MiniProjectsCarousel chromeless`) rather than a static grid — full-bleed width, texture nothing else on the page has, saying something true about the archive: a large continuous body of small work, not three selected pieces.

**`#github` — `GithubTeaser.jsx`** — see [GitHub Dashboard](#github-dashboard) below; the home section and the `/github` page share the same `ContributionGraph` component.

**`#contact` — `ContactTeaser.jsx`**
Mounts the real `ContactForm` inline (not a link to `/contact`) — this is the last section of the page, the moment a visitor is most likely to act, and it used to be the one section that couldn't be acted on without navigating away.

---

### About

**Route:** `/about` (also `AboutTeaser.jsx` on home — see above; this is the deep-dive version).

Sections: page header → Hero (photo + bio + Currently Learning mini-timeline + Resume/Get-In-Touch/**copy-email** buttons) → Code block (`aboutMe.json` styled terminal) + Journey timeline side by side → What I Do (5 service cards) → Tech Stack (`BentoSkills` + `MarqueeSkills`) → Education (`EducationAccordion`) → bottom CTA.

`PageNavigator` renders at the bottom (Previous: Home, Continue: Archive).

---

### Work (the retired `/projects` page, reused)

**File:** `src/features/projects/Projects.jsx`. Renders as home's `#projects` section (`asSection` prop demotes heading levels from `h1`→`h2` and `h2`→`h3` so the outline stays valid with the hero's `<h1>` earlier on the page) **and** would render standalone if visited directly — except nothing links to it standalone anymore, since `/projects` redirects to `/#projects`.

An editorial list, not a card grid: each project is a full-width row with title, dates, status badge, tech tags, and a description. Hovering a row shows a cursor-tracking floating image preview (desktop, `hover:hover` + `min-width:1024px` only) with a "View" button that opens the case study; the preview is `aria-hidden` since it duplicates the row's own link.

The Build Archive marquee that used to live at the bottom of this page moved to its own home section (`#lab`) — `asSection` drops it here entirely so it isn't shown twice.

---

### Case Studies

**Routes:** `/projects/taskforge`, `/projects/cinegraph`, `/projects/biteswift`, `/projects/bookverse`, `/projects/portfolio`.

Each is a standalone lazy-loaded page: hero → overview → tech stack → key features → desktop/mobile screenshots with a click-to-enlarge lightbox (keyboard nav `←`/`→`/`Esc`) → architecture/challenges → roadmap.

```jsx
const [lightboxIndex, setLightboxIndex] = useState(null);
// prev/next/close all wrapped in useCallback to keep the keydown useEffect's deps stable
```

---

### Build Archive (Frontend Lab)

**Route:** `/frontend-lab`. 34 total experiment entries (33 real builds + one "Coming Soon" placeholder — `realBuildCount` in `uiExperimentsData.js` excludes the placeholder). Filterable by level (Beginner/Intermediate/Advanced), category (UI/API/Games/Forms/Logic), and freetext search — all three combined via `useMemo`, local `useState` only, no URL params or persistence.

The home page's `#lab` section shows the same underlying carousel data (`MiniProjectsCarousel`) as a full-bleed marquee rather than the filterable grid this page uses.

---

### GitHub Dashboard

**Route:** `/github`. Also summarized on home's `#github` section (`GithubTeaser.jsx`) — both consume `GithubContext` and both render `ContributionGraph`.

Sections: `HeroProfile` → `StatsGrid` → `SkillsAndLearning` → `FeaturedRepos` (filtered to `pinnedRepos` from `config.js`, matched by exact repo name) → `ContributionGraph` → `QuickLinks`.

**`ContributionGraph.jsx` is real and interactive**, not a static image:
- **Hover** a day cell → a glassmorphic tooltip (`bg-white/10 backdrop-blur-md`, `text-white` main text, `text-white/70` for the date) shows the exact count and date. Glass genuinely does something here, unlike a card floating on a flat page: the tooltip sits directly over the calendar's own colored cells, so there's real color underneath it to blur.
- **Click** a day → opens that exact date on `github.com/{username}?tab=overview&from=X&to=X` in a new tab.
- The tooltip is **portalled to `document.body`** via `createPortal`, because the calendar renders inside cards with `overflow-hidden` and inside a scroll-reveal `motion.div` that leaves a resting `transform` on itself even at rest — either one silently breaks `position:fixed` math (a transformed ancestor becomes the containing block instead of the viewport) or clips a tooltip trying to pop out above the grid.
- The one number the REST API can't provide — a contributions total — isn't hardcoded or skipped. `react-github-calendar` computes it internally and renders it in its own `<footer>` ("1,157 contributions in the last year"); a `MutationObserver` reads that text back out via an `onTotalCount` callback prop instead of firing a second API call for the same number. When a caller supplies `onTotalCount`, the library's own footer is hidden (via direct `element.style.display`, not a `hidden` class — see the `@layer` note above for why a class doesn't work here).
- `compact` prop drops the dashboard-only chrome (heading, year tabs) for the home teaser's use.

**`pinnedRepos` in config.js:**
```js
["Netflix-GPT", "BiteSwift", "BookVerse", "Backend-Projects", "Practice-UI-design-React-and-JS", "JavaScript-DSA"]
```

---

### Contact

**Route:** `/contact`. Two columns: `ContactSocials` (GitHub/LinkedIn/email — email row has a copy button, plus Instagram/X/LeetCode/MonkeyType "Socials" row) and the form itself.

**`ContactForm.jsx` is the single shared component** mounted both here and inline on home's `#contact` section (`idPrefix` prop keeps input `id`s unique across the two mounts so they can coexist in the DOM without collision) — never forked, so the two can't drift apart.

Fields: name, email (regex validated), subject, message — all `react-hook-form`, client-side. Submit → `toast.promise()` wraps the fetch to `/.netlify/functions/contact` for automatic loading/success/error toasts; `reset()` clears the form on success.

---

### Settings

**Route:** `/settings`. All 6 themes as `ThemeCard` components with a `ThemePreview` VS Code-style illustration each. Clicking a card calls `changeTheme()`. Active theme's card is highlighted.

---

## Contact Form — End-to-End Flow

```
User fills form (on /contact OR inline on home's #contact section — same component)
  → react-hook-form validates (client-side)
  → handleSubmit calls sendEmail(data)
  → fetch POST to /.netlify/functions/contact with JSON body
  → Netlify serverless function (netlify/functions/contact.js):
      1. Checks HTTP method === POST
      2. Parses + validates JSON body
      3. Calls Resend API (https://api.resend.com/emails)
         - to: singhshiv0427@gmail.com, reply_to: sender's email
      4. Returns 200 { success: true } or 500 { error: ... }
  → toast.promise() shows loading/success/error
  → On success: form.reset()
```

**Environment variable:** `RESEND_API_KEY`, set in the Netlify dashboard, never committed. The function returns 500 locally unless you run `netlify dev` instead of `npm run dev`.

---

## Animation System

### Shared tokens (`src/lib/motion.js`)

Every page used to copy-paste its own `headerContainer`/`headerItem` stagger variants and its own easing curve. That's now `sectionHeader`/`sectionItem` + `EASE_OUT` (`[0.22, 1, 0.36, 1]`) + `DUR_ENTER`/`DUR_MICRO`/etc., imported wherever needed. Older standalone pages (About, Contact, the case studies) still carry their own local copies of the older `[0.25, 0.1, 0.25, 1]` easing pattern in places — both curves coexist in the codebase; new home-section work uses the shared tokens.

### Scroll-triggered sections

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={REVEAL_ONCE}  // { once: true, amount: 0.2 }
  transition={{ duration: DUR_ENTER, ease: EASE_OUT }}
>
```
`once: true` everywhere — animations don't replay when scrolling back up past an element.

### Card hover

```jsx
<motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, ease: EASE_OUT }}>
```
Simpler than the old spring-lift pattern (`y: -6, scale: 1.015`) in most of the newer section cards — a plain tween reads as more restrained at this scale.

### `prefers-reduced-motion`

Handled per-component, not globally suppressed: `ContributionGraph`'s cell-reveal wipe and `Home`'s scroll-cue bounce both check `window.matchMedia("(prefers-reduced-motion: reduce)")` and skip their own animation, while leaving short in-place feedback (hover color fades, a few-pixel lift) alone — per the philosophy documented in `index.css`: "reduce means reduce, not remove."

---

## Config / Single Source of Truth

**File:** `src/data/config.js`

```js
export const personal = { name, shortName, role, location, email, github, githubUsername, linkedin, linkedinUsername, instagram, twitter, leetcode, monkeytype };

export const stats = { themes: "6" };  // stats.projects was removed — every "N projects" figure on the
                                        // site is now derived live from the projects/build-archive arrays
                                        // themselves (see StatRail.jsx), not hand-maintained here.

export const skillGroups = [ { label: "Frontend", items: [...] }, { label: "Backend", items: [...] }, { label: "Tooling & AI", items: [...] } ];

export const availability = { open: true, label: "Available for work", detail: "..." };

export const pinnedRepos = [...];       // repo names to feature on GitHub dashboard — matched exactly
export const githubSkills = [...];      // skills listed on GitHub dashboard
export const currentlyLearning = [...]; // learning items on GitHub dashboard + About
```

`apiGithub.js` reads `personal.githubUsername` to build the API URLs; changing it there is all you need to point the whole site at a different GitHub account.

---

## Image Organization

```
src/assets/images/       # Project screenshots, profile photo (peakpx.jpg), per-project subfolders
src/assets/frontend-lab/ # Thumbnail images for build-archive experiments
src/assets/docs/resume.pdf
```

**How images are imported:** statically, at the top of each file. `vite-imagetools` intercepts every import at build time via a `defaultDirectives` hook in `vite.config.js` and converts it to WebP (quality 78, capped at 1600px width) with **no call-site changes required** — the PNGs on disk stay the editable source of truth. Per-import overrides still work (`?format=png`, `?w=600;1200&as=srcset`).

---

## Deployment & Environment Variables

**Platform:** Netlify, continuous deployment from `main`.

```
Build command: npm run build
Publish directory: dist
```

| Variable | Value | Used in |
|---|---|---|
| `RESEND_API_KEY` | API key from resend.com | `netlify/functions/contact.js` |

**GitHub API:** no auth token, public endpoints only, 60 req/hr unauthenticated — fine for a portfolio's traffic. Add a personal access token to `apiGithub.js`'s axios headers if that ever becomes a bottleneck.

---

## Known Quirks & Non-Obvious Decisions

**Why does `GithubContext` wrap the entire app, not just the GitHub page?**
So data is fetched once on app load, not on first visit to `/github` — meaning both the home page's GitHub section and the full dashboard are instant regardless of visit order.

**Why is home no longer a single `h-screen overflow-hidden` viewport?**
It was, in an earlier version — one hero, no scroll. The site was rebuilt around a different thesis: home should answer every question (identity, work, activity, contact) at summary depth in one scroll, with each section's door promising real depth beyond it. The hero is now `~82dvh` specifically so the next section peeks above the fold as a visible invitation to keep scrolling.

**Why is `/projects` a redirect instead of a page?**
It used to render the same five projects the home page's Work section now renders. Once that UI moved onto home, keeping the old route meant maintaining one design in two places and giving visitors two URLs for identical content — so it's now `<Navigate to="/#projects" replace />`.

**Why did the contribution total move from "can't get this" to a real number?**
The REST endpoints in use (`/users/:name`, `/users/:name/repos`) don't carry a contributions total — that needs GraphQL + an auth token. Rather than add that, the fix reads the number `react-github-calendar` already computes internally and renders in its own footer, via a `MutationObserver` + callback prop. No second fetch, no fabrication.

**Why is the mega-menu focus-trapped?**
Before, Tab could walk keyboard focus out of the open panel onto page content still visible underneath it, and closing the menu left focus wherever Tab had wandered. Now opening it moves focus to the first panel link, Tab/Shift+Tab wrap within the header card + panel, and Escape returns focus to the hamburger button.

**Why copy-to-clipboard instead of just `mailto:` links everywhere?**
`mailto:` links don't reliably open a compose window on every browser/OS — some open nothing, some open a mail app nobody's signed into. Copy always works, so it's now the primary affordance everywhere an email address appears, with the `mailto:` link kept alongside as a secondary path where the element was already a link (e.g. `Footer`, `ContactSocials`).

**Why is a plain CSS rule sometimes powerless against a Tailwind utility, and sometimes not?**
Cascade layers. `@import "tailwindcss"` declares `@layer theme, base, components, utilities` up front; anything written as plain, unlayered CSS elsewhere in the file sits *above that entire stack* regardless of specificity or source order. This bit the project three separate times before the pattern was recognized: a `font-family: Inter` rule on `body` silently defeated `.font-Inconsolata`/`.font-Cursive` for months; `h1,h2,p{margin:0}` silently zeroed out every `space-y-*` gap where a paragraph or heading wasn't the last child; and `react-github-calendar`'s own vendored `footer{display:flex}` rule made a `hidden` Tailwind class a no-op, requiring a direct `element.style.display` override instead. The general fix, applied to `index.css`'s global resets: wrap them in `@layer base` so they participate in the layer system instead of silently outranking it.

**Why `min-width: 0` shows up on grid/flex items that otherwise "shouldn't need it"?**
Flex and grid items default to `min-width: auto`, which means "don't shrink below your content's natural size" — this silently overrides `flex-1`/`truncate` on a descendant if the item itself doesn't also carry `min-w-0`. It's masked as long as content happens to fit without needing to shrink, which is exactly what made it a latent bug in several contact-channel rows: they looked fine until a copy button was added and the row's content finally needed to shrink, at which point the whole row grew past its grid track and caused page-wide horizontal overflow. Fix is always the same: add `min-w-0` to the actual constraining ancestor (which the browser DevTools' `getBoundingClientRect()` on each ancestor in turn will reveal — it's rarely the element you'd guess first).

**`bg-linear-to-r` (not `bg-gradient-to-r`), `text-textColor/80` (not `opacity-80`).**
Tailwind v4 utility renames — the old names still work in some contexts but produce IDE warnings and aren't the canonical form.
