import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  // FreeMode,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import MiniProjectCard from "./MiniProjectCard";
import { miniProjects } from "./miniProjects";

function MiniProjectsCarousel() {
  return (
    <>
      {/* swiper theme css override */}
      <style>{`
        .mini-swiper .swiper-button-next,
        .mini-swiper .swiper-button-prev {
          color: var(--tw-colors-accentColor, #88c0d0);
          background: rgba(0, 0, 0, 0.45);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(136, 192, 208, 0.25);
          transition: background 0.3s, border-color 0.3s, transform 0.2s;
          top: 38%;
        }
        .mini-swiper .swiper-button-next:hover,
        .mini-swiper .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.65);
          transform: scale(1.1);
        }
        .mini-swiper .swiper-button-next::after,
        .mini-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 800;
        }
        .mini-swiper .swiper-pagination {
          position: relative;
          margin-top: 1.5rem;
        }
        .mini-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.25);
          opacity: 1;
          transition: background 0.3s, transform 0.3s;
        }
        .mini-swiper .swiper-pagination-bullet-active {
          background: var(--tw-colors-accentColor, #88c0d0);
          transform: scale(1.3);
        }
        .mini-swiper .swiper-slide {
          height: auto;
          transition: all 0.5s ease;
          opacity: 0.3;
          transform: scale(0.85);
          pointer-events: none;
        }
        .mini-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
      `}</style>

      <section className="mt-24 overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* section header, UI experiments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10 flex flex-col items-start gap-3"
          >
            <span className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              UI Experiments
            </span>

            {/* heading */}
            <h2 className="text-textColor text-3xl font-extrabold tracking-tight sm:text-4xl">
              Mini Projects &amp; Creative Builds
            </h2>

            {/* subtitle */}
            <p className="text-textColor/60 max-w-xl text-sm leading-relaxed">
              A collection of focused UI experiments, interactive components,
              and creative builds — each one sharpening a specific skill.
            </p>

            {/* line */}
            <div className="from-accentColor to-accentColor/30 mt-1 h-1 w-16 rounded-full bg-gradient-to-r" />
          </motion.div>

          {/* swiper carousel */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Swiper
              className="mini-swiper -mx-2 -mt-4 px-2 pb-8 pt-4"
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              grabCursor={true}
              a11y={{ enabled: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                540: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3.5, spaceBetween: 40 },
                1280: { slidesPerView: 3.5, spaceBetween: 40 },
              }}
            >
              {miniProjects.map((project, index) => (
                <SwiperSlide key={project.title} className="!h-auto">
                  {/* ignoring swiper default height */}
                  {/* important modifier for height, set as auto */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1,
                      delay: (index % 4) * 0.15, // Staggers up to 4 visible cards
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="h-full"
                  >
                    <MiniProjectCard {...project} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* explore all mini projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-10 mb-5 flex flex-col items-center gap-3"
          >
            <Link
              to="/frontend-lab"
              className="border-accentColor/30 bg-accentColor/5 text-accentColor hover:border-accentColor/60 hover:bg-accentColor/15 group inline-flex items-center gap-3 rounded-xl border px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(136,192,208,0.15)] active:scale-[0.97]"
            >
              Explore All Mini Projects
              {/* arrow svg */}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            {/* more details */}
            <p className="text-textColor/40 mb-12 text-xs tracking-wide">
              33+ projects &nbsp;·&nbsp; Beginner &nbsp;·&nbsp; Intermediate
              &nbsp;·&nbsp; Advanced
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default MiniProjectsCarousel;
