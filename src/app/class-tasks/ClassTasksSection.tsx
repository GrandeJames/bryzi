import { cn } from "@/utils/cn";
import ClassTasksList from "./ClassTasksList";
import TaskSection from "@/components/TaskSection";

function ClassTasksSection({ tasks, className }: { tasks: any[]; className?: string }) {
  return (
    <TaskSection title="School" className={cn("w-full", className)}>
      <ClassTasksList classTasks={tasks} />
    </TaskSection>
  );
}

export default ClassTasksSection;
