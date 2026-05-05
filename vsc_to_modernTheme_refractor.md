# Portfolio UI Refactor: VSCode → Modern Product Design

## Architecture Summary

### Current Structure (VSCode-style)
```
Main.jsx (root layout)
├── NavBar.jsx       → VSCode title bar (File, Edit, View... + traffic lights)
├── SideBar.jsx      → VSCode activity bar (icon sidebar)
├── Explorer.jsx     → VSCode file tree (home.jsx, about.html...)
├── Tabs.jsx         → VSCode editor tabs
├── Pages.jsx        → Content area with Outlet + loading state
└── Footer.jsx       → VSCode status bar (errors, warnings, bell)
```

### New Structure (Modern Product)
```
Main.jsx (root layout)
├── Navbar.jsx       → Modern top nav (logo, links, theme, GitHub CTA)
├── Content area     → Clean scrollable main with Outlet + loading
└── Footer.jsx       → Modern minimal footer (socials, copyright)
```

## Files to Modify

| File | Action |
|------|--------|
| `Main.jsx` | **Rewrite** - new layout shell |
| `NavBar.jsx` | **Rewrite** - modern navbar with mobile hamburger |
| `Footer.jsx` | **Rewrite** - modern footer |
| `Pages.jsx` | **Simplify** - remove VSCode loading text, keep grid bg |
| `index.css` | **Update** - remove `overflow:hidden` on body, update .input styles |
| `SideBar.jsx` | **Keep** - no longer imported by Main |
| `Explorer.jsx` | **Keep** - no longer imported by Main |
| `Tabs.jsx` | **Keep** - no longer imported by Main |
| `Contact.jsx` | **Update** - modernize ContactSocials reference, update form |
| `ContactSocials.jsx` | **Rewrite** - remove CSS code syntax, use card-based layout |
| `Home.jsx` | **Update** - adjust for new full-width layout (no sidebar offset) |

## Theme System (UNTOUCHED)
- `ThemeContext.jsx` → no changes
- CSS theme definitions in `index.css` → no changes
- `@theme inline` token mapping → no changes

## Key Design Decisions
1. **Font**: Keep Inconsolata monospace as primary (developer identity), add Inter for body
2. **Max-width**: `max-w-7xl` for the main content container
3. **Navbar**: Sticky, glass-morphism, with mobile hamburger menu
4. **Footer**: Minimal - name, socials, copyright
5. **Settings page** becomes accessible from navbar (theme icon)
6. **No sidebar** - all navigation in top navbar
