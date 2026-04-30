import { useState, useMemo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

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

      <section className="min-h-screen bg-mainBg px-6 py-12 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <HeroSection />
          
          <StatsCards />

          {/* Dashboard Controls Area */}
          <div className="mb-8 rounded-2xl border border-explorerBorder bg-articleBg/30 p-6 backdrop-blur-md shadow-lg">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            <FilterTabs
              levels={LEVELS}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onReset={handleReset}
            />
          </div>

          {/* Results Area */}
          {filteredProjects.length > 0 ? (
            <ExperimentsGrid projects={filteredProjects} />
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </HelmetProvider>
  );
}
