# Portfolio Audit — singhshiv.netlify.app

## 🪪 Identity & Voice

**1. 🔴 Title still says "Frontend Developer"**
You're shipping production backends. This undersells you.
- Fix: Change to "Full-Stack Developer" in `Home.jsx`, `About.jsx` Helmet meta, and `Contact.jsx`

**2. 🔴 Background text: "I BUILD PRETTY WEBSITES"**
"Pretty" reads as cosmetic-only. Doesn't hint at backends.
- Fix: Change to `I BUILD FOR THE WEB` in `Home.jsx:72`

**3. 🟡 Contact copy: "open to frontend roles"**
Limits you to frontend-only opportunities.
- Fix: Update `Contact.jsx:104` to include backend/full-stack roles

**4. 🟢 "Available for work" is phrased differently on Home vs Contact**
Home says "Available for work", Contact says "Currently accepting new projects". Same thing, different words.
- Fix: Pick one phrase, use it both places

---

## 📄 Content & Copy

**5. 🟡 `aboutMe.json` code block is stale**
Shows `learning: ['Next.js', 'Three.js']` but you've added MongoDB, Node.js, Rails to Currently Learning. They don't match.
- Fix: Update `About.jsx:438` to reflect current learning array

**6. 🟡 Services section has no Backend card**
4 cards (UI Dev, React Apps, API Integration, Motion) — nothing about building REST APIs, despite shipping a production-grade one with auth, rate limiting, test suite, and Swagger.
- Fix: Add a 5th "Backend Development" card to the services array in `About.jsx`

**7. 🟢 Stats say "30+" on Home but "33+" on About**
- Fix: Align `Home.jsx:181` and `About.jsx:233` to the same number

**8. 🟢 MongoDB and Node.js appear in both "Currently Learning" AND the tech stack grid**
Mixed signal — are they skills or are you still learning them?
- Fix: Remove them from Currently Learning; they're established skills now

**9. 🟡 No social links on the hero**
GitHub/LinkedIn buried in Contact page. Most visitors won't navigate that far.
- Fix: Add a small GitHub + LinkedIn icon row below CTA buttons in `Home.jsx`

---

## 🎯 UX & Features

**10. 🔴 TaskForge demo link = source code link**
Both buttons point to the same GitHub URL. Looks like a bug to visitors.
- Fix: Either hide the demo button when there's no live URL, or add a "Backend Only — No Live Demo" badge

**11. 🟡 No project tag filtering**
Flat grid works now but won't scale as you add more projects.
- Fix: Add filter tabs (All / Frontend / Full-Stack / Backend) above the grid in `Projects.jsx`

**12. 🟡 No per-project case study page**
Clicking opens GitHub — you don't own that experience. A `/projects/:slug` page (problem → solution → learnings) is what separates junior from senior portfolios.
- Fix: Add a `ProjectDetail.jsx` with a route, even for just TaskForge and Netflix-GPT to start

**13. 🟢 No skeleton loaders on project images**
Images flash in from blank. A shimmer placeholder while loading would feel polished.
- Fix: Add a loading shimmer to the image container in `ProjectCard.jsx`

**14. 🟢 Resume opens as immediate download**
Recruiters on mobile want to preview first. Forcing a download is friction.
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
Without a sitemap, crawlers have to discover pages on their own.
- Fix: Create `public/sitemap.xml` and `public/robots.txt` — Netlify serves them automatically

**18. 🟡 Page titles don't include your full name**
`Shiv | Projects` won't rank for "Shiv Shankar Singh portfolio".
- Fix: Update all Helmet titles to `Shiv Shankar Singh | Projects` etc.

---

## ♿ Accessibility & Performance

**19. 🔴 No lazy loading on project images**
All images load immediately, including ones below the fold. Slow on mobile.
- Fix: Add `loading="lazy"` to `<img>` in `ProjectCard.jsx`; convert PNGs to WebP

**20. 🟡 No skip-to-content link**
Keyboard users tab through the entire navbar before hitting content.
- Fix: Add a visually hidden `<a href="#main-content">` skip link in `NavBar.jsx`, visible only on focus

**21. 🟡 No custom 404 page**
Mistyped URLs hit Netlify's generic 404. `ErrorPage.jsx` exists — check if it's wired to the router.
- Fix: Wire `ErrorPage.jsx` to the router and add a `_redirects` file in `public/`

**22. 🟢 Icon-only buttons have no aria-label**
Theme toggle and nav icon buttons are unreadable by screen readers.
- Fix: Add `aria-label="Toggle theme"` etc. to all icon-only interactive elements

---

## 🚀 Next-Level Additions

**23. ⭐ Project case study pages**
Single biggest differentiator. Own the narrative: problem → tech decisions → what you learned → result. This is what gets callbacks.
- Add `/projects/taskforge`, `/projects/netflix-gpt` — 3 short paragraphs + screenshots each is enough

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
