export function filterProjects(projects, { level, category, search }) {
  return projects.filter((project) => {
    const matchesLevel = level === "All" || project.level === level;
    const matchesCategory = category === "All" || project.category === category;
    
    let matchesSearch = true;
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      matchesSearch =
        project.title.toLowerCase().includes(lowerSearch) ||
        project.tags.some((tag) => tag.toLowerCase().includes(lowerSearch));
    }

    return matchesLevel && matchesCategory && matchesSearch;
  });
}
