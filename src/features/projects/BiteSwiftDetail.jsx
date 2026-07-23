import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import heroImg      from "../../assets/images/BiteSwift/biteswift.png";
import home2Img     from "../../assets/images/BiteSwift/home2.png";
import restaurantsImg from "../../assets/images/BiteSwift/restaurants.png";
import aboutImg     from "../../assets/images/BiteSwift/about.png";
import contactImg   from "../../assets/images/BiteSwift/contact.png";
import groceriesImg from "../../assets/images/BiteSwift/groceries.png";
import phoneHome1   from "../../assets/images/BiteSwift/phone_home.png";
import phoneHome2   from "../../assets/images/BiteSwift/phone_home2.png";
import phoneHome3   from "../../assets/images/BiteSwift/phone_home3.png";
import phoneRestaurants from "../../assets/images/BiteSwift/phone_restaurants.png";
import phoneAbout   from "../../assets/images/BiteSwift/phone_about.png";
import phoneContact from "../../assets/images/BiteSwift/phone_contact.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const techStack = [
  { name: "React 19",            icon: "logos:react",          note: "Functional components and hooks throughout" },
  { name: "Parcel 2",            icon: "logos:parcel-icon",    note: "Zero-config bundler with fast HMR" },
  { name: "Redux Toolkit",       icon: "logos:redux",          note: "Cart state — the only global state in the app" },
  { name: "React Router v6",     icon: "logos:react-router",   note: "Client-side routing, lazy-loaded routes" },
  { name: "Hand-rolled CSS",     icon: "lucide:palette",       note: "CSS custom property token system (--bs-*), not Tailwind utilities" },
  { name: "Netlify Functions",   icon: "logos:netlify",        note: "Serverless CORS proxy for Swiggy's listing API" },
  { name: "lucide-react",        icon: "lucide:sparkles",      note: "UI icons throughout the app" },
  { name: "@iconify/react",      icon: "lucide:link",          note: "Brand/social logos — Lucide ships none" },
  { name: "Jest + RTL",          icon: "logos:jest",           note: "Unit and component testing" },
];

const features = [
  {
    icon: "lucide:wifi",
    title: "Real Restaurant Data",
    desc: "The home page and category/collection pages pull live from Swiggy's public API through Netlify Functions — server-to-server proxies that work around the missing CORS headers Swiggy sends for direct browser access.",
  },
  {
    icon: "lucide:shield-check",
    title: "Resilient Menu Pages",
    desc: "Menus attempt the real Swiggy API first. When Swiggy's bot-detection layer blocks it (confirmed via direct testing — see Challenges), the page silently falls back to a shape-matched mock. Veg/non-veg filtering, dish search, and bestseller badges read the same real Swiggy field names either way.",
  },
  {
    icon: "lucide:shopping-cart",
    title: "Full Checkout Flow",
    desc: "A cart that actually works: quantity tracking per item, remove-by-id, a real bill breakdown (item total, 5% GST, delivery fee, platform fee), two working coupon codes, a payment method selector, a simulated ~1.4s processing delay, and a receipt-style order confirmation with a generated order ID.",
  },
  {
    icon: "lucide:zap",
    title: "Shimmer UI",
    desc: "A content-skeleton renders while restaurant data loads, mirroring the exact shape of the real cards. Perceived load time feels near-instant — no blank screen, no spinner.",
  },
  {
    icon: "lucide:wifi-off",
    title: "Online Status Hook",
    desc: "useOnlineStatus listens to browser online/offline events and returns a boolean. Body.js uses it to show a full-page offline state instead of a screen full of failed requests.",
  },
  {
    icon: "lucide:layers",
    title: "Lazy-Loaded Routes",
    desc: "The Grocery page is loaded via React.lazy + Suspense with the Shimmer as its fallback — its bundle only downloads when a user first navigates there, keeping the critical initial payload small.",
  },
  {
    icon: "lucide:tag",
    title: "Higher-Order Component",
    desc: "withDiscountOffer() wraps RestaurantCard to conditionally overlay a discount banner. The base card stays unaware of whether it's wearing the banner — the HOC handles it.",
  },
  {
    icon: "lucide:palette",
    title: "Signal Orange Design System",
    desc: "Every color resolves through --bs-* CSS custom properties defined once in index.css. White surfaces, near-black text, one vivid orange accent (#FF5A1F). A full theme change — including a dark mode — is a matter of overriding a dozen tokens, not hunting through every CSS file.",
  },
];

const challenges = [
  {
    icon: "lucide:server",
    problem: "Swiggy's restaurant listing API sends no CORS headers — the browser blocks it outright",
    solution:
      "Three Netlify Functions act as server-to-server proxies: swiggy-list.js (homepage feed), swiggy-collection.js (category pages), and swiggy-update.js (pagination). Server-to-server requests aren't subject to browser CORS. The listing function also performs a 'session cookie warm-up' — visiting Swiggy's homepage first to collect a tid cookie — because that endpoint returns empty results without it.",
  },
  {
    icon: "lucide:shield-x",
    problem: "Swiggy's menu API is bot-gated by AWS WAF — blocked unconditionally outside a real browser session",
    solution:
      "This was diagnosed properly, not guessed. First hypothesis (CORS) was wrong — a curl with an Origin header confirmed the menu endpoint actually sends permissive CORS headers. Testing with real captured session cookies from an authenticated browser session still got blocked. A standalone, dependency-free script hitting the exact captured URL with plain Node fetch also got blocked — isolating the variable: it's the calling environment, not the URL/params/cookies. External reports from other Namaste-React developers confirmed it's a shared, known wall. Resolution: accept it, fall back to a shape-matched mock for this one endpoint specifically, so the core browse → order flow stays demonstrable.",
  },
  {
    icon: "lucide:shopping-cart",
    problem: "The original cart's removeItem used array.pop() — it removed whichever item was last, not the one clicked",
    solution:
      "cartSlice.js was rebuilt from scratch with proper action payloads. removeItem(id) filters the items array by card.info.id. addItem increments an existing item's quantity instead of pushing a duplicate. incrementQuantity/decrementQuantity were added — decrement removes the item entirely when quantity would hit 0. The header badge now sums item.quantity across all entries, not array.length.",
  },
  {
    icon: "lucide:layout-grid",
    problem: "Restaurant cards were visibly cut off mid-text on narrow mobile viewports (found via real screenshots)",
    solution:
      "The mechanism: CSS Grid items default to min-width: auto, so a grid track won't shrink below the intrinsic width of its content — even with overflow: hidden and text-overflow: ellipsis applied. The card's cuisine line (white-space: nowrap) contained text like 'Burgers, Beverages, Cafe +1', wider than the ~178px a 2-column mobile grid allocates. The fix was one line: min-width: 0 on .card-link — telling the grid item it's allowed to shrink below content width, letting truncation actually take effect.",
  },
];

const laptopScreenshots = [
  { src: home2Img,      alt: "BiteSwift home page — hero section",         label: "Home — Hero" },
  { src: restaurantsImg,alt: "BiteSwift restaurant listing grid",           label: "Restaurant Grid" },
  { src: aboutImg,      alt: "BiteSwift about page",                        label: "About Page" },
  { src: contactImg,    alt: "BiteSwift contact page",                      label: "Contact Page" },
  { src: groceriesImg,  alt: "BiteSwift groceries coming-soon page",        label: "Grocery Page" },
];

const phoneScreenshots = [
  { src: phoneHome1,       alt: "BiteSwift mobile — home hero",         label: "Home" },
  { src: phoneHome2,       alt: "BiteSwift mobile — home features",     label: "Features" },
  { src: phoneHome3,       alt: "BiteSwift mobile — restaurant grid",   label: "Restaurant Grid" },
  { src: phoneRestaurants, alt: "BiteSwift mobile — restaurant menu",   label: "Menu Page" },
  { src: phoneAbout,       alt: "BiteSwift mobile — about page",        label: "About" },
  { src: phoneContact,     alt: "BiteSwift mobile — contact page",      label: "Contact" },
];

// flat list used by the lightbox for prev/next navigation
const allScreenshots = [...laptopScreenshots, ...phoneScreenshots];

export default function BiteSwiftDetail() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + allScreenshots.length) % allScreenshots.length), []);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % allScreenshots.length), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, prev, next]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>BiteSwift — Case Study | Shiv</title>
      </Helmet>

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 md:px-8">

        {/* ── Back ── */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/projects"
            className="text-textColor/50 hover:text-accentColor mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          >
            <Icon icon="lucide:arrow-left" width="16" />
            Back to Projects
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="mb-16">
          <motion.span variants={fadeUp}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
            Case Study
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-textColor mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            BiteSwift
          </motion.h1>

          <motion.p variants={fadeUp} className="text-textColor/60 mb-6 max-w-2xl text-lg leading-relaxed">
            A high-fidelity Swiggy clone built with React 19 and Redux Toolkit. Features real restaurant data
            through a Netlify Functions proxy, a fully working cart with checkout flow, a self-built CSS
            design system, and honest handling of a third-party API that actively resists being used outside a browser.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["React 19", "Redux Toolkit", "Parcel 2", "Netlify Functions", "CSS Tokens", "React Router", "Frontend"].map((tag) => (
              <span key={tag} className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <a href="https://yourbiteswift.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Demo
            </a>
            <a href="https://github.com/sh1v-max/BiteSwift" target="_blank" rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200">
              <Icon icon="mdi:github" width="16" />GitHub
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
            <img src={heroImg} alt="BiteSwift — home page screenshot" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textColor/70 leading-relaxed">
            BiteSwift started as a Namaste React course project and was rebuilt page by page into something
            closer to a real product. It fetches <strong className="text-textColor">live restaurant data</strong> from
            Swiggy's public API through a serverless proxy layer, manages a globally accessible cart through
            Redux Toolkit, and renders a complete ordering interface — browse restaurants, filter by cuisine
            category, open a menu, add items with quantity tracking, and check out with a real bill breakdown.
            Where Swiggy's API actively resists being used (the menu endpoint, bot-gated by AWS WAF), the app
            falls back to a <strong className="text-textColor">shape-matched mock</strong> so the core flow
            stays demonstrable — a deliberate, tested decision, not a shortcut.
          </p>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              A food delivery app has inherently cross-cutting state (the cart must be readable from the header,
              the menu page, and the cart page simultaneously), live third-party API data with reliability
              constraints, and performance pressure from a large component tree. Most course implementations
              handle these badly — prop-drilling the cart, breaking on refresh, or silently showing stale data.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a Swiggy-faithful clone where the cart is a single Redux slice consumed by truly disconnected
              components, real API data flows through a proper serverless proxy, the app degrades gracefully
              when upstream APIs fail, and the design system lives in one place so the entire theme can be
              changed without touching a single component file.
            </Card>
          </div>
        </Section>

        {/* ── Tech Stack ── */}
        <Section title="Tech Stack">
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {techStack.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                    <Icon icon={item.icon} width="20" height="20" />
                  </div>
                  <div>
                    <p className="text-textColor text-sm font-semibold">{item.name}</p>
                    <p className="text-textColor/40 text-xs">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Architecture ── */}
        <Section title="Architecture">
          <p className="text-textColor/70 mb-6 leading-relaxed">
            Three layers with strict separation: <strong className="text-textColor">Netlify Functions</strong> handle
            anything that can't run in a browser (CORS proxies, session cookie warm-ups),{" "}
            <strong className="text-textColor">custom hooks</strong> own all data-fetching logic, and{" "}
            <strong className="text-textColor">components</strong> are purely concerned with rendering — they
            never call fetch() directly.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "Netlify Function → Real Data", detail: "swiggy-list.js proxies the restaurant feed server-to-server, performing a homepage cookie warm-up first. swiggy-collection.js handles category pages with different response parsing." },
                { step: "02", label: "Client-Side Filter", detail: "On load, the fetched list is stored in two state vars: allRestaurants (master, never mutated) and filteredRestaurants (rendered). Search and filter chips write to the filtered copy — the API is never re-called." },
                { step: "03", label: "useRestaurantMenu Hook", detail: "Fetches the menu directly from the browser (the endpoint sends permissive CORS headers — no proxy needed). Falls back to a shape-matched mock if Swiggy's WAF blocks it. The component never knows which it received." },
                { step: "04", label: "useOnlineStatus Hook", detail: "Wraps browser online/offline events, returns a boolean. Body.js shows a full-page offline state instead of a screen of failed requests." },
                { step: "05", label: "Redux cartSlice", detail: "The only global state in the app. addItem / removeItem(id) / incrementQuantity / decrementQuantity / clearCart. Read by three genuinely disconnected components: Header (badge), RestaurantMenu (Add buttons), Cart (checkout)." },
                { step: "06", label: "CSS Token System", detail: "Every color in the app resolves through --bs-* custom properties defined once in index.css. RGB-triplet companions (--bs-amber-rgb) allow rgba() tints without hardcoding literals. One block to edit for a full re-theme." },
              ].map(({ step, label, detail }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="text-accentColor/50 w-8 shrink-0 font-mono text-xs font-bold">{step}</span>
                  <div className="border-l border-explorerBorder pl-4">
                    <p className="text-textColor text-sm font-semibold">{label}</p>
                    <p className="text-textColor/50 text-xs leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Features ── */}
        <Section title="Key Features">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.15 }}
                className="border-explorerBorder bg-articleBg hover:border-accentColor/30 rounded-2xl border p-5 transition-colors duration-200"
              >
                <div className="text-accentColor mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accentColor/10">
                  <Icon icon={f.icon} width="18" />
                </div>
                <h3 className="text-textColor mb-1.5 text-sm font-bold">{f.title}</h3>
                <p className="text-textColor/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Desktop Screenshots ── */}
        <Section title="Desktop Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {laptopScreenshots.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.1 }}
                className="border-explorerBorder group cursor-zoom-in overflow-hidden rounded-xl border"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative overflow-hidden">
                  <img src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                    <Icon icon="lucide:zoom-in" width="28" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                </div>
                <p className="text-textColor/40 bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Mobile Screenshots ── */}
        <Section title="Mobile Views">
          <div className="overflow-x-auto pb-3">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {phoneScreenshots.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.1 }}
                  className="border-explorerBorder group w-44 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border shadow-lg sm:w-52"
                  onClick={() => setLightboxIndex(laptopScreenshots.length + i)}
                >
                  <div className="relative overflow-hidden">
                    <img src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                      <Icon icon="lucide:zoom-in" width="24" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                  </div>
                  <p className="text-textColor/40 bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Challenges ── */}
        <Section title="Challenges & How I Solved Them">
          <div className="flex flex-col gap-5">
            {challenges.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}
                className="border-explorerBorder bg-articleBg rounded-2xl border p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-accentColor flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accentColor/10">
                    <Icon icon={c.icon} width="18" />
                  </div>
                  <p className="text-textColor/50 text-sm font-medium">
                    <span className="text-red-400/70 mr-1">Problem:</span>{c.problem}
                  </p>
                </div>
                <div className="border-l-2 border-accentColor/30 pl-4">
                  <p className="text-textColor/40 mb-1 text-xs font-semibold uppercase tracking-wider">Solution</p>
                  <p className="text-textColor/70 text-sm leading-relaxed">{c.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Learnings ── */}
        <Section title="What I Learned">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: "lucide:server",       text: "Serverless functions as a CORS proxy layer — server-to-server requests bypass browser CORS restrictions entirely" },
              { icon: "lucide:shield",       text: "How to diagnose API failures properly: test each endpoint's actual CORS headers with curl before assuming the fix" },
              { icon: "lucide:shopping-cart",text: "Redux Toolkit slice pattern — proper remove-by-id vs pop(), quantity tracking vs duplicate entries, and when not to reach for global state" },
              { icon: "lucide:hook",         text: "The custom hook pattern for owning fetch logic with transparent fallbacks — components never need to know whether data is real or mock" },
              { icon: "lucide:palette",      text: "Building a CSS custom property token system — why a design token block beats utility classes for theming a multi-file codebase" },
              { icon: "lucide:layout-grid",  text: "CSS Grid's min-width: auto default — why text overflow on grid items won't work without explicitly setting min-width: 0 on the grid item" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0"><Icon icon={item.icon} width="16" /></div>
                <p className="text-textColor/65 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Roadmap ── */}
        <Section title="Roadmap">
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
            <div className="flex flex-col gap-3">
              {[
                { icon: "lucide:map-pin",        label: "Browser geolocation",       detail: "Replace hardcoded Bangalore coordinates with the user's real location" },
                { icon: "lucide:database",        label: "Persisted cart",            detail: "A lightweight backend so cart contents survive a page refresh" },
                { icon: "lucide:user",            label: "Real authentication",       detail: "The current Login/Logout button is a visual placeholder — replace with Firebase Auth" },
                { icon: "lucide:credit-card",     label: "Real payment integration",  detail: "Checkout is currently a convincing simulation; wire up Razorpay (test mode)" },
                { icon: "lucide:test-tube",       label: "Expand test coverage",      detail: "Update the three existing tests after the component reorganization; add tests for cartSlice reducers and custom hooks" },
              ].map(({ icon, label, detail }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="text-accentColor/60 mt-0.5 shrink-0"><Icon icon={icon} width="15" /></div>
                  <div>
                    <p className="text-textColor text-sm font-semibold">{label}</p>
                    <p className="text-textColor/45 text-xs leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true }}
          className="border-accentColor/20 bg-accentColor/5 mt-6 rounded-2xl border p-8 text-center"
        >
          <h3 className="text-textColor mb-2 text-xl font-bold">Try it out</h3>
          <p className="text-textColor/60 mb-6 text-sm">Browse live restaurant data or explore the full source on GitHub.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://yourbiteswift.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Demo
            </a>
            <a href="https://github.com/sh1v-max/BiteSwift" target="_blank" rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200">
              <Icon icon="mdi:github" width="16" />View Source
            </a>
            <Link to="/projects"
              className="text-textColor/50 hover:text-accentColor inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200">
              <Icon icon="lucide:arrow-left" width="14" />All Projects
            </Link>
          </div>
        </motion.div>

      </article>

      <Lightbox
        screenshots={allScreenshots}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </HelmetProvider>
  );
}

function Lightbox({ screenshots, index, onClose, onPrev, onNext }) {
  const isOpen = index !== null;
  const current = isOpen ? screenshots[index] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:left-6"
            aria-label="Previous image"
          >
            <Icon icon="lucide:chevron-left" width="22" />
          </button>

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[90vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-sm font-medium text-white/60">{current.label}</p>
            <p className="text-xs text-white/30">{index + 1} / {screenshots.length}</p>
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6"
            aria-label="Next image"
          >
            <Icon icon="lucide:chevron-right" width="22" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
            aria-label="Close lightbox"
          >
            <Icon icon="lucide:x" width="20" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} className="mb-14">
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
        <h2 className="text-textColor text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
        <div className="from-accentColor to-accentColor/0 h-px flex-1 bg-linear-to-r" />
      </motion.div>
      <motion.div variants={fadeUp}>{children}</motion.div>
    </motion.section>
  );
}

function Card({ icon, label, children }) {
  return (
    <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
      <div className="text-accentColor mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accentColor/10">
        <Icon icon={icon} width="18" />
      </div>
      <p className="text-textColor mb-2 text-sm font-bold">{label}</p>
      <p className="text-textColor/60 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
