/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import cinegraphImg from "../../assets/images/cinegraph/home.png";
import signinHomeImg from "../../assets/images/cinegraph/signin_home.png";
import signUpImg from "../../assets/images/cinegraph/sign_up_page.png";
import moviesImg from "../../assets/images/cinegraph/movies.png";
import showsImg from "../../assets/images/cinegraph/shows.png";
import animeImg from "../../assets/images/cinegraph/anime.png";
import discoverImg from "../../assets/images/cinegraph/discover.png";
import aiSearchImg from "../../assets/images/cinegraph/ai_search.png";
import aiRecommendationImg from "../../assets/images/cinegraph/ai_recommendation.png";
import profileImg from "../../assets/images/cinegraph/profile.png";
import watchlistImg from "../../assets/images/cinegraph/watchlist.png";

import phoneHomeImg from "../../assets/images/cinegraph/home_phone.png";
import phoneSigninHomeImg from "../../assets/images/cinegraph/signin_home_phone.png";
import phoneSignUpImg from "../../assets/images/cinegraph/sign_up_page_phone.png";
import phoneMoviesImg from "../../assets/images/cinegraph/movies_phone.png";
import phoneShowsImg from "../../assets/images/cinegraph/shows_phone.png";
import phoneAnimeImg from "../../assets/images/cinegraph/anime_phone.png";
import phoneDiscoverImg from "../../assets/images/cinegraph/discover_phone.png";
import phoneAiSearchImg from "../../assets/images/cinegraph/ai_search_phone.png";
import phoneAiRecommendationImg from "../../assets/images/cinegraph/ai_recommendation_phone.png";
import phoneProfileImg from "../../assets/images/cinegraph/profile_phone.png";
import phoneWatchlistImg from "../../assets/images/cinegraph/watchlist_phone.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const techStack = [
  { name: "React 19", icon: "logos:react", note: "Component-based UI, custom hooks for all data fetching" },
  { name: "Vite 6", icon: "logos:vitejs", note: "Build tool — route-level code splitting cut bundle from 1.35MB → 358KB" },
  { name: "Tailwind CSS v4", icon: "logos:tailwindcss-icon", note: "Token-based @theme design system, no tailwind.config.js" },
  { name: "Redux Toolkit 2", icon: "logos:redux", note: "7 slices — user, details, preferences, gpt, forYou, movies, config" },
  { name: "React Router 7", icon: "logos:react-router", note: "Client-side routing with React.lazy code splitting" },
  { name: "Firebase 12", icon: "logos:firebase", note: "Auth, Firestore (live onSnapshot sync), Hosting" },
  { name: "Gemini AI", icon: "simple-icons:googlegemini", note: "Personalized recommendations via Cloudflare Worker proxy" },
  { name: "Cloudflare Worker", icon: "simple-icons:cloudflare", note: "Proxy holds the Gemini key — never shipped to the browser" },
  { name: "TMDB API", icon: "lucide:film", note: "Movie, TV & anime data — details, trailers, credits, providers" },
  { name: "Motion", icon: "logos:framer", note: "Every transition — MotionConfig reducedMotion='user' at root" },
  { name: "shadcn/ui", icon: "simple-icons:shadcnui", note: "Radix-based primitives, fully restyled to Cinegraph tokens" },
  { name: "Cloudinary", icon: "simple-icons:cloudinary", note: "Avatar uploads — unsigned client-side, no backend needed" },
];

const features = [
  {
    icon: "lucide:brain",
    title: "Taste Graph",
    desc: "Like or dislike any title and the app computes a real taste profile from it — top genres, favorite decade, what you tend to avoid. Visible on /profile as actual charts, not a hidden backend number.",
  },
  {
    icon: "lucide:sparkles",
    title: "Personalized AI Search",
    desc: "Natural-language search powered by Gemini. Once you've rated 3+ titles, your taste graph is injected into the prompt. Every result comes with a 'why this was picked' caption.",
  },
  {
    icon: "lucide:messages-square",
    title: "Multi-Turn Conversation",
    desc: "Follow-up refinements build on prior turns (up to 5 back), sent as real user/assistant message pairs. 'More like the third one, but shorter' works exactly as expected.",
  },
  {
    icon: "lucide:rows-3",
    title: "For You Rows",
    desc: "Three always-visible, independently personalized rows (Movies / TV / Anime) generated with no query at all — each computed from only that category's rating history.",
  },
  {
    icon: "lucide:filter",
    title: "Full Catalog Console",
    desc: "Filterable, sortable, infinite-scroll catalog for Movies, TV, Anime, and Discover — genre chips, year range, min rating, sort order. All four pages share one MediaConsole engine.",
  },
  {
    icon: "lucide:shield",
    title: "Firebase Auth + Live Sync",
    desc: "Email/password auth with session persistence. Firestore onSnapshot keeps ratings and watchlist in sync everywhere in the app instantly — no manual refetching, no prop drilling.",
  },
];

const challenges = [
  {
    icon: "lucide:shield",
    problem: "Gemini doesn't send CORS headers for browser-origin requests — and even if it did, the API key would ship inside the JS bundle",
    solution:
      "Built a standalone Cloudflare Worker (gpt-proxy-worker/) that holds the Gemini key as an encrypted secret, sets its own CORS headers, and is the only thing that ever calls Gemini. The frontend does a plain fetch() to the Worker URL — no API key anywhere in client code. Chose Cloudflare Workers over Firebase Cloud Functions because deploying any Cloud Function requires upgrading to Firebase's paid Blaze plan; Cloudflare Workers deploy free with 100K requests/day.",
  },
  {
    icon: "lucide:rotate-ccw",
    problem: "AI provider instability — models get pulled from free-tier catalogs without warning",
    solution:
      "Started on OpenAI (cost per request — not viable), moved to OpenRouter (free tier, but the model got silently removed from their catalog, breaking search with no code change), then settled on Gemini's documented stable free tier. The Cloudflare Worker abstraction means swapping providers is a one-file change rather than touching every component that calls AI.",
  },
  {
    icon: "lucide:database",
    problem: "Per-title trailer data was cached globally — every title after the first reused the first title's trailer",
    solution:
      "Moved trailerVideo from a single global value per mediaType (in movies/tv slices) into the details slice, keyed by ${mediaType}_${id} — the same pattern every other per-title cache uses. The bug was invisible until navigating between multiple detail pages in one session.",
  },
  {
    icon: "lucide:search",
    problem: "TMDB has no first-class 'anime' type — approximation needed",
    solution:
      "The /anime catalog page is /discover/{movie,tv} with with_genres=16 (Animation) AND with_original_language=ja. Documented as a known simplification — the taste profile's anime bucket uses Animation-genre-alone (original_language isn't stored per Firestore rating doc), so 'animated' rather than 'strictly Japanese animated'. Honest about the limitation rather than presenting it as exact.",
  },
];

const desktopScreenshots = [
  { src: signinHomeImg,       alt: "Cinegraph landing page, signed out",              label: "Landing Page" },
  { src: signUpImg,           alt: "Cinegraph sign-up page",                          label: "Sign Up" },
  { src: moviesImg,           alt: "Cinegraph movies catalog console",                label: "Movies Catalog" },
  { src: showsImg,            alt: "Cinegraph TV shows catalog",                      label: "Shows Catalog" },
  { src: animeImg,            alt: "Cinegraph anime catalog",                         label: "Anime Catalog" },
  { src: discoverImg,         alt: "Cinegraph discover page",                         label: "Discover" },
  { src: aiRecommendationImg, alt: "Cinegraph personalized For You rows",             label: "For You Rows" },
  { src: aiSearchImg,         alt: "Cinegraph multi-turn AI search results",          label: "AI Search" },
  { src: profileImg,          alt: "Cinegraph taste graph profile page",              label: "Taste Graph" },
  { src: watchlistImg,        alt: "Cinegraph watchlist page",                        label: "Watchlist" },
];

const phoneScreenshots = [
  { src: phoneHomeImg,             alt: "Cinegraph mobile — signed-in home",       label: "Home" },
  { src: phoneSigninHomeImg,       alt: "Cinegraph mobile — landing page",         label: "Landing Page" },
  { src: phoneSignUpImg,           alt: "Cinegraph mobile — sign-up page",         label: "Sign Up" },
  { src: phoneMoviesImg,           alt: "Cinegraph mobile — movies catalog",       label: "Movies" },
  { src: phoneShowsImg,            alt: "Cinegraph mobile — shows catalog",        label: "Shows" },
  { src: phoneAnimeImg,            alt: "Cinegraph mobile — anime catalog",        label: "Anime" },
  { src: phoneDiscoverImg,         alt: "Cinegraph mobile — discover page",        label: "Discover" },
  { src: phoneAiRecommendationImg, alt: "Cinegraph mobile — For You rows",         label: "For You Rows" },
  { src: phoneAiSearchImg,         alt: "Cinegraph mobile — AI search results",    label: "AI Search" },
  { src: phoneProfileImg,          alt: "Cinegraph mobile — taste graph profile",  label: "Taste Graph" },
  { src: phoneWatchlistImg,        alt: "Cinegraph mobile — watchlist",            label: "Watchlist" },
];

const allScreenshots = [...desktopScreenshots, ...phoneScreenshots];

export default function CinegraphDetail() {
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
        <title>Cinegraph — Case Study | Shiv</title>
      </Helmet>

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 md:px-8">

        {/* ── Back ── */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/#projects"
            className="text-textMuted hover:text-accentColor mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          >
            <Icon icon="lucide:arrow-left" width="16" />
            Back to Projects
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="mb-16">
          <motion.span
            variants={fadeUp}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
            Case Study
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-textColor mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Cinegraph
          </motion.h1>

          <motion.p variants={fadeUp} className="text-textMuted mb-6 max-w-2xl text-lg leading-relaxed">
            An AI movie, TV & anime recommendation engine built on three pillars: a real TMDB-backed
            catalog, a preference graph that turns your ratings into a computed taste profile, and a
            Gemini-powered AI layer that reads that profile before answering — with multi-turn
            conversation and personalized For You rows.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["React 19", "Gemini AI", "Firebase", "Redux Toolkit", "Tailwind v4", "Cloudflare Worker", "Full-Stack"].map((tag) => (
              <span key={tag} className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://cinewatchgraph-ai.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90"
            >
              <Icon icon="lucide:external-link" width="16" />
              Live Demo
            </a>
            <a
              href="https://github.com/sh1v-max/Netflix-GPT"
              target="_blank"
              rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200"
            >
              <Icon icon="mdi:github" width="16" />
              GitHub
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
            <img src={cinegraphImg} alt="Cinegraph AI search home, signed in" width={1600} height={900} loading="lazy" decoding="async" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textSecondary leading-relaxed">
            Cinegraph isn&apos;t a Netflix clone and it isn&apos;t just a catalog with a search box bolted on.
            It started as a tutorial project and was rebuilt from the ground up — new identity, new design system,
            new architecture. The three pillars work together:{" "}
            <strong className="text-textColor">browse and filter</strong> a real TMDB-backed database across movies,
            TV, and anime;{" "}
            <strong className="text-textColor">rate what you watch</strong> to build a computed taste profile
            (top genres, favorite decade, what you avoid — visible as real charts on /profile);{" "}
            <strong className="text-textColor">get AI recommendations</strong> that read that profile before answering,
            support multi-turn follow-ups, and cover all three media types in one search.
          </p>
        </Section>

        {/* ── Desktop Screenshots ── */}
        <Section title="Desktop Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {desktopScreenshots.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.1 }}
                className="border-explorerBorder group cursor-zoom-in overflow-hidden rounded-xl border"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative overflow-hidden">
                  <img width={1600} height={900} loading="lazy" decoding="async" src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                    <Icon icon="lucide:zoom-in" width="28" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                </div>
                <p className="text-textMuted bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
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
                  onClick={() => setLightboxIndex(desktopScreenshots.length + i)}
                >
                  <div className="relative overflow-hidden">
                    <img src={s.src} alt={s.alt} width={409} height={912} loading="lazy" decoding="async" className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20">
                      <Icon icon="lucide:zoom-in" width="24" className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                  </div>
                  <p className="text-textMuted bg-articleBg border-explorerBorder border-t px-3 py-2 text-center text-xs font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Recommendation engines either show you what&apos;s trending (not personalized) or ask you to
              fill out a preferences form upfront (friction). Most portfolio projects in this space are
              shallow clones with no real AI integration or user data.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a system where personalization emerges naturally from usage — rate a few titles,
              get a real taste profile, watch the AI recommendations improve. No onboarding survey,
              no borrowed UI. The AI key never touches the browser.
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
                    <p className="text-textMuted text-xs">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Architecture ── */}
        <Section title="Architecture">
          <p className="text-textSecondary mb-6 leading-relaxed">
            A strict SPA with unidirectional data flow. Seven Redux slices manage genuinely cross-cutting
            state. Custom hooks check the store before fetching — navigating back to a detail page
            never re-fetches. Route-level code splitting via React.lazy cut the main bundle from
            <strong className="text-textColor"> ~1.35MB to ~358KB</strong>.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "Firebase Auth Observer", detail: "onAuthStateChanged at the root dispatches to userSlice. Protected routes read from Redux, not Firebase directly." },
                { step: "02", label: "Firestore Live Sync", detail: "usePreferencesSync opens an onSnapshot listener the moment a UID exists — ratings and watchlist update everywhere instantly." },
                { step: "03", label: "Custom Hooks + Store Cache", detail: "Every TMDB hook checks Redux before fetching. Per-title data keyed by ${mediaType}_${id} — navigating back costs zero network calls." },
                { step: "04", label: "Cloudflare Worker Proxy", detail: "The frontend POSTs { query, profileSummary, history } to the Worker. The Worker holds the Gemini key, builds the prompt, and returns { results }." },
                { step: "05", label: "Taste Graph Computation", detail: "computeTasteProfile() runs client-side from already-synced Firestore data — pure, synchronous, no extra read. Powers both /profile charts and AI prompts." },
                { step: "06", label: "Multi-Turn Conversation", detail: "Prior turns (up to 5) sent as real user/assistant message pairs. The Worker converts them to Gemini's conversation history format before the new query." },
              ].map(({ step, label, detail }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="text-accentColor w-8 shrink-0 font-mono text-xs font-bold">{step}</span>
                  <div className="border-l border-explorerBorder pl-4">
                    <p className="text-textColor text-sm font-semibold">{label}</p>
                    <p className="text-textMuted text-xs leading-relaxed">{detail}</p>
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
                variants={fadeUp}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.15 }}
                className="border-explorerBorder bg-articleBg hover:border-accentColor/30 rounded-2xl border p-5 transition-colors duration-200"
              >
                <div className="text-accentColor mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accentColor/10">
                  <Icon icon={f.icon} width="18" />
                </div>
                <h3 className="text-textColor mb-1.5 text-sm font-bold">{f.title}</h3>
                <p className="text-textMuted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Challenges ── */}
        <Section title="Challenges & How I Solved Them">
          <div className="flex flex-col gap-5">
            {challenges.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileInView="show"
                initial="hidden"
                viewport={{ once: true, amount: 0.2 }}
                className="border-explorerBorder bg-articleBg rounded-2xl border p-6"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="text-accentColor mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accentColor/10">
                    <Icon icon={c.icon} width="18" />
                  </div>
                  <p className="text-textMuted text-sm font-medium">
                    <span className="text-dangerText mr-1">Problem:</span>
                    {c.problem}
                  </p>
                </div>
                <div className="border-l-2 border-accentColor/30 pl-4">
                  <p className="text-textMuted mb-1 text-xs font-semibold uppercase tracking-wider">Solution</p>
                  <p className="text-textSecondary text-sm leading-relaxed">{c.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Learnings ── */}
        <Section title="What I Learned">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: "lucide:layers", text: "When Redux earns its complexity — cross-cutting state (auth, cached TMDB data, live Firestore, AI conversation history) that Context would handle poorly" },
              { icon: "lucide:shield", text: "The proxy pattern for API security — why shipping a key in a Vite bundle is a real risk and how a Cloudflare Worker fixes it cleanly" },
              { icon: "lucide:database", text: "Firestore live sync with onSnapshot — opening one listener at login and letting Redux propagate it eliminates an entire class of stale-data bugs" },
              { icon: "lucide:cpu", text: "Prompt engineering for personalization — turning a taste graph into a sentence that meaningfully steers an LLM's recommendations" },
              { icon: "lucide:zap", text: "Route-level code splitting with React.lazy — cut the main bundle by 73% without touching any component logic" },
              { icon: "lucide:pencil", text: "The cost of skipping tests on pure functions — computeTasteProfile and the prompt-builder went through multiple rounds of changes that tests would have caught as regressions" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0"><Icon icon={item.icon} width="16" /></div>
                <p className="text-textSecondary text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp} whileInView="show" initial="hidden" viewport={{ once: true }}
          className="border-accentColor/20 bg-accentColor/5 mt-6 rounded-2xl border p-8 text-center"
        >
          <h3 className="text-textColor mb-2 text-xl font-bold">See it in action</h3>
          <p className="text-textMuted mb-6 text-sm">Rate a few titles on the live app and watch the AI recommendations personalize in real time.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://cinewatchgraph-ai.web.app" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Demo
            </a>
            <a href="https://github.com/sh1v-max/Netflix-GPT" target="_blank" rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200">
              <Icon icon="mdi:github" width="16" />View Source
            </a>
            <Link to="/#projects"
              className="text-textMuted hover:text-accentColor inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200">
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
              decoding="async"
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
      <p className="text-textMuted text-sm leading-relaxed">{children}</p>
    </div>
  );
}
