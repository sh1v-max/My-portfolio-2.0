/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import homeImg from "../../assets/images/docmind/home.png";
import processingImg from "../../assets/images/docmind/processing.png";
import chatImg from "../../assets/images/docmind/chat.png";
import sourcesImg from "../../assets/images/docmind/sources.png";
import quizImg from "../../assets/images/docmind/quiz.png";
import signupImg from "../../assets/images/docmind/signup.png";
import phoneHomeImg from "../../assets/images/docmind/phone_home.png";
import phoneChatImg from "../../assets/images/docmind/phone_chat.png";
import phoneSidebarImg from "../../assets/images/docmind/phone_sidebar.png";
import phoneQuizImg from "../../assets/images/docmind/phone_quiz.png";
import phoneSignupImg from "../../assets/images/docmind/phone_signup.png";

const LIVE_URL = "https://docmind-jet.vercel.app/";
const API_URL = "https://ai-backend-docmind.onrender.com";
const REPO_URL = "https://github.com/sh1v-max/AI-Backend";

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
    { name: "Node.js + TypeScript", icon: "logos:nodejs-icon", note: "Runtime, strict TS" },
    { name: "Express 5", icon: "simple-icons:express", note: "HTTP framework" },
    { name: "PostgreSQL (Neon)", icon: "logos:postgresql", note: "Database, free tier" },
    { name: "pgvector", icon: "lucide:scatter-chart", note: "Vector search, cosine distance" },
    { name: "Drizzle ORM", icon: "simple-icons:drizzle", note: "Behind a repository layer" },
    { name: "Zod", icon: "simple-icons:zod", note: "Validates the model's output" },
    { name: "multer + pdf-parse", icon: "lucide:file-text", note: "PDF upload and text extraction" },
    { name: "BullMQ + Redis (Upstash)", icon: "logos:redis", note: "Background ingestion queue" },
    { name: "JWT + bcryptjs", icon: "logos:jwt-icon", note: "Guest and account auth" },
    { name: "express-rate-limit", icon: "lucide:gauge", note: "Throttles the /auth routes" },
    { name: "Render", icon: "simple-icons:render", note: "API + worker hosting" },
  ],
  ai: [
    { name: "Gemini API", icon: "material-icon-theme:gemini-ai", note: "Plain fetch, no SDK" },
    { name: "gemini-embedding-001", icon: "lucide:binary", note: "3072-dim embeddings" },
    { name: "Server-Sent Events", icon: "lucide:radio", note: "Token-by-token streaming" },
    { name: "Structured output", icon: "lucide:braces", note: "JSON mode + responseSchema" },
    { name: "React 19 + TypeScript", icon: "logos:react", note: "Frontend client" },
    { name: "Vite", icon: "logos:vitejs", note: "Build tool" },
    { name: "fetch stream reader", icon: "lucide:plug", note: "Reads the SSE body with a Bearer token" },
    { name: "react-markdown", icon: "simple-icons:markdown", note: "Formatted answers, no raw HTML" },
    { name: "Vercel", icon: "simple-icons:vercel", note: "Frontend hosting" },
  ],
};

// Four pipelines, each shown in the same numbered-step format TaskForge uses
// for its request pipeline. The numbers are real: 500-word chunks, 3072-dim
// vectors, top-3 chunks, last 8 messages, 5 questions x 4 options, 3 job
// attempts.
const pipelines = [
  {
    label: "Ingestion",
    trigger: "POST /upload → BullMQ worker",
    steps: [
      { label: "Receive", detail: "multer keeps the PDF in memory (10 MB cap on a 512 MB free server)" },
      { label: "Parse + chunk", detail: "pdf-parse pulls out the text, split into ~500-word pieces. No text at all? 400 right away" },
      { label: "Queue", detail: "A documents row with status 'processing', a job in Redis, and a 202 back in about a second" },
      { label: "Embed (worker)", detail: "The worker deletes any old chunks first, then turns each chunk into 3072 numbers" },
      { label: "Store", detail: "Rows in Postgres/pgvector, then status 'ready' (or 'failed' after 3 attempts)" },
      { label: "Poll", detail: "The browser checks GET /documents every 2 s until the PDF is ready" },
    ],
  },
  {
    label: "Chat",
    trigger: "POST /chat · POST /chat-stream",
    steps: [
      { label: "Embed the question", detail: "Same embedding model, so it lands in the same space" },
      { label: "Vector search", detail: "pgvector returns the 3 closest chunks, in one PDF or across all of yours" },
      { label: "Load memory", detail: "Last 8 messages of this conversation from Postgres" },
      { label: "Build the prompt", detail: "Chunks + history + question, built in one shared function" },
      { label: "Generate", detail: "Gemini answers, streamed back over SSE piece by piece" },
      { label: "Persist", detail: "Both turns saved, so the next question has memory" },
    ],
  },
  {
    label: "Quiz",
    trigger: "POST /quiz",
    steps: [
      { label: "Sample", detail: "5 chunks spread evenly across the document (no search, a quiz has no question)" },
      { label: "Generate", detail: "Gemini in structured-output mode with a responseSchema" },
      { label: "Validate", detail: "Zod: exactly 5 questions, 4 different options, correctIndex 0-3" },
      { label: "Retry once", detail: "Invalid? One more attempt, then a clean 502. Never a loop" },
      { label: "Shuffle", detail: "Options shuffled in code (Fisher-Yates), correctIndex remapped" },
    ],
  },
  {
    label: "Auth",
    trigger: "every request",
    steps: [
      { label: "Guest on first visit", detail: "POST /auth/guest creates a real user row with no email, and signs a JWT" },
      { label: "Bearer token", detail: "Every call sends Authorization: Bearer <JWT>, kept in localStorage" },
      { label: "requireAuth", detail: "Checks signature and expiry, no database lookup, and sets req.user" },
      { label: "Scoped SQL", detail: "Every repository call takes the user's id, so someone else's data is a 404" },
      { label: "Sign up", detail: "Fills in the same guest row with an email and password hash, so files stay" },
    ],
  },
];

const features = [
  {
    icon: "lucide:paperclip",
    title: "Attach a PDF and ask in one go",
    desc: "The home screen is the chat box. Attach or drop a PDF, type the question and send. If the PDF is still processing, the question waits and goes out on its own.",
  },
  {
    icon: "lucide:loader",
    title: "Background ingestion",
    desc: "Upload answers 202 in about a second. A BullMQ worker does the slow embedding, and the sidebar shows the file as Processing… until it's ready.",
  },
  {
    icon: "lucide:user-round",
    title: "Private space, no sign-up",
    desc: "Every visitor silently gets a guest account and only sees their own documents and chats. Signing up later keeps them and works on any device.",
  },
  {
    icon: "lucide:messages-square",
    title: "Grounded answers with sources",
    desc: "Answers come only from your document, formatted as markdown. The three passages used are shown under every reply, with the file name and vector distance.",
  },
  {
    icon: "lucide:brain",
    title: "Conversation memory",
    desc: "Follow-ups like \"in simple words?\" work because the last 8 messages go into the prompt. A page refresh brings the same chat back.",
  },
  {
    icon: "lucide:activity",
    title: "Streaming replies",
    desc: "The answer arrives word by word over Server-Sent Events. Sources come first in a meta event, then text pieces, then a done event.",
  },
  {
    icon: "lucide:library",
    title: "One PDF or all of them",
    desc: "A picker inside the chat box searches a single document or every one you uploaded. In all-documents mode each answer names the PDF it came from.",
  },
  {
    icon: "lucide:clipboard-check",
    title: "Validated quizzes",
    desc: "Pick a document, get 5 multiple-choice questions checked with Zod before they reach the UI, then graded in the browser with a score.",
  },
  {
    icon: "lucide:file-text",
    title: "A sample PDF for the curious",
    desc: "No PDF handy? \"Try our sample\" uploads a short guide to DocMind itself, with starter questions it can actually answer.",
  },
  {
    icon: "lucide:layers",
    title: "Layered backend",
    desc: "Routes stay thin, services never touch req/res, and only repositories touch SQL. That's what let the ingestion pipeline move into a worker unchanged.",
  },
];

const challenges = [
  {
    icon: "lucide:timer",
    problem: "An idle queue worker would burn through the free Redis quota",
    solution:
      "A BullMQ worker keeps polling Redis even with nothing to do. Measured over 5 idle minutes: 118 Redis commands with the defaults, about 1M a month, double Upstash's free 500K. With drainDelay: 30 and a 5-minute stalled-job check it dropped to 19, about 164K a month. npm run step5 repeats the measurement.",
  },
  {
    icon: "lucide:repeat",
    problem: "A retried job could store every chunk twice",
    solution:
      "BullMQ retries failed jobs and re-runs ones whose worker died, so a job can run more than once. Each job starts by deleting the chunks its document already has, then stores all of them. Tested with a forced failure halfway through and with the server killed mid-job.",
  },
  {
    icon: "lucide:key-round",
    problem: "EventSource can't send an Authorization header",
    solution:
      "Once every route needed a Bearer token, the browser's EventSource stopped working: it only does GET and can't set headers. The client now reads the stream with fetch and parses the events itself, and /chat-stream moved to POST so the question stays out of the URL and the server logs.",
  },
  {
    icon: "lucide:network",
    problem: "The rate limiter saw every visitor as the same IP",
    solution:
      "On Render a request passes through Cloudflare and Render's own proxy first. The number of hops to trust wasn't guessed: the RateLimit-Policy header carries a hash of the key the limiter used, which can be compared with a hash of your own IP. The answer was 3 hops.",
  },
  {
    icon: "lucide:scissors",
    problem: "The stream from Gemini produced nothing, even though the request worked",
    solution:
      "Gemini ends its SSE lines with \\r\\n, and a \\r\\n can be split across two network reads. Normalizing each chunk separately missed it. The fix was to normalize the whole buffer, split on the blank line between events, and keep the trailing half-event in the buffer for the next read.",
  },
  {
    icon: "lucide:shuffle",
    problem: "Every quiz passed validation, but the answers had a pattern",
    solution:
      "Across 50 generated questions the correct answer sat in the four slots 22 / 36 / 32 / 10% of the time. Valid is not the same as good, so after Zod validation the options are shuffled in code and correctIndex is remapped. The model's habits don't leak into the UI.",
  },
];

const apiRoutes = [
  { method: "POST", path: "/auth/guest", desc: "Create a guest account → { token, user } (rate-limited)" },
  { method: "POST", path: "/auth/register", desc: "Email + password. With a guest's token it upgrades that guest" },
  { method: "POST", path: "/auth/login", desc: "Email + password → { token, user } (rate-limited)" },
  { method: "GET", path: "/auth/me", desc: "Who the token belongs to" },
  { method: "POST", path: "/upload", desc: "Parse, chunk, queue the embedding, answer 202 'processing'" },
  { method: "GET", path: "/documents", desc: "Your documents, each with status processing / ready / failed" },
  { method: "DELETE", path: "/documents/:documentId", desc: "Delete a document, its chunks and its chats" },
  { method: "POST", path: "/chat", desc: "Ask a question, get { sessionId, answer, sources }" },
  { method: "POST", path: "/chat-stream", desc: "Same pipeline and body, streamed over SSE" },
  { method: "GET", path: "/sessions", desc: "One summary per conversation, newest first" },
  { method: "GET", path: "/sessions/:sessionId/messages", desc: "Full transcript of one conversation" },
  { method: "DELETE", path: "/sessions/:sessionId", desc: "Delete one conversation" },
  { method: "POST", path: "/quiz", desc: "5 validated, shuffled questions for one document" },
];

const sseEvents = [
  { event: "meta", payload: "{ sessionId, sources }", when: "First, before any text" },
  { event: "(default)", payload: "{ text }", when: "Once per piece of the answer" },
  { event: "done", payload: "{}", when: "After the full answer is saved" },
  { event: "error", payload: "{ error }", when: "If anything fails mid-stream" },
];

const methodColor = {
  GET: "text-green-400 bg-green-400/10",
  POST: "text-blue-400 bg-blue-400/10",
  PUT: "text-yellow-400 bg-yellow-400/10",
  DELETE: "text-dangerText bg-red-400/10",
};

// Kept on the page on purpose. A case study that only lists strengths reads
// like marketing; naming the gaps shows I know where the edges are.
const limitations = [
  "The queue worker shares the API's free 512 MB process, so a big upload can slow chat down a little. A separate worker service needs no code change (npm run worker).",
  "Chunking is a plain 500-word split, no overlap and no respect for paragraphs.",
  "\"All documents\" search shares the top 3 chunks across every PDF, and can't answer questions about the collection itself, like \"which documents do I have?\".",
  "Memory is the last 8 messages. Older ones are dropped, not summarized.",
  "When Gemini is overloaded it returns 503 and the chat just says \"Streaming failed\".",
  "Auth is deliberately simple: no refresh tokens, password reset or email verification, and no automated tests yet.",
];

const desktopScreenshots = [
  { src: homeImg,       alt: "DocMind home screen: the chat box with a paperclip to attach a PDF and a Try our sample link",               label: "Home" },
  { src: processingImg, alt: "DocMind right after an upload: the PDF shows Processing… in the sidebar while the worker embeds it",        label: "Background Processing" },
  { src: sourcesImg,    alt: "DocMind answer about which PDFs work, with the three source passages expanded and their vector distances",  label: "Answer + Sources" },
  { src: chatImg,       alt: "DocMind conversation where 'explain that in simple words' is answered from the previous reply",              label: "Conversation Memory" },
  { src: quizImg,       alt: "DocMind quiz on the sample PDF after checking answers, 5 of 5 correct",                                      label: "Quiz" },
  { src: signupImg,     alt: "DocMind sign-up dialog telling a guest their document and chats will be saved to the new account",          label: "Guest → Account" },
];

const phoneScreenshots = [
  { src: phoneHomeImg,    alt: "DocMind mobile — home screen",                         label: "Home" },
  { src: phoneChatImg,    alt: "DocMind mobile — follow-up answered in bullet points", label: "Chat" },
  { src: phoneSidebarImg, alt: "DocMind mobile — sidebar with documents and chats",    label: "Sidebar" },
  { src: phoneQuizImg,    alt: "DocMind mobile — graded quiz, 4 of 5 correct",         label: "Quiz" },
  { src: phoneSignupImg,  alt: "DocMind mobile — create account dialog",               label: "Sign Up" },
];

const allScreenshots = [...desktopScreenshots, ...phoneScreenshots];
const shotIndex = (src) => allScreenshots.findIndex((s) => s.src === src);

// ─── Component ─────────────────────────────────────────────────
export default function DocMindDetail() {
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
        <title>DocMind — Case Study | Shiv</title>
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

          <motion.h1
            variants={fadeUp}
            className="text-textColor mb-4 text-4xl font-bold tracking-tight md:text-6xl"
          >
            DocMind
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-textMuted mb-6 max-w-2xl text-lg leading-relaxed"
          >
            Upload a PDF, chat with it, and get quizzed on it. An AI backend built from scratch to
            understand how these products really work: embeddings, vector search, RAG, conversation
            memory, streaming and structured output, plus the production parts around them, like
            JWT auth with guest accounts and background jobs on BullMQ + Redis. No LangChain, no
            LLM SDK, just Express, Postgres and plain HTTP calls to Gemini.
          </motion.p>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["AI Backend", "RAG", "Vector Search", "SSE Streaming", "BullMQ + Redis", "JWT Auth", "TypeScript", "PostgreSQL"].map((tag) => (
              <span
                key={tag}
                className="border-accentColor/20 bg-accentColor/5 text-accentColor rounded-full border px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mb-4 flex flex-wrap gap-3">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            >
              <Icon icon="lucide:external-link" width="16" />
              Live Demo
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200"
            >
              <Icon icon="mdi:github" width="16" />
              GitHub
            </a>
          </motion.div>

          {/* The API sleeps on Render's free tier, and an empty-looking demo
              with no explanation reads as broken. One line sets expectations. */}
          <motion.p variants={fadeUp} className="text-textMuted mb-10 flex items-start gap-2 text-xs leading-relaxed">
            <Icon icon="lucide:info" width="14" className="mt-0.5 shrink-0" />
            The API runs on Render&apos;s free tier and sleeps when idle, so the first request can take up to a minute.
          </motion.p>

          {/* Screenshot */}
          <motion.div
            variants={fadeUp}
            className="border-explorerBorder cursor-zoom-in overflow-hidden rounded-2xl border shadow-2xl"
            onClick={() => setLightboxIndex(shotIndex(sourcesImg))}
          >
            <img
              src={sourcesImg}
              alt="DocMind answering 'What kind of PDFs work?' from the sample PDF, with the three source passages and their vector distances shown under the reply"
              width={1920} height={1080} loading="lazy" decoding="async"
              className="w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textSecondary leading-relaxed">
            DocMind started as a learning project with one rule: build every AI piece by hand, so
            nothing interesting happens inside a framework. A PDF is{" "}
            <strong className="text-textColor">parsed, chunked and embedded</strong> into
            Postgres with <strong className="text-textColor">pgvector</strong>. Every question is
            embedded too, the closest chunks are found with a vector search, and Gemini answers
            using only those chunks plus the recent conversation. That&apos;s{" "}
            <strong className="text-textColor">RAG</strong>. Replies{" "}
            <strong className="text-textColor">stream over Server-Sent Events</strong>, and quizzes
            use Gemini&apos;s structured-output mode with every reply{" "}
            <strong className="text-textColor">validated by Zod</strong> before the UI sees it.
            Around that core sit the parts a real product needs: every visitor gets a{" "}
            <strong className="text-textColor">guest account behind a JWT</strong>, every query is
            scoped to its owner, and the slow embedding step runs as a{" "}
            <strong className="text-textColor">background job on BullMQ + Redis</strong>, so an
            upload answers in about a second. A React client exercises every endpoint the way a
            real user would.
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
                  <img width={1920} height={1080} loading="lazy" decoding="async" src={s.src} alt={s.alt} className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
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
                    <img src={s.src} alt={s.alt} width={410} height={914} loading="lazy" decoding="async" className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
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
              It&apos;s easy to build a &quot;chat with your PDF&quot; app by gluing a framework
              together, and come out not knowing what an embedding is, why a vector search works, or
              what happens when the model returns broken JSON. I wanted to know those answers from
              my own code, not from a library&apos;s docs.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              Learn one concept, build the smallest version of it, move on. Embeddings, then vector
              search, then RAG, memory, streaming, structured output, auth and background jobs,
              each as a real feature of one deployed app, all on free tiers with no card needed
              anywhere.
            </Card>
          </div>
        </Section>

        {/* ── Tech Stack ── */}
        <Section title="Tech Stack">
          <div className="grid gap-6 sm:grid-cols-2">
            <StackGroup label="Backend & Data" items={techStack.backend} />
            <StackGroup label="AI & Frontend" items={techStack.ai} />
          </div>
        </Section>

        {/* ── Architecture ── */}
        <Section title="Architecture">
          <p className="text-textSecondary mb-6 leading-relaxed">
            Four pipelines do all the work. Routes stay thin,{" "}
            <strong className="text-textColor">services never touch req/res</strong>, and{" "}
            <strong className="text-textColor">only repositories touch SQL</strong>. That split is
            what let ingestion move into a{" "}
            <strong className="text-textColor">BullMQ worker</strong> without rewriting it: the
            request does only what someone is waiting for and answers 202, the worker does the
            rest. On the free tier the worker runs inside the API process; on every deploy it
            finishes the job in progress before the server exits.
          </p>
          <div className="flex flex-col gap-4">
            {pipelines.map((p) => (
              <div key={p.label} className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-accentColor text-xs font-bold uppercase tracking-widest">{p.label}</p>
                  <code className="text-textMuted font-mono text-xs">{p.trigger}</code>
                </div>
                <div className="flex flex-col gap-3">
                  {p.steps.map(({ label, detail }, i) => (
                    <div key={label} className="flex items-start gap-4">
                      <span className="text-accentColor w-8 shrink-0 font-mono text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="border-l border-explorerBorder pl-4">
                        <p className="text-textColor text-sm font-semibold">{label}</p>
                        <p className="text-textMuted text-xs leading-relaxed">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

        {/* ── Chat screenshot ── */}
        <Section title="The Chat">
          <p className="text-textSecondary mb-6 leading-relaxed">
            &quot;Explain that in simple words&quot; has no subject of its own. It works as a
            follow-up only because the{" "}
            <strong className="text-textColor">last 8 messages</strong> go into the prompt, so the
            model knows what &quot;that&quot; refers to. Each answer still has to come from the
            retrieved chunks of the PDF, and the chat survives a page refresh because the
            transcript lives in Postgres, not in the browser.
          </p>
          <div
            className="border-explorerBorder cursor-zoom-in overflow-hidden rounded-2xl border shadow-2xl"
            onClick={() => setLightboxIndex(shotIndex(chatImg))}
          >
            <img
              src={chatImg}
              alt="DocMind chat on the sample PDF: a detailed answer on how DocMind works, then the follow-up 'explain that in simple words, in 3 bullet points' answered from the conversation history"
              width={1920} height={1080} loading="lazy" decoding="async"
              className="w-full object-cover object-top"
            />
          </div>
        </Section>

        {/* ── Quiz screenshot ── */}
        <Section title="The Quiz">
          <p className="text-textSecondary mb-6 leading-relaxed">
            In testing the model returned valid JSON{" "}
            <strong className="text-textColor">17 out of 17 times</strong>, so Zod is insurance
            here, not a daily rescue. It still runs on every quiz, because a model is an untrusted
            client like any other. Grading happens in the browser on purpose: quizzes aren&apos;t
            stored on the server, so a <code className="font-mono text-sm">/quiz/check</code>{" "}
            endpoint would only compare two numbers the browser already has.
          </p>
          <div
            className="border-explorerBorder cursor-zoom-in overflow-hidden rounded-2xl border shadow-2xl"
            onClick={() => setLightboxIndex(shotIndex(quizImg))}
          >
            <img
              src={quizImg}
              alt="DocMind quiz generated from the sample PDF after checking answers, with the correct options marked in green and 5 of 5 correct shown at the bottom"
              width={1920} height={1080} loading="lazy" decoding="async"
              className="w-full object-cover object-top"
            />
          </div>
        </Section>

        {/* ── API Reference ── */}
        <Section title="API Reference">
          <p className="text-textMuted mb-4 text-sm">
            Base URL:{" "}
            <code className="bg-accentColor/10 text-accentColor break-all rounded px-2 py-0.5 font-mono text-xs">
              {API_URL}
            </code>
          </p>
          <div className="border-explorerBorder overflow-hidden rounded-2xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-explorerBorder bg-articleBg">
                    <th className="text-textMuted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Method</th>
                    <th className="text-textMuted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Endpoint</th>
                    <th className="text-textMuted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Description</th>
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
                      <td className="text-textSecondary px-4 py-3 font-mono text-xs">{r.path}</td>
                      <td className="text-textMuted px-4 py-3 text-xs hidden md:table-cell">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-textMuted mt-3 text-xs leading-relaxed">
            Every route except the health check and the three public auth routes needs{" "}
            <code className="font-mono">Authorization: Bearer &lt;token&gt;</code> and only ever
            sees the caller&apos;s own data.
          </p>

          {/* The stream's event protocol is the part the frontend depends on
              exactly, so it gets its own small table rather than a footnote. */}
          <p className="text-textSecondary mb-3 mt-8 text-sm leading-relaxed">
            <code className="font-mono">/chat-stream</code> takes the same JSON body as{" "}
            <code className="font-mono">/chat</code>. The browser reads it with{" "}
            <strong className="text-textColor">fetch</strong> and parses the events itself, since
            EventSource can&apos;t send a Bearer token. It sends these events, in order:
          </p>
          <div className="border-explorerBorder overflow-hidden rounded-2xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-explorerBorder bg-articleBg">
                    <th className="text-textMuted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Event</th>
                    <th className="text-textMuted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Payload</th>
                    <th className="text-textMuted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-explorerBorder">
                  {sseEvents.map((e) => (
                    <tr key={e.event} className="hover:bg-articleBg/50 transition-colors">
                      <td className="text-accentColor px-4 py-3 font-mono text-xs font-bold">{e.event}</td>
                      <td className="text-textSecondary px-4 py-3 font-mono text-xs">{e.payload}</td>
                      <td className="text-textMuted px-4 py-3 text-xs hidden sm:table-cell">{e.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

        {/* ── Limitations & Next ── */}
        <Section title="Known Limitations & What's Next">
          <ul className="mb-6 flex flex-col gap-3">
            {limitations.map((text) => (
              <li key={text} className="text-textSecondary flex items-start gap-3 text-sm leading-relaxed">
                <Icon icon="lucide:minus" width="16" className="text-textMuted mt-0.5 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          <div className="border-accentColor/20 bg-accentColor/5 rounded-2xl border p-5">
            <p className="text-accentColor mb-2 text-xs font-bold uppercase tracking-widest">Next up</p>
            <p className="text-textSecondary text-sm leading-relaxed">
              Agents and tool calling: a router in front of the chat, so &quot;hi&quot;, follow-ups,
              &quot;which documents do I have?&quot; and &quot;quiz me&quot; each take the right path
              instead of one fixed RAG pipeline. Then better prompts, multi-step workflows, and
              tests.
            </p>
          </div>
        </Section>

        {/* ── Learnings ── */}
        <Section title="What I Learned">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: "lucide:binary", text: "What an embedding actually is, and why cosine distance finds related text" },
              { icon: "lucide:database", text: "Storing and searching vectors in Postgres with pgvector and Drizzle" },
              { icon: "lucide:book-open", text: "RAG end to end: chunking, retrieval, prompt building, grounded answers" },
              { icon: "lucide:activity", text: "Streaming with SSE and async generators, and reading a byte stream by hand" },
              { icon: "lucide:shield-check", text: "Treating model output as untrusted input: ask for a shape, then verify it" },
              { icon: "lucide:key-round", text: "JWT auth with guest accounts, and putting ownership checks in the SQL itself" },
              { icon: "lucide:list-checks", text: "Background jobs with BullMQ + Redis: retries, idempotent jobs, graceful shutdown" },
              { icon: "lucide:gauge", text: "Measuring before tuning: Redis command budgets and proxy hops, not guesses" },
              { icon: "lucide:layers", text: "Keeping routes, services and repositories apart so pipelines stay reusable" },
            ].map((item) => (
              <div key={item.text} className="border-explorerBorder bg-articleBg flex items-start gap-3 rounded-xl border p-4">
                <div className="text-accentColor mt-0.5 shrink-0">
                  <Icon icon={item.icon} width="16" />
                </div>
                <p className="text-textSecondary text-sm leading-relaxed">{item.text}</p>
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
          <h3 className="text-textColor mb-2 text-xl font-bold">Want to try it?</h3>
          <p className="text-textMuted mb-6 text-sm">
            Upload a PDF on the live app, or read the code. Every file is explained in the repo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accentColor text-mainBg inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90"
            >
              <Icon icon="lucide:external-link" width="16" />
              Open Live App
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-accentColor/40 text-textColor hover:border-accentColor hover:bg-accentColor/10 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all duration-200"
            >
              <Icon icon="mdi:github" width="16" />
              View Source
            </a>
            <Link
              to="/#projects"
              className="text-textMuted hover:text-accentColor inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200"
            >
              <Icon icon="lucide:arrow-left" width="14" />
              All Projects
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

// ─── Sub-components ────────────────────────────────────────────
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
      <p className="text-textMuted text-sm leading-relaxed">{children}</p>
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
              <p className="text-textMuted text-xs">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
