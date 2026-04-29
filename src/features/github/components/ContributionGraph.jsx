import ActivityCalendar from "react-github-calendar";
import SectionTitle from "./SectionTitle";

// eslint-disable-next-line react/prop-types
export default function ContributionGraph({ theme }) {
  return (
    <div>
      <SectionTitle
        title="Contribution Graph"
        subtitle={`${new Date().getFullYear()} GitHub Activity`}
      />
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-explorerBorder bg-articleBg p-4 shadow-sm md:p-8">
        <div className="flex w-full justify-center overflow-x-auto pb-4">
          <div className="min-w-max text-textColor">
            <ActivityCalendar
              username="sh1v-max"
              fontSize={14}
              blockSize={12}
              blockMargin={4}
              theme={theme}
              hideColorLegend={false}
              hideMonthLabels={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
