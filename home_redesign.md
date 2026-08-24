# Home Redesign — Build Plan

**Goal:** Make the home page a complete portfolio in itself. A visitor who never
clicks a single link should finish the page knowing who I am, what I build, how I
work, and how to reach me. Detail pages stop being *required reading* and become
*optional depth*.

**Status:** Phases 1-5 complete. Phases 0 (largely absorbed) and 6-7 outstanding.
**Basis:** full read of `src/` (86 files, 11,944 lines), `index.html`, `index.css`,
`package.json`, and a production build. See §11 for the evidence log.

---

## 1. The principle

> Home answers every question **completely at summary depth**.
> Each door promises something genuinely **deeper**, never the same thing again.

The test applied to every section: *if a visitor never clicks the CTA, did they
still get the full picture?*

| Section | Home must fully answer | Behind the door |
|---|---|---|
| Hero | Who, what, availability, proof-at-a-glance | — |
| About | Who I am, what I do, grouped skill matrix | timeline, education, services, long story |
| Work | **All 5** projects — name, one-liner, stack, my role | per-project case study |
| Build Archive | The texture + the real, derived count | all builds, browsable + filterable |
| GitHub | **Real** heatmap, real stats, real languages | full dashboard, every repo |
| Contact | **The working form** | — (no door) |

Contact is the one section that loses its CTA: the form *is* the content, and
asking someone to navigate before they can type is a cost with no upside.

---

## 2. What the audit actually found

The first draft of this plan assumed the home sections were thin. **That was
wrong.** They are visually rich and reasonably detailed. The real problems are
different, and more serious.

### 2.1 CRITICAL — the GitHub section is fabricated

`GithubTeaser.jsx` renders four stat cards from a hardcoded array:

```js
const STATS = [
  { label: "Repositories", value: "62+" },
  { label: "Commits",      value: "1K+" },
  { label: "Stars earned", value: "2+"  },
  { label: "Followers",    value: "23"  },
];
```

…under a lede that reads **"all pulled live from the GitHub API."** Nothing in
that section touches the API. `useGithub()` is imported by exactly one file in
the whole codebase — `features/github/Github.jsx`.

The "Contribution activity" panel below it is twelve hardcoded bar heights
(`[30, 55, 40, 70, …]`) captioned *"Consistent contributions — last 12 months."*

`features/github/components/StatsGrid.jsx` repeats the pattern on the `/github`
page itself: `<StatCard label="Contributions" value="1K+" />`.

A portfolio that fabricates its own activity metrics is a credibility risk far
larger than any layout problem. **This is fixed first, in Phase 0**, whether or
not the rest of the redesign happens.

Related: `PortfolioDetail.jsx` — my own case study — describes an architecture
that does not exist: *"All three consumers (Github page, Home, About) call
useGithub()."* Only one does. The copy has to match reality.

### 2.2 CRITICAL — the image payload

A production build (`npm run build`, verified) shows:

- **16 MB** of source images across **77** PNG/JPG files
- **zero** WebP or AVIF
- single worst offender: `bookverse.png` at **1.76 MB**; five more over 1 MB
- JS bundle: **892 KB** in one chunk, no route splitting

Home loads roughly **1.4 MB** of imagery today. Phase 4 adds BookVerse and
BiteSwift to home, which alone would push it to **~3.3 MB**.

**Image optimization is therefore a hard prerequisite for Phase 4, not a
nice-to-have.** It is Phase 1.

### 2.3 CRITICAL — theme contrast

Measured against WCAG on the two extremes of the six themes.

`nightOwl` sets `--textColor: #89a4bb` on `--mainBg: #011627`:

| Utility | nightOwl | github (default) | AA body (4.5:1) |
|---|---|---|---|
| `text-textColor` | 7.06:1 | 12.79:1 | pass |
| `text-textColor/70` | **4.06:1** | 7.04:1 | **nightOwl fails** |
| `text-textColor/55` | **2.97:1** | ~5.1:1 | **nightOwl fails** |
| `text-textColor/40` | **2.15:1** | **3.27:1** | **both fail** |
| `text-accentColor` | **4.30:1** | 7.4:1 | **nightOwl fails** |

`text-textColor/40` is used for real content throughout — `SocialSidebar`,
`Footer`, every stat label, every channel label. `/35`, `/30`, `/28`, `/25`, and
`/20` also appear on live text. In `nightOwl` these fall below even the 3:1
non-text floor.

`--accentColor` in nightOwl is `rgb(95,126,151)` — 4.30:1, so accent-coloured
links and CTAs fail AA in that theme.

### 2.4 HIGH — three of six themes have no border

`--explorerBorder: transparent` in `ayuDark`, `ayuMirage`, and `nightOwl`. Every
`border-explorerBorder` surface — the nav card, all project cards, the stat
tiles — renders edgeless in half the themes.

### 2.5 HIGH — the structural monotony (confirmed)

All five non-hero sections use an identical frame:

```
eyebrow pill -> h2 text-4xl md:text-5xl -> lede -> accent rule -> content -> outline pill CTA
```

Every one is `max-w-5xl` with `py-16 md:py-24`. The `hc`/`hi` Framer variant
objects are copy-pasted verbatim into **five** files. Hierarchy is expressed by
nothing — no size, spacing, or surface difference marks Work as more important
than the archive.

`AboutTeaser` compounds it: the eyebrow badge says *"About Me"* and the `<h2>`
directly beneath it also says *"About Me."*

### 2.6 What is actually good (preserve it)

The first draft underrated these. They stay.

- `AboutTeaser` already has: profile photo with glow ring, name/location intro,
  bio paragraph, three quick-stat chips, an eight-item skill list, CTA.
- `ContactTeaser` already has: bold statement, response-time promise, animated
  availability card, three rich channel cards, CTA.
- `WorkTeaser` has a genuine 3-D `useTilt` hover, an accent sweep line, and a
  browser-chrome frame on the supporting cards.
- `NavBar` mega-menu is excellent — three columns, staggered `clipPath` reveal,
  Escape-to-close, click-outside, active-section tracking.
- `Contact`, `About`, and `Projects` **already accept an `asSection` prop**, so
  mounting them inside home is close to free.
- `useActiveSection` already tracks the exact six section ids.
- `Main.jsx` has the correct Lenis `ResizeObserver` re-measure fix.

### 2.7 Corrections to the first draft

| First draft claimed | Reality |
|---|---|
| Archive section shows the dual marquee | **No.** `MiniProjectsCarousel` is only on `/projects`. `LabTeaser` is a plain 3-card grid with its own inline `MiniCard`. |
| About teaser is "2 short paragraphs" | Photo, intro, bio, 3 stat chips, 8 skills, CTA. |
| Contact teaser is "a card pointing at /contact" | Statement, response promise, availability card, 3 channel cards, CTA. |
| GitHub teaser shows "a few stat tiles" | Four **fabricated** tiles under a false "live API" claim. |
| Heading hierarchy is broken | **It is fine.** Every page has an `h1` (via `motion.h1`). No change needed. |
| Sections use `max-w-7xl` | All five use `max-w-5xl`; only `NavBar`/`Footer` use `max-w-7xl`. |

### 2.8 Smaller defects (fold into the phases that touch them)

| # | Defect | File |
|---|---|---|
| D1 | Hero glow hardcodes `rgba(136,192,208,…)` — the **nord** accent, in all six themes | `Home.jsx` |
| D2 | `useTilt` 3-D rotation has **no** `useReducedMotion()` guard | `WorkTeaser.jsx` |
| D3 | Every form label is `sr-only`; the visible label is the placeholder | `Contact.jsx` |
| D4 | Form inputs use `bg-white/3` instead of the existing `.input` class / tokens | `Contact.jsx` |
| D5 | Icon-only social links have `title` but no `aria-label` | `ContactSocials.jsx` |
| D6 | `text-justify` on the lede — creates rivers, hurts readability | `Contact.jsx` |
| D7 | `"33+"` hardcoded in **5** places; the data file holds **34** entries | `config.js`, `LabTeaser`, `AboutTeaser`, `HeroSection`, `StatsCards` |
| D8 | Font tokens are dead: `@theme` defines `--font-family-*`, which Tailwind v4 exposes as `font-family-Inter`, so the `font-Inconsolata` classes on `<body>` and `About.jsx:430` resolve to nothing | `index.css`, `index.html` |
| D9 | Cursive font applied by inline `style`, bypassing tokens entirely | `Home.jsx` (×2) |
| D10 | `body { overflow-x: hidden }` masks horizontal-overflow bugs instead of fixing them | `index.css` |
| D11 | `.box { transition: all 1s }` — animates every property | `index.css` |
| D12 | `PageNavigator` renders on only 2 of 6 pages (`/github`, `/frontend-lab`) | — |
| D13 | Dead code, never imported: `CustomCursor`, `ProjectTimeline`, `Explorer`, `SideBar`, `LiveClock`, `ProjectCard`, `Tag`, and the whole `features/articles/` tree (its route is commented out) | — |
| D14 | `"Coming Soon..."` project points at an external `placehold.co` URL | `project.js` |
| D15 | Mega-menu has no focus trap and does not move focus into the panel | `NavBar.jsx` |

---

## 3. Libraries

### Verdict: **no new runtime dependencies.**

| Need | Package | Version | Status |
|---|---|---|---|
| Sticky stage, springs, `AnimatePresence` | `framer-motion` | ^12.38.0 | installed, heavily used |
| Contribution heatmap | `react-github-calendar` | ^4.0.1 | installed, used on `/github` |
| Contact form + validation | `react-hook-form` | ^7.45.4 | installed, working |
| Submit feedback | `react-hot-toast` | ^2.6.0 | installed, `<Toaster/>` in `Main.jsx` |
| Icons | `@iconify/react` | ^6.0.2 | installed — **one family, keep it** |
| Smooth scroll | `lenis` | ^1.3.26 | installed, re-measure fix in place |
| GitHub data | `axios` + `GithubContext` | — | provider wraps the app (`App.jsx:89`) |
| Section tracking | `useActiveSection` | local hook | already tracks the six ids |

**One build-time dev dependency is warranted** for §2.2. Pick one:

- `vite-imagetools` — generates WebP/AVIF + responsive `srcset` at build time.
  Preferred: no source files change, `import img from "./x.png?w=800;1600&format=webp"`.
- or a one-off `sharp` script that rewrites `src/assets/images/` to WebP.
  Simpler, but the originals must be retained outside the bundle.

**Recommendation: `vite-imagetools`.** It keeps optimization declarative and in
the build, so new screenshots are handled automatically rather than by remembering
to run a script.

### Explicitly rejected

- **GSAP / ScrollTrigger** — Framer's `useScroll`/`useSpring` covers the sticky
  stage. A second animation runtime for one section is not worth the bundle, nor
  two motion vocabularies fighting each other.
- **Locomotive / replacing Lenis** — Lenis works and its bug is fixed.
- **Recharts / Chart.js** — the strip needs a heatmap (installed) and a stacked
  bar (a flex row of divs). No chart library earns 40 KB here.
- **Phosphor / Heroicons** — Iconify is already the single family.
- **shadcn/ui** — the project has a strong incumbent token system and voice.
  Importing a design system now would fight it. This is a **refinement** of an
  established visual world, not a greenfield build, so the incumbent tokens and
  component language are authoritative throughout.

---

## 4. Design system deltas

Decided once in Phase 0; every later phase consumes them.

### 4.1 Contrast remediation — a real opacity ramp

The root cause of §2.3 is that opacity utilities are picked by eye, per component,
with no floor. Replace ad-hoc `/25`–`/70` values with three semantic tiers:

| Token | Utility | Purpose | Floor |
|---|---|---|---|
| `text-primary` | `text-textColor` | body, headings | 7:1 |
| `text-secondary` | `text-textColor/75` | ledes, descriptions | 4.5:1 |
| `text-muted` | `text-textColor/60` | labels, captions, metadata | 3:1 (non-text / large only) |

**Nothing below `/60` may carry text.** Decorative-only marks may go lower.

`nightOwl` needs its own fix regardless — at `--textColor: #89a4bb` even `/75`
is marginal. Raise it toward `#a8c0d6` and lift `--accentColor` from
`rgb(95,126,151)` to clear 4.5:1 on `#011627`. Verify by pixel sampling, not by
parsing computed colour (Tailwind v4 emits `color-mix(in oklab,…)`, which naive
parsing reads wrong).

### 4.2 Border that survives every theme

`border-explorerBorder` alone is invisible in three themes (§2.4). Any surface
whose edge is load-bearing uses:

```
border border-explorerBorder ring-1 ring-textColor/10
```

Better long-term fix, done in Phase 0: give the three transparent themes a real
`--explorerBorder` value. `ayuDark` → `#1c2230`, `ayuMirage` → `#2c3547`,
`nightOwl` → `#0e293f`. Then the ring is only a belt-and-braces fallback.

### 4.3 Type scale — hierarchy by size

| Section | h2 | Rationale |
|---|---|---|
| Work | `text-4xl sm:text-5xl md:text-6xl` | centerpiece |
| About, Contact | `text-4xl md:text-5xl` | primary |
| Archive, GitHub | `text-3xl md:text-4xl` | supporting evidence |

Body floor 16px. Ledes `text-base md:text-lg` at `max-w-2xl` (60–75 characters).

Also fix D8: rename the theme keys to `--font-Inter` / `--font-Inconsolata` /
`--font-Cursive` so `font-Inter` etc. actually generate, then replace the inline
`style={{ fontFamily: "'Satisfy', cursive" }}` in `Home.jsx` with `font-Cursive`.

### 4.4 Section rhythm — alternating bands and varied frames

| # | Section | Band | Padding | Frame |
|---|---|---|---|---|
| 1 | Hero | `mainBg` | `~82dvh` | full-bleed |
| 2 | About | `articleBg/40` | `py-20 md:py-28` | 3-column split, no card |
| 3 | Work | `mainBg` | `py-24 md:py-36` | sticky stage, biggest type |
| 4 | Archive | `articleBg/40` | `py-20 md:py-28` | full-bleed marquee |
| 5 | GitHub | `mainBg` | `py-20 md:py-28` | dashboard grid on a card |
| 6 | Contact | `articleBg/40` | `py-20 md:py-28` | split, form-led |

`--articleBg` sits close to `--mainBg` (github `#24292e` → `#1f2428`), so the
band separation is **subtle by construction**. Verify it reads on a real display
in the final pass; if not, add a hairline top border per band rather than
darkening the fill.

Container width standardises on `max-w-6xl` — between today's `max-w-5xl`
sections and the `max-w-7xl` nav, giving the Work stage room to breathe.

### 4.5 Motion tokens — one rhythm

New `src/lib/motion.js`. Replaces the five copy-pasted `hc`/`hi` pairs.

```js
export const SPRING_LEAN   = { type: "spring", stiffness: 420, damping: 28, mass: 0.6 };
export const SPRING_ARRIVE = { type: "spring", stiffness: 380, damping: 30, mass: 0.7 };
export const SPRING_STAGE  = { stiffness: 200, damping: 26, mass: 0.7 };
export const EASE_OUT      = [0.22, 1, 0.36, 1];
export const DUR_MICRO = 0.2;   // hover, colour
export const DUR_STATE = 0.28;  // crossfade, expand
export const DUR_ENTER = 0.5;   // section reveal
export const STAGGER   = 0.045;

export const sectionHeader = { /* replaces hc */ };
export const sectionItem   = { /* replaces hi */ };
```

Rules enforced everywhere:

- animate `transform` / `opacity` only — never `width`, `height`, `top`, `left`
- exit ≈ 65% of enter duration
- **every** animated component reads `useReducedMotion()` — this closes D2
- reveals use `whileInView` with `viewport={{ once: true, amount: 0.2 }}`

**Tailwind v4 note:** `translate-*` / `scale-*` / `rotate-*` set the standalone
`translate` / `scale` / `rotate` properties, not `transform`. Hand-written
transition property lists must name them explicitly.

### 4.6 Token discipline

No raw hex or `rgba()` in components. Accent-derived colour is
`color-mix(in srgb, var(--accentColor) N%, transparent)`.

---

## 5. Shared components to build

| Component | Path | Used by |
|---|---|---|
| `SectionHeader` | `src/components/SectionHeader.jsx` | all 5 non-hero sections |
| `SectionRail` | `src/components/SectionRail.jsx` | `MainScrollPage` |
| `StatRail` | `src/features/home/StatRail.jsx` | Hero |
| `ContactForm` | `src/features/contact/ContactForm.jsx` | `/contact` **and** home |
| `WorkStage` | `src/features/home/work/WorkStage.jsx` | Work |
| `WorkEntry` | `src/features/home/work/WorkEntry.jsx` | Work |
| `LanguageBar` | `src/features/home/github/LanguageBar.jsx` | GitHub |
| `Skeleton` | `src/components/Skeleton.jsx` | GitHub loading state |

`SectionHeader` API — deletes the copy-pasted header in five files:

```jsx
<SectionHeader
  eyebrow="Selected work"        // must NOT repeat the title (see D: AboutTeaser)
  title="Things I've shipped"
  lede="Five production applications…"
  size="lg"                       // "lg" | "md" | "sm" -> §4.3 scale
  href="/projects"                // optional; renders the door
  cta="Read the case studies"
/>
```

---

## 6. The section rail — resolving the collision

The first draft assumed a right-edge rail was free. **It is not.**
`SocialSidebar` renders two fixed rails at `xl:flex` (≥1280px): social icons at
`left-8`, the vertical email at `right-8`, both `z-40`. A right rail would land
directly on the email.

**Resolution:** on home only, the right rail *becomes* the section rail; the
vertical email stays on every other route. Once the contact form is embedded in
home (Phase 3), the floating email is redundant there anyway — so the swap
removes a duplicate rather than displacing something useful.

- `SocialSidebar` takes an `isHome` check and renders `<SectionRail />` in place
  of the email aside when `pathname === "/"`.
- Breakpoint matches the existing sidebar: `xl` (≥1280px), not `lg` — below that
  the rails are already hidden and `BottomNav` owns navigation.
- Dots are real `<a href="#id">` links, keyboard-reachable with a visible focus
  ring, active state from `useActiveSection`.
- Visual language matches the existing `PageNavigator` dot row (`w-6` active,
  `w-1.5` inactive) so page-level and section-level orientation read as one system.

---

## 7. Phases

Each phase is independently shippable. Do not start a phase until the previous
one's acceptance criteria pass.

---

### Phase 0 — Truth, tokens, foundations

*Mostly invisible. Everything else depends on it, and §2.1 is a credibility fix
that ships regardless of the redesign.*

**Tasks**

1. **Kill the fabricated GitHub data.** Wire `GithubTeaser` to `useGithub()`.
   Delete the hardcoded `STATS` array and the twelve-bar fake activity chart.
   Until Phase 5 builds the real strip, render only what the API actually
   provides, and **remove the "pulled live from the GitHub API" claim** until it
   is true. Same for `StatsGrid`'s `value="1K+"` on `/github`.
2. Correct the `PortfolioDetail` copy that claims Home and About consume
   `useGithub()` (§2.1).
3. Create `src/lib/motion.js` (§4.5); migrate the five duplicated `hc`/`hi` pairs.
4. Create `src/components/SectionHeader.jsx` (§5).
5. Give `ayuDark` / `ayuMirage` / `nightOwl` real `--explorerBorder` values (§4.2).
6. Raise `nightOwl`'s `--textColor` and `--accentColor` to clear AA (§4.1).
7. Fix the font tokens (D8) and drop the inline cursive styles (D9).
8. `config.js`: derive counts instead of hardcoding — `builds` from
   `uiExperimentsData.length` (currently **34**, not 33), and add
   `skillGroups` and `availability`. Replace all five `"33+"` literals (D7).
9. Add a `role` field to every entry in `project.js` — one line naming what *I*
   did ("Full-stack — JWT auth, CRUD, pagination on an Express/Mongo API").
   `Projects.jsx` already carries `projectMeta` (period + status) that home can
   reuse for a timeline line. This is the biggest content gap on the page.
10. Fix D1 (hardcoded nord glow) and D11 (`.box { transition: all 1s }`).
11. Delete dead code (D13): `CustomCursor`, `ProjectTimeline`, `Explorer`,
    `SideBar`, `LiveClock`, `ProjectCard`, `Tag`, `features/articles/`.
    *(Keep `Tag` if Phase 4 reuses it — decide there, not here.)*

**Acceptance**

- No hardcoded metric is presented as live data anywhere in the app
- `npm run lint` clean, `npm run build` succeeds
- All six themes render borders and the hero glow in their own accent
- `nightOwl` body text ≥ 4.5:1, verified by pixel sampling
- No visual regression on any page

---

### Phase 1 — Assets and contrast

*The two site-wide prerequisites. Phase 4 is blocked on the first half.*

**Tasks**

1. Add `vite-imagetools`; convert the image pipeline to WebP with AVIF fallback
   and responsive `srcset`. Target: **no single image over 250 KB**; the six
   images over 1 MB (§2.2) are the priority.
2. Every `<img>` gets explicit `width`/`height` or `aspect-ratio` so CLS stays
   near zero, plus `loading="lazy"` below the fold.
3. Route-level code splitting via `React.lazy` + `Suspense` — the 892 KB single
   chunk should drop substantially once the five detail pages split out.
4. Replace `"Coming Soon..."`'s external `placehold.co` URL with a local asset (D14).
5. Sweep every opacity utility below `/60` that carries text onto the §4.1 ramp.
   Highest-traffic offenders: `SocialSidebar` (`/40`), `Footer` (`/40`),
   `NavBar` mega-menu labels (`/28`, `/30`), all stat labels (`/40`),
   `ContactTeaser` channel descriptions (`/35`), `WorkTeaser` browser chrome (`/20`).

**Acceptance**

- Home's total image payload under 800 KB (from ~1.4 MB), and still under
  1.2 MB after Phase 4 adds two more projects
- No image over 250 KB in `dist/`
- Every text node ≥ 4.5:1 in all six themes; every non-text mark ≥ 3:1
- Lighthouse CLS < 0.1 on home with network throttled

---

### Phase 2 — Contact becomes actionable

*The form already works; `Contact` already accepts `asSection`.*

**Tasks**

1. Extract the form from `Contact.jsx` into `ContactForm.jsx`. Keep
   `react-hook-form`, the `/.netlify/functions/contact` endpoint, and the
   `toast.promise` feedback exactly as they are.
2. Fix accessibility during extraction, not after:
   - visible `<label>` per field, replacing `sr-only` (D3)
   - `aria-invalid` + `aria-describedby` wiring each error to its input
   - errors already use `role="alert"` — keep
   - `autoComplete="name" | "email" | "off"`; correct `type`/`inputMode`
   - submit disabled + spinner while `isSubmitting`
   - focus the first invalid field on submit error
   - reserve the error line's height so validation causes no layout shift
   - use the existing `.input` class / tokens instead of `bg-white/3` (D4)
3. Rewrite `ContactTeaser` as a split: **keep** its statement, response promise,
   availability card, and channel cards (§2.6) — add `<ContactForm />` alongside.
   Stacks below `lg` with the form first.
4. Remove the "Send a message" door. Fix `text-justify` (D6) and add `aria-label`
   to the icon-only links in `ContactSocials` (D5).
5. `/contact` renders the same `<ContactForm />`. One implementation, two mounts.

**Acceptance**

- A message can be sent from home without navigating
- `/contact` still works identically
- Every input has a visible label; every error is announced and shifts nothing
- Keyboard: tab order matches visual order, focus ring visible in all six themes

---

### Phase 3 — Work becomes the Split Stage

*Blocked on Phase 1 (images).*

```
+-------------------------------+--------------------------+
|  01  Portfolio                |                          |
|      one-line description     |   +------------------+   |
|      Full-stack — themes…     |   |                  |   |  <- sticky top-28
|      react  tailwind  motion  |   |   live preview   |   |     aspect 16/10
|      Case study ->            |   |   crossfades     |   |     rounded-2xl
|                               |   |                  |   |
|  02  TaskForge                |   +------------------+   |
|      …                        |        01 / 05           |
+-------------------------------+--------------------------+
```

**Tasks**

1. `WorkStage.jsx` — `sticky top-28`, `aspect-[16/10]`, `object-cover object-top`,
   `rounded-2xl`, §4.2 border treatment. Index counter `01 / 05` below.
2. `WorkEntry.jsx` — per project: `text-3xl sm:text-4xl lg:text-5xl` name;
   one-line description; the new `role` line at `text-textColor/75`; 3 core tags;
   `Case study ->` with a row-spanning `::after` hit area (the technique already
   proven in `Projects.jsx`).
3. Active index via `IntersectionObserver`, `rootMargin: "-45% 0px -45% 0px"` —
   whichever entry crosses the viewport midpoint owns the stage. **Scroll-driven,
   not hover-driven**, so touch behaves identically with no separate fallback.
4. Crossfade: opacity + 8px rise, `DUR_STATE`, `EASE_OUT`. Reduced motion gets
   opacity only.
5. Below `lg`: stage un-sticks; each project becomes
   `name -> image -> description -> role -> tags -> Case study ->`.
6. Preload the next project's image so the crossfade never gaps.
7. `featured.slice(0, 3)` -> the full non-"Coming Soon" list (**5**).
8. Add the missing `useReducedMotion()` guard if any `useTilt` survives (D2).
   The Split Stage most likely retires `useTilt`, `FeaturedCard`, and
   `SupportingCard` entirely — confirm before deleting.
9. Door becomes **"Explore the Build Archive ->"**; "View all projects" is now
   false, since all of them are here.

**Acceptance**

- All five projects visible on home without a click
- Stage tracks correctly scrolling up *and* down; no flicker at boundaries
- Reduced motion: fully readable, no crossfade travel, no 3-D rotation
- 375 / 768 / 1024 / 1440 correct; no horizontal scroll
- Section ≤ ~1600px desktop (today: 1301px for **three** projects)
- Image payload still within the Phase 1 budget

---

### Phase 4 — GitHub becomes real

*Completes what Phase 0 started.*

**Verified data availability.** `apiGithub.js` calls only `/users/:name` and
`/users/:name/repos?per_page=100`. The context exposes
`{ user, repos, loading, error, repoCount }`:

| Stat | Available? | Source |
|---|---|---|
| Public repos | yes | `user.public_repos` |
| Followers | yes | `user.followers` |
| Total stars | yes, derived | sum of `repos[].stargazers_count` |
| Building since | yes, derived | `user.created_at` |
| **Commits / contributions** | **NO** | needs the GraphQL API and a token |
| **Byte-weighted languages** | **NO** | needs `/languages` per repo (N requests) |

**Tasks**

1. Four tiles: repos, stars, followers, **building since {year}** — *not*
   commits. `font-variant-numeric: tabular-nums`.
2. `ContributionGraph` (reuse from `features/github/components/`) carries the real
   commit activity, so nothing is lost by dropping the fake commit tile.
   **Read it in full first** — it mutates SVG `fill` attributes directly and
   tracks a `data-animatedYear` flag, so mounting it outside `/github` needs
   verifying.
3. `LanguageBar` — counts `repos[].language`. Label it **"by repository"**, not
   "by bytes"; never colour alone.
4. Three real states: skeleton at final dimensions (no spinner, no CLS); error
   with a retry action; empty with explanatory text.
5. `aria-label` summarising the heatmap; its entrance animation respects
   `prefers-reduced-motion`.
6. Restore an honest "pulled live from the GitHub API" lede — now true.
7. Door: **"Full GitHub dashboard ->"**.

**Acceptance**

- **Every number on screen traces to an API response or a derivation of one**
- Skeleton occupies the exact final height — CLS ≈ 0
- Heatmap ≥ 3:1 against the band in all six themes
- Error state reachable and recoverable (test by blocking the request)

---

### Phase 5 — About refinement and the Archive

*Refinement, not rewrite — §2.6 content is kept.*

**About tasks**

1. Restructure to three columns on `lg`: identity (photo, name, role, location,
   availability) | story | **grouped** skill matrix (Frontend / Backend / Tooling
   from `config.skillGroups`), replacing today's flat 8-item list.
2. Fix the duplicate "About Me" eyebrow/heading (§2.5) — eyebrow becomes a
   different register from the title.
3. Availability is not colour-only: the words carry the meaning.
4. "Currently learning" as one line, not a list.
5. Door: **"The full story ->"** (timeline, education, services).

**Archive tasks**

1. Decide the treatment. The dual counter-scrolling marquee currently lives on
   `/projects` — moving or mirroring it here gives home a texture no other
   section has and breaks the card-grid monotony. The alternative is to keep the
   3-card grid and simply fix its numbers.
   **Recommendation: bring the marquee to home** and let `/projects` keep it too;
   it is the only section whose *form* differs from every other.
2. Use the derived count (34, or whatever the data says), not `"33+"` (D7).
3. Retire the inline `MiniCard` in favour of the existing `MiniProjectCard`.

**Acceptance**

- No truncated prose; measure 60–75 characters on desktop
- Skill icons one family, one size token, ≥ 3:1 in all six themes
- The stated build count matches `uiExperimentsData.length` exactly
- Marquee respects reduced motion (its existing implementation already does)

---

### Phase 6 — Hero and orientation rail

**Tasks**

1. Hero `h-[calc(100dvh-64px)]` -> `~82dvh` so section two peeks and the page
   reads as scrollable.
2. `StatRail` under the socials — `5 projects · 34 builds · 6 themes · MERN + AI`
   in the MENU voice (`text-[11px] font-bold uppercase tracking-[0.2em]`),
   tabular numerals, values from `config`.
3. Hero primary button scrolls to `#projects` on home instead of leaving.
4. Scroll cue below the fold; hidden under reduced motion.
5. Build `SectionRail` per §6, including the `SocialSidebar` swap.
6. Consider adding "About" to `BottomNav` — it is the one section with no mobile
   jump target, and `isActive` currently papers over this by lighting "Home"
   while the About section is in view. Bottom nav is at its 5-item limit, so this
   is a swap, not an addition. **Flagged for a decision, not assumed.**

**Acceptance**

- Fold line shows a slice of the About band
- Rail active state matches the section in view, scrolling both ways
- Rail keyboard-navigable with a visible focus ring
- Rail never overlaps `SocialSidebar`, `FloatingThemeButton`, or `BottomNav`
- Hidden below `xl`, consistent with the existing sidebars

---

### Phase 7 — Rhythm, type, and verification

**Tasks**

1. Apply §4.4 bands and §4.3 type scale across all six sections; standardise on
   `max-w-6xl`.
2. Migrate all five sections onto `SectionHeader`; delete the duplicated headers.
3. Rewrite every remaining CTA to promise depth:
   - ~~View all projects~~ -> **Explore the Build Archive ->**
   - ~~Read full profile~~ -> **The full story ->**
   - ~~View full dashboard~~ -> **Full GitHub dashboard ->**
   - Contact -> **no CTA**
4. Decide on D12 (`PageNavigator` on 2 of 6 pages) — make it consistent or remove it.
5. Consider a focus trap for the mega-menu (D15).
6. Final sweep for hardcoded colour.

**Verification protocol** — one batched round, fix everything it shows, one
confirming round, then stop.

| Check | How |
|---|---|
| 375 / 768 / 1024 / 1440 | Playwright, screenshot each |
| No horizontal scroll | assert `scrollWidth <= clientWidth` — and **temporarily remove `body { overflow-x: hidden }`** (D10) so real overflow surfaces |
| Reduced motion | CDP `setEmulatedMedia`; confirm readable, no tilt, no crossfade travel |
| All six themes | switch and re-sample; do not extrapolate from `github` |
| Contrast | **sample rendered pixels** — Tailwind v4 emits `color-mix(in oklab,…)`, so parsing computed colour returns false numbers |
| Touch targets | assert every interactive rect ≥ 44×44 |
| Keyboard | tab the whole page; focus visible, order matches visual |
| CLS + payload | throttle network; check the GitHub and Work images |
| Lenis scroll limit | confirm the bottom is reachable — home is now much taller |
| Data honesty | **every number on screen traces to a real source** |

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| Home grows to ~6500–7000px | The point of the brief. Mitigated by the section rail + `BottomNav`. |
| Image payload balloons with 5 projects | Phase 1 **blocks** Phase 3. Hard budget: home under 1.2 MB of imagery. |
| Sticky stage fights Lenis | Lenis does not transform the scroll container, so native `sticky` works. Verify explicitly in Phase 3. |
| Raising `nightOwl` tokens changes its character | It is a legibility fix, not a redesign. Shift lightness only; keep hue and saturation. |
| Deleting dead code breaks something | `ProjectCard`/`Tag` may be wanted for Phase 3. Delete last, after Phase 3 settles. |
| Rail displaces the email sidebar | Only on home, where the form makes it redundant. Every other route is untouched. |
| Six sections of `whileInView` | `once: true` throughout; transform/opacity only; under 16ms per frame. |
| Contact form in two places | One `ContactForm`, two mounts. Never fork it. |

---

## 9. Progress

- [x] **Phase 0 — Truth, tokens, foundations — DONE (2026-08-24)** *(closed out last, after 1–7 had already absorbed most of it — see 10h)*
- [x] **Phase 1 — Assets and contrast — DONE (2026-08-24)**
- [x] **Phase 2 — Contact form on home — DONE (2026-08-24)**
- [x] **Phase 3 — Work section — DONE (2026-08-24)** *(Split Stage built, then replaced by the /projects UI; route retired — see 10c revision)*
- [x] **Phase 4 — GitHub becomes real — DONE (2026-08-24)**
- [x] **Phase 5 — About refinement + Archive — DONE (2026-08-24)**
- [x] **Phase 6 — Hero + orientation rail — DONE (2026-08-24)**
- [x] **Phase 7 — Rhythm, type, verification — DONE (2026-08-24)**

---

## 10. Out of scope (tracked, not doing here)

- Route rename `/frontend-lab` -> `/build-archive` (outward-facing URL change)
- Filenames still using the old "mini project" vocabulary
- Per-page "Back to Projects" links duplicating the global Back button
- A GitHub token + GraphQL for real contribution counts (would unlock the commits
  tile dropped in Phase 4)

---

## 10a. Phase 1 results (completed 2026-08-24)

### Measured outcome

| Metric | Before | After |
|---|---|---|
| Image payload (bundled) | 22.9 MB / 77 files | **2.26 MB / 65 files** |
| Largest single image | 1,901 KB (`netflix-featured-movies.png`) | **144 KB** |
| Images over 250 KB | 12 | **0** |
| Initial JS chunk | 892.8 KB (gzip 257.6) | **334.5 KB (gzip 103.5)** |
| JS chunks | 1 | 15 (route-split) |
| `<img>` without width/height | 20 of 27 | **0** (3 deliberate exclusions) |
| Contrast failures, all 6 themes | 33-79 per theme | **0 per theme** |
| Horizontal overflow @375/768/1024/1440 | — | 4px / 0 / 0 / 0 (see below) |
| External image-host requests | 2 (`placehold.co`) | **0** |

### What was done

1. **`vite-imagetools` (dev dependency)** with a `defaultDirectives` hook, so every
   image import becomes WebP q78 capped at 1600px **without a single call site
   changing**. The PNGs stay on disk as the editable source of truth. Per-import
   overrides still work (`?format=png`, `?w=600;1200&as=srcset`).
   Verified compatible: `vite-imagetools@12` requires `vite >=8`, project is on 8.0.10.
2. **Route-level code splitting** (`React.lazy` + `Suspense`) for all 11 non-home
   routes. Home stays eager as the landing route. The GitHub calendar's ~340 KB
   now loads only on `/github`. New `RouteFallback` waits 250ms before showing
   anything, so a warm-cache navigation never flashes a spinner.
3. **`width`/`height`/`loading`/`decoding`** across every rendered `<img>`. The
   detail-page figures were the real CLS bug — `w-full object-cover` in a
   container with no height or aspect ratio, so the page jumped as each
   screenshot arrived. Landscape captures got 1600x900; the BiteSwift and
   Portfolio phone galleries got their true 409x912.
4. **Semantic text tokens replace opacity math** — see below.
5. **`ImagePlaceholder`** replaces two `placehold.co` URLs. Those cost a
   third-party request on every `/frontend-lab` load and hardcoded one theme's
   palette (`#1f2428` on `#88c0d0` — nord) into all six.
6. The hero watermark ("I BUILD / FOR THE / WEB") is now `aria-hidden` — it is
   decoration held near background luminance, and screen readers were announcing
   it as a stray heading ahead of the name.

### The contrast fix, and the mistake inside it

The root cause was never the individual values: it was that **230
`text-textColor/NN` and 22 `text-accentColor/NN` opacities were chosen by eye,
per component, with no floor.** Replaced with a three-tier ramp defined once per
theme in `index.css`:

```
text-textColor      primary    >= 7:1     headings, emphasis
text-textSecondary  secondary  >= 5.8:1   ledes, descriptions, body
text-textMuted      muted      >= 4.8:1   labels, captions, metadata
```

**I solved these against `--mainBg` first, and it was wrong.** Cards use
`--articleBg`, which is *lighter* in three themes (nord `#363f50` vs `#2e3440`),
so the first pass still failed on every card. The tokens are now solved against
each theme's **lightest** text surface, with margin for hex rounding.

The same mistake applied to `nightOwl`'s accent. It measured 4.01:1 against its
own card surface, so accent tags, links and CTAs failed AA throughout that theme.
Lifted `rgb(95,126,151)` -> `#6d8ca5` (4.84:1 on cards, 5.19:1 on the page).

**Scope note:** the nightOwl token work is listed under Phase 0 in this plan. It
was pulled forward because Phase 1's contrast criteria are unreachable without
it. Phase 0's remaining tasks are untouched.

### How much the look actually changed

| Case | Old rendered | New | Delta |
|---|---|---|---|
| github `/40` -> muted | `#75787b` | `#919496` | +28 per channel |
| nord `/40` -> muted | `#808590` | `#abafb5` | +42 |
| nightOwl `/50` -> muted | `#466177` | `#708ba2` | +43 |
| github `/60` -> muted | `#9ea0a2` | `#919496` | -12 |
| github `/70` -> secondary | `#b2b4b5` | `#a2a4a6` | -16 |

The illegible text got substantially lighter; text that was already fine moved
slightly *down* into its tier. Hierarchy is preserved, the floor is enforced.

### Verification method

Class-swapping the theme in JS **does not work on this app** — React re-renders
(driven by the ticker and Framer) reset `className` mid-measurement, which
produced a full page of false failures. Every theme is now audited by setting
`localStorage` and doing a real reload in an offscreen iframe. Contrast is
computed from **rendered pixel colours**, never parsed computed styles, because
Tailwind v4 emits `color-mix(in oklab, ...)`.

### Known-remaining, not Phase 1 scope

| Finding | Status |
|---|---|
| 4px horizontal overflow at 375px | Pre-existing. Propagates uniformly from `html.lenis` through every wrapper; **no unclipped content element exceeds the viewport**, and it is identical with `body{overflow-x:hidden}` lifted. A Lenis gutter artifact, not a layout bug. Revisit in Phase 7. |
| `Resume` button is 36x28 at 375px | Pre-existing touch-target failure (<44px). Also nav brand 73x28, theme toggle 40x40. Not in Phase 1 scope — fix in Phase 7. |
| Iconify fetches icons from `api.iconify.design` at runtime | Pre-existing external dependency; icons will not render offline and add request latency. Consider a local icon subset. |
| 12 source images are bundled by nobody | Dead assets in `src/assets/`. Safe to delete, deliberately left alone. |
| Lint: 151 problems | **Baseline verified identical before and after** — all pre-existing `react/prop-types`, none introduced. |

### Correction to this plan

Section 2.8 (D7) claimed the `"33+"` build count was stale because
`uiExperimentsData.js` holds 34 entries. **That was wrong.** One of the 34 is the
`"Coming Soon..."` placeholder, so there are **33 real builds** and the existing
copy is correct. D7's real defect stands: the number is hardcoded in five places
and should be derived once.

---

## 10b. Phase 2 results (completed 2026-08-24)

**The home page can now be acted on.** The form is embedded in the last section
instead of a link pointing at `/contact`.

### What was built

`src/features/contact/ContactForm.jsx` — one component, two mounts (`/contact`
and the home section). Field definitions live in a `FIELDS` array so the two can
never drift apart. An `idPrefix` prop keeps element ids unique per mount
(`contact-home-name` vs `contact-page-name`), verified unique at runtime.

The Netlify endpoint, `react-hook-form`, and the `toast.promise` feedback are
unchanged — this was an extraction, not a rewrite of working behaviour.

### Accessibility fixes (all verified in-browser)

| Fix | Before | After |
|---|---|---|
| Labels | 4 x `sr-only`; placeholder was the only visible label | 4 visible labels, 0 `sr-only` |
| Error wiring | `role="alert"` only | + `aria-invalid`, `aria-describedby` per field |
| Layout shift on error | form grew as messages appeared | **0px** — error line height is always reserved |
| Focus on failed submit | none | jumps to first invalid field |
| Autocomplete | absent | `name` / `email` / `off` / `off` |
| Keyboard type | `text` for email | `type=email` + `inputMode=email` |
| Submit during send | no state | disabled + spinner + "Sending…" |
| Touch targets | unmeasured | all >= 44px (inputs 44, submit 48) |
| Error copy | "Name is required" | states cause **and** fix |
| Icon-only socials | `title` only | real `aria-label`, icons `aria-hidden` |
| Lede | `text-justify` (rivers) | ragged right, `max-w-2xl` |

Mobile order: the form is **first** on both `/` and `/contact` below `lg`, so the
primary action is never buried behind a tall block of links.

### Colour work this phase forced

`text-red-400` measured **3.67:1** against nord's card surface — the error text
failed AA exactly where it matters most. Added a `--dangerText` token
(`#ff8e91`), solved to clear 4.8:1 against **every** surface any of the six
themes puts behind it, and routed all 7 `text-red-400` / `text-red-400/70`
usages through it (the case-study "Problem:" labels had the same failure).

Also pulled forward Phase 0's **D1**: `rgba(136,192,208,…)` — the *nord* accent —
was hardcoded into glow shadows in **9 files**, rendering nord's blue glow in all
six themes. All 11 now use
`color-mix(in srgb, var(--accentColor) N%, transparent)`. The one remaining
instance, `--explorerBorder` in `.theme-nord`, is correct and was left alone.

### Verification

| Check | Result |
|---|---|
| Contrast, 6 themes, **with all 4 errors on screen** | **0 failures** (184 nodes each) |
| Layout shift on validation | form height 532 -> 532px, submit moved 0px |
| Focus after empty submit | `contact-home-name` (first invalid) |
| Field ids unique per mount | yes |
| Tab order matches visual | yes, both routes |
| Focus ring visible | yes, both routes |
| Touch targets in form | all >= 44px |
| Horizontal overflow | 0 everywhere except the known 4px Lenis artifact on home @375 |
| Lint | 151 -> **149** problems (2 fewer; none added) |

### Not done

The "Send a message" CTA is gone, as planned. `ContactSocials` still duplicates
the three channels the home section also lists — acceptable while they live on
different routes, worth revisiting in Phase 7.

---

## 10c. Phase 3 results (completed 2026-08-24)

**All five projects now live on the home page**, in an editorial layout that
shares no vocabulary with the Build Archive grid below it or the Projects page's
cursor-preview rows.

### What was built

| File | Role |
|---|---|
| `src/lib/motion.js` | Shared motion tokens, replacing five copied `hc`/`hi` pairs |
| `src/components/SectionHeader.jsx` | The header five sections duplicated, with a `size` prop that finally lets one section outrank another |
| `src/features/home/work/WorkStage.jsx` | Sticky 16:10 frame, crossfades on the active project, progress counter |
| `src/features/home/work/WorkEntry.jsx` | One project: index, title, description, **role**, tags, row-wide link |
| `WorkTeaser.jsx` | 382 lines of card components -> 100 lines of composition |

`project.js` gained a **`role`** field — the line a description cannot carry:
what I actually did, as opposed to what the thing is. Drawn from each project's
own case study, not invented.

### Two bugs found by building this

**1. `body { overflow-x: hidden }` was silently breaking `position: sticky`.**

This is **D10** from the original audit, filed as a minor code-smell. It is not
minor: `overflow-x: hidden` computes to `overflow: hidden auto`, which makes
`<body>` a scroll container, and every `position: sticky` descendant then sticks
to *body* instead of the viewport. Measured: the stage scrolled away at
713 -> 319 -> -76 -> -470 instead of pinning.

Fixed with `overflow-x: clip`, which masks horizontal overflow **without**
creating a scroll container. Bonus: this also removed the 4px phantom overflow
Phase 1 could not attribute — `clip` reports 0 where `hidden` reported 4.

**2. `items-start` on the grid — my own error.**

I added it believing a stretched grid item cannot stick. The opposite is true:
the sticky element's *parent* must be tall enough to travel in. With
`items-start` the stage column sized to its own content (360px) and had zero
travel. Removing it let the column stretch to the row height (1833px) and sticky
started working immediately.

### Verification

| Check | Result |
|---|---|
| Projects shown on home | **5 of 5** (was 3 of 5) |
| Sticky pinning | pins at exactly `top: 112px` for 10 of 17 scroll samples, releases at section end |
| Crossfade sequence, scrolling **down** | Portfolio -> TaskForge -> Cinegraph -> BiteSwift -> BookVerse |
| Crossfade sequence, scrolling **up** | exact reverse, no flicker |
| Row-wide hit area | 5 of 5 hit points across the entry resolve to the row link; effective target **500x378**, not the anchor's own 234x59 |
| Contrast, 6 themes | **0 failures** (184 nodes each) |
| Horizontal overflow | 0 at 768 / 1024 / 1440; 4px at 375 (pre-existing, unrelated) |
| Text overflow / column overlap | none; 64px gutter |
| Stage frame ratio | 1.60 (16:10), image `object-fit: cover`, natural 1600x900 |
| Type scale | h2 60px desktop / 36px mobile; h3 48px / 30px |
| Lint | 149 -> **119** problems (the retired card components carried 30) |

### Honest numbers

**Section height is 2366px on desktop, not the <=1600px the plan estimated.**
That estimate was wrong. For context: the old section was 1301px for **three**
projects (434px each); the new one is 473px each for **five**, and each entry now
carries a role line the old cards did not have. Density is comparable; the plan's
target was simply optimistic.

Tablet (768px) came in at **4460px** on first build, because the inline
screenshots rendered full-width at 16:10 (~450px tall each). Capping them to
`max-w-md` — the same measure as the description — brought it to **3685px**.

### Decision that departs from the plan

The plan specified the section door become **"Explore the Build Archive ->"**.
Built and then removed: the Build Archive is the **very next section on the same
page**, so that door promised a two-second scroll. The Work section now has **no
section-level CTA** — every entry carries its own case-study link, which is the
genuinely deeper level. "View all projects" would also now be false, since all of
them are here.

### Not runtime-verified

`prefers-reduced-motion` handling is implemented in both new components
(`useReducedMotion()` drops the 8px rise and zeroes the progress transition,
keeping opacity) and was code-reviewed, but **not** exercised at runtime this
phase — CDP media emulation is not reachable through the tooling in use. Worth
confirming in the Phase 7 pass.

---

### Phase 3 revised (2026-08-24, same day)

**The Split Stage was removed and `/projects` was retired.** At the author's
direction, the home work section now renders the existing `/projects` editorial
UI as-is, and the separate route is gone.

**Why this is the better call than what I built.** The Split Stage and the
Projects page were two designs for one job. Keeping both meant maintaining the
same five projects in two visual languages and offering two URLs for identical
content. The Projects UI was also already the more developed of the two — it
carries dates and status per project, a cursor-tracking preview, and a
hover/no-hover split that was already correct. My Split Stage duplicated that
work in a thinner form.

**What changed**

| Item | Result |
|---|---|
| `WorkTeaser.jsx`, `work/WorkStage.jsx`, `work/WorkEntry.jsx` | deleted |
| `MainScrollPage` | renders `<Projects asSection />` in `#projects` |
| `/projects` route | retired; kept as `<Navigate to="/#projects" replace />` so existing links and bookmarks still land correctly |
| In-app links to `/projects` | **14** repointed to `/#projects` (2 per case-study page, plus About, Home hero, NavBar, PageNavigator) |
| `MiniProjectsCarousel` | unhooked from `Projects` — with the route gone its branch was unreachable, and the Build Archive is already its own home section. Removed **14 kB** of dead weight from the eager home bundle |
| `projectMeta` (dates + status) | now visible on home, which the Split Stage never showed |

**Section mode adaptations**

- Headings demote: page `h1` -> section `h2`, row `h2` -> `h3`. Home's only `h1`
  stays the hero, so the document outline holds.
- Header reveal switches from on-mount to `whileInView`, since it is now
  mid-page rather than at the top of a route.
- `Projects` adopts the shared `motion.js` variants instead of its own copy.

**Verified**

| Check | Result |
|---|---|
| Rows on home | 5 |
| Heading outline | exactly one `h1`; section `h2`; five row `h3` |
| `/projects` | redirects to `/#projects` |
| Case-study back-links | both land on the home section, scrolled correctly |
| Cursor preview containment | opens over rows; closes above the list, below it, and over the contact form; `pointer-events: none` when closed |
| Preview vs buttons complement | preview `none` + 3 buttons at 375/414/768; preview `block` + 0 buttons at 1024/1440 — exact complement, no width gets both or neither |
| Title tap target on phone | anchor box 182x40, but the `::after` extends +/-36px -> **112px effective**; hit-tested above, below and left of the title |
| Horizontal overflow @375 (real viewport) | **0** — the 4px seen earlier was an iframe artifact; the `overflow-x: clip` fix resolved it |
| Contrast, 6 themes | **0 failures** (196 nodes each) |
| Type scale | 32px phone -> 48px tablet -> 60px desktop |
| Section height | 2399px @375, 2141px @768, 1896px @1024+ |
| Initial JS | 370.6 kB -> **356.2 kB** after removing the dead marquee (vs 334 kB before Projects became eager) |
| Lint | 119 problems, unchanged from Phase 3 |

**Cost accepted:** `Projects` is now part of the eager home bundle rather than a
split route, so initial JS rose from 334 kB to 356 kB (+22 kB, gzip +9 kB). That
is the price of home owning the content; it is still well under the 892 kB the
project started at.

**Kept as staged infrastructure, currently unused:** `SectionHeader.jsx` and
parts of `motion.js`. Phase 7 migrates every section onto both. Flagging rather
than hiding it — `SectionHeader` has no consumer today.

---

## 10d. Phase 4 results (completed 2026-08-24)

**The fabricated data is gone.** Every figure in the GitHub section now traces to
an API response, verified against the live endpoint at render time.

### Before / after

| | Before | After | Live API |
|---|---|---|---|
| Repositories | `"62+"` hardcoded | **62** | 62 |
| Followers | `"23"` hardcoded | **25** | 25 |
| Stars | `"2+"` hardcoded | **2** | derived sum |
| Fourth tile | `"1K+"` commits (**unobtainable**) | **Building since 2020** | `created_at` |
| Activity chart | 12 invented bar heights, captioned "last 12 months" | **real 365-day calendar** | jogruber API |
| Lede | "all pulled live from the GitHub API" — **false** | same claim — **now true** | — |

The old followers figure was also simply **wrong** (23 vs 25), which is what
hardcoding a "live" metric always eventually produces.

`StatsGrid` on `/github` carried the same `"1K+"` fiction; it now shows
"Building since" too. `PortfolioDetail`'s architecture copy claimed three
consumers of `useGithub()` when there was one — corrected to the two that now
genuinely exist.

**A commit total is still deliberately absent.** The REST endpoints in use carry
none; it needs the GraphQL API and a token. The calendar shows the same activity
honestly, so nothing is lost by refusing to invent the number.

### Built

| File | Role |
|---|---|
| `home/github/LanguageBar.jsx` | stacked language bar, swatch **and** written label + % |
| `home/github/languageMix.js` | the pure derivation, split out so react-refresh stays clean |
| `components/Skeleton.jsx` | placeholder sized to real content, pulse gated behind `motion-safe:` |
| `GithubTeaser.jsx` | rewritten: 4 real tiles, language mix, 2 recently-pushed repos, real calendar, 3 states |
| `ContributionGraph.jsx` | now reusable via `compact`; three defects fixed (below) |

### Three defects found in `ContributionGraph`, all pre-existing on `/github`

1. **The calendar was rendering in light mode.** `react-activity-calendar` picks
   its palette from the OS `prefers-color-scheme` unless told otherwise, and only
   reads `theme.dark` when it resolves to dark. All six site themes are dark, so
   on a light-mode machine it rendered its **default greyscale** — measured
   `rgb(235,235,235)` empty cells on a dark card — ignoring the greens passed in
   entirely. Fixed by pinning `colorScheme="dark"`. Now verified
   `rgb(57, 211, 83)` in every theme.
2. **No reduced-motion guard.** The reveal repaints all 365 squares in sequence —
   a large moving colour field. It now returns early under
   `prefers-reduced-motion` and renders in its final state.
3. **Empty cells were darker than the card.** GitHub's `#161B22` is tuned for
   GitHub's near-black page; against these six theme cards it measured *darker*
   in five of them and **1.01:1 on nightOwl**, where the grid vanished and the
   green days floated unanchored. Replaced with a translucent white lift —
   consistently 1.19-1.25:1 and always lighter, matching GitHub's own subtlety in
   the right direction.

Also: the hardcoded username is now `personal.githubUsername`, and the calendar
carries a real `aria-label` describing what it shows.

### Verification

| Check | Result |
|---|---|
| Rendered figures vs live API | **exact match** on all four |
| Loading -> loaded shift | **-1px** (1040 -> 1039). First attempt was 58px; skeleton heights were re-measured from the loaded layout rather than estimated, and the door row it had omitted was added |
| Error state | forced by pointing the API at an unreachable host: `role="alert"`, cause + likely resolution, two 44px recovery actions, **no stale numbers shown**, rest of page unaffected |
| Calendar palette | `rgb(57,211,83)` green in github / nord / nightOwl (was greyscale) |
| Calendar at 375 / 768 / 1440 | 365 squares everywhere, contained in its own `overflow-x: auto` scroller, **page overflow 0** |
| Tile grid | 2 columns phone/tablet, 4 desktop |
| Contrast, 6 themes | **0 failures** (202 nodes each) |
| Touch targets | all >= 44px at every width |
| Lint | 119 problems — back to baseline after extracting the helper |

### Note

The calendar depends on a **second, different third-party API**
(`github-contributions-api.jogruber.de`), not `api.github.com`. The error state
built here covers the REST failure only; if that separate service fails the
calendar renders its own empty state inside an otherwise-working section. Not
addressed this phase — flagged for Phase 7.

---

## 10e. Phase 5 results (completed 2026-08-24)

### About — refined, not rewritten

The audit was right that this section was already rich (photo, intro, bio, stats,
skills, CTA), so this kept all of it and fixed what was actually wrong.

| Fix | Before | After |
|---|---|---|
| Duplicate heading | eyebrow "About Me" directly above `<h2>` "About Me" | eyebrow "The short version" — a different register |
| Skills | one flat list of 8 | **3 groups** (Frontend / Backend / Tooling & AI), 16 items |
| Layout | centred 2-column, `text-center` on mobile | 3-column on `lg`: identity / story / skills |
| Availability | absent from home | pill whose **words** carry the status, dot is decoration |
| "Currently learning" | 4-item list competing with the skills | one footnote line |
| Quick stats | `"33+"` hardcoded | **derived** — 5 apps, 33 builds, both counted from their own arrays |
| Door | "Read full profile" | "The full story — timeline, education, services" |

### Archive — the marquee replaces the card grid

The section was a three-card grid: the same rectangles-in-a-row shape as the
sections above and below, which is what made the page read as one long
undifferentiated column. It is now the dual counter-scrolling marquee.

That choice does two things beyond variety. It is honest about what the archive
*is* — a large continuous body of small work, not three selected pieces — and it
**revives `MiniProjectsCarousel`, which the /projects retirement had left with no
consumer at all**. A `chromeless` prop lets the host section own the header, count
and door so nothing is announced twice.

The inline `MiniCard` duplicate inside `LabTeaser` is gone; the marquee uses the
real `MiniProjectCard`.

### D7 closed — the count is derived everywhere

`realBuildCount` is now exported from `uiExperimentsData.js` and consumed by
`LabTeaser`, `AboutTeaser`, `HeroSection` and `StatsCards`. The literal `"33+"`
appears nowhere. `PortfolioDetail`'s "33 graded builds" prose is now count-free.

### Dead code found and removed

`GithubContext` exposed a derived `repoCount` **consumed by nobody** — and its
fallback used the archive build count (`stats.projects`) as a stand-in for a
GitHub repository count, two unrelated numbers. Removed, along with the now-unused
`stats` imports in `About.jsx` and `Home.jsx`. `PortfolioDetail`'s copy describing
that value was corrected too.

### The regression I introduced, and the fix

Making the marquee full-bleed pushed **page overflow from 0 to 32px** at every
width above 375.

`MarqueeRow` bleeds outward with `-mx-4 sm:-mx-6 md:-mx-8`, written to cancel
exactly the padding of the `max-w-5xl px-4 sm:px-6 md:px-8` container it used to
sit in. `chromeless` had removed that container, so the negative margins had
nothing left to cancel and the rows ran 56px past the viewport.

Isolated by hiding each section in turn — with `#lab` hidden, overflow was 0.
Fixed by keeping the container in chromeless mode; only the header and CTA are
stripped. `labContributes: 0` at 375 / 768 / 1024 / 1440.

### Verification

| Check | Result |
|---|---|
| About columns | 1 on phone/tablet, **3** on `lg`+ |
| Eyebrow vs title | no longer identical |
| Skill groups | 3 labels, 16 items |
| Derived counts | 5 production apps, 33 archive builds — both computed |
| Archive headers | **1** (chromeless prevents the duplicate) |
| Marquee | 22 card slots rendering at every width |
| Page overflow | 0 at 768 / 1024 / 1440; 4px at 375 (pre-existing, present with the section hidden too) |
| Contrast, themes | **0 failures** across 253 nodes |
| Lint | 119 -> **106** problems (the inline MiniCard carried the difference) |

### Flagged, not changed

Inside the marquee cards, "Live Demo" and the source-code icon measure **36px**
at `sm` and above (`h-11 sm:h-9`). That sizing was chosen deliberately earlier in
this project when the cards were made smaller for phones, and it is not a
regression — the previous inline `MiniCard` used `min-h-9` for the same links. It
clears WCAG 2.2 AA (24px) but not the 44px floor used elsewhere on this site.
Worth a decision in Phase 7 rather than a silent override here.

---

### About & Contact — type and density pass (2026-08-24)

Reported as "too congested, small fonts". Measured before touching anything, and
the complaint was precise:

| Section | Text nodes under 14px | Largest body size |
|---|---|---|
| Contact | **15 of 21 (71%)** | one node at 16px |
| About | 10 under 14px + 19 *at* 14px = **85% <=14px** | two nodes at 16px |
| Projects *(not complained about)* | 38 of 51 | **five nodes at 60px** |

So density was not the difference. Projects has huge type creating hierarchy and
air; About and Contact had **nothing between 18px and 48px** and put nearly
everything at 11-14px. The small uppercase label voice had been applied to
sections that need reading sizes.

**Raised the floor rather than scaling everything up.**

| Element | Before | After |
|---|---|---|
| Form inputs | 14px | **16px** — also stops iOS zooming the page on focus |
| Form labels | 11px uppercase @ 0.2em tracking | 13px sentence case, normal tracking |
| Form errors | 11px | 13px |
| Channel labels / values | 10px / 14px | 13px / 16px |
| About story | 16px / 1.5 | 17px / **1.7** |
| Skill items | 14px | 15px |
| Name / role / location | 18 / 14 / 14 | 20 / 16 / 15 |
| Section doors | 14px | 15px |
| Eyebrow pills | 12px | 13px |

Spacing opened alongside it: column gaps 10->12 and 16->20, card padding 4->5/6,
field rhythm `space-y-4`->`space-y-5`.

**Result:** Contact's smallest text is now **13px with zero nodes below it** (was
10px). About runs **71% of nodes at 15px or larger** (was 12%). Section heights
grew ~80px each — that is the breathing room, not bloat.

### A bug this pass exposed

Contact's two columns entered from `x: -20` and `x: 20`. A **rightward** entrance
transform extends the page's scrollable overflow box, so while the section sat
below the fold un-animated it pushed **15px of horizontal scroll onto the whole
page** at 375px. Only the rightward one showed up — in LTR, negative-x space is
not scrollable, which is why the left column was invisible in the measurement.

Isolated by hiding each section in turn (`#contact` hidden -> overflow 0). Both
columns now enter vertically, matching the motion vocabulary every other section
already uses. Overflow is **0 at 375 / 768 / 1440**.

Contrast re-verified after all of it: **0 failures across 253 nodes** in every
theme.

---

## 10f. Phase 6 results (completed 2026-08-24)

### What changed

- **Hero shortened**: `h-[calc(100dvh-64px)]` → `h-[82dvh] min-h-140`. Section
  two (About) now peeks above the fold on load instead of requiring a scroll
  to discover it exists.
- **`StatRail`** (new, `src/features/home/StatRail.jsx`) — one line under the
  social icons: `5 projects · 33 builds · 6 themes · MERN + AI`. All four
  figures are derived from the same arrays the rest of the page renders
  (`projects`, `realBuildCount`, `stats.themes`), so they cannot drift out of
  sync — same discipline as the GitHub teaser's numbers.
- **Scroll cue** — a bouncing chevron pinned to the hero's bottom edge,
  `aria-label="Scroll to About"`, gated on `asSection` so it never renders on
  a route that isn't the scroll-page, reads `useReducedMotion()`.
- **`SectionRail`** (new, `src/components/SectionRail.jsx`) — vertical dot nav
  for the six scroll sections, active state from the existing
  `useActiveSection` hook. Visual language matches `PageNavigator`'s dot row
  (`w-6`/`bg-accentColor` active, `w-1.5`/`bg-textColor/15` inactive) turned
  90°, so page-level and section-level orientation read as one system.
- **`SocialSidebar` collision resolved**: took an `isHome` check
  (`pathname === "/"`) and now renders `<SectionRail />` in the right rail
  slot in place of the vertical email link, only on home. Every other route
  keeps the email exactly as before. This doesn't lose the email as a contact
  path on home — the full contact form is already embedded there (Phase 2),
  so the floating email link was a duplicate on that one route.

### Verified

- Screenshots at 1440×900 and 375×812: StatRail wraps cleanly on mobile,
  scroll cue sits clear of `BottomNav`, section rail's active dot visibly
  grows and tracks scroll position (confirmed by scrolling to `#projects` —
  the third dot, "Work", lit up).
- `document.documentElement.scrollWidth - clientWidth` = **0 at 375 / 768 /
  1440** — no new horizontal overflow introduced.
- `npx eslint` on all four touched/new files: **0 errors** after adding
  `/* eslint-disable react/prop-types */` to `Home.jsx` (matches the
  convention already used in `SectionHeader.jsx`, `GithubTeaser.jsx`).

---

## 10g. Phase 7 results (completed 2026-08-24)

### What changed

- **Bands + container width** — About, Archive, GitHub, and Contact all moved
  from `py-16 md:py-24` / `max-w-5xl` to `py-20 md:py-28` / `max-w-6xl` per
  §4.4/§4.3. About and Contact additionally took `bg-articleBg/40`, and
  Archive kept it (was already close); GitHub and Work stay on the bare
  `mainBg` band. Sequence down the page is now a strict alternation: mainBg
  (Hero) → articleBg (About) → mainBg (Work) → articleBg (Archive) → mainBg
  (GitHub) → articleBg (Contact). Verified on a real render — the seam is
  subtle by construction (as the plan predicted) but present; no hairline
  border was needed.
- **Deliberate exception — Work/Projects section left untouched.** §4.4 and
  §4.3 call for `py-24 md:py-36` and the `lg` (centerpiece) type scale on
  Work. The Work section *is* the retired `/projects` page's exact editorial
  UI, mounted verbatim per an explicit earlier instruction ("add the same UI
  in /project page on the main page entirely as is, same UI"). Resizing its
  padding or heading would break that promise for a padding/scale gain the
  brief doesn't actually need — this section was never the one that looked
  cramped. Recorded here rather than silently deviating from §4.3/§4.4.
- **`ContactTeaser` migrated onto `SectionHeader`** — the last home section
  still carrying a copy-pasted `hc`/`hi` header pair. All five non-hero home
  sections now share one header component. (About, Archive, GitHub already
  used it going into this phase.)
- **CTA audit** — checked against the plan's rewrite list: Archive's door
  already read "Explore the Build Archive", GitHub's already read "Full
  GitHub dashboard", About's already read "The full story — timeline,
  education, services" (deeper than the plan's minimum, kept as-is), Contact
  has no CTA (it *is* the destination). No changes needed — this list was
  completed inside Phase 3/4/5 without being logged against this task.
- **`PageNavigator` made consistent** — it rendered on `/frontend-lab` and
  `/github` only. Added to `/about` and `/contact` (both gated on
  `!asSection`, matching how every other conditional in those two files
  already handles the home-mount case, even though neither is actually
  mounted `asSection` anywhere today). All four standalone detail pages now
  carry the same prev/next chrome.
- **Mega-menu focus trap added** (D15, previously "consider"). Before this,
  Tab could walk keyboard focus out of the open panel and onto page content
  still visible underneath it, and closing the menu left focus wherever Tab
  had wandered. Now: opening the menu moves focus to the first link inside
  the panel; Tab/Shift+Tab wrap within the header card + panel (reusing the
  existing `cardRef` click-outside boundary, so the trapped region is exactly
  what's visibly interactive); Escape closes the menu **and** returns focus
  to the hamburger button, instead of only closing it as before.
- **Hardcoded-colour sweep** — grepped every home-section file plus the new
  Phase 6 components for raw hex/`rgba()`. Found only the two already-
  documented, deliberate exceptions: the GitHub contribution calendar's
  levels (recognizable GitHub green palette, commented in `GithubTeaser.jsx`)
  and the traffic-light dots in the code-editor illustration (decorative,
  theme-independent). No undocumented raw colour found.

### Verified

- `document.documentElement.scrollWidth - clientWidth` = **0 at 375 / 768 /
  1024 / 1440**.
- Scrolled to each section (`#about` through `#contact`) and confirmed the
  `SectionRail` dot lights up in sync at every stop, band backgrounds render
  in the correct alternation, and the Contact section's new `SectionHeader`
  matches the others' type/spacing exactly.
- `/about` and `/contact`: confirmed `PageNavigator` now renders at the
  bottom of both (Previous/Continue links correct), and the right rail still
  shows the vertical email link on these non-home routes — the Phase 6
  `isHome` swap is unaffected.
- Mega-menu keyboard flow, driven programmatically: opening focuses the
  first panel link ("Home"); tabbing from the last focusable element in the
  header card wraps to the hamburger button; **Escape closes the menu and
  restores focus to the hamburger button** (previously it only closed).
- `npx eslint` on every touched file: **0 errors** (one new
  `/* eslint-disable react/prop-types */` in `Contact.jsx`, matching the
  existing convention, needed once `asSection` became referenced in JSX).

---

## 10h. Phase 0 results (completed 2026-08-24)

Phase 0 was written to run first; in practice items 1–7 were absorbed
piecemeal into Phases 1, 4, and 5 without being checked off here (real
`useGithub()` data, `motion.js`, `SectionHeader.jsx`, the `nightOwl` AA fix,
and `config.js` derived counts all shipped earlier). This pass closed the
remaining items and, in re-auditing them, found two real defects the earlier
phases hadn't caught.

### What was verified already done (no change needed)

- Item 1 (fabricated GitHub data) — resolved in Phase 4.
- Item 2 (`PortfolioDetail`'s `useGithub()` claim) — re-read against current
  `GithubTeaser.jsx`: the claim is now **true**, not stale copy. It self-
  corrected when Phase 4 rewrote the component; no separate fix needed.
- Items 3, 4, 6, 8, 9 (`motion.js`, `SectionHeader`, `nightOwl` AA, derived
  counts, `project.js` `role` field) — confirmed present and correct.

### What was actually broken (found and fixed here)

- **D8, font tokens — silently broken, not just "not yet renamed."** The
  `@theme inline` keys were `--font-family-Inter` / `-Inconsolata` /
  `-Cursive`. Tailwind v4 only generates a `font-*` utility from a `--font-*`
  key — the `-family-` keys generated `font-family-Inter` etc., which nothing
  ever referenced. Renamed to `--font-Inter` / `--font-Inconsolata` /
  `--font-Cursive`. `About.jsx`'s `font-Inconsolata` class (on the
  `aboutMe.json` code block) had been silently falling back to the sans body
  font since the day it was written — verified fixed by computed style
  (`font-family: Inconsolata, monospace`). Replaced the two remaining inline
  `style={{ fontFamily: "'Satisfy', cursive" }}` in `Home.jsx` with
  `font-Cursive` per the plan.
- **A second, unrelated bug the token fix exposed**: `index.html` had a
  static `<body class="font-Inconsolata">` — dead markup, presumably a stray
  test that was never cleaned up. While the token was broken this was a
  harmless no-op; the moment `.font-Inconsolata` started resolving, it would
  have put the entire site body in monospace, except that `body { font-family:
  "Inter" }` in `index.css` is un-layered CSS, which beats any `@layer
  utilities` rule regardless of specificity — so it stayed masked by luck,
  not by design. Removed the stray class from `index.html` rather than leave
  a correctness accident load-bearing.
- **D5, `explorerBorder: transparent` on `ayuDark` / `ayuMirage` / `nightOwl`
  — a real, previously-unflagged visibility bug.** All three themes had this
  token set to `transparent`, meaning every `border-explorerBorder` element
  built across Phases 1–7 — cards, the availability pill, channel rows, the
  `SectionRail` tooltip border — had **no visible edge at all** on half the
  site's six themes. Verified by screenshot: on `nightOwl`, the About page's
  photo ring and "Available for work" pill previously had zero border; on
  `ayuMirage`, every Contact card and form field was borderless. Fixed by
  giving each theme a real value in its own idiom rather than one shared
  fallback: `ayuDark`/`ayuMirage` got a recessed border darker than
  `mainBg` (matching github/dracula's existing pattern — `#05070a` and
  `#171b24`), `nightOwl` reused its own already-established
  `bottombarBorder` value (`#262a39`), which fits the lighter-than-`mainBg`
  border family that theme already uses for `tabBorder`.
- **D11, `.box { transition: all 1s ease-in-out }`.** The blob's
  `border-radius` shape-shift is driven entirely by its `animation`;
  nothing else on `.box` changes, so the transition was inert dead weight —
  and `transition: all` is exactly the anti-pattern the plan's own motion
  rules ban elsewhere (animate named properties, never `all`). Removed.
  Also deleted the now-fully-unused `.typewriter` / `.line-container` /
  `blink-caret` CSS (D1 — the hardcoded `orange` border-color lived here):
  neither class had any consumer left in `src/`, so the correct fix was
  deletion, not reskinning dead code onto a token.
- **D13, dead code.** Confirmed zero importers (`grep`, not assumption) for
  all eight candidates, then removed them: `CustomCursor.jsx`,
  `ProjectTimeline.jsx`, `Explorer.jsx`, `SideBar.jsx`, `LiveClock.jsx`,
  `ProjectCard.jsx` + `Tag.jsx` (the latter only ever imported by the
  former), and the entire `features/articles/` folder + its now-orphaned
  `services/apiArticles.js`.

### Verified

- `npx eslint src`: **0 problems** (down from a documented 151-problem
  baseline at the start of this redesign — the last of it cleared across
  Phases 1–7, not newly here).
- `npm run build`: succeeds; only the pre-existing >500 KB main-chunk
  advisory remains (accepted in Phase 1 — Home is deliberately eager as the
  landing route).
- Computed-style check on `/about`: the code block resolves to
  `"Inconsolata, monospace"`; page headings remain `"Inter, sans-serif"`
  (confirms the stray `index.html` body class isn't leaking font-family
  anywhere once removed).
- Screenshots on `nightOwl` and `ayuMirage`: borders now render on cards,
  pills, and form fields that were previously edgeless.

---

## 11. Evidence log

Written after a full pass over `src/` — 86 `.js`/`.jsx` files, 11,944 lines —
plus `index.html`, `index.css`, `package.json`, and a production build.

**Read in full:** `App.jsx`, `main.jsx`, `Main.jsx`, `Pages.jsx`, `NavBar.jsx`,
`BottomNav.jsx`, `SocialSidebar.jsx`, `Footer.jsx`, `ScrollToTop.jsx`,
`CustomCursor.jsx`, `PageNavigator.jsx`, `BackButton.jsx`, `ThemeContext.jsx`,
`GithubContext.jsx`, `apiGithub.js`, `config.js`, `useActiveSection.js`,
`index.css`, `index.html`, all six home sections (`Home`, `AboutTeaser`,
`WorkTeaser`, `LabTeaser`, `GithubTeaser`, `ContactTeaser`), `MainScrollPage.jsx`,
`project.js`, `Tag.jsx`, `ProjectCard.jsx`, `ContactSocials.jsx`,
`StatCard.jsx`, `StatsGrid.jsx`, `SectionTitle.jsx`, `Contact.jsx`.

**Read structurally** (grep + targeted ranges): `About.jsx`, `Projects.jsx`,
`Github.jsx`, `ContributionGraph.jsx`, `BentoSkills.jsx`, `MiniProjectsCarousel.jsx`,
`MiniProjectCard.jsx`, `uiExperimentsData.js`.

**Measured, not assumed:** contrast ratios (computed from the theme hex values in
`index.css`); image weights and bundle size (from `npm run build` output and
`du`); component usage and dead code (import graph via grep); archive entry count
(from the data file); font-token resolution (from the Tailwind v4 `--font-*`
namespace rule).

**Deliberately not read in depth:** the five project detail pages
(`*Detail.jsx`, ~2,300 lines), `features/theme/*`, `features/frontend-lab/components/*`,
`features/error/*`, the `Illustration*.jsx` SVG files. None of them render on
home. The one exception noted is `PortfolioDetail.jsx`, whose case-study copy
contains the inaccuracy flagged in §2.1.

**Still to verify inside its own phase:**

| # | Assumption | Phase |
|---|---|---|
| A1 | `ContributionGraph` renders correctly outside `/github` | 4 |
| A2 | Retiring `useTilt`/`FeaturedCard`/`SupportingCard` breaks nothing else | 3 |
| A3 | `vite-imagetools` integrates cleanly with Vite 8 + the current asset imports | 1 |
| A4 | Raising `nightOwl` tokens does not break `FloatingThemeButton`'s preview swatches (it hardcodes `#011627`/`#5f7e97`/`#89a4bb` at `FloatingThemeButton.jsx:33`) | 0 |
