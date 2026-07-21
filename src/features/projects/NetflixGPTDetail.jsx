import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import netflixImg from "../../assets/images/netflix.png";
import netflixLoginImg from "../../assets/images/netflix-login.png";
import netflixMoviesImg from "../../assets/images/netflix-featured-movies.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const techStack = [
  { name: "React 18", icon: "logos:react", note: "Component-based UI library" },
  { name: "Vite", icon: "logos:vitejs", note: "Build tool with instant HMR" },
  { name: "Redux Toolkit", icon: "logos:redux", note: "Global state management" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", note: "Utility-first styling" },
  { name: "Firebase Auth", icon: "logos:firebase", note: "Authentication & hosting" },
  { name: "React Router", icon: "logos:react-router", note: "Client-side routing" },
  { name: "TMDB API", icon: "lucide:film", note: "Movie data source" },
  { name: "OpenAI API", icon: "simple-icons:openai", note: "GPT search foundation" },
];

const features = [
  {
    icon: "lucide:shield",
    title: "Firebase Authentication",
    desc: "Full sign-up and sign-in flow backed by Firebase Auth. Session persistence is managed centrally — users stay logged in across browser refreshes without re-authenticating.",
  },
  {
    icon: "lucide:layout",
    title: "Netflix-Style Browse Page",
    desc: "Categorized movie carousels (Now Playing, Popular, Top Rated, Upcoming) with a hero section featuring an auto-playing, muted video trailer background — pixel-perfect to the real Netflix UI.",
  },
  {
    icon: "lucide:database",
    title: "Memoized API Calls",
    desc: "Custom hooks check the Redux store before making a TMDB network request. If the data is already cached, the call is skipped entirely — preventing redundant fetches on every render.",
  },
  {
    icon: "lucide:layers",
    title: "Redux Slice Architecture",
    desc: "State is organized into slices — userSlice for auth status, movieSlice for all movie lists and trailer data. Components subscribe only to what they need, preventing unnecessary re-renders.",
  },
  {
    icon: "lucide:cpu",
    title: "GPT Search Foundation",
    desc: "The architecture is set up to support OpenAI-powered movie search — users type natural language queries and get AI-matched movie recommendations from the TMDB catalog.",
  },
  {
    icon: "lucide:hook",
    title: "Custom Hook Pattern",
    desc: "All data-fetching side effects are extracted into custom hooks (useNowPlayingMovies, useMovieTrailer, etc.), keeping components purely declarative and making logic independently testable.",
  },
];

const challenges = [
  {
    icon: "lucide:shield",
    problem: "Firebase auth state arriving asynchronously on page load",
    solution:
      "Firebase's onAuthStateChanged observer is set up in a useEffect at the app root. It dispatches addUser or removeUser to the Redux userSlice on every auth state change. Protected routes read from the store rather than checking Firebase directly, ensuring the UI is always in sync with the actual auth state without race conditions.",
  },
  {
    icon: "lucide:database",
    problem: "Redundant TMDB API calls on every component mount",
    solution:
      "Each custom hook (e.g., useNowPlayingMovies) first checks the Redux store for existing data using useSelector. Only if the value is null does it make the network request and dispatch to the store. This means navigating back to the browse page reuses cached data instantly without a loading flicker.",
  },
  {
    icon: "lucide:video",
    problem: "Auto-playing video trailers without breaking performance",
    solution:
      "The useMovieTrailer hook fetches the trailer key from TMDB for the featured hero movie and stores it in Redux. The video is rendered as a YouTube embed with autoplay and mute params — no third-party player library needed, and the key is only fetched once per hero movie.",
  },
];

export default function NetflixGPTDetail() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Netflix-GPT — Case Study | Shiv</title>
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
          <motion.span
            variants={fadeUp}
            className="border-accentColor/30 bg-accentColor/10 text-accentColor mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="bg-accentColor h-1.5 w-1.5 rounded-full" />
            Case Study
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-textColor mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Netflix-GPT
          </motion.h1>

          <motion.p variants={fadeUp} className="text-textColor/60 mb-6 max-w-2xl text-lg leading-relaxed">
            A Netflix-inspired streaming interface with Firebase authentication, dynamic movie
            carousels powered by the TMDB API, Redux Toolkit for state management, and a
            GPT-powered search foundation built with React and Vite.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["React 18", "Redux Toolkit", "Firebase", "TMDB API", "Vite", "Frontend"].map((tag) => (
              <span key={tag} className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://netflixgpt-e671d.firebaseapp.com/"
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
            <img src={netflixImg} alt="Netflix-GPT browse page" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textColor/70 leading-relaxed">
            Netflix-GPT is a{" "}
            <strong className="text-textColor">production-quality Netflix clone</strong> built to
            demonstrate modern frontend architecture at scale. The goal wasn&apos;t just to make
            something that looks like Netflix — it was to engineer it the right way: authentication
            state managed centrally via Firebase and Redux, API data cached in the store to avoid
            redundant calls, and business logic kept completely out of UI components through custom
            hooks. The GPT search layer sits on top, allowing natural-language movie queries to be
            resolved against the TMDB catalog via OpenAI.
          </p>
        </Section>

        {/* ── Screenshots ── */}
        <Section title="Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-explorerBorder overflow-hidden rounded-xl border">
              <img src={netflixLoginImg} alt="Netflix-GPT login page" className="w-full object-cover" />
              <p className="text-textColor/40 p-3 text-center text-xs">Login / Sign-up Page</p>
            </div>
            <div className="border-explorerBorder overflow-hidden rounded-xl border">
              <img src={netflixMoviesImg} alt="Netflix-GPT movie carousels" className="w-full object-cover" />
              <p className="text-textColor/40 p-3 text-center text-xs">Browse Page — Movie Carousels</p>
            </div>
          </div>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Most Netflix clones are surface-level — they look right but are
              architecturally shallow: no real auth, prop-drilling everywhere, API calls scattered
              across components, and no thought given to performance. I wanted to build one that
              could actually scale.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a Netflix-faithful UI where auth is centralized via Firebase + Redux, movie
              data is fetched once and cached in the store, all side effects live in custom hooks,
              and the codebase is structured so adding a new feature (like the GPT search) doesn&apos;t
              require touching unrelated code.
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
            The app is a strict <strong className="text-textColor">SPA with unidirectional data flow</strong>. State is divided into two Redux slices, UI components never fetch data directly, and protected routes guard the browse page from unauthenticated access.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "Firebase Auth Observer", detail: "onAuthStateChanged at the root dispatches to userSlice on every auth change" },
                { step: "02", label: "Protected Routes", detail: "Read from Redux userSlice — redirect to /login if no user, redirect to /browse if already logged in" },
                { step: "03", label: "Custom Hooks", detail: "useNowPlayingMovies, usePopularMovies, etc. check Redux before fetching from TMDB" },
                { step: "04", label: "Redux movieSlice", detail: "Caches all movie lists and trailer keys — components subscribe with useSelector" },
                { step: "05", label: "UI Components", detail: "Purely declarative — read from store, dispatch actions, render data. No fetching logic." },
                { step: "06", label: "GPT Search Layer", detail: "Natural language query → OpenAI API → movie name list → TMDB search for each → display results" },
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
                <p className="text-textColor/60 text-sm leading-relaxed">{f.desc}</p>
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
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-accentColor flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accentColor/10">
                    <Icon icon={c.icon} width="18" />
                  </div>
                  <p className="text-textColor/50 text-sm font-medium">
                    <span className="text-red-400/70 mr-1">Problem:</span>
                    {c.problem}
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
              { icon: "lucide:layers", text: "How to design Redux slices that scale without becoming a mess of interrelated state" },
              { icon: "lucide:shield", text: "Managing async Firebase auth state globally without race conditions on protected routes" },
              { icon: "lucide:hook", text: "The custom hook pattern for encapsulating side effects and keeping components purely declarative" },
              { icon: "lucide:database", text: "Caching API responses in Redux to eliminate redundant network calls across navigation" },
              { icon: "lucide:cpu", text: "Integrating OpenAI into a React app and chaining it to a second API for movie lookups" },
              { icon: "lucide:video", text: "Embedding YouTube trailers as auto-play backgrounds without a heavy third-party player" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0"><Icon icon={item.icon} width="16" /></div>
                <p className="text-textColor/65 text-sm leading-relaxed">{item.text}</p>
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
          <p className="text-textColor/60 mb-6 text-sm">Browse the live app or explore the full source on GitHub.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://netflixgpt-e671d.firebaseapp.com/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Demo
            </a>
            <a href="https://github.com/sh1v-max/Netflix-GPT" target="_blank" rel="noopener noreferrer"
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
    </HelmetProvider>
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
