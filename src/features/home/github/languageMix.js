// Pure derivation, kept out of the component file so react-refresh can treat
// LanguageBar.jsx as components-only.
//
// Counts **repositories per primary language**, not bytes of code. GitHub's own
// percentages are byte-weighted, which would need a /languages call per repo —
// N extra requests for a summary figure. Callers label the output
// "by repository" so it never claims a precision it does not have.
export function getLanguageMix(repos, limit = 4) {
  const counts = new Map();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, limit);
  const restCount = sorted.slice(limit).reduce((sum, [, n]) => sum + n, 0);
  const rows = top.map(([name, count]) => ({ name, count }));
  if (restCount > 0) rows.push({ name: "Other", count: restCount });
  const total = rows.reduce((sum, r) => sum + r.count, 0);
  return { rows, total };
}
