import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import taskforgeImg from "../../assets/images/taskforge.png";

// ─── Animation Variants ────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Data ──────────────────────────────────────────────────────
const techStack = {
  backend: [
    { name: "Node.js", icon: "logos:nodejs-icon", note: "Runtime (ES Modules)" },
    { name: "Express 5", icon: "simple-icons:express", note: "HTTP framework" },
    { name: "MongoDB", icon: "logos:mongodb-icon", note: "Database" },
    { name: "Mongoose", icon: "devicon:mongoose", note: "ODM layer" },
    { name: "JWT", icon: "logos:jwt-icon", note: "Auth tokens" },
    { name: "Zod", icon: "simple-icons:zod", note: "Request validation" },
    { name: "Swagger", icon: "logos:swagger", note: "API docs" },
    { name: "Helmet + CORS", icon: "lucide:shield-check", note: "Security headers" },
  ],
  frontend: [
    { name: "React 19", icon: "logos:react", note: "UI framework" },
    { name: "Vite 8", icon: "logos:vitejs", note: "Build tool" },
    { name: "Tailwind CSS 4", icon: "logos:tailwindcss-icon", note: "Styling" },
    { name: "React Router v7", icon: "logos:react-router", note: "Client routing" },
    { name: "React Hook Form", icon: "simple-icons:reacthookform", note: "Form handling" },
    { name: "Axios", icon: "simple-icons:axios", note: "HTTP client" },
    { name: "Context API", icon: "logos:react", note: "Auth, Theme, Toast" },
    { name: "Headless UI", icon: "simple-icons:headlessui", note: "Accessible primitives" },
  ],
};

const features = [
  {
    icon: "lucide:shield",
    title: "JWT Authentication",
    desc: "Stateless auth with signed JWT tokens. Passwords hashed with bcryptjs (10 salt rounds). Protected routes reject tampered or expired tokens with 401 responses.",
  },
  {
    icon: "lucide:layers",
    title: "Dual-Layer Validation",
    desc: "Zod validates request bodies and query params at the API boundary before Mongoose schema constraints apply at the database layer — two independent lines of defence.",
  },
  {
    icon: "lucide:filter",
    title: "Advanced Querying",
    desc: "Filter tasks by status (pending / in-progress / completed), sort by any field with ascending/descending prefix, and paginate results with configurable page and limit params.",
  },
  {
    icon: "lucide:lock",
    title: "Ownership Enforcement",
    desc: "Every task is scoped to its creator via a user reference set from the decoded JWT. Read, update, and delete operations verify ownership before touching the document.",
  },
  {
    icon: "lucide:shield-check",
    title: "Security Hardening",
    desc: "Helmet sets secure HTTP headers, CORS is configured to allow only the frontend origin, and express-rate-limit caps all /api/ routes at 100 requests per 15 minutes per IP.",
  },
  {
    icon: "lucide:book-open",
    title: "Swagger Docs",
    desc: "Full OpenAPI 3.0 specification with try-it-out support served at /api/docs. Every endpoint is documented with request schemas, response shapes, and example values.",
  },
  {
    icon: "lucide:smartphone",
    title: "Responsive Frontend",
    desc: "React 19 client with Tailwind CSS 4, dark mode via ThemeContext, toast notifications via ToastContext, and PrivateRoute wrappers that redirect unauthenticated users.",
  },
  {
    icon: "lucide:git-branch",
    title: "Clean Architecture",
    desc: "MVC separation across routes, controllers, models, middleware, schemas, and utils. Each layer has a single responsibility and its own README for documentation.",
  },
];

const challenges = [
  {
    icon: "lucide:layers",
    problem: "Two validation layers duplicating error logic",
    solution:
      "Zod schemas handle API-boundary validation and return consistent 400 responses before requests reach Mongoose. This means Mongoose validation is a last-resort safety net, not the primary error reporter — no duplicated error-formatting code.",
  },
  {
    icon: "lucide:lock",
    problem: "Preventing users from reading or modifying each other's tasks",
    solution:
      "The protect middleware decodes the JWT and attaches req.user. Every task query adds a user filter equal to req.user._id. There's no separate ownership check — the query itself enforces isolation at the database level.",
  },
  {
    icon: "lucide:plug",
    problem: "Connecting React frontend to Express backend securely across origins",
    solution:
      "A shared Axios instance reads VITE_API_URL from env and attaches the stored JWT as an Authorization header on every request. CORS on the backend is configured to allow the Vercel deployment origin explicitly, blocking other callers.",
  },
];

const apiRoutes = [
  { method: "POST", path: "/api/auth/register", auth: false, desc: "Register — returns JWT" },
  { method: "POST", path: "/api/auth/login", auth: false, desc: "Login — returns JWT" },
  { method: "GET", path: "/api/auth/me", auth: true, desc: "Get current user profile" },
  { method: "PUT", path: "/api/auth/me", auth: true, desc: "Update current user profile" },
  { method: "POST", path: "/api/tasks", auth: true, desc: "Create a task" },
  { method: "GET", path: "/api/tasks", auth: true, desc: "List tasks (filter, sort, paginate)" },
  { method: "GET", path: "/api/tasks/:id", auth: true, desc: "Get a single task" },
  { method: "PUT", path: "/api/tasks/:id", auth: true, desc: "Update a task" },
  { method: "DELETE", path: "/api/tasks/:id", auth: true, desc: "Delete a task" },
];

const methodColor = {
  GET: "text-green-400 bg-green-400/10",
  POST: "text-blue-400 bg-blue-400/10",
  PUT: "text-yellow-400 bg-yellow-400/10",
  DELETE: "text-red-400 bg-red-400/10",
};

// ─── Component ─────────────────────────────────────────────────
export default function TaskForgeDetail() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>TaskForge — Case Study | Shiv</title>
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

          <motion.h1
            variants={fadeUp}
            className="text-textColor mb-4 text-4xl font-bold tracking-tight md:text-6xl"
          >
            TaskForge
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-textColor/60 mb-6 max-w-2xl text-lg leading-relaxed"
          >
            A production-grade full-stack task management platform — REST API built with Express 5 &
            MongoDB, paired with a React 19 client featuring JWT auth, advanced querying, and
            interactive Swagger documentation.
          </motion.p>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["Full-Stack", "REST API", "JWT Auth", "Node.js", "React", "MongoDB"].map((tag) => (
              <span
                key={tag}
                className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <a
              href="https://taskforge-eight-xi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            >
              <Icon icon="lucide:external-link" width="16" />
              Live Demo
            </a>
            <a
              href="https://github.com/sh1v-max/Taskforge"
              target="_blank"
              rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200"
            >
              <Icon icon="mdi:github" width="16" />
              GitHub
            </a>
          </motion.div>

          {/* Screenshot */}
          <motion.div
            variants={fadeUp}
            className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl"
          >
            <img
              src={taskforgeImg}
              alt="TaskForge application screenshot"
              className="w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textColor/70 leading-relaxed">
            TaskForge started as a goal to build a{" "}
            <strong className="text-textColor">truly production-ready REST API</strong> — not a
            tutorial clone, but something with real security, real validation, real documentation,
            and a real frontend consuming it. The backend is built on{" "}
            <strong className="text-textColor">Express 5</strong> with{" "}
            <strong className="text-textColor">MongoDB & Mongoose</strong>, and ships with JWT
            authentication, two-layer request validation, ownership-scoped data access, rate
            limiting, security headers, and interactive Swagger docs. The frontend is a{" "}
            <strong className="text-textColor">React 19</strong> SPA with protected routes,
            dark mode, toast notifications, and form validation that mirrors the backend&apos;s Zod
            schemas.
          </p>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Most beginner full-stack projects skip the parts that matter in production: there&apos;s
              no proper auth, no input validation, no error handling strategy, no API documentation,
              and no security hardening. I wanted to build something that covered all of these — a
              project I could point to and say &quot;this is how I approach backend engineering.&quot;
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Build a full-stack task manager where the backend alone demonstrates JWT auth, dual
              validation layers, global error handling, rate limiting, security headers, Swagger
              docs, and clean MVC architecture — then pair it with a polished React frontend that
              actually consumes the API end-to-end.
            </Card>
          </div>
        </Section>

        {/* ── Tech Stack ── */}
        <Section title="Tech Stack">
          <div className="grid gap-6 sm:grid-cols-2">
            <StackGroup label="Backend" items={techStack.backend} />
            <StackGroup label="Frontend" items={techStack.frontend} />
          </div>
        </Section>

        {/* ── Architecture ── */}
        <Section title="Architecture">
          <p className="text-textColor/70 mb-6 leading-relaxed">
            The backend follows a strict{" "}
            <strong className="text-textColor">MVC pattern</strong> with each layer having a single
            responsibility. Every incoming request travels through a predictable pipeline before a
            response is sent.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {[
                { step: "01", label: "Route", detail: "Matches the endpoint and dispatches to middleware + controller" },
                { step: "02", label: "Validation Middleware", detail: "Zod schema validates request body / query params → 400 if invalid" },
                { step: "03", label: "Auth Middleware", detail: "Verifies JWT, attaches req.user → 401 if missing or tampered" },
                { step: "04", label: "Controller", detail: "Business logic — calls Model methods, builds the response" },
                { step: "05", label: "Model (Mongoose)", detail: "MongoDB operations with schema-level constraints as a safety net" },
                { step: "06", label: "Error Middleware", detail: "Catches any thrown error and returns a consistent JSON error shape" },
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

        {/* ── API Reference ── */}
        <Section title="API Reference">
          <p className="text-textColor/60 mb-4 text-sm">
            Base URL:{" "}
            <code className="bg-accentColor/10 text-accentColor rounded px-2 py-0.5 font-mono text-xs">
              https://taskforge-api.onrender.com
            </code>{" "}
            · Interactive docs at{" "}
            <code className="bg-accentColor/10 text-accentColor rounded px-2 py-0.5 font-mono text-xs">
              /api/docs
            </code>
          </p>
          <div className="border-explorerBorder overflow-hidden rounded-2xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-explorerBorder bg-articleBg">
                    <th className="text-textColor/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Method</th>
                    <th className="text-textColor/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Endpoint</th>
                    <th className="text-textColor/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">Auth</th>
                    <th className="text-textColor/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-explorerBorder">
                  {apiRoutes.map((r) => (
                    <tr key={r.path + r.method} className="hover:bg-articleBg/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`rounded-md px-2 py-0.5 font-mono text-xs font-bold ${methodColor[r.method]}`}>
                          {r.method}
                        </span>
                      </td>
                      <td className="text-textColor/80 px-4 py-3 font-mono text-xs">{r.path}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {r.auth ? (
                          <span className="text-yellow-400 text-xs">🔒 JWT</span>
                        ) : (
                          <span className="text-textColor/30 text-xs">Public</span>
                        )}
                      </td>
                      <td className="text-textColor/50 px-4 py-3 text-xs hidden md:table-cell">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-textColor/40 mt-3 text-xs">
            Query params for GET /api/tasks: <code className="font-mono">status</code>, <code className="font-mono">sortBy</code>, <code className="font-mono">page</code>, <code className="font-mono">limit</code>
          </p>
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
              { icon: "lucide:shield", text: "Designing auth flows that are stateless, secure, and hard to misuse" },
              { icon: "lucide:layers", text: "Why two validation layers (API + DB) are better than trusting either alone" },
              { icon: "lucide:database", text: "Mongoose schema design, indexing strategy, and referencing patterns" },
              { icon: "lucide:git-merge", text: "Clean MVC separation that makes features easy to add or modify" },
              { icon: "lucide:book-open", text: "Writing OpenAPI specs and why living docs matter for API consumers" },
              { icon: "lucide:plug", text: "Bridging a React client to an Express API — CORS, token storage, error handling" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0">
                  <Icon icon={item.icon} width="16" />
                </div>
                <p className="text-textColor/65 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA Footer ── */}
        <motion.div
          variants={fadeUp}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true }}
          className="border-accentColor/20 bg-accentColor/5 mt-6 rounded-2xl border p-8 text-center"
        >
          <h3 className="text-textColor mb-2 text-xl font-bold">Want to see it live?</h3>
          <p className="text-textColor/60 mb-6 text-sm">
            Try the live app or explore the source code on GitHub.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://taskforge-eight-xi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90"
            >
              <Icon icon="lucide:external-link" width="16" />
              Open Live App
            </a>
            <a
              href="https://github.com/sh1v-max/Taskforge"
              target="_blank"
              rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200"
            >
              <Icon icon="mdi:github" width="16" />
              View Source
            </a>
            <Link
              to="/projects"
              className="text-textColor/50 hover:text-accentColor inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200"
            >
              <Icon icon="lucide:arrow-left" width="14" />
              All Projects
            </Link>
          </div>
        </motion.div>

      </article>
    </HelmetProvider>
  );
}

// ─── Sub-components ────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="mb-14"
    >
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

function StackGroup({ label, items }) {
  return (
    <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
      <p className="text-accentColor mb-4 text-xs font-bold uppercase tracking-widest">{label}</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
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
  );
}
