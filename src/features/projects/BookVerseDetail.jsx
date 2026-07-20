import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import bookverseImg from "../../assets/images/bookverse.png";
import bookverseSearchImg from "../../assets/images/bookverse-search.png";
import bookverseFeaturedImg from "../../assets/images/bookverse-featured-book.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const techStack = [
  { name: "React", icon: "logos:react", note: "Component-based UI library" },
  { name: "Vite", icon: "logos:vitejs", note: "Fast development build tool" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", note: "Utility-first styling" },
  { name: "React Router", icon: "logos:react-router", note: "Client-side routing" },
  { name: "Open Library API", icon: "lucide:book-open", note: "Book data source (free, no key)" },
  { name: "Fetch API", icon: "lucide:wifi", note: "Native browser HTTP requests" },
];

const features = [
  {
    icon: "lucide:search",
    title: "Book Search",
    desc: "Search across millions of books by title, author, or genre. Quick-access suggestion chips (Harry Potter, Sci-Fi, Mystery, Romance, Biography) let users discover books in one tap.",
  },
  {
    icon: "lucide:trending-up",
    title: "Trending Books",
    desc: "Daily, weekly, and monthly trending sections pulled from the Open Library trending endpoint. Each section is an independently scrollable horizontal list with custom arrow navigation.",
  },
  {
    icon: "lucide:book",
    title: "Detailed Book Pages",
    desc: "Dynamic routes render a full book detail page with cover, description, genres, subjects, places, timeline, characters, publication info, and edition count — all from the Open Library Works API.",
  },
  {
    icon: "lucide:layers",
    title: "Custom Data Hooks",
    desc: "useBooks handles fetched search results with loading and error states. useTrendingBooks manages trending data per time window. Both are reusable and keep components clean.",
  },
  {
    icon: "lucide:layout",
    title: "Glassmorphic UI",
    desc: "Header and footer use backdrop-blur with semi-transparent backgrounds for a modern glassy effect. Hover transitions, smooth scroll, and cover image animations add visual depth throughout.",
  },
  {
    icon: "lucide:smartphone",
    title: "Fully Responsive",
    desc: "Mobile-first layout using Tailwind responsive modifiers. The grid adapts from a single column on small screens to multi-column on desktop. Horizontal scroll sections work with touch swipe on mobile.",
  },
];

const challenges = [
  {
    icon: "lucide:book-open",
    problem: "Open Library API returns inconsistent and sometimes missing data",
    solution:
      "Every field rendered in BookCard and the Book detail page is accessed through optional chaining and nullish coalescing defaults. Cover images fall back to a placeholder when the Open Library cover ID is absent. Description fields handle both string and object formats (the API returns either depending on the endpoint).",
  },
  {
    icon: "lucide:arrow-left-right",
    problem: "Horizontal trending scroll with accessible custom arrows",
    solution:
      "Each trending section has a ref attached to its scroll container. The left/right arrow buttons call scrollBy() with a fixed pixel offset on the ref. This avoids any scroll library dependency and works natively with both mouse and touch. The buttons are hidden on mobile where native swipe handles scroll.",
  },
  {
    icon: "lucide:search",
    problem: "Search debouncing to avoid hammering the API on every keystroke",
    solution:
      "useBooks wraps the fetch inside a useEffect with a setTimeout debounce. Each keystroke clears the previous timer. The API is only called after the user pauses typing for 400ms — reducing request volume dramatically without any external library.",
  },
];

export default function BookVerseDetail() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>BookVerse — Case Study | Shiv</title>
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
            BookVerse
          </motion.h1>

          <motion.p variants={fadeUp} className="text-textColor/60 mb-6 max-w-2xl text-lg leading-relaxed">
            A modern book discovery platform built with React and the Open Library API. Features
            full-text book search, daily/weekly/monthly trending sections, detailed book pages,
            custom scroll navigation, and a glassmorphic UI with smooth animations.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["React", "Tailwind CSS", "Open Library API", "Vite", "React Router", "Frontend"].map((tag) => (
              <span key={tag} className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <a href="https://bookversedot.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Demo
            </a>
            <a href="https://github.com/sh1v-max/BookVerse" target="_blank" rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200">
              <Icon icon="mdi:github" width="16" />GitHub
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
            <img src={bookverseImg} alt="BookVerse home page" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textColor/70 leading-relaxed">
            BookVerse is a{" "}
            <strong className="text-textColor">book discovery platform</strong> built on top of the
            Open Library API — a completely free, no-key-required public API with millions of books.
            The project focused on three things: a polished UI that feels premium despite being built
            with free data, a clean data-fetching architecture using custom hooks with debounce and
            error handling, and a responsive layout that works beautifully on every screen size. The
            glassmorphic design language, horizontal trending carousels, and detailed book pages give
            it the feel of a real consumer product.
          </p>
        </Section>

        {/* ── Screenshots ── */}
        <Section title="Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-explorerBorder overflow-hidden rounded-xl border">
              <img src={bookverseSearchImg} alt="BookVerse search results" className="w-full object-cover" />
              <p className="text-textColor/40 p-3 text-center text-xs">Search Results</p>
            </div>
            <div className="border-explorerBorder overflow-hidden rounded-xl border">
              <img src={bookverseFeaturedImg} alt="BookVerse book detail" className="w-full object-cover" />
              <p className="text-textColor/40 p-3 text-center text-xs">Book Detail Page</p>
            </div>
          </div>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Public book APIs are notoriously inconsistent — missing fields, different data shapes
              per endpoint, and no authentication. Building on top of one requires defensive data
              access everywhere. The UI challenge was making something feel polished with data that
              can be incomplete or oddly structured.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a book discovery experience that handles API inconsistency gracefully, loads
              data efficiently with custom hooks and debouncing, and presents a premium glassmorphic
              UI with trending sections, full search, and detailed book pages — all without a backend
              or API key.
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
            Clean <strong className="text-textColor">hooks-driven architecture</strong> — UI components are purely responsible for rendering. All data fetching, loading state, and error handling lives in custom hooks.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "Search Input → useBooks", detail: "Debounced useEffect fires fetch after 400ms idle time, stores results and loading state" },
                { step: "02", label: "useTrendingBooks(period)", detail: "Fetches trending by daily/weekly/monthly period param — each section calls the hook independently" },
                { step: "03", label: "BookList Component", detail: "Renders a grid or horizontal scroll of BookCard components from the hook's returned data" },
                { step: "04", label: "Dynamic Book Route", detail: "/book/:id calls the Open Library Works API for the full book detail page" },
                { step: "05", label: "Defensive Data Access", detail: "All fields accessed via optional chaining (?.) with fallback values for missing API data" },
                { step: "06", label: "Horizontal Scroll", detail: "ref.current.scrollBy() on arrow click — no library, works with touch natively on mobile" },
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
              { icon: "lucide:book-open", text: "Working with real-world APIs that have inconsistent shapes — defensive access patterns matter" },
              { icon: "lucide:timer", text: "Debouncing search with useEffect and setTimeout to prevent API flooding on every keystroke" },
              { icon: "lucide:hook", text: "Custom hooks as the right abstraction for reusable data-fetching logic with built-in loading states" },
              { icon: "lucide:arrow-left-right", text: "Implementing accessible custom scroll controls with refs instead of a scroll library" },
              { icon: "lucide:layout", text: "Glassmorphism with Tailwind — backdrop-blur, semi-transparent borders, and layered depth" },
              { icon: "lucide:smartphone", text: "Building truly responsive horizontal scroll layouts that work with both mouse and touch" },
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
          <h3 className="text-textColor mb-2 text-xl font-bold">Discover a book</h3>
          <p className="text-textColor/60 mb-6 text-sm">Search millions of books live or browse the source on GitHub.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://bookversedot.netlify.app/" target="_blank" rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90">
              <Icon icon="lucide:external-link" width="16" />Live Demo
            </a>
            <a href="https://github.com/sh1v-max/BookVerse" target="_blank" rel="noopener noreferrer"
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
        <div className="from-accentColor to-accentColor/0 h-px flex-1 bg-gradient-to-r" />
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
