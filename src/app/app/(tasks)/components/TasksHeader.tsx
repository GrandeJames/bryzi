import TasksNavigation from "./TasksNavigation";
import TodayTimeline from "./TodayTimeline";

export default function TasksHeader({ leftHeading }: { leftHeading?: React.ReactNode }) {
  return (
    <header>
      <TodayTimeline />
      <div className="flex justify-between items-start px-5">
        {leftHeading || <div />}
        <TasksNavigation />
      </div>
    </header>
  );
}
