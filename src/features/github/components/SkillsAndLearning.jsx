/* eslint-disable react/prop-types */
import Badge from "./Badge";

export default function SkillsAndLearning({ skills, learningItems }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* SKILLS PANEL */}
      <div className="rounded-2xl border border-explorerBorder bg-articleBg p-6 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-textColor">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accentColor"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </div>

      {/* CURRENTLY LEARNING PANEL */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-explorerBorder bg-[#1e1e1e] font-mono shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#404040] bg-[#2d2d2d] px-4 py-2 text-sm text-textColor opacity-80">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-400"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          currently_learning.js
        </div>
        <div className="flex-1 overflow-x-auto p-6 text-sm leading-relaxed text-[#d4d4d4]">
          <span className="text-[#569cd6]">const</span>{" "}
          <span className="text-[#4fc1ff]">learningGoals</span>{" "}
          <span className="text-[#d4d4d4]">=</span>{" "}
          <span className="text-[#d4d4d4]">[</span>
          <div className="my-1 ml-2 flex flex-col gap-1 border-l-2 border-[#404040] pl-4">
            {learningItems.map((item, i) => (
              <div key={i} className="whitespace-nowrap">
                <span>&quot;{item}&quot;</span>
                {i < learningItems.length - 1 && (
                  <span className="text-[#d4d4d4]">,</span>
                )}
              </div>
            ))}
          </div>
          <span className="text-[#d4d4d4]">];</span>
        </div>
      </div>
    </div>
  );
}
