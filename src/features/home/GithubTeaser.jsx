/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { personal } from "../../data/config";
import { useGithub } from "../../context/GithubContext";
import SectionHeader from "../../components/SectionHeader";
import Skeleton from "../../components/Skeleton";
import LanguageBar from "./github/LanguageBar";
import ContributionGraph from "../github/components/ContributionGraph";
import { DUR_ENTER, EASE_OUT, REVEAL_ONCE } from "../../lib/motion";

// The contribution calendar's palette. Levels 1-4 stay GitHub's greens: this is
// a chart people already know how to read, and recolouring it to the site accent
// would cost that recognition for nothing.
//
// Level 0 (a day with no commits) is the exception. GitHub's own #161B22 is
// tuned for GitHub's near-black page, and measured against these six theme cards
// it lands *darker* than the surface in five of them — 1.01:1 on nightOwl, where
// the grid simply disappears and the green days float unanchored. A translucent
// white lift reads as a slightly raised cell on every card instead, at a
// consistent 1.19-1.25:1 — the same subtlety GitHub uses, in the right direction.
const CALENDAR_THEME = {
  dark: ["rgba(255,255,255,0.07)", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

// ─── Every figure below traces to a GitHub API response ──────────────────────
//
// This section previously rendered four hardcoded numbers — "62+", "1K+", "2+",
// "23" — beneath a line claiming they were "pulled live from the GitHub API",
// and a twelve-bar chart of invented values captioned "last 12 months". None of
// it touched the API. A portfolio that fabricates its own activity metrics is a
// credibility problem far larger than any layout one, so the rule here is
// simple: if a number cannot be derived from a response, it does not appear.
//
// Deliberately absent: a commit/contribution total. The REST endpoints in use
// (/users/:name and /users/:name/repos) do not carry one — that needs the
// GraphQL API and an auth token. The calendar below shows the same activity
// honestly, so nothing is lost by refusing to invent the number.
function buildStats(user, repos) {
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
  const since = user.created_at ? new Date(user.created_at).getFullYear() : null;
  return [
    { label: "Repositories", value: user.public_repos, icon: "lucide:git-branch" },
    { label: "Stars earned", value: totalStars, icon: "lucide:star" },
    { label: "Followers", value: user.followers, icon: "lucide:users" },
    { label: "Building since", value: since, icon: "lucide:calendar", plain: true },
  ];
}

function StatTile({ label, value, icon, plain }) {
  return (
    <div className="border-explorerBorder bg-articleBg flex flex-col gap-3 rounded-2xl border p-5 ring-1 ring-textColor/10">
      <Icon icon={icon} aria-hidden="true" className="text-accentColor h-4 w-4" />
      <span className="text-textColor text-3xl font-black leading-none tracking-tight tabular-nums">
        {plain ? value : Number(value).toLocaleString()}
      </span>
      <span className="text-textMuted text-xs font-medium uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function LoadingState() {
  return (
    // Heights are measured from the loaded layout, not estimated: 128 / 155 /
    // 192 / 44 with the same space-y-8 rhythm. The door row is included even
    // though it holds only a link — leaving it out was worth 58px of shift when
    // the data arrived.
    <div className="space-y-8" role="status" aria-live="polite">
      <span className="sr-only">Loading GitHub activity</span>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32" rounded="rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-[155px]" rounded="rounded-2xl" />
      <Skeleton className="h-48" rounded="rounded-2xl" />
      <Skeleton className="h-11 w-48" rounded="rounded-lg" />
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div
      role="alert"
      className="border-explorerBorder bg-articleBg flex flex-col items-start gap-4 rounded-2xl border p-6 ring-1 ring-textColor/10"
    >
      <div className="flex items-center gap-3">
        <Icon icon="lucide:cloud-off" aria-hidden="true" className="text-dangerText h-5 w-5" />
        <p className="text-textColor text-sm font-semibold">
          Couldn&apos;t reach the GitHub API
        </p>
      </div>
      <p className="text-textSecondary text-sm leading-relaxed">
        {/* The raw error is its own sentence — run together with the advice it
            read as "...GitHub data GitHub rate-limits...". */}
        {(message || "The request failed").replace(/\.$/, "")}. GitHub
        rate-limits unauthenticated requests, so this usually clears on its own
        in a few minutes.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accentColor/40 bg-accentColor/10 px-5 text-sm font-semibold text-accentColor transition-colors duration-200 hover:bg-accentColor/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor"
        >
          <Icon icon="lucide:refresh-cw" aria-hidden="true" className="h-3.5 w-3.5" />
          Try again
        </button>
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-textColor/25 px-5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:border-accentColor/50 hover:text-accentColor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor"
        >
          Open GitHub instead
          <Icon icon="lucide:external-link" aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function GithubTeaser() {
  const { user, repos, loading, error } = useGithub();

  const ready = !loading && !error && user;
  const stats = ready ? buildStats(user, repos ?? []) : [];
  const recent = ready
    ? [...(repos ?? [])]
        .filter((r) => !r.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 2)
    : [];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <SectionHeader
          eyebrow="Open source"
          title="What I've been building"
          lede="Repositories, stars and daily commit activity — read live from the GitHub API when this page loads."
          size="sm"
          className="mb-14"
        />

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} />}

        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_ONCE}
            transition={{ duration: DUR_ENTER, ease: EASE_OUT }}
            className="space-y-8"
          >
            {/* Real numbers, all four derived above */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <StatTile key={s.label} {...s} />
              ))}
            </div>

            {/* Language mix + most recently pushed repositories */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5 ring-1 ring-textColor/10">
                <LanguageBar repos={repos ?? []} />
              </div>

              <div className="border-explorerBorder bg-articleBg rounded-2xl border p-5 ring-1 ring-textColor/10">
                <p className="text-textMuted mb-3 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Recently pushed
                </p>
                <ul className="flex flex-col gap-2">
                  {recent.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-11 items-center gap-3 rounded-xl px-2 transition-colors duration-200 hover:bg-accentColor/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor"
                      >
                        <Icon
                          icon="lucide:git-branch"
                          aria-hidden="true"
                          className="text-textMuted group-hover:text-accentColor h-4 w-4 shrink-0 transition-colors"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="text-textColor block truncate text-sm font-semibold">
                            {repo.name}
                          </span>
                          <span className="text-textMuted block text-xs">
                            {repo.language ?? "—"} · updated{" "}
                            {new Date(repo.pushed_at).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </span>
                        <Icon
                          icon="lucide:arrow-up-right"
                          aria-hidden="true"
                          className="text-textMuted group-hover:text-accentColor h-4 w-4 shrink-0 transition-colors"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The real contribution calendar, replacing twelve invented bars */}
            <div className="border-explorerBorder bg-articleBg overflow-hidden rounded-2xl border p-5 ring-1 ring-textColor/10">
              <p className="text-textMuted mb-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                Contributions this year
              </p>
              <ContributionGraph theme={CALENDAR_THEME} compact />
            </div>

            <div>
              <Link
                to="/github"
                className="group text-textColor hover:text-accentColor inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors duration-200 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accentColor"
              >
                Full GitHub dashboard
                <Icon
                  icon="lucide:arrow-right"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
