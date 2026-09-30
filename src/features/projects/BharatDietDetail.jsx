/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import homeImg from "../../assets/images/bharatdiet/home.png";
import planImg from "../../assets/images/bharatdiet/plan.png";
import gapImg from "../../assets/images/bharatdiet/gap.png";
import foodsImg from "../../assets/images/bharatdiet/foods.png";

const LIVE_URL = "https://bharat-diet.vercel.app/";
const REPO_URL = "https://github.com/sh1v-max/BharatDiet";

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
// The numbers here come straight from the repo: 203 items in foods.json,
// 164 Vitest tests, and a 4 x 3 x 4 x 3 = 144-case allocator matrix.
const stats = [
  { value: "203", label: "Indian foods with real serving sizes and costs" },
  { value: "164", label: "passing Vitest tests" },
  { value: "144", label: "region × diet × budget × goal combos tested" },
  { value: "0", label: "backend, signup or tracking. It all runs in the browser" },
];

const techStack = {
  app: [
    { name: "React 19", icon: "logos:react", note: "UI" },
    { name: "Vite 6", icon: "logos:vitejs", note: "Build tool" },
    { name: "Tailwind CSS 4", icon: "logos:tailwindcss-icon", note: "Saffron / leaf design tokens" },
    { name: "React Router 7", icon: "logos:react-router", note: "200+ food detail routes" },
    { name: "Context API", icon: "logos:react", note: "One shared user profile" },
    { name: "Hand-rolled SVG", icon: "lucide:pie-chart", note: "Macro donut, no chart library" },
  ],
  engine: [
    { name: "Pure JS utils", icon: "logos:javascript", note: "nutritionMath.js, mealAllocator.js" },
    { name: "Vitest", icon: "logos:vitest", note: "164 tests across 3 files" },
    { name: "foods.json", icon: "lucide:database", note: "203 items behind a service layer" },
    { name: "Sitemap script", icon: "lucide:file-code-2", note: "Runs on prebuild for SEO" },
    { name: "lucide-react", icon: "lucide:sparkles", note: "Icons" },
    { name: "Vercel", icon: "simple-icons:vercel", note: "Hosting" },
  ],
};

// How a meal plan is built, in the order the allocator runs.
const engineSteps = [
  { label: "Nutrition math", detail: "Mifflin-St Jeor BMR → activity-multiplied TDEE → goal-adjusted calories (for example −17.5% for weight loss)" },
  { label: "Macro targets", detail: "Protein set per kg of body weight by goal, fat at 25% of calories, carbs fill the rest" },
  { label: "Filter the pool", detail: "The 203 foods are narrowed by region (North / South / East / West) and diet (veg / egg / non-veg)" },
  { label: "Fill the slots", detail: "Calories split 25 / 35 / 10 / 30 across breakfast, lunch, snack and dinner. Each slot gets a protein dish, a vegetable and a staple" },
  { label: "Weigh the budget", detail: "Cost is a penalty in the scoring, heavier on cheaper tiers, so tight budgets lean on soy, sattu and eggs" },
  { label: "Protein boost", detail: "Compact high-protein items (curd, eggs, soy chunks) are added until the protein target is met" },
  { label: "Reconcile calories", detail: "Staple portions are resized in half steps (2 roti → 2.5 roti) instead of swapping dishes" },
];

const features = [
  {
    icon: "lucide:utensils-crossed",
    title: "Meal Planner",
    desc: "A full day of meals matched to your calories, protein target, region, diet and daily budget, with portions, macros and an estimated cost in ₹.",
  },
  {
    icon: "lucide:chart-no-axes-column",
    title: "Protein Gap Analysis",
    desc: "Tap what you eat on a normal day and see how far you are from your protein target, plus the cheapest foods that close the gap.",
  },
  {
    icon: "lucide:calculator",
    title: "Calorie & Protein Calculators",
    desc: "BMI, BMR, TDEE and goal-adjusted targets with a live macro breakdown. Protein targets are translated into real food, like \"≈ 4 bowls of dal\".",
  },
  {
    icon: "lucide:search",
    title: "Indian Food Database",
    desc: "Searchable and filterable by region, diet and category, and sortable by protein per rupee. Every food has its own detail page.",
  },
  {
    icon: "lucide:user-round",
    title: "Fill the form once",
    desc: "One shared profile in Context powers every tool, so the planner, calculators and gap check all use the same numbers.",
  },
  {
    icon: "lucide:shield-check",
    title: "No signup, no tracking",
    desc: "Everything runs client-side. No account, no data collection. The core tools are free.",
  },
];

const challenges = [
  {
    icon: "lucide:wallet",
    problem: "A strict budget filter can leave a meal slot with nothing in it",
    solution:
      "Cutting out every food above a price would leave some region and diet combinations with too few options to build a meal. So budget isn't a filter. It's a cost penalty in the scoring, weighted more heavily for cheaper tiers. Tight budgets still lean on sattu, soy and eggs, but a slot is never empty, and the test matrix checks that for every combination.",
  },
  {
    icon: "lucide:scale",
    problem: "Hitting the calorie target without making the plan feel random",
    solution:
      "When a plan comes out short or over, swapping in a different dish would change what the person eats just to fix a number. The last pass resizes staple portions in half steps instead (2 roti becomes 2.5 roti), so the plan stays recognisable and still lands within ±12% of the target.",
  },
  {
    icon: "lucide:flask-conical",
    problem: "One wrong formula would break trust in the whole product",
    solution:
      "A diet app is only as good as its maths. The BMR/TDEE formulas are pinned to hand-computed reference values, and the food dataset is tested like code: unique ids, required fields, calories consistent with macros (Atwater, ±25%), sane costs, and enough coverage for every diet and region.",
  },
];

const tests = [
  { count: "12", file: "nutritionMath.test.js", detail: "BMR, TDEE and macro targets checked against hand-computed values" },
  { count: "6", file: "foods.test.js", detail: "The 203-item dataset: schema, unique ids, Atwater consistency, cost sanity, coverage" },
  { count: "146", file: "mealAllocator.test.js", detail: "Every region × diet × budget × goal (144 combos) must give a complete, diet-compliant plan within ±12% of calories and ≥75% of protein" },
];

// Kept on the page on purpose, same as the other case studies.
const limitations = [
  "Budget is a preference, not a hard cap. A ₹100–200 plan can come out slightly above it.",
  "Food costs are estimates, and regions are four broad zones, not state-level cuisines yet.",
  "No accounts, so plans can't be saved or swapped yet. Pro and Premium tiers are marked coming soon.",
];

// ─── Component ─────────────────────────────────────────────────
export default function BharatDietDetail() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>BharatDiet — Case Study | Shiv</title>
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
            BharatDiet
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-textMuted mb-6 max-w-2xl text-lg leading-relaxed"
          >
            A free, no-signup nutrition planner built around real Indian food, Indian budgets and
            regional diets. It turns your body, region and daily budget into a full day of meals
            with roti, dal and rice, not granola, and every plan is backed by a tested engine.
          </motion.p>

          {/* Tags */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {["Frontend", "Algorithm Design", "Testing", "React 19", "Vitest", "SEO"].map((tag) => (
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

          {/* Screenshot */}
          <motion.div
            variants={fadeUp}
            className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl"
          >
            <img
              src={homeImg}
              alt="BharatDiet homepage: 'Personalized Nutrition for Real Indian Food', with buttons to calculate a free diet plan or check your protein gap"
              width={1440} height={900} loading="lazy" decoding="async"
              className="w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* ── At a glance ── */}
        <motion.div
          variants={fadeUp}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-explorerBorder bg-articleBg rounded-2xl border p-5">
              <p className="text-accentColor text-3xl font-bold tabular-nums">{s.value}</p>
              <p className="text-textMuted mt-1 text-xs leading-relaxed">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <p className="text-textSecondary leading-relaxed">
            BharatDiet started from one observation: most calorie apps assume a Western pantry, so
            people who eat roti, dal, rice, idli and curd have to translate every suggestion into
            their own kitchen, and most give up. This app starts from the other end, with an{" "}
            <strong className="text-textColor">Indian-first food database</strong>,{" "}
            <strong className="text-textColor">region-aware meal generation</strong> and{" "}
            <strong className="text-textColor">budget as a real input</strong>. I wrote a full
            product blueprint first (research, nutrition engine design, UX, architecture, roadmap)
            and then built it phase by phase. The business logic is plain, React-free JavaScript,
            and it&apos;s the most heavily tested code I&apos;ve written.
          </p>
        </Section>

        {/* ── Problem & Goal ── */}
        <Section title="Problem & Goal">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card icon="lucide:alert-circle" label="The Problem">
              Diet apps recommend protein bars, granola and turkey breast, then blame the user for
              not sticking to the plan. For most Indian households that plan was never realistic,
              either in what it asks you to eat or in what it costs.
            </Card>
            <Card icon="lucide:target" label="The Goal">
              A planner where the input is your body, your region, your diet and your daily budget,
              and the output is food you already cook, with real portions and a cost in rupees. It
              had to be free, need no signup, and give numbers people can trust.
            </Card>
          </div>
        </Section>

        {/* ── Tech Stack ── */}
        <Section title="Tech Stack">
          <div className="grid gap-6 sm:grid-cols-2">
            <StackGroup label="App" items={techStack.app} />
            <StackGroup label="Engine & Tooling" items={techStack.engine} />
          </div>
        </Section>

        {/* ── Engine ── */}
        <Section title="How the Engine Works">
          <p className="text-textSecondary mb-6 leading-relaxed">
            The planner is a <strong className="text-textColor">greedy allocator</strong> in{" "}
            <code className="font-mono text-sm">utils/mealAllocator.js</code>, fed by the formulas in{" "}
            <code className="font-mono text-sm">utils/nutritionMath.js</code>. Neither file imports
            React, so both could move to a backend service unchanged.
          </p>
          <div className="border-explorerBorder bg-articleBg rounded-2xl border p-6">
            <div className="flex flex-col gap-3">
              {engineSteps.map(({ label, detail }, i) => (
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
        </Section>

        {/* ── Meal planner screenshot ── */}
        <Section title="The Meal Planner">
          <p className="text-textSecondary mb-6 leading-relaxed">
            A 24-year-old, vegetarian, North Indian, on a ₹100–200 budget, aiming for muscle gain.
            The plan lands at <strong className="text-textColor">2778 kcal against a 2892 target</strong>{" "}
            and <strong className="text-textColor">143g protein against 129g</strong>, from moong
            dal, soy chunks, kala chana and roti. It&apos;s food that person already eats.
          </p>
          <Shot src={planImg} width={1140} height={705}
            alt="BharatDiet meal plan: 2778 kcal, 143g protein, about ₹221 a day, split into breakfast, lunch, snack and dinner with Indian dishes and per-item costs" />
        </Section>

        {/* ── Protein gap screenshot ── */}
        <Section title="Protein Gap Analysis">
          <p className="text-textSecondary mb-6 leading-relaxed">
            A normal day of chai, poha, a veg thali and a samosa comes to about{" "}
            <strong className="text-textColor">40g of protein against a 129g need</strong>. The app
            then suggests the foods that close the gap for the least money, ranked by protein per
            rupee, like soy chunks at +26g for ₹10.
          </p>
          <Shot src={gapImg} width={880} height={690}
            alt="Protein gap result: recommended 129g, typical day 40g, followed by the cheapest foods to close the gap such as soy chunks, whole soybean and peanuts" />
        </Section>

        {/* ── Food database screenshot ── */}
        <Section title="The Food Database">
          <p className="text-textSecondary mb-6 leading-relaxed">
            203 foods with real serving sizes, macros and per-serving costs. Sorted by protein per
            rupee, soy chunks, whole soybean and peanuts come out on top, which is exactly what the
            meal planner leans on for tight budgets.
          </p>
          <Shot src={foodsImg} width={1440} height={900}
            alt="BharatDiet food database table with search and filters for category, region and diet, showing calories, protein, carbs, fat, cost and protein per rupee" />
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

        {/* ── Testing ── */}
        <Section title="Testing">
          <p className="text-textSecondary mb-6 leading-relaxed">
            <strong className="text-textColor">164 Vitest tests, all passing.</strong> The core
            promise is that every combination a user can pick gives a usable plan, so the tests
            check exactly that instead of a few happy paths.
          </p>
          <div className="flex flex-col gap-3">
            {tests.map((t) => (
              <div key={t.file} className="border-explorerBorder bg-articleBg flex items-start gap-4 rounded-2xl border p-5">
                <span className="text-accentColor w-12 shrink-0 text-2xl font-bold tabular-nums">{t.count}</span>
                <div>
                  <code className="text-textColor font-mono text-sm">{t.file}</code>
                  <p className="text-textMuted mt-1 text-sm leading-relaxed">{t.detail}</p>
                </div>
              </div>
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
              Saved plans and meal swapping, a 7-day plan with a grocery list, state-level
              cuisines, Hindi support, and an AI diet coach grounded in the user&apos;s profile and
              the food database.
            </p>
          </div>
        </Section>

        {/* ── Learnings ── */}
        <Section title="What I Learned">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: "lucide:file-text", text: "Writing a product blueprint first, then building from it phase by phase" },
              { icon: "lucide:git-branch", text: "Designing a greedy allocation algorithm with real constraints: calories, protein, diet and cost" },
              { icon: "lucide:flask-conical", text: "Testing pure logic properly, including a full combination matrix instead of a few cases" },
              { icon: "lucide:database", text: "Treating a dataset like code: schema checks, consistency rules, coverage floors" },
              { icon: "lucide:layers", text: "Keeping business logic React-free so it can move to a backend unchanged" },
              { icon: "lucide:globe", text: "SEO for an SPA: per-page meta, 200+ routed pages and a generated sitemap" },
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
            Make a free meal plan in under two minutes, or read the engine and its tests.
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

// The same framed screenshot as the hero, reused by the three screen sections.
function Shot({ src, alt, width, height }) {
  return (
    <div className="border-explorerBorder overflow-hidden rounded-2xl border shadow-2xl">
      <img
        src={src}
        alt={alt}
        width={width} height={height} loading="lazy" decoding="async"
        className="w-full object-cover object-top"
      />
    </div>
  );
}
