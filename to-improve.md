# Portfolio Audit — singhshiv.netlify.app

## 🪪 Identity & Voice

- [x] ~~1. 🔴 Title still says "Frontend Developer" — changed to "Full-Stack Developer" across Home, About, Contact, GitHub page~~
- [x] ~~2. 🔴 Background text "I BUILD PRETTY WEBSITES" — changed to "I BUILD FOR THE WEB"~~
- [x] ~~3. 🟡 Contact copy "open to frontend roles" — updated to include full-stack & backend roles~~
- [x] ~~4. 🟢 Availability phrase mismatch — unified to "Available for work" on both Home and Contact~~

---

## 📄 Content & Copy

- [x] ~~5. 🟡 `aboutMe.json` code block was stale — updated `learning` to `['MongoDB', 'Node.js', 'Rails']`, removed Three.js~~

- [x] ~~**6. 🟡 Services section has no Backend card**~~
~~4 cards (UI Dev, React Apps, API Integration, Motion) — nothing about building REST APIs, despite shipping a production-grade one with auth, rate limiting, test suite, and Swagger.~~
~~- Fix: Add a 5th "Backend Development" card to the services array in `About.jsx`~~

- [x] ~~**7. 🟢 Stats say "30+" on Home but "33+" on About**~~
~~- Fix: Align `Home.jsx:181` and `About.jsx:233` to the same number~~

- [x] ~~**8. 🟢 MongoDB and Node.js appear in both "Currently Learning" AND the tech stack grid**~~
~~Mixed signal — are they skills or are you still learning them?~~
~~- Fix: Remove them from Currently Learning; they're established skills now~~

- [x] ~~**9. 🟡 No social links on the hero**~~
~~GitHub/LinkedIn buried in Contact page. Most visitors won't navigate that far.~~
~~- Fix: Add a small GitHub + LinkedIn icon row below CTA buttons in `Home.jsx`~~

---

## 🎯 UX & Features

- [x] ~~**10. 🔴 TaskForge demo link = source code link**~~
~~Both buttons point to the same GitHub URL. Looks like a bug to visitors.~~
~~- Fix: Either hide the demo button when there's no live URL, or add a "Backend Only — No Live Demo" badge~~

**11. 🟡 No project tag filtering**
*Re-scoped by the redesign, not fixed.* The projects grid became an editorial row list (`Projects.jsx`) instead of a card grid — a flat list of 5 rows doesn't need filter tabs the way a grid might have. Revisit only if the featured-project count grows well past 5; the Build Archive (`/frontend-lab`) already has full filter/search for the 33-entry list, which is where this concern actually applies now.

- [x] ~~**12. 🟡 No per-project case study page**~~
~~Clicking opens GitHub — you don't own that experience. A `/projects/:slug` page (problem → solution → learnings) is what separates junior from senior portfolios.~~
~~- Done: TaskForge, Cinegraph, BiteSwift, BookVerse, and Portfolio all have full case-study pages at `/projects/:slug` with screenshots, lightbox, tech stack, and lessons. Duplicate of #23 below.~~

- [x] ~~**13. 🟢 No skeleton loaders on project images**~~
~~Images flash in from blank. A shimmer placeholder while loading would feel polished.~~
~~- Done: `src/components/Skeleton.jsx` is now a shared component, sized to the exact measured height of the real content it precedes, used across the home page's async sections (GitHub stats, language mix, etc.). `ProjectCard.jsx` itself was deleted in the redesign — the projects list is no longer card-based.~~

**14. 🟢 Resume opens as immediate download**
Still `download="resume.pdf"` in `About.jsx` — unresolved.
- Fix: Open in new tab (`target="_blank"`) instead of `download` attribute, or add a preview modal

---

## 🔍 SEO & Discoverability

**15. 🔴 Missing Open Graph meta tags**
Share your portfolio on LinkedIn or WhatsApp — it shows a blank URL preview, no image, no description. This is a big miss.
- Fix: Add `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` to every page's `<Helmet>`

**16. 🔴 Home page has no meta description**
Helmet only sets `<title>` — Google picks random page text for search results, which is always bad.
- Fix: Add `<meta name="description">` to `Home.jsx` Helmet — 150 chars, mention "full-stack developer Varanasi"

**17. 🟡 No sitemap.xml or robots.txt**
Still missing — `public/_redirects` exists (handles the SPA fallback) but there's no `sitemap.xml` or `robots.txt`.
- Fix: Create `public/sitemap.xml` and `public/robots.txt` — Netlify serves them automatically

**18. 🟡 Page titles don't include your full name**
Still just `Shiv | About`, `Shiv | Github Dashboard`, etc. across every page — unresolved. (Note: `/projects` no longer has its own title since it redirects to `/#projects`; MainScrollPage's title is `Shiv | Portfolio`.)
- Fix: Update all Helmet titles to `Shiv Shankar Singh | About` etc.

---

## ♿ Accessibility & Performance

- [x] ~~**19. 🔴 No lazy loading on project images / no WebP**~~
~~All images load immediately, including ones below the fold. Slow on mobile.~~
~~- Done, and further than originally scoped: every image now passes through `vite-imagetools` at build time (WebP, quality 78, capped 1600px width) with no call-site changes — the pipeline handles it rather than a per-image attribute. `width`/`height`/`loading`/`decoding` are set explicitly on rendered `<img>` tags across the redesigned sections. `ProjectCard.jsx` (the original fix target) no longer exists — the projects list is an editorial row layout now.~~

**20. 🟡 No skip-to-content link**
Still missing — unresolved.
- Fix: Add a visually hidden `<a href="#main-content">` skip link in `NavBar.jsx`, visible only on focus

- [x] ~~**21. 🟡 No custom 404 page**~~
~~Mistyped URLs hit Netlify's generic 404. `ErrorPage.jsx` exists — check if it's wired to the router.~~
~~- Done: `errorElement: <ErrorPage />` is set on the root route in `App.jsx`, and `public/_redirects` exists for the SPA fallback.~~

- [x] ~~**22. 🟢 Icon-only buttons have no aria-label**~~
~~Theme toggle and nav icon buttons are unreadable by screen readers.~~
~~- Done for the theme switcher (`aria-label="Change theme"` / `aria-label={\`Apply ${t.name} theme\`}` in `FloatingThemeButton.jsx`) and the mega-menu's icon-only copy/social buttons. Worth a fresh sweep if new icon-only controls get added.~~

---

## 🚀 Next-Level Additions

- [x] ~~**23. ⭐ Project case study pages**~~
~~Single biggest differentiator. Own the narrative: problem → tech decisions → what you learned → result. This is what gets callbacks.~~
~~- Done: all 5 featured projects have full case-study pages. Duplicate of #12 above.~~

**24. ⭐ Analytics**
You're blind right now — no idea which projects get clicks, where visitors drop off, or if anyone reads About.
- Add Vercel Analytics or Plausible to `index.html` — free, 10 minutes

**25. ⭐ Testimonials / social proof**
Zero trust signal on the site. Even one LinkedIn recommendation as a quote adds enormous credibility.
- Add a Testimonials block to `About.jsx` or the home page

**26. ⭐ Structured data (JSON-LD)**
Lets Google show a rich knowledge panel when someone searches your name.
- Add `<script type="application/ld+json">` with `@type: "Person"` to `index.html`

**27. ⭐ OG image**
Your multi-theme portfolio has no shareable preview image. A branded link preview makes you memorable.
- Create a static `og-image.png` in your brand style, host at `/public/og-image.png`
