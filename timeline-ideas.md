# Timeline Ideas for Project Case Studies

Adding a timeline to each case study shows initiative, growth, and makes the project feel like a real product story rather than a feature list.

---

## Option 1 — Vertical Alternating Timeline

**Feel:** Premium editorial. Like a product launch story on a high-end SaaS site.

**How it works:**
- A vertical line runs down the center of the section
- Cards alternate left / right on desktop, all stack to the right on mobile
- Each card has: date badge (e.g. "MAR 2024"), phase title, 2–3 bullet highlights, status chip (Completed / In Progress / Planned)
- Animated dot markers on the line — each dot pulses if status is "In Progress"
- Cards animate in on scroll via Framer Motion `whileInView`

**Visual sketch:**
```
         │
    ┌────●────────────────────────┐
    │  MAR 2024  [Completed]      │
    │  Foundation built           │
    │  React + Parcel setup       │
    └─────────────────────────────┘
         │
    ─────────────────────────────┐
              [Completed]        │
              JUL 2024           │
     Redesign + Design System    │
    ─────────────────────────────┘
         │
    ┌────●────────────────────────┐
    │  NOW   [In Progress]        │
    │  Auth + Real backend        │
    └─────────────────────────────┘
```

---

## Option 2 — Git Commit Log Style

**Feel:** Ultra-clean, developer-aesthetic. Looks like a real git history. On-brand for a dev portfolio.

**How it works:**
- Left vertical bar (the "branch line")
- Each entry has a colored dot (green = done, amber = in progress, gray = planned)
- Monospace or semi-mono date on the right
- Version tag (v1.0, v2.0…) acts as the "commit hash"
- Short title + 2–3 tech tags below each entry
- Hovering an entry highlights it with a subtle accent background

**Visual sketch:**
```
  ●  v1.0  ──  Jan 2024
  │   Foundation & course scaffold
  │   React 18 · Parcel · Redux
  │
  ●  v2.0  ──  Apr 2024
  │   Real API + Netlify proxy
  │   Design system rebuilt
  │
  ●  v3.0  ──  Jul 2024
  │   Cart rebuilt · Checkout flow
  │   Mobile audit · Icon migration
  │
  ◌  v4.0  ──  Ongoing
      Auth · Real payments · Tests
```

---

## Option 3 — Phase Cards with Progress Bar

**Feel:** Modern SaaS / product roadmap. Like Linear or Notion's project tracker.

**How it works:**
- A horizontal progress bar across the top connecting all phases (filled = done, empty = planned)
- Below: a row of cards, one per phase, each showing:
  - Phase number + name
  - Date range
  - Status badge
  - 3–4 bullet points of what was done
- On mobile: cards stack vertically, progress bar becomes a vertical stepper
- Overall completion percentage shown next to the bar (e.g. "75% complete")

**Visual sketch:**
```
  ──●────────●────────●────────◌──
  P1 ████  P2 ████  P3 ████  P4 ░░

 ┌──────────┐ ┌──────────┐ ┌──────────┐
 │ Phase 1  │ │ Phase 2  │ │ Phase 3  │
 │ Jan 2024 │ │ Apr 2024 │ │ Jul 2024 │
 │ ✓ Done   │ │ ✓ Done   │ │ ✓ Done   │
 │          │ │          │ │          │
 │ Scaffold │ │ Real API │ │ Checkout │
 │ + Redux  │ │ + Design │ │ + Mobile │
 └──────────┘ └──────────┘ └──────────┘
```

---

## Notes

- This would be added as a new `<Section title="Timeline">` block in each case study (BiteSwift, Portfolio, TaskForge, etc.)
- Each project would have its own timeline data array defined at the top of the file
- The same reusable timeline component could be used across all case studies
- Status options: `completed` (green), `in-progress` (amber/pulse), `planned` (gray/dashed)
- Framer Motion handles scroll-triggered animations on each entry

---

*Saved for later — decide on the style and we'll implement it across all case studies.*
