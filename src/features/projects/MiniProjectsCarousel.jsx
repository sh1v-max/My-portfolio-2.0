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
import { Icon } from "@iconify/react";

import MiniProjectCard from "./MiniProjectCard";
import { miniProjects } from "./miniProjects";

// ─── Header Animation ────────────────────────────────────
const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function MiniProjectsCarousel() {
  return (
    <>
      {/* swiper theme css override */}
      <style>{`
        .mini-swiper .swiper-button-next,
        .mini-swiper .swiper-button-prev {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
          color: var(--tw-colors-accentColor, #88c0d0);
          background: transparent;
          border: none;
        }

        .mini-swiper .swiper-button-next {
          right: 0;
        }

        .mini-swiper .swiper-button-prev {
          left: 0;
        }

        .mini-swiper .swiper-button-next:hover,
        .mini-swiper .swiper-button-prev:hover {
          color: var(--tw-colors-accentColor, #88c0d0);
          filter: drop-shadow(0 0 8px rgba(136, 192, 208, 0.4));
          transform: translateY(-50%) scale(1.1);
        }

        .mini-swiper .swiper-button-next:active,
        .mini-swiper .swiper-button-prev:active {
          transform: translateY(-50%) scale(0.9);
        }

        .mini-swiper .swiper-button-disabled {
          opacity: 0;
          pointer-events: none;
        }
        .mini-swiper .swiper-pagination {
          position: relative;
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .mini-swiper .swiper-pagination-bullet {
          width: 14px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          opacity: 1;
          margin: 0 !important;
          transition: all 0.4s ease;
        }
        .mini-swiper .swiper-pagination-bullet-active {
          width: 48px;
          background: var(--tw-colors-accentColor, #88c0d0);
          box-shadow: 0 0 15px rgba(136, 192, 208, 0.3);
        }

        .mini-swiper {
          overflow: visible !important;
        }
        .mini-swiper .swiper-slide {
          height: auto;
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.2;
          transform: scale(0.9) translateY(20px);
          filter: blur(4px);
          pointer-events: none;
        }
        .mini-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.1) translateY(0);
          filter: blur(0);
          pointer-events: auto;
          z-index: 10;
        }
        .mini-swiper .swiper-slide-next,
        .mini-swiper .swiper-slide-prev {
          opacity: 0.5;
          transform: scale(0.95) translateY(10px);
          filter: blur(2px);
        }
      `}</style>

      <section className="py-6 md:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          {/* section header, UI experiments */}
          <motion.div
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-14 flex flex-col items-start gap-3"
          >
            <motion.span
              variants={headerItem}
              className="border-accentColor/30 bg-accentColor/10 text-accentColor inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="bg-accentColor h-1.5 w-1.5 animate-pulse rounded-full" />
              UI Experiments
            </motion.span>

            {/* heading */}
            <motion.h2
              variants={headerItem}
              className="text-textColor text-4xl font-bold tracking-tight md:text-5xl"
            >
              Mini Projects &amp; Creative Builds
            </motion.h2>

            {/* subtitle */}
            <motion.p
              variants={headerItem}
              className="text-textColor/60 max-w-xl text-sm leading-relaxed"
            >
              A collection of focused UI experiments, interactive components,
              and creative builds — each one sharpening a specific skill.
            </motion.p>

            {/* line */}
            <motion.div
              variants={headerItem}
              className="from-accentColor to-accentColor/30 mt-2 h-1 w-16 rounded-full bg-linear-to-r"
            />
          </motion.div>

          {/* swiper carousel */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative -my-16 overflow-hidden py-16">
              <button className="swiper-button-prev flex items-center">
                <Icon icon="lucide:chevron-left" className="h-10 w-10" />
                <Icon
                  icon="lucide:chevron-left"
                  className="-ml-6 h-5 w-5 opacity-40"
                />
              </button>
              <button className="swiper-button-next flex items-center">
                <Icon
                  icon="lucide:chevron-right"
                  className="-mr-6 h-5 w-5 opacity-40"
                />
                <Icon icon="lucide:chevron-right" className="h-10 w-10" />
              </button>

              <Swiper
                className="mini-swiper mt-4 pb-8 pt-8"
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={1.1}
                centeredSlides={true}
                loop={true}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                pagination={{ clickable: true }}
                grabCursor={true}
                a11y={{ enabled: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  540: { slidesPerView: 1.5, spaceBetween: 15 },
                  768: { slidesPerView: 2.2, spaceBetween: 20 },
                  1024: { slidesPerView: 3.2, spaceBetween: 24 },
                  1280: { slidesPerView: 3.5, spaceBetween: 24 },
                }}
              >
                {miniProjects.map((project) => (
                  <SwiperSlide key={project.title} className="h-auto!">
                    <div className="h-full">
                      <MiniProjectCard {...project} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* explore all mini projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <Link
              to="/frontend-lab"
              className="border-accentColor/30 bg-accentColor/5 text-accentColor hover:border-accentColor/60 hover:bg-accentColor/15 group inline-flex items-center gap-3 rounded-xl border px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(136,192,208,0.15)] active:scale-[0.97]"
            >
              Explore All Mini Projects
              <Icon
                icon="lucide:arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
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
