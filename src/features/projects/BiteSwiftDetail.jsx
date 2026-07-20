import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import biteswiftImg from "../../assets/images/biteswift.png";

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
  { name: "Vite", icon: "logos:vitejs", note: "Fast build tool with HMR" },
  { name: "Redux Toolkit", icon: "logos:redux", note: "Cart & global state" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", note: "Utility-first responsive styling" },
  { name: "React Router v6", icon: "logos:react-router", note: "Dynamic client-side routing" },
  { name: "Fetch API", icon: "lucide:wifi", note: "Native browser data fetching" },
  { name: "Lazy Loading", icon: "lucide:layers", note: "Code-split routes on demand" },
  { name: "Swiggy API", icon: "lucide:utensils", note: "Live restaurant & menu data" },
];

const features = [
  {
    icon: "lucide:utensils",
    title: "Dynamic Restaurant Listings",
    desc: "Fetches a live list of restaurants from the Swiggy API. A master list is stored in state alongside a filtered copy — client-side search operates on the filtered list without extra API calls.",
  },
  {
    icon: "lucide:menu",
    title: "Interactive Restaurant Menus",
    desc: "Each restaurant card links to a dynamic route (/restaurant/:id). The useRestaurantMenu hook fetches the menu on demand, managing loading and error states so the component stays purely declarative.",
  },
  {
    icon: "lucide:shopping-cart",
    title: "Redux-Powered Cart",
    desc: "The cart is a Redux slice (addItem, removeItem, clearCart) backed by Immer for safe immutable updates. The header badge, cart page, and menu page all read the same store slice — always in sync.",
  },
  {
    icon: "lucide:zap",
    title: "Shimmer UI",
    desc: "A content-placeholder skeleton renders while restaurant data loads, mirroring the exact layout of the real cards. Perceived load time feels near-instant compared to a blank screen or spinner.",
  },
  {
    icon: "lucide:wifi-off",
    title: "Online Status Hook",
    desc: "useOnlineStatus listens to browser online/offline events and returns a boolean. Any component can use it to render a connectivity warning — no duplicated event-listener setup across the app.",
  },
  {
    icon: "lucide:split",
    title: "Lazy-Loaded Routes",
    desc: "React Router is configured with lazy() and Suspense to code-split each page. The Cart page bundle is only downloaded when the user first navigates there, reducing the initial JS payload.",
  },
];

const challenges = [
  {
    icon: "lucide:shopping-cart",
    problem: "Cart state needed by three disconnected components simultaneously",
    solution:
      "Redux Toolkit's cartSlice is the single source of truth. The Header reads item count from the store for the badge, RestaurantMenu dispatches addItem when a user taps '+', and the Cart page reads the full items array and dispatches clearCart. No prop-drilling, no duplicate state — one slice, three consumers.",
  },
  {
    icon: "lucide:filter",
    problem: "Search filtering without triggering a new API call on every keystroke",
    solution:
      "On initial load, the fetched restaurant list is stored in two useState variables: listOfRestaurants (master, never mutated) and filteredRestaurants (what's rendered). The search input filters the master list and writes to the filtered copy. Resetting search simply copies master back to filtered — the API is never called again.",
  },
  {
    icon: "lucide:layers",
    problem: "Initial JS bundle too large with all routes bundled together",
    solution:
      "React Router's lazy() wraps each page-level component, and a Suspense boundary with the Shimmer UI as fallback handles the async load. The Cart and About pages only download their code chunks when first visited, keeping the critical initial bundle small.",
  },
];

export default function BiteSwiftDetail() {
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
            A high-fidelity Swiggy clone built with React 18, Redux Toolkit, and Tailwind CSS.
            Features live restaurant data, dynamic menu pages, a Redux-managed cart, shimmer
            loading states, and lazy-loaded routes for optimal performance.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["React", "Redux Toolkit", "Tailwind CSS", "Swiggy API", "Vite", "Frontend"].map((tag) => (
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
            <img src={biteswiftImg} alt="BiteSwift app screenshot" className="w-full object-cover object-top" />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textColor/70 leading-relaxed">
            BiteSwift is a{" "}
            <strong className="text-textColor">production-quality food delivery clone</strong> that
            goes beyond just looking like Swiggy. It pulls live restaurant data from the Swiggy API,
            manages a globally accessible cart through Redux Toolkit, implements lazy-loaded routes
            for performance, and uses shimmer UI for a polished loading experience. The architecture
            separates data-fetching logic into custom hooks, keeping every UI component purely
            concerned with rendering — not network calls.
          </p>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Building a food delivery app means dealing with interconnected state (cart accessible
              from header, menu, and cart page), live API data with loading states, and performance
              challenges from a large initial JS bundle. Most implementations handle these badly —
              prop-drilling the cart or re-fetching menus on every navigation.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a Swiggy-faithful clone where the cart state is a single Redux slice consumed
              by multiple components, API data is fetched through custom hooks that handle loading
              and errors internally, routes are lazily loaded, and the shimmer pattern replaces
              spinners for a perceived performance win.
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
            Strict <strong className="text-textColor">separation of concerns</strong>: custom hooks own data fetching, Redux owns global state, and components own rendering. The data flow is always unidirectional.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "Swiggy API → useEffect", detail: "Restaurant list fetched on Body mount, stored in two useState vars (master + filtered)" },
                { step: "02", label: "Client-Side Filter", detail: "Search input writes to filteredRestaurants — master list is never mutated, API never re-called" },
                { step: "03", label: "Dynamic Route", detail: "/restaurant/:id renders RestaurantMenu which calls useRestaurantMenu(resId) hook" },
                { step: "04", label: "Custom Hooks", detail: "useRestaurantMenu, useOnlineStatus — handle fetching, loading, errors; return clean data to components" },
                { step: "05", label: "Redux cartSlice", detail: "addItem / removeItem / clearCart — Header, Menu, Cart all read from the same slice" },
                { step: "06", label: "Lazy Routes", detail: "Cart and other secondary pages are lazy() wrapped with Shimmer as Suspense fallback" },
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
              { icon: "lucide:layers", text: "Redux Toolkit slice pattern — clean reducer logic without boilerplate using Immer under the hood" },
              { icon: "lucide:hook", text: "The custom hook pattern for encapsulating fetch logic while keeping components purely declarative" },
              { icon: "lucide:zap", text: "Shimmer UI as a UX pattern — content placeholders feel faster than any spinner" },
              { icon: "lucide:split", text: "Route-level code splitting with React.lazy() and Suspense to reduce initial bundle size" },
              { icon: "lucide:filter", text: "Client-side filtering with a master/filtered state pattern — no redundant API calls" },
              { icon: "lucide:wifi-off", text: "Building reusable event-listener hooks (useOnlineStatus) that clean up on unmount" },
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
          <h3 className="text-textColor mb-2 text-xl font-bold">Try it out</h3>
          <p className="text-textColor/60 mb-6 text-sm">Browse restaurants live or explore the source on GitHub.</p>
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
