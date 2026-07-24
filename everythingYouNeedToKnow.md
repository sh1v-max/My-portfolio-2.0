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
7. [Navigation](#navigation)
8. [Pages in Detail](#pages-in-detail)
   - [Home](#home)
   - [About](#about)
   - [Projects](#projects)
   - [Case Studies](#case-studies)
   - [GitHub Dashboard](#github-dashboard)
   - [Frontend Lab](#frontend-lab)
   - [Contact](#contact)
   - [Settings](#settings)
9. [Contact Form — End-to-End Flow](#contact-form--end-to-end-flow)
10. [Animation System](#animation-system)
11. [Config / Single Source of Truth](#config--single-source-of-truth)
12. [Image Organization](#image-organization)
13. [Deployment & Environment Variables](#deployment--environment-variables)
14. [Known Quirks & Non-Obvious Decisions](#known-quirks--non-obvious-decisions)

---

## Stack & Versions

| Tool | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework |
| Tailwind CSS | 4.2.4 | Styling (via `@tailwindcss/vite` plugin, no config file needed) |
| Framer Motion | 12.38.0 | All animations |
| Vite | 8.0.10 | Build tool + dev server |
| React Router DOM | 6.15.0 | Client-side routing |
| axios | 1.4.0 | GitHub API requests |
| react-hook-form | 7.45.4 | Contact form validation |
| react-hot-toast | 2.6.0 | Toast notifications |
| react-helmet-async | 1.3.0 | Dynamic `<title>` / meta tags per page |
| @iconify/react | 6.0.2 | Icon library (lucide icons via `lucide:*` prefix) |
| lucide-react | 1.14.0 | Also imported directly in some places |
| swiper | 12.1.3 | Mini-projects carousel |
| react-github-calendar | 4.0.1 | Contribution graph on GitHub dashboard |
| Prettier | 3.0.2 | Code formatting |
| prettier-plugin-tailwindcss | 0.5.3 | Auto-sorts Tailwind class names |

**Important Tailwind v4 notes:**
- No `tailwind.config.js`. Theme tokens live in CSS (`@theme`) or are applied directly via the Vite plugin.
- Opacity modifier syntax: `text-textColor/80` (not `text-textColor opacity-80`).
- `bg-linear-to-r` instead of `bg-gradient-to-r`.
- `wrap-break-word` instead of `break-words`.

---

## App Bootstrap & Entry Points

### `src/main.jsx`
Standard React 18 entry point. Mounts `<App />` into `#root`.

### `src/App.jsx`
- Defines the router via `createBrowserRouter`.
- Wraps everything in `<GithubProvider>` (outer) and `<ThemeProvider>` (inner).
- Also mounts a global `<Toaster />` from `react-hot-toast` with custom styling that respects the dark theme.

---

## Routing

All routes are children of a single `<Main />` layout element. This means every page shares the same NavBar, Footer, BottomNav, and FloatingThemeButton.

```
/                          → Home
/about                     → About
/projects                  → Projects (grid + timeline + carousel)
/projects/taskforge        → TaskForge case study
/projects/netflix-gpt      → Netflix-GPT case study
/projects/biteswift        → BiteSwift case study
/projects/bookverse        → BookVerse case study
/projects/portfolio        → Portfolio case study
/frontend-lab              → UIExperiments
/github                    → GitHub Dashboard
/contact                   → Contact
/settings                  → Settings (theme picker)
```

**Error handling:** The root route has `errorElement: <ErrorPage />`. The `/github` route has an additional `errorElement: <GithubError />` for API-specific errors.

**Commented-out routes:** `/articles` is commented out in App.jsx. There's an Articles feature with an ArticleCard component and a `services/apiArticles.js` file that was built but then put on hold.

---

## Theme System

### How it works

1. `ThemeProvider` (in `src/context/ThemeContext.jsx`) stores the active theme key in React state.
2. On change, it writes to `localStorage` under the key `"portfolio-theme"`.
3. On mount, it reads from `localStorage` or defaults to `"github"`.
4. The theme key is applied as a CSS class on the root `<div>` in `Main.jsx`: `className={`theme-${theme} ...`}`.
5. Tailwind reads CSS custom properties defined under `.theme-dracula`, `.theme-nord`, etc., which set values for `--mainBg`, `--textColor`, `--accentColor`, `--explorerBorder`, `--articleBg`, and `--bgText`.
6. All components reference `text-textColor`, `bg-mainBg`, `text-accentColor`, etc. — Tailwind resolves these from the active CSS variable values.

### The 6 themes

| Display Name | Key | Background | Accent | Character |
|---|---|---|---|---|
| Code Abyss | `github` | `#24292e` | `#f9826c` (salmon) | GitHub's official dark |
| Polar Breeze | `nord` | `#2e3440` | `#88c0d0` (ice blue) | Arctic, calm |
| Midnight Velvet | `dracula` | `#282a36` | `#bd93f9` (purple) | Vibrant dark |
| Nocturnal Echo | `nightOwl` | `#011627` | `#5f7e97` (slate) | Deep blue night |
| Golden Mirage | `ayuMirage` | `#1f2430` | `#e6b450` (gold) | Warm-cool balance |
| Stellar Onyx | `ayuDark` | `#0a0e14` | `#e6b450` (gold) | Deepest black |

### Accessing the theme in components

```jsx
import { useTheme } from "../../context/ThemeContext";
const { theme, changeTheme } = useTheme();
```

### Where theme can be changed

- **Floating button** (`FloatingThemeButton.jsx`): Fixed bottom-left. Always visible. Shows a popup with 6 theme buttons, each with a 3-color swatch preview. Closes on outside click.
- **Settings page** (`/settings`): Full-page theme picker with larger `ThemeCard` previews showing a mock VS Code-style illustration.

---

## Global State — GithubContext

### Why a context (not just local state in Github.jsx)

GitHub API data is fetched once at the `GithubProvider` level (wraps the entire app in App.jsx). This means:
- Data survives page navigation — if you visit `/github`, go to `/about`, and come back, there's no refetch.
- The loading/error state is also global.

### What it fetches

`src/services/apiGithub.js` makes two parallel requests via `Promise.all`:
1. `GET https://api.github.com/users/sh1v-max` — user profile (name, bio, avatar, followers, public repos count, etc.)
2. `GET https://api.github.com/users/sh1v-max/repos?per_page=100` — all public repos

### Derived data (computed in Github.jsx, not the context)

- `totalStars` — summed from all repos
- `totalForks` — summed from all repos
- `featuredRepos` — filtered to repos in the `pinnedRepos` array from `config.js`, sorted by stars

### Context values exposed

```js
{ user, repos, loading, error }
```

---

## Layout — Main.jsx

The root layout component. Renders:
1. `<ScrollToTop />` — calls `window.scrollTo(0,0)` on every route change via `useEffect + useLocation`.
2. The root `<div>` with `theme-${theme}` class + `bg-mainBg text-textColor`.
3. `<NavBar />` — sticky top.
4. `<main>` wrapping `<Pages />` (which is just `<Outlet />`).
5. `<Footer />` — only rendered when NOT on the home page (`location.pathname !== "/"`).
6. `<BottomNav />` — always rendered (hides itself on md+ via CSS).
7. `<FloatingThemeButton />` — always rendered.

**Special home page behavior:** When `isHomePage === true`, the root div gets `h-screen overflow-hidden` (the hero must fill exactly one viewport, no scroll). On all other pages it's `min-h-screen`.

---

## Navigation

### NavBar

**Desktop (md+):**
- Brand: `SHIV.` links to `/`
- Nav links: Home, About, Projects, Lab, GitHub, Contact
- Spring-animated active indicator: a `w-5 h-0.5` accent bar that slides under the active link
- The indicator position is calculated via `getBoundingClientRect()` relative to the nav container, NOT the page — this prevents a Framer Motion bug where `layoutId`-based indicators jump when the page is scrolled
- Resume download button (top right, always visible)
- Live clock (xl screens only, top left corner)

**Mobile:**
- Hamburger icon (three lines, animated to X via Framer Motion)
- Slide-in drawer from the right (`w-75`, spring animation)
- Backdrop overlay that closes the drawer on click
- Social links (GitHub, LinkedIn, email) in the drawer footer

### BottomNav

Mobile-only tab bar pinned to the bottom of the screen. Shows icons for the main routes. Hidden on `md+`.

### PageNavigator

A "Previous / Next" navigation shown at the bottom of every page. It knows the ordered list of pages and renders the appropriate prev/next links based on the current route.

---

## Pages in Detail

### Home

**Route:** `/`

Full-viewport hero. The outer section is `h-[calc(100vh-64px)]` (subtracts navbar height). No scrolling — everything fits in one screen.

**Layout:** Two-column grid on desktop. Left: text content. Right: floating SVG illustration (hidden on mobile).

**Text content (left side):**
- Status badge: "Available for work — frontend, full-stack & backend" with pulsing dot
- Main heading: cursive "Hi, I'm" + large `SHIV` text with gradient clip
- Subheading: role from `config.js`
- Description in Satisfy cursive font: "I build fast, scalable, and user-focused web applications..."
- Two CTA buttons: "View My Work" → `/projects`, "Contact Me" → `/contact`
- Social icon links: GitHub, LinkedIn, LeetCode
- Quick stats row: `33+ Projects`, `6 Themes`

**Background:** Large decorative text "I BUILD FOR THE WEB" — positioned absolute, ultra-large font, `text-bgText` (low-contrast, decorative). Hidden on `max-lg`.

**Illustration:** `Illustration.jsx` — an SVG that adjusts to the theme's accent color. Floats vertically with a 4-second loop animation. There are also `Illustration10X`, `Illustration20X`, etc. which are alternative zoom levels, currently commented out.

**PageNavigator** is placed inside the section (not below it) because the page has no scroll. It's absolutely positioned at the bottom.

---

### About

**Route:** `/about`

Sections (all scroll-triggered via `whileInView`):

1. **Page Header** — accent chip, h1, subtitle, gradient line (same pattern as all other pages)
2. **Hero: Photo + Bio** — profile photo with grayscale → color on hover + glow behind it. Bio text. "Currently Learning" mini-timeline (MongoDB, Node.js, Rails). Resume download + Get In Touch buttons.
3. **Code Block + Journey** — side by side on desktop. Left: an `aboutMe.json` styled code block (fake terminal window). Right: a vertical journey timeline (2020 → 2022 → 2024 → 2025 → 2026) with year labels and descriptions.
4. **What I Do** — 2-column grid of 5 service cards (UI Development, React Applications, API Integration, Motion & Interaction, Backend Development).
5. **Tech Stack** — `BentoSkills` (bento grid layout) + `MarqueeSkills` (auto-scrolling horizontal skill marquee).
6. **Education** — `EducationAccordion` component with expandable cards. Both entries start expanded. Toggle button collapses/expands body with animated height.
7. **Bottom CTA** — "Get In Touch" + "View My Work" buttons.

**Data:**
- `services`, `education`, `timeline` arrays are defined at the top of `About.jsx`.
- Personal info comes from `src/data/config.js`.
- Profile photo: `src/assets/images/peakpx.jpg`.
- Resume: `src/assets/docs/resume.pdf` (imported as asset, triggers browser download).

---

### Projects

**Route:** `/projects`

Three main sections:

#### 1. Project Grid

`project.js` defines 6 entries (5 real projects + "Coming Soon"). Each has: title, description, image, tags, sourceCode, demo, caseStudy.

Cards are in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`). Each card is a `motion.div` with `whileInView` animation. The delay is computed to stagger by column on first load, then use a flat delay on scroll.

`ProjectCard` features:
- Hover: card lifts (`y: -6, scale: 1.015`) via spring
- Gradient overlay on image appears on hover
- Accent line across the top of image on hover
- Title turns accent color on hover
- Three buttons: "Case Study" (prominent, links to case study route), "Demo" (primary), "GitHub" (outline)

#### 2. ProjectTimeline

Inserted between the grid and the mini carousel. See [its own section below](#projecttimeline).

#### 3. MiniProjectsCarousel

A Swiper.js carousel of 10 featured mini-projects. Configuration:
- `centeredSlides: true`, `loop: true`
- Breakpoints: 1 slide (mobile) → 1.5 → 2.2 → 3.2 → 3.5 (wide desktop)
- Active slide: `scale(1.1)`, fully opaque
- Adjacent slides: `opacity: 0.5, scale(0.95), blur(2px)`
- Non-adjacent: `opacity: 0.2, scale(0.9), blur(4px), pointer-events: none`
- Custom prev/next chevron buttons (double chevron style)
- Auto-advances every 4 seconds, pauses on hover, stops on interaction
- Below the carousel: "Explore All Mini Projects" button → `/frontend-lab` + count copy "33+ projects · Beginner · Intermediate · Advanced"

---

### Case Studies

**Routes:** `/projects/taskforge`, `/projects/netflix-gpt`, `/projects/biteswift`, `/projects/bookverse`, `/projects/portfolio`

Each case study is a full standalone page component. The structure varies slightly per project but generally follows:

- **Hero section:** project title, subtitle, tag chips, hero image, live demo + GitHub buttons
- **Overview:** problem statement, what was built, key stats
- **Tech Stack:** icon + name cards for each technology used
- **Key Features:** feature cards
- **Desktop Screenshots:** 2-column grid. Each screenshot has a label and click-to-enlarge behavior.
- **Mobile Screenshots:** horizontal scroll row with phone-frame-styled cards.
- **Architecture / How It Works:** technical deep-dive section
- **Challenges & Lessons:** problems encountered and how they were solved
- **Roadmap:** planned features
- **Lightbox:** click any screenshot to open a full-screen modal with previous/next navigation and close button

#### Lightbox implementation (BiteSwiftDetail, PortfolioDetail)

```jsx
const [lightboxIndex, setLightboxIndex] = useState(null);
const allScreenshots = [...desktopScreenshots, ...mobileScreenshots];
// open: setLightboxIndex(index)
// close: setLightboxIndex(null)
// prev: setLightboxIndex(i => (i - 1 + total) % total)
// next: setLightboxIndex(i => (i + 1) % total)

// Keyboard nav:
useEffect(() => {
  if (lightboxIndex === null) return;
  const onKey = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [lightboxIndex, closeLightbox, prev, next]);
```

`closeLightbox`, `prev`, `next` are wrapped in `useCallback` to keep the `useEffect` dependency array stable.

The lightbox renders via `AnimatePresence` with a fade+scale animation. It sits outside the scroll container (fixed overlay).

---

### ProjectTimeline

**File:** `src/features/projects/ProjectTimeline.jsx`

A vertical alternating timeline showing all 5 main projects chronologically (newest first).

**Data:** `timelineData` array at the top of the file. Each entry: `title`, `period`, `periodEnd` (null = "Present"), `status` ("completed" | "ongoing"), `icon` (iconify string), `desc`, `tags`, `caseStudy` (route), `demo` (URL).

**Layout:**
- A single vertical line runs through the center of the section (desktop) or left edge (mobile).
- Desktop: `grid-cols-[1fr_auto_1fr]` — left slot, center dot, right slot. Even-index entries render in the left slot, odd-index in the right.
- Mobile: flex row. Dot on left, card takes remaining width.

**Dot colors:**
- `completed`: green border + bg, green icon
- `ongoing`: accent border + bg, accent icon + pulsing dot in top-right corner

**Card alignment:** "right-aligned" (for left cards on desktop) means `text-right`, `justify-end` for tag/link rows, etc. This is controlled by the `align` prop passed to `EntryCard`.

**Section header:** Has the same pattern as other page sections — accent chip, h2, subtitle, gradient line. Animated in via stagger variants.

---

### GitHub Dashboard

**Route:** `/github`

Consumes data from `GithubContext`. Shows loading spinner while fetching, error state if fetch fails.

Sections (each wrapped in a `motion.div` with staggered `whileInView` delays):

1. **HeroProfile** — avatar, name, bio, location, join date from the GitHub API response
2. **StatsGrid** — grid of `StatCard` components. Stats: public repos, total stars, total forks, followers, following
3. **SkillsAndLearning** — two columns: skills list (from `config.js`), currently learning list (from `config.js`)
4. **FeaturedRepos** — filtered from all repos to only those in `pinnedRepos` (defined in `config.js`), sorted by star count. Each rendered as a `RepoCardItem`.
5. **ContributionGraph** — `react-github-calendar` component with a custom dark theme (GitHub green palette)
6. **QuickLinks** — links to GitHub profile, repo list, etc.

**`pinnedRepos` in config.js:**
```js
["Netflix-GPT", "BiteSwift", "BookVerse", "Backend-Projects", "Practice-UI-design-React-and-JS", "JavaScript-DSA"]
```
The filtering matches by `repo.name`, so repo names must match exactly.

---

### Frontend Lab

**Route:** `/frontend-lab`

A searchable, filterable grid of 33+ UI experiment projects.

**Filter dimensions:**
- Level: All / Beginner / Intermediate / Advanced
- Category: All / UI / API / Games / Forms / Logic
- Search: freetext matching title and description (via `filterUtils.js`)

All three filters are applied together via `useMemo` on every change.

**State:** `selectedLevel`, `selectedCategory`, `searchQuery` — all local `useState` in `UIExperiments.jsx`. No URL params, no persistence between visits.

**Data:** `src/features/frontend-lab/data/uiExperimentsData.js` — imports thumbnail images from `src/assets/frontend-lab/index.js` and defines an array of experiment objects with: title, description, image, tags, level, category, sourceCode, demo.

**Components:**
- `HeroSection` — page header
- `StatsCards` — "X Beginner · Y Intermediate · Z Advanced" stat chips
- `FilterTabs` — level tabs + category tabs + reset button
- `SearchBar` — controlled input
- `ExperimentsGrid` — renders `ExperimentCard` for each filtered result
- `ExperimentCard` — card with image, title, description, tags (up to 3 + "+N more"), demo + GitHub links
- `EmptyState` — shown when no results match current filters

**The 10 mini-projects in the carousel** (on the Projects page) are a curated subset from this lab, defined separately in `miniProjects.js` with the same image assets.

---

### Contact

**Route:** `/contact`

**Layout:** Two-column grid on desktop (`lg:grid-cols-2 lg:gap-24`).

Left column: `ContactSocials` — renders social links (GitHub, LinkedIn, email, Instagram, etc.)

Right column: The contact form.

**Form fields:**
- Name (required)
- Email (required, regex validated)
- Subject (required)
- Message (required, min 5 chars)

All validation is client-side via `react-hook-form`. Errors render as red text below each field.

On submit: calls `sendEmail()` which posts to `/.netlify/functions/contact`. The entire fetch is wrapped in `toast.promise()` so the user sees loading → success/error automatically. On success, `reset()` clears the form.

**"Available for work" indicator:** pulsing dot + "Available for work" label in the page header, above the gradient line.

---

### Settings

**Route:** `/settings`

Shows all 6 themes as `ThemeCard` components in a responsive grid. Each card has a VS Code-style illustration preview rendered via `ThemePreview`, the theme name, publisher, and description. Clicking a card calls `changeTheme()`.

The currently active theme's card is visually highlighted.

---

## Contact Form — End-to-End Flow

```
User fills form
  → react-hook-form validates (client-side)
  → handleSubmit calls sendEmail(data)
  → fetch POST to /.netlify/functions/contact with JSON body
  → Netlify serverless function (netlify/functions/contact.js) runs:
      1. Checks HTTP method === POST
      2. Parses JSON body
      3. Validates all fields present
      4. Calls Resend API (https://api.resend.com/emails)
         - from: "Portfolio Contact <onboarding@resend.dev>"
         - to: singhshiv0427@gmail.com
         - reply_to: sender's email
         - subject: "[Portfolio] {subject}"
         - html: formatted email with name, email, subject, message
      5. Returns 200 { success: true } or 500 { error: ... }
  → toast.promise() shows loading/success/error
  → On success: form.reset() clears all fields
```

**Environment variable:** `RESEND_API_KEY` must be set in Netlify dashboard under Site Settings → Environment Variables. Never committed to git.

**Local development:** The Netlify function only runs in the Netlify context. To test locally, use `netlify dev` (Netlify CLI) instead of `npm run dev`.

---

## Animation System

All pages use the same animation vocabulary. This ensures consistency across the entire portfolio.

### Page Header Pattern (used on About, Projects, GitHub, Contact)

```jsx
const headerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};
// Usage:
<motion.div variants={headerContainer} initial="hidden" animate="show">
  <motion.span variants={headerItem}>chip</motion.span>
  <motion.h1 variants={headerItem}>Title</motion.h1>
  <motion.p variants={headerItem}>subtitle</motion.p>
  <motion.div variants={headerItem}>accent line</motion.div>
</motion.div>
```

Note: Page headers use `animate="show"` (plays immediately on mount), not `whileInView`, because they're always above the fold.

### Scroll-triggered Sections

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
>
```

`once: true` means each element only animates in once (not every time it re-enters the viewport).

### Card Hover

```jsx
<motion.article
  whileHover={{ y: -6, scale: 1.015 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
```

### Home Hero Stagger

Uses `staggerChildren: 0.1, delayChildren: 0.15` on the container, with each item doing `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }`.

### Timeline Entry Animation (ProjectTimeline)

Each `TimelineEntry` is individually animated:
```jsx
initial={{ opacity: 0, y: 32 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
```

### Easing curve

The cubic bezier `[0.25, 0.1, 0.25, 1]` (same as CSS `ease`) is used almost everywhere for a natural, professional feel. Spring physics are used only for interactive elements (hovers, the nav indicator, card lifts).

---

## Config / Single Source of Truth

**File:** `src/data/config.js`

Everything personal lives here. Editing this file propagates changes everywhere automatically.

```js
export const personal = {
  name: "Shiv Shankar Singh",
  shortName: "SHIV",
  role: "Full-Stack Developer",
  location: "Varanasi, India",
  email: "singhshiv0427@gmail.com",
  github: "https://github.com/sh1v-max/",
  githubUsername: "sh1v-max",       // used in API URL construction
  linkedin: "...",
  instagram: "...",
  twitter: "...",
  leetcode: "...",
  monkeytype: "...",
};

export const stats = {
  projects: "33+",
  themes: "6",
};

export const pinnedRepos = [...];     // repo names to feature on GitHub dashboard
export const githubSkills = [...];   // skills listed on GitHub dashboard
export const currentlyLearning = [...]; // learning items on GitHub dashboard
```

`apiGithub.js` reads `personal.githubUsername` to build the API URLs, so changing the username there is all you need to point it at a different GitHub account.

---

## Image Organization

```
src/assets/images/
├── peakpx.jpg                  # Profile photo (About page)
├── taskforge.png               # TaskForge hero (project card)
├── netflix.png                 # Netflix-GPT hero
├── bookverse.png               # BookVerse hero
├── BiteSwift/
│   ├── biteswift.png           # Hero image
│   ├── desktop_*.png           # 6 desktop screenshots
│   └── phone_*.png             # 6 mobile screenshots
└── portfolio/
    ├── portfolio.png           # Hero image
    ├── about.png               # Desktop screenshots
    ├── projects.png
    ├── lab.png
    ├── github.png
    ├── contact.png
    ├── phone_home.png          # Mobile screenshots
    ├── phone_about.png
    ├── phone_projects.png
    ├── phone_lab.png
    ├── phone_github.png
    └── phone_contact.png

src/assets/frontend-lab/
├── index.js                    # Exports all lab thumbnails as named imports
└── *.png                       # Thumbnail images for each experiment

src/assets/docs/
└── resume.pdf                  # Downloadable resume
```

**How images are imported:** All project images are imported statically at the top of each file (e.g., `import biteswift from "../../assets/images/BiteSwift/biteswift.png"`). Vite handles optimization and hashing at build time.

**Old images (safe to delete):** `portfolio.png`, `portfolio-projects.png`, `portfolio-contact.png` at the root `assets/images/` level have no remaining imports — all references were updated to use `portfolio/portfolio.png` etc.

---

## Deployment & Environment Variables

**Platform:** Netlify (continuous deployment from GitHub `main` branch)

**Build config:**
```
Build command: npm run build
Publish directory: dist
```

**Required environment variables (Netlify dashboard):**
| Variable | Value | Used in |
|---|---|---|
| `RESEND_API_KEY` | API key from resend.com | `netlify/functions/contact.js` |

**Netlify Functions:**
The `netlify/functions/` folder is auto-detected by Netlify. `contact.js` exports a `handler` function that Netlify runs as a serverless function at `/.netlify/functions/contact`.

**GitHub API:** No auth token required — public endpoints are used. Rate limit is 60 requests/hour unauthenticated, which is fine for a portfolio with light traffic. If you ever need higher limits, add a GitHub personal access token as an env var and include it in the axios headers in `apiGithub.js`.

---

## Known Quirks & Non-Obvious Decisions

**Why `GithubContext` wraps the entire app, not just the GitHub page?**
So data is fetched once when the app loads, not just when the user navigates to `/github`. This means the GitHub dashboard is instant for users who visit any page first and then navigate to `/github`.

**Why the nav indicator uses DOM measurement instead of `layoutId`?**
Framer Motion's `layoutId` for the nav indicator had a bug where it would "fly in" from the bottom of the page when the page was scrolled. This happened because `layoutId` tracks position relative to the page, which changes with `scrollY`. The fix: measure the indicator position using `getBoundingClientRect()` relative to the nav container element (a fixed/sticky element that doesn't move with scroll), then set it as an `x` offset via `animate={{ x: indicatorX }}`. This completely decouples the indicator from scroll position.

**Why `once: true` on all `viewport` configs?**
Without it, animations replay every time an element scrolls back into view, which is distracting for navigating back up a page.

**Why `amount: 0.1` (or 0.2) instead of higher values?**
`amount: 0.5` means "trigger when 50% is visible" — on mobile with small screens, tall sections would never trigger. `0.1–0.2` means "trigger when just barely in view", which feels responsive and works on all screen sizes.

**Why is the Home page `overflow-hidden h-screen`?**
The hero is designed as a single-viewport experience. If `min-h-screen` were used, the hero content would be scrollable, but there's nothing below it — just the PageNavigator positioned absolutely. The overflow-hidden prevents any accidental scroll.

**Why `useLayoutEffect` for the nav indicator (not `useEffect`)?**
`useLayoutEffect` fires synchronously after DOM mutations but before the browser paints. Using it for the indicator measurement means there's no single-frame flash where the indicator appears at position 0 before jumping to the correct position.

**Why Netlify Functions + Resend instead of EmailJS?**
EmailJS exposes the service ID and template ID in the client-side bundle (they're not secret, but it's not clean). It also has limited customization of the email HTML. Netlify Functions keep the API key server-side, the email HTML is fully custom, and Resend's `reply_to` feature means replying to the email goes directly to the sender's address rather than your own.

**Why `react-hook-form` over controlled inputs?**
Fewer re-renders (uncontrolled by default), built-in validation, and the `register` API is simpler than managing `onChange` + `useState` for every field.

**The `articles` route is commented out.**
There's a full `src/features/articles/` feature with `Articles.jsx`, `ArticleCard.jsx`, and `services/apiArticles.js`. It was built to aggregate dev.to or hashnode articles via API. It's on hold — left in the codebase for easy re-enabling.

**Tailwind v4 — no config file.**
Tailwind v4 doesn't need `tailwind.config.js`. Custom theme tokens (colors, etc.) are defined directly in CSS using `@theme {}` blocks. The `@tailwindcss/vite` plugin handles everything. `prettier-plugin-tailwindcss` still sorts class names automatically.

**`bg-linear-to-r` (not `bg-gradient-to-r`).**
Tailwind v4 renamed gradient utilities. Using the old names produces a `suggestCanonicalClasses` warning in the IDE.

**`wrap-break-word` (not `break-words`).**
Same — Tailwind v4 renamed this utility.

**`text-textColor/80` (not `text-textColor opacity-80`).**
In Tailwind v4, color opacity modifiers (`/N`) are the canonical way to apply opacity to a color class. Using a separate `opacity-80` class is a different thing (affects the whole element, not just the text color).
