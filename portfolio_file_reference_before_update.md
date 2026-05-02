# VSCode Portfolio — Complete File Reference

**Project:** `e:\Full-Stack\Portfolio\My-portfolio-vsc`
**Stack:** React 18 + Vite + TailwindCSS v3 + tw-colors + React Router v6

---

## ENTRY POINTS

### `index.html`
- Root HTML shell. Sets `<title>Shiv</title>`, loads the VSCode SVG favicon from `/public/vscode_icon.svg`, applies `class="font-Inconsolata"` on `<body>` (using the Google Font loaded in `index.css`). Mounts React at `<div id="root">`.

### `src/main.jsx`
- ReactDOM entry. Wraps `<App />` in `<React.StrictMode>` and renders it into `#root`. Also imports `./index.css` (global styles).

### `src/App.jsx`
- Defines the entire **route tree** using `createBrowserRouter`.
- Wraps everything in `<ThemeProvider>` (from context).
- Route structure:
  ```
  <Main />  ← layout shell (always rendered)
  ├── /           → <Home />
  ├── /about      → <About />
  ├── /contact    → <Contact />
  ├── /projects   → <Projects />
  ├── /articles   → <Articles />  + ArticlesLoader
  ├── /github     → <Github />    + GithubLoader
  └── /settings   → <Settings />
  errorElement: <ErrorPage />
  ```
- **Loaders**: Articles and Github routes use `loader` functions to pre-fetch API data before the page renders (React Router v6 data API pattern).

---

## GLOBAL STYLES & CONFIG

### `src/index.css`
- Imports Inconsolata font from Google Fonts.
- Sets `@tailwind base/components/utilities`.
- Defines global resets: `html, body` height, `img/svg display:block`, heading/p margin reset.
- Custom scrollbar styling (webkit).
- **`.typewriter`** — CSS-only typewriter animation (overflow hidden + border-right blinking caret) used in Home.
- **`.line-container` / `.line`** — CSS counter that auto-numbers lines (used in ContactSocials to mimic code block line numbers).
- **`.input`** — `@apply` utility for all form inputs in Contact.
- **`.box` / `@keyframes animate`** — Blob shape animation for the avatar in About. Background image is loaded from a raw GitHub URL.

### `tailwind.config.js`
- Uses the `tw-colors` plugin (`createThemes`) to define **6 complete color themes**.
- Each theme defines these tokens: `mainBg`, `bgText`, `textColor`, `accentColor`, `titlebarBg`, `sidebarBg`, `sidebarHoverBg`, `explorerBg`, `explorerHoverBg`, `explorerBorder`, `tabsBg`, `tabBg`, `tabActiveBg`, `tabBorder`, `bottombarBg`, `bottombarBorder`, `buttonBg`, `buttonText`, `bottombarHoverBg`, `scrollbarTrackBg`, `scrollbarThumbBg`, `articleBg`.
- **Themes:** `github`, `dracula`, `ayuDark`, `ayuMirage`, `nord`, `nightOwl` (default).
- Theme is applied by adding `theme-{name}` class to the root div in `Main.jsx`.

### `vite.config.js`
- Standard Vite config with `@vitejs/plugin-react`.

### `postcss.config.js`
- Standard PostCSS config with `tailwindcss` and `autoprefixer`.

### `.env`
- Stores 3 EmailJS secrets: `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID`, `VITE_EMAILJS_KEY`. Used in `Contact.jsx`.

### `.eslintrc.cjs` / `.prettierrc.cjs`
- ESLint with react/react-hooks/react-refresh plugins. Prettier with `prettier-plugin-tailwindcss` for class sorting.

### `public/_redirects`
- Netlify SPA redirect rule (`/* /index.html 200`) so React Router works on direct URL access.

---

## CONTEXT

### `src/context/ThemeContext.jsx`
- Creates `ThemeContext` with `createContext()`.
- **`ThemeProvider`**: holds `theme` state (default: `"nightOwl"`), exposes `changeTheme(newTheme)`. Wraps the entire app in `App.jsx`.
- **`useTheme()`**: custom hook — any component calls this to read `theme` or call `changeTheme`.
- **Bug:** Theme is NOT saved to `localStorage`. Every refresh resets to `nightOwl`.

---

## SERVICES (API layer)

### `src/services/apiGithub.js`
- Makes 2 parallel Axios GET requests: `https://api.github.com/users/sh1v-max` and `https://api.github.com/users/sh1v-max/repos`.
- Returns `[userData, reposArray]` as a tuple.
- Used by the `loader()` in `Github.jsx`. React Router calls this before rendering the page.
- **Bug:** No `per_page` parameter — GitHub API defaults to 30 repos. Repos beyond 30 are missing.

### `src/services/apiArticles.js`
- Makes 1 Axios GET to `https://dev.to/api/articles?username=manavss`.
- **Bug:** Username is `manavss` (someone else). Should be your dev.to username.
- Used by the `loader()` in `Articles.jsx`.

---

## LAYOUT SHELL COMPONENTS (`src/components/`)

### `Main.jsx`
- The **root layout** rendered for every route.
- Reads `theme` from `useTheme()` and sets `className={`theme-${theme}`}` on the wrapper div — this is how all theme colors propagate.
- Renders in order: `<NavBar />` → `<main>` (flex row: `<SideBar />` + `<Explorer />` + `<Pages />`) → `<Footer />`.
- **Bug:** No `Tabs` here — Tabs are inside `Pages.jsx`.

### `NavBar.jsx`
- Renders the VSCode **title bar** at the top.
- Left side: VSCode `.ico` icon + menu items `["File","Edit","View","Go","Run","Terminal","Help"]` (purely decorative, not clickable menus).
- Center: `"Singh Shiv - Visual Studio Code"` title text.
- Right side: 3 colored dots (yellow, green, red) mimicking macOS/VSCode window controls — purely decorative.
- No state, no props.

### `SideBar.jsx`
- Renders the **left icon strip** (thin ~40px wide sidebar).
- Two sections: top icons (Files, Github, Code, Pencil, Mail) and bottom icons (Account, Settings).
- Each icon is wrapped in a `<Link>` to its route.
- Uses `useLocation()` to detect active route → applies `border-l-2 border-accentColor` and brighter fill color to the active icon.
- No props, no state.

### `Explorer.jsx`
- Renders the **file explorer panel** (collapsible, hidden on mobile with `max-sm:hidden`).
- Internal state: `show` (boolean, default `true`) — toggled by clicking the "PORTFOLIO" folder label with `<ChevronRight />` that rotates 90° when expanded.
- Lists 6 navigation items, each with a file-type icon and a file name:
  - `home.jsx` → `/` (React icon)
  - `about.html` → `/about` (HTML icon)
  - `contact.css` → `/contact` (CSS icon)
  - `projects.js` → `/projects` (JS icon)
  - `articles.json` → `/articles` (JSON icon)
  - `github.md` → `/github` (Markdown icon)
- Each item is a `<Link>`. No active-state highlighting here (active state is only on Tabs and SideBar).
- **Bug:** Has `border border-cyan-500` debug border.

### `Tabs.jsx`
- Renders the **file tabs bar** (the row of open-file tabs below the title bar, above the content).
- Same 6 items as Explorer, with same icons and routes.
- Uses `useLocation()` to detect active tab → applies `border-t-2 border-t-accentColor bg-tabActiveBg` on the active tab.
- Inactive tabs get `border-2 bg-tabBg`.
- **Issue:** All 6 tabs are always shown — real VSCode only shows "opened" tabs. There's no open/close tab logic.
- **Issue:** `explorerItems` config in Explorer and `TabsItems` config in Tabs are identical arrays defined separately — duplicated code.

### `Pages.jsx`
- Wrapper for the main content area.
- Renders `<Tabs />` on top, then a `<section>` with `<Outlet />` (React Router renders the matched child route here).
- `min-h-[85vh]` ensures the content area fills the screen.
- **Bug:** Has `border border-green-700` debug border.

### `Footer.jsx`
- Renders the VSCode **status bar** at the bottom.
- Left side: GitHub source-control icon (links to `https://github.com/sh1v-max/`) + Error + Warning icons (decorative).
- Right side: React spinning icon + Check icon + Bell icon (all decorative).
- No state, no props.
- **Bug:** Has `border border-fuchsia-700` debug border.

---

## FEATURE PAGES (`src/features/`)

### `home/Home.jsx`  ← Route: `/`
- The **hero / landing page**.
- Renders a `relative` div with `min-h-[75svh]`.
- Background: Large faded "I BUILD / PRETTY / WEBSITES" text (`text-bgText`, hidden on mobile).
- Foreground: Name heading `"Shiv Shankar Singh"`, a `.typewriter` div animating `"Front End Web Developer"`, two CTA buttons linking to `/projects` and `/contact`.
- Right side: `<Illustration />` SVG component.
- Uses `<HelmetProvider>` + `<Helmet>` to set `<title>Shiv | Home</title>`.
- Has dead code: commented-out Link-based buttons at the bottom of the file.

### `home/Illustration.jsx`
- A pure SVG component — renders an abstract geometric shape (two circles + a path) in `text-accentColor` (so it changes color with the active theme).
- No props, no state.

### `home/hehe2.jsx`  ← DEAD FILE (not imported anywhere)
- An experimental gradient variant of the Home page. Has a `bg-gradient-to-br from-slate-900 via-purple-900` background, gradient-text name, and animated glow blobs. Not used.

### `home/minimaldesign.jsx`  ← DEAD FILE (not imported anywhere)
- Another experimental Home design (11KB). Not used.

---

### `about/About.jsx`  ← Route: `/about`
- Renders in two sections:
  1. **Top row** (xl: side-by-side): animated blob avatar (`div.box` with CSS border-radius animation) + name/title heading + location tagline.
  2. **Bottom row** (xl: side-by-side): "About me" bio paragraph + tech stack icon grid.
- Tech stack array: `[html_icon, css_icon, js_icon, react_icon, tailwind_icon]` — just icon SVGs, no labels.
- **Bug:** The blob `.box` uses `background: url(...)` pointing to a raw GitHub image URL — not a real photo of you.
- **Bug:** `h2` bio is hidden on mobile (`max-sm:hidden`) — mobile users see no description.
- Has commented-out alternate bio paragraph at the bottom.

---

### `projects/Projects.jsx`  ← Route: `/projects`
- **THE ENTIRE CONTENT IS COMMENTED OUT.** The page renders nothing.
- The working code (commented) would render a grid of `<ProjectCard />` components by mapping over the `project` array from `project.js`.
- Component function is named `projects` (lowercase) — React naming convention violation.

### `projects/project.js`
- Exports a `project` array with 4 hardcoded project objects:
  - `Vs-Code Portfolio` (react, tailwind, axios)
  - `Fast React Pizza` (react, tailwind, redux)
  - `Rest Countries` (react, tailwind, context-api)
  - `Dictionary App` (react, axios, material-ui)
- Each object: `{ title, description, image, tags[], sourceCode, demo }`.
- Images imported from `assets/images/` (vscode.jpg, pizzapic.jpg, rest.jpg, dictionary.jpg).
- **Note:** `assets/images/` also contains `cart.jpg` and `nike.jpg` — unused project screenshots, suggesting more projects were planned.

### `projects/ProjectCard.jsx`
- Props: `{ img, title, desc, tags[], srcCode, demo }`.
- Renders a card: image thumbnail → title → description → tags row → "Source Code" + "Live Demo" links.
- Tags are rendered as `<Tag />` components.
- `max-w-xs` constrains card width.

### `projects/Tag.jsx`
- Props: `{ tagName }`.
- Renders a pill badge with a purple-to-blue gradient border effect (using an inner `<span>` on a gradient background wrapper).
- On hover: inner background fades revealing the gradient — nice micro-animation.

---

### `contact/Contact.jsx`  ← Route: `/contact`
- Split layout: left half = `<ContactSocials />`, right half = the EmailJS form.
- Form fields: NAME, EMAIL, SUBJECT, MESSAGE (textarea).
- Uses `react-hook-form` for validation:
  - Name: required
  - Email: required + regex pattern
  - Subject: required
  - Message: required + min 5 chars custom validator
- `sendEmail()`: calls `emailjs.sendForm()` with keys from `.env`, then calls `reset()`, then `alert()`.
- **Bug:** `alert()` is used for success feedback — blocks the UI and looks terrible.
- **Bug:** No error handling feedback in the UI if `emailjs.sendForm()` fails (only `console.log`).
- Uses `useRef` on the `<form>` element for EmailJS (which reads form values via DOM ref).

### `contact/ContactSocials.jsx`
- Hardcoded `socials` array with 6 entries: Email, LinkedIn, GitHub, Instagram, MonkeyType, LeetCode.
- Renders them styled as a CSS code block (`.socials { ... }`) using the `.line-container` / `.line` counter classes from `index.css` — auto line-numbered.
- Each social link is an `<a>` tag with `href`.

---

### `github/Github.jsx`  ← Route: `/github`
- Uses React Router `useLoaderData()` to get `[user, repos]` from the `loader()` below.
- Filters repos to only starred ones: `repos.filter(r => r.stargazers_count > 0)`.
- Renders:
  1. Profile banner: avatar image + username + public repo count + bio.
  2. Grid of `<RepoCard />` for each starred repo (2 cols md, 4 cols xl).
  3. `<ActivityCalendar />` from `react-github-calendar` with a custom dark theme palette.
- **Bug:** `ActivityCalendar` uses `username="manavss"` — wrong username.
- **Bug:** `loader()` calls `getUser()` but does NOT `await` it — the loader returns a Promise instead of resolved data. Works accidentally in some cases but is technically broken.

### `github/RepoCard.jsx`
- Props: `{ name, desc, url, homepage }`.
- Renders: repo name (in accentColor), description, two icon links (GitHub logo → source, link icon → live homepage).

---

### `articles/Articles.jsx`  ← Route: `/articles`
- **THE ENTIRE CONTENT IS COMMENTED OUT.** Page renders nothing.
- The working code (commented) maps `articles` (from `useLoaderData()`) to `<ArticleCard />` components.
- `loader()` calls `await getArticles()` and returns the array.

### `articles/ArticleCard.jsx`
- Props: `{ url, image, title, desc }`.
- Renders a clickable card (the whole card is an `<a>` tag) with cover image, article title in `accentColor`, and description.

---

### `settings/Settings.jsx`  ← Route: `/settings`
- Hardcoded `themeInfo` array with 6 theme objects: `{ name, publisher, theme, img }`.
- Themes: Dracula, NightOwl, GitHub, Nord, Ayu Mirage, Ayu Dark.
- Renders a grid of `<ThemeCard />` (3 cols md, 4 cols xl).
- **Bug:** `<Helmet>` title still says `"Manav Shete | Settings"`.

### `settings/ThemeCard.jsx`
- Props: `{ name, publisher, theme, img }`.
- Renders: theme screenshot image + name + publisher + "Set Color Theme" button.
- Button `onClick` calls `changeTheme(theme)` from `useTheme()` — this changes the global theme instantly.

---

### `error/ErrorPage.jsx`
- Rendered when React Router catches an error in any route (including loader errors).
- Reads `theme` from `useTheme()` to apply correct background/text color.
- Displays a hardcoded message: `"Seems like API has reached its Limit😢. Try again after an hour."`
- **Problem:** This message is wrong for non-API errors (e.g., navigating to a bad URL shows the same API error message).

---

## ICON COMPONENTS (`src/components/icons/`)

All are pure SVG React components accepting a `fill` prop (used by SideBar to change color based on active state). Notable ones:

| File | Used In | Purpose |
|---|---|---|
| `FilesIcon.jsx` | SideBar | Explorer/home icon |
| `GithubIcon.jsx` | SideBar | GitHub page icon |
| `CodeIcon.jsx` | SideBar | Projects page icon |
| `Pencil.jsx` | SideBar | Articles page icon |
| `MailIcon.jsx` | SideBar | Contact page icon |
| `AccountIcon.jsx` | SideBar | About page icon |
| `SettingsIcon.jsx` | SideBar | Settings page icon |
| `ChevronRight.jsx` | Explorer | Folder expand/collapse arrow |
| `SourceControlIcon.jsx` | Footer | Git branch icon |
| `ErrorIcon.jsx` | Footer | Error count (decorative) |
| `WarningIcon.jsx` | Footer | Warning count (decorative) |
| `BellIcon.jsx` | Footer | Notification bell (decorative) |
| `CheckIcon.jsx` | Footer | Prettier check (decorative) |
| `ReactIcon.jsx` | Footer | React spinning icon (decorative) |
| `StarIcon.jsx` | (unused in current pages) | GitHub star count |
| `ForkIcon.jsx` | (unused in current pages) | GitHub fork count |
| `CommentIcon.jsx` | (unused) | Article comment count |
| `HeartIcon.jsx` | (unused) | Article heart/reaction count |
| `EyeIcon.jsx` | (unused) | View count |
| `WatchIcon.jsx` | (unused) | Watch count |
| `NextjsIcon.jsx` | (unused) | Next.js logo |
| `LinkIcon.jsx` | (unused) | External link |

---

## STATIC ASSETS

### `src/assets/icons/` (SVG files)
Used as `<img src={icon} />` (not React components):
`react_icon.svg`, `html_icon.svg`, `css_icon.svg`, `js_icon.svg`, `json_icon.svg`, `markdown_icon.svg` → used in Explorer + Tabs for file-type icons.
`tw-icon.svg` → used in About tech stack.
`github_icon.svg`, `link_icon.svg` → used in RepoCard.
`vscode.ico` → used in NavBar.
`python-5.svg`, `vercel.svg` → unused currently.

### `src/assets/images/`
| File | Used In |
|---|---|
| `vscode.jpg` | project.js (Vs-Code Portfolio project card) |
| `pizzapic.jpg` | project.js (Fast React Pizza) |
| `rest.jpg` | project.js (Rest Countries) |
| `dictionary.jpg` | project.js (Dictionary App) |
| `dracula.png` | Settings.jsx (Dracula theme card) |
| `night-owl.png` | Settings.jsx (NightOwl theme card) |
| `github-dark.png` | Settings.jsx (GitHub theme card) |
| `nord.png` | Settings.jsx (Nord theme card) |
| `ayu.png` | Settings.jsx (Ayu Mirage + Ayu Dark cards) |
| `peakpx.jpg` | index.css `.box` class (blob background — raw GitHub URL used instead) |
| `cart.jpg` | **UNUSED** — planned project screenshot |
| `nike.jpg` | **UNUSED** — planned project screenshot |

### `public/`
| File | Purpose |
|---|---|
| `vscode_icon.svg` | Browser tab favicon (referenced in `index.html`) |
| `_redirects` | Netlify SPA fallback redirect |

---

## KNOWN BUGS SUMMARY

| # | File | Bug |
|---|---|---|
| 1 | `Projects.jsx` | Entire JSX is commented out — page renders nothing |
| 2 | `Articles.jsx` | Entire JSX is commented out — page renders nothing |
| 3 | `apiArticles.js` | Wrong username: `manavss` instead of your dev.to username |
| 4 | `Github.jsx` | Activity calendar uses `username="manavss"` |
| 5 | `Github.jsx` | `loader()` doesn't await `getUser()` — returns unresolved Promise |
| 6 | `Settings.jsx` | Title tag says `"Manav Shete \| Settings"` |
| 7 | `Explorer.jsx` | Debug border: `border border-cyan-500` |
| 8 | `Footer.jsx` | Debug border: `border border-fuchsia-700` |
| 9 | `Pages.jsx` | Debug border: `border border-green-700` |
| 10 | `ThemeContext.jsx` | Theme not saved to localStorage — resets on refresh |
| 11 | `Contact.jsx` | Uses `alert()` — no toast or loading state |
| 12 | `Projects.jsx` | Component function named `projects` (lowercase) |
| 13 | `Explorer.jsx` + `Tabs.jsx` | Same navigation config array duplicated in both files |
| 14 | `About.jsx` | Bio hidden on mobile (`max-sm:hidden` on `h2`) |
| 15 | `About.jsx` | Blob uses raw GitHub URL image, not a real photo |
| 16 | `ErrorPage.jsx` | Hardcoded "API limit" message for all errors |
| 17 | `apiGithub.js` | No `per_page` param — only fetches 30 repos max |
| 18 | `home/` | `hehe2.jsx` and `minimaldesign.jsx` are dead files |
| 19 | Multiple | `eslint-disable react/prop-types` — no PropTypes defined |

---

## DATA FLOW DIAGRAM

```
App.jsx
  └── ThemeProvider (Context: theme, changeTheme)
        └── RouterProvider
              └── Main.jsx  [reads: theme → applies theme-{name} class]
                    ├── NavBar.jsx        [no data]
                    ├── SideBar.jsx       [reads: useLocation()]
                    ├── Explorer.jsx      [local state: show/hide]
                    └── Pages.jsx
                          ├── Tabs.jsx    [reads: useLocation()]
                          └── <Outlet />
                                ├── Home.jsx          [no data]
                                ├── About.jsx         [no data]
                                ├── Projects.jsx      [static: project.js array]
                                ├── Contact.jsx       [react-hook-form + emailjs + .env]
                                ├── Github.jsx        [loader → apiGithub.js → GitHub REST API]
                                ├── Articles.jsx      [loader → apiArticles.js → dev.to API]
                                └── Settings.jsx
                                      └── ThemeCard   [writes: changeTheme()]
```

---

## AI CONTEXT PROMPT

> Paste this entire document into ChatGPT or Claude, then add your specific question at the end.

**Project:** VSCode-themed developer portfolio (`React 18 + Vite + TailwindCSS v3 + React Router v6`).
**Owner:** Shiv Shankar Singh | GitHub: `sh1v-max` | Email: `singhshiv0427@gmail.com`
**Location:** `e:\Full-Stack\Portfolio\My-portfolio-vsc`

The document above is a complete file-by-file reference for every source file in the project.
Key things to know:
- Theme system uses `tw-colors` plugin — 6 themes defined in `tailwind.config.js`, applied via `theme-{name}` class on root div.
- Projects and Articles pages are entirely commented out and render nothing.
- GitHub API data is loaded via React Router v6 loaders (pre-fetch before render).
- Contact form uses EmailJS with keys stored in `.env`.
- 3 debug CSS borders are visible in the live UI (cyan, fuchsia, green).
- Theme does not persist to localStorage.

**My question:** [INSERT YOUR QUESTION HERE]
