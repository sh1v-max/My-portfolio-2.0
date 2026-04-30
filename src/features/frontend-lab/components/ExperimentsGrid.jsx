/* eslint-disable react/prop-types */
import ExperimentCard from "./ExperimentCard";

export default function ExperimentsGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ExperimentCard key={`${project.title}-${index}`} project={project} />
      ))}
    </div>
  );
}
