/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import homeImg from "../../assets/images/docmind/home.png";
import chatImg from "../../assets/images/docmind/chat.png";
import quizImg from "../../assets/images/docmind/quiz.png";

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
    { name: "Render", icon: "simple-icons:render", note: "API hosting" },
  ],
  ai: [
    { name: "Gemini API", icon: "material-icon-theme:gemini-ai", note: "Plain fetch, no SDK" },
    { name: "gemini-embedding-001", icon: "lucide:binary", note: "3072-dim embeddings" },
    { name: "Server-Sent Events", icon: "lucide:radio", note: "Token-by-token streaming" },
    { name: "Structured output", icon: "lucide:braces", note: "JSON mode + responseSchema" },
    { name: "React 19", icon: "logos:react", note: "Frontend client" },
    { name: "Vite", icon: "logos:vitejs", note: "Build tool" },
    { name: "EventSource", icon: "lucide:plug", note: "Browser side of the stream" },
    { name: "Vercel", icon: "simple-icons:vercel", note: "Frontend hosting" },
  ],
};

// Three pipelines, each shown in the same numbered-step format TaskForge uses
// for its request pipeline. The numbers are real: 500-word chunks, 3072-dim
// vectors, top-3 chunks, last 8 messages, 5 questions x 4 options.
const pipelines = [
  {
    label: "Ingestion",
    trigger: "POST /upload",
    steps: [
      { label: "Receive", detail: "multer keeps the PDF in memory (10 MB cap on a 512 MB free server)" },
      { label: "Parse", detail: "pdf-parse pulls out the text layer" },
      { label: "Chunk", detail: "Split into ~500-word pieces" },
      { label: "Embed", detail: "Each chunk becomes 3072 numbers via gemini-embedding-001" },
      { label: "Store", detail: "Rows in Postgres/pgvector, tagged with a documentId" },
    ],
  },
  {
    label: "Chat",
    trigger: "POST /chat · GET /chat-stream",
    steps: [
      { label: "Embed the question", detail: "Same embedding model, so it lands in the same space" },
      { label: "Vector search", detail: "pgvector returns the 3 closest chunks, in one PDF or across all of them" },
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
];

const features = [
  {
    icon: "lucide:file-up",
    title: "Upload a PDF",
    desc: "Drag and drop a PDF and it gets parsed, chunked, embedded and stored. Delete a document and its chunks and every chat about it go with it.",
  },
  {
    icon: "lucide:messages-square",
    title: "Grounded answers with sources",
    desc: "Answers come only from your document. The three passages used are shown under every reply, with the file name and their vector distance.",
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
    desc: "Search a single document or every uploaded one. In all-documents mode each answer names the PDF it came from.",
  },
  {
    icon: "lucide:clipboard-check",
    title: "Validated quizzes",
    desc: "5 multiple-choice questions per document, checked with Zod before they reach the UI, then graded in the browser with a score.",
  },
  {
    icon: "lucide:history",
    title: "Chat history",
    desc: "A ChatGPT-style sidebar grouped by day. There is no sessions table: history is derived by grouping messages on their session id.",
  },
  {
    icon: "lucide:layers",
    title: "Layered backend",
    desc: "Routes stay thin, services never touch req/res, and only repositories touch SQL. The same pipeline can later run inside a background worker.",
  },
];

const challenges = [
  {
    icon: "lucide:scissors",
    problem: "The stream from Gemini produced nothing, even though the request worked",
    solution:
      "Gemini ends its SSE lines with \\r\\n, and a \\r\\n can be split across two network reads. Normalizing each chunk separately missed it. The fix was to normalize the whole buffer, split on the blank line between events, and keep the trailing half-event in the buffer for the next read.",
  },
  {
    icon: "lucide:triangle-alert",
    problem: "The browser couldn't see why a stream failed",
    solution:
      "EventSource can't read the body of a non-200 response, it only reports \"connection error\". And once an SSE response starts, the status code is already sent. So failures go out in-band as a named error event with status 200, and a small withErrorHandling wrapper handles both the JSON and the stream routes.",
  },
  {
    icon: "lucide:shuffle",
    problem: "Every quiz passed validation, but the answers had a pattern",
    solution:
      "Across 50 generated questions the correct answer sat in the four slots 22 / 36 / 32 / 10% of the time. Valid is not the same as good, so after Zod validation the options are shuffled in code and correctIndex is remapped. The model's habits don't leak into the UI.",
  },
  {
    icon: "lucide:bug",
    problem: "A failed vector query printed 3072 numbers",
    solution:
      "Drizzle's error message includes the SQL and every bound parameter, and for vector search that's the whole embedding, which buries the real cause. summarizeError() prints just the first line, the cause chain (where ECONNRESET and friends live) and the first stack frame inside this codebase.",
  },
];

const apiRoutes = [
  { method: "POST", path: "/upload", desc: "Upload a PDF: parse, chunk, embed, store" },
  { method: "GET", path: "/documents", desc: "List uploaded documents" },
  { method: "DELETE", path: "/documents/:documentId", desc: "Delete a document, its chunks and its chats" },
  { method: "POST", path: "/chat", desc: "Ask a question, get { sessionId, answer, sources }" },
  { method: "GET", path: "/chat-stream", desc: "Same pipeline, streamed over SSE" },
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
  "Upload embeds chunks one by one inside the request, so big PDFs are slow. Background jobs (BullMQ + Redis) are the planned fix.",
  "Chunking is a plain 500-word split, no overlap and no respect for paragraphs.",
  "Memory is the last 8 messages. Older ones are dropped, not summarized.",
  "No authentication and no automated tests yet, so on the live demo anyone with the link can upload and delete.",
];

// ─── Component ─────────────────────────────────────────────────
export default function DocMindDetail() {
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
            memory, streaming and structured output. No LangChain, no LLM SDK, just Express,
            Postgres and plain HTTP calls to Gemini.
          </motion.p>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["AI Backend", "RAG", "Vector Search", "SSE Streaming", "TypeScript", "PostgreSQL"].map((tag) => (
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
            className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl"
          >
            <img
              src={homeImg}
              alt="DocMind start screen: a drag-and-drop PDF upload area and chips for every document uploaded before, plus an All documents option"
              width={1919} height={1079} loading="lazy" decoding="async"
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
            <strong className="text-textColor">validated by Zod</strong> before the UI sees it. A
            small React client exercises every endpoint the way a real user would.
          </p>
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
              search, then RAG, memory, streaming and structured output, each as a real feature
              of one deployed app, all on free tiers with no card needed anywhere.
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
            Three pipelines do all the work. Routes stay thin,{" "}
            <strong className="text-textColor">services never touch req/res</strong>, and{" "}
            <strong className="text-textColor">only repositories touch SQL</strong>. The chat
            pipeline&apos;s first five steps live in one function shared by the normal and the
            streaming route, so the prompt is only ever built in one place.
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
            Two things in this one conversation. Asked whether the PDF talks about AI, it says{" "}
            <strong className="text-textColor">no, it doesn&apos;t mention AI at all</strong>{" "}
            instead of making something up, because the answer has to come from the retrieved
            chunks. And &quot;in simple words?&quot; works as a follow-up only because the{" "}
            <strong className="text-textColor">last 8 messages</strong> go into the prompt, so the
            model knows what &quot;it&quot; refers to.
          </p>
          <div className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
            <img
              src={chatImg}
              alt="DocMind chat on a Monolithic vs Microservices PDF: it says the document doesn't mention AI, then answers a follow-up 'in simple words?' from the conversation history"
              width={1919} height={1079} loading="lazy" decoding="async"
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
          <div className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
            <img
              src={quizImg}
              alt="DocMind quiz generated from ReactJS-prep.pdf after checking answers, with the correct options marked in green and the score shown at the bottom"
              width={1919} height={1079} loading="lazy" decoding="async"
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

          {/* The stream's event protocol is the part the frontend depends on
              exactly, so it gets its own small table rather than a footnote. */}
          <p className="text-textSecondary mb-3 mt-8 text-sm leading-relaxed">
            <code className="font-mono">/chat-stream</code> is a{" "}
            <strong className="text-textColor">GET</strong> on purpose, because the browser&apos;s
            EventSource can only send GET requests. It sends these events, in order:
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
              Background jobs for PDF ingestion with BullMQ + Redis, then agents and tool calling,
              multi-step workflows, and tests.
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
