import { motion } from "framer-motion";
import { realBuildCount } from "../frontend-lab/data/uiExperimentsData";
import MiniProjectsCarousel from "../projects/MiniProjectsCarousel";
import SectionHeader from "../../components/SectionHeader";
import { DUR_ENTER, EASE_OUT, REVEAL_ONCE } from "../../lib/motion";

export default function LabTeaser() {
  return (
    <section className="bg-articleBg/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <SectionHeader
          eyebrow="Build archive"
          title="The Build Log"
          /* Count derived from the data rather than written out, so it cannot
             go stale the next time a build lands. */
          lede={`${realBuildCount} mini projects — OTP inputs, star ratings, nested comments, infinite scroll. Small, self-contained builds, each one shipped to sharpen a specific skill.`}
          size="sm"
          href="/frontend-lab"
          cta="Explore the Build Archive"
          className="mb-12"
        />
      </div>

      {/*
        The dual counter-scrolling marquee.

        This section used to be a three-card grid — the same rectangles-in-a-row
        shape as the section above and below it, which is what made the page read
        as one long undifferentiated column. Motion and full-bleed width give the
        archive a texture nothing else on the page has, and say something true
        about it: this is a large, continuous body of small work, not three
        selected pieces.

        It also revives a component that the /projects retirement had left with
        no consumer at all.

        The rows bleed past the container's padding by design; the carousel keeps
        that container in chromeless mode so the bleed lands where intended
        instead of pushing the page sideways.
      */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_ONCE}
        transition={{ duration: DUR_ENTER, ease: EASE_OUT }}
      >
        <MiniProjectsCarousel chromeless />
      </motion.div>
    </section>
  );
}
