import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";
import TaskCreationDialog from "@/components/TaskCreationDialog";
import { tasks } from "@/lib/data";
import { format } from "date-fns";
import AssignmentsSection from "./AssignmentSection";
import ScheduleSection from "./ScheduleSection";
import MiscSection from "./MiscSection";
import TaskDetailsDialog from "@/components/TaskDetailsDialog";

function Home() {
  const scheduledTasks = tasks.filter((task) => task.startTime);
  const focusTasks = tasks.filter((task) => task.expectedDuration);
  const miscTasks = tasks.filter((task) => !task.startTime && !task.expectedDuration);

  return (
    <div>
      <div className="max-h-screen overflow-hidden">
        <header>
          <Progress value={70} label="3/5 Tasks" className="mb-2 mt-5 text-xs" />
          <Timeline className="mb-4" />
        </header>
        <main className="relative space-y-10">
          <div className="pb-20 pt-5 space-y-5">
            <DateHeading />
            <div className="space-y-8">
              <ScheduleSection scheduledTasks={scheduledTasks} />
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
                <AssignmentsSection focusTasks={focusTasks} />
                <MiscSection miscTasks={miscTasks} />
              </div>
            </div>
          </div>
          <TaskDetailsDialog />
        </main>
      </div>
      <TaskCreationDialog />
    </div>
  );
}

function DateHeading() {
  const today = new Date();

  const day = format(today, "EEEE");
  const monthAndDay = format(today, "MMM d");

  return (
    <header className="flex items-end gap-2">
      <span className="text-3xl font-bold text-neutral-200">{day}</span>
      <span className="text-2xl font-bold text-neutral-500">{monthAndDay}</span>
    </header>
  );
}

export default Home;
