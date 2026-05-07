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

function MiniProjectsCarousel() {
  return (
    <>
      {/* swiper theme css override */}
      <style>{`
        .mini-swiper .swiper-button-next,
        .mini-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          top: 50%;
          transform: translateY(-50%);
        }
        .mini-swiper .swiper-button-next:hover,
        .mini-swiper .swiper-button-prev:hover {
          background: var(--tw-colors-accentColor, #88c0d0);
          border-color: var(--tw-colors-accentColor, #88c0d0);
          box-shadow: 0 0 20px rgba(136, 192, 208, 0.3);
          transform: translateY(-50%) scale(1.05);
        }
        .mini-swiper .swiper-button-next::after,
        .mini-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 900;
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
          width: 24px;
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

      <section className="mt-2 sm:mt-12 overflow-hidden px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          {/* section header, UI experiments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10 flex flex-col items-start gap-3"
          >
            <span className="border-white/10 bg-white/5 text-accentColor/80 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <span className="bg-accentColor h-1 w-1 rounded-full shadow-[0_0_8px_rgba(136,192,208,0.8)]" />
              UI Experiments
            </span>

            {/* heading */}
            <h2 className="text-white text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl">
              Mini Projects <span className="text-white/20">&amp;</span> <span className="bg-gradient-to-r from-accentColor to-accentColor/40 bg-clip-text text-transparent">Creative Builds</span>
            </h2>

            {/* subtitle */}
            <p className="text-white/40 max-w-2xl text-base font-medium leading-relaxed sm:text-lg">
              A curated collection of focused UI experiments and interactive components,
              crafted to push the boundaries of modern web development.
            </p>

            {/* line */}
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-accentColor to-transparent opacity-50" />
          </motion.div>

          {/* swiper carousel */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative overflow-hidden px-4 py-16 -mx-4 -my-16">
              <Swiper
                className="mini-swiper mt-4 pb-8 pt-8"
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                grabCursor={true}
                a11y={{ enabled: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  540: { slidesPerView: 1.8, spaceBetween: 15 },
                  768: { slidesPerView: 2.8, spaceBetween: 20 },
                  1024: { slidesPerView: 3.8, spaceBetween: 24 },
                  1280: { slidesPerView: 4.2, spaceBetween: 24 },
                }}
              >
                {miniProjects.map((project, index) => (
                  <SwiperSlide key={project.title} className="!h-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 1,
                        delay: (index % 4) * 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="h-full"
                    >
                      <MiniProjectCard {...project} />
                    </motion.div>
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
            className="mt-10 mb-5 flex flex-col items-center gap-3"
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
