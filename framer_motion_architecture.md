# Portfolio Motion Design System 🎨

This document outlines the animation standards and Framer Motion configurations used to create the premium, high-end experience of the **Shiv Shankar Singh** portfolio.

## 🌟 Core Philosophy
Our design uses **"Staggered Fluidity"**. Elements should not appear simultaneously; they should flow into the page sequentially to guide the user's eye and provide a sense of refined craftsmanship.

---

## 🛠️ Global Standards

### 1. The Blueprint (Home Page Patterns)
All internal pages should inherit these exact values to maintain visual parity across the site.

| Parameter | Value | Purpose |
| :--- | :--- | :--- |
| **Stagger Delay** | `0.1s` | Gap between consecutive child animations |
| **Initial Delay** | `0.15s` | Wait time before the first child starts |
| **Vertical Offset** | `20px` | How far elements slide up from (`y: 20`) |
| **Duration** | `0.5s` | Standard time for an entry animation |
| **Easing** | `easeOut` | Standard easing for a smooth deceleration |

### 2. Standard Variants
Copy and paste these into any new feature component:

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
```

---

## 🚀 Advanced Motion Types

### A. Infinite Floating
Used for hero illustrations or interactive badges to prevent the page from feeling static.
```javascript
animate={{ y: [0, -10, 0] }}
transition={{
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

### B. Micro-Interactions (Buttons/Links)
Standard behavior for interactive elements to provide tactile feedback.
```javascript
whileHover={{ scale: 1.05, y: -2 }}
whileTap={{ scale: 0.97 }}
```

---

## 🌎 Global Page Transitions

### Current Implementation: "Per-Page Entry"
Currently, we handle transitions at the **feature level**. Each page (About, Projects, etc.) has its own motion wrapper that triggers when the component mounts. This ensures that even if a user deep-links directly to a page, they experience the staggered entrance.

### Recommendation: "Layout-Level Transitions" (The Next Step)
To achieve a truly seamless experience where the previous page fades out before the new one fades in, we can implement `AnimatePresence`.

**Proposed Strategy:**
1. Wrap the router's `Outlet` in `App.jsx` with `<AnimatePresence mode="wait">`.
2. Wrap each page component in a `PageWrapper` motion div.

**Page Transition Blueprint:**
```javascript
const pageTransition = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
  transition: { duration: 0.3, ease: "easeInOut" }
};
```

---

## 🤖 GPT Collaboration Snippet
*Copy and paste the text below into ChatGPT/GPT-4 to ensure it provides compatible code for our portfolio.*

> "I am working on a premium React developer portfolio that uses **Framer Motion** and **Tailwind CSS**. I need you to help me implement animations in my components that exactly match our existing design system.
>
> **The core standards to follow:**
> 1. Use `initial="hidden"` and `animate="show"` labels.
> 2. Parent containers use `staggerChildren: 0.1` and `delayChildren: 0.15`.
> 3. Item variants use `hidden: { opacity: 0, y: 20 }` and `show: { opacity: 1, y: 0 }`.
> 4. Use `duration: 0.5` and `ease: "easeOut"` for all page entry animations.
> 5. For infinite floating, use `y: [0, -10, 0]` with a 4s duration and `easeInOut`.
> 6. We are considering implementing `AnimatePresence` for global cross-fades between routes.
>
> Please apply these variants to the following component code while keeping the layout intact."

---

## 📁 Implementation Checklist
- [ ] Import `motion` from `framer-motion`.
- [ ] Define `containerVariants` and `itemVariants` at the top of the file.
- [ ] Wrap the main `<section>` or content `<div>` in a `<motion.div>`.
- [ ] Set `initial="hidden"` and `animate="show"` on the main container.
- [ ] Wrap headings, text blocks, and cards in `<motion.div variants={itemVariants}>`.
- [ ] (Future) Wrap the main `Outlet` in `App.jsx` with `AnimatePresence` for route-level transitions.
