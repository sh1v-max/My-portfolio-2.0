# Mini Projects Carousel & Swiper.js Implementation Guide

This document breaks down how the "Mini Projects" carousel was built in your portfolio. It serves as a detailed reference for how to implement, configure, and customize **Swiper.js** in a React application.

---

## 1. Setting up Swiper in React

To use Swiper in a React project, you don't just use standard HTML wrappers; Swiper provides dedicated React components.

### The Imports
At the top of `MiniProjectsCarousel.jsx`, you'll see three crucial sets of imports:

```javascript
// 1. The Core Components
import { Swiper, SwiperSlide } from "swiper/react";

// 2. The Modules (Features you want to enable)
import { Navigation, Pagination, A11y, FreeMode, Autoplay } from "swiper/modules";

// 3. The CSS (Swiper's base styling)
import "swiper/css/bundle";
```
*   **Why import modules?** Swiper is modular to keep bundle sizes small. If you want arrows, you *must* import `Navigation`. If you want dots, you *must* import `Pagination`. `A11y` adds accessibility (screen reader support).

---

## 2. Configuring the `<Swiper>` Component

The `<Swiper>` component acts as the main container. We pass configuration options to it via props. Here is exactly how we configured your carousel:

```javascript
<Swiper
  className="mini-swiper !overflow-visible pb-2"
  
  // 1. Registering the modules we imported above
  modules={[Navigation, Pagination, A11y, FreeMode, Autoplay]}
  
  // 2. Basic Layout
  spaceBetween={20}       // 20px gap between cards
  slidesPerView={1.15}    // Show 1 full card and 15% of the next one on mobile
  grabCursor={true}       // Changes the mouse cursor to a "grab" hand
  
  // 3. Responsive Breakpoints (Mobile-first approach)
  breakpoints={{
    540:  { slidesPerView: 1.5,  spaceBetween: 20 }, // Tablets
    768:  { slidesPerView: 2.2,  spaceBetween: 22 }, // Small Desktops
    1024: { slidesPerView: 3.1,  spaceBetween: 24 }, // Large Desktops
    1280: { slidesPerView: 3.4,  spaceBetween: 24 }, // Extra Large
  }}

  // 4. Advanced Features
  freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }} // Smooth scrolling without snapping
  autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }} // Auto-scroll every 3.5s
  navigation={true} // Enables the left/right arrows
  pagination={{ clickable: true, dynamicBullets: true }} // Enables the dots at the bottom
>
```

### Wrapping the Content
Inside the `<Swiper>`, you map over your data (`miniProjects.js`). **Every single item must be wrapped in a `<SwiperSlide>` component.**

```javascript
{miniProjects.map((project) => (
  <SwiperSlide key={project.title} className="!h-auto">
    <MiniProjectCard {...project} />
  </SwiperSlide>
))}
```
*(Note: We added `className="!h-auto"` to the slide so that all cards stretch to be the exact same height, keeping the grid looking clean).*

---

## 3. Customizing Swiper's Design (The CSS Hack)

By default, Swiper's navigation arrows are massive and bright blue. To make them fit your premium VS Code dark theme, we had to override them. 

Instead of dealing with global CSS files, we injected a scoped `<style>` block right above the carousel in `MiniProjectsCarousel.jsx`. We targeted the specific Swiper classes inside our `.mini-swiper` container:

### Editing the Arrows (`.swiper-button-next` / `prev`)
```css
.mini-swiper .swiper-button-next,
.mini-swiper .swiper-button-prev {
  /* Using your Tailwind theme accent color! */
  color: var(--tw-colors-accentColor, #88c0d0); 
  
  /* Creating the glassmorphism circle */
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
```

### Editing the Pagination Dots (`.swiper-pagination-bullet`)
```css
/* Inactive dots */
.mini-swiper .swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.25);
  transition: background 0.3s, transform 0.3s;
}

/* The Active dot */
.mini-swiper .swiper-pagination-bullet-active {
  background: var(--tw-colors-accentColor, #88c0d0);
  transform: scale(1.3); /* Make it slightly bigger */
}
```

## 4. The Data & Card Integration
The data lives in `miniProjects.js` as a simple array. Each object maps perfectly to the props expected by `MiniProjectCard.jsx`. Because the data, the Swiper logic, and the Card UI are all separated, you can easily add 50 more mini-projects without ever having to touch the Swiper configuration again!
