import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  FreeMode,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";

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
        }
      `}</style>

      <section className="mt-24 px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">

          {/* section header, UI experiments */}
          <div className="mb-10 flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accentColor/30 bg-accentColor/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accentColor">
              <span className="h-1.5 w-1.5 rounded-full bg-accentColor animate-pulse" />
              UI Experiments
            </span>

            {/* heading */}
            <h2 className="text-3xl font-extrabold tracking-tight text-textColor sm:text-4xl">
              Mini Projects &amp; Creative Builds
            </h2>

            {/* subtitle */}
            <p className="max-w-xl text-sm leading-relaxed text-textColor/60">
              A collection of focused UI experiments, interactive components,
              and creative builds — each one sharpening a specific skill.
            </p>

            {/* line */}
            <div className="mt-1 h-1 w-16 rounded-full bg-gradient-to-r from-accentColor to-accentColor/30" />
          </div>

          {/* swiper carousel */}
          <Swiper
            className="mini-swiper !overflow-visible pb-2"
            modules={[Navigation, Pagination, A11y, FreeMode, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.15}
            freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            grabCursor={true}
            a11y={{ enabled: true }}
            autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
            breakpoints={{
              540:  { slidesPerView: 1.5,  spaceBetween: 20 },
              768:  { slidesPerView: 2.2,  spaceBetween: 22 },
              1024: { slidesPerView: 3.1,  spaceBetween: 24 },
              1280: { slidesPerView: 3.4,  spaceBetween: 24 },
            }}
          >
            {miniProjects.map((project) => (
              <SwiperSlide key={project.title} className="!h-auto">
                {/* ignoring swiper default height */}
                {/* important modifier for height, set as auto */}
                <MiniProjectCard {...project} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* explore all mini projects */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <Link
              to="#"
              className="group inline-flex items-center gap-3 rounded-xl border border-accentColor/30 bg-accentColor/5 px-7 py-3.5 text-sm font-semibold text-accentColor backdrop-blur-sm transition-all duration-300 hover:border-accentColor/60 hover:bg-accentColor/15 hover:shadow-[0_0_24px_rgba(136,192,208,0.15)] active:scale-[0.97]"
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
            <p className="text-xs text-textColor/40 tracking-wide mb-12">
              33+ projects &nbsp;·&nbsp; Beginner &nbsp;·&nbsp; Intermediate &nbsp;·&nbsp; Advanced
            </p>
          </div>

        </div>
      </section>
    </>
  );
}

export default MiniProjectsCarousel;
