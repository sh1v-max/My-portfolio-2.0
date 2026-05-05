import { useState, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import PageNavigator from "../../components/PageNavigator";

import HeroSection from "./components/HeroSection";
import StatsCards from "./components/StatsCards";
import FilterTabs from "./components/FilterTabs";
import SearchBar from "./components/SearchBar";
import ExperimentsGrid from "./components/ExperimentsGrid";
import EmptyState from "./components/EmptyState";

import { uiExperiments } from "./data/uiExperimentsData";
import { filterProjects } from "./utils/filterUtils";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = ["All", "UI", "API", "Games", "Forms", "Logic"];

export default function UIExperiments() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return filterProjects(uiExperiments, {
      level: selectedLevel,
      category: selectedCategory,
      search: searchQuery,
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const handleReset = () => {
    setSelectedLevel("All");
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Frontend Lab</title>
      </Helmet>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <StatsCards />
          </motion.div>

          {/* Dashboard Controls Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-explorerBorder bg-articleBg/30 mb-8 rounded-2xl border p-6 shadow-lg backdrop-blur-md"
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <FilterTabs
              levels={LEVELS}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onReset={handleReset}
            />
          </motion.div>

          {/* Results Area */}
          {filteredProjects.length > 0 ? (
            <ExperimentsGrid projects={filteredProjects} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <EmptyState />
            </motion.div>
          )}

        </div>
      </section>

      {/* Page Navigation */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <PageNavigator />
      </div>
    </HelmetProvider>
  );
}
