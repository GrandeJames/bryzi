import { cn } from "@/utils.ts/cn";
import ClassTasksList from "./ClassTasksList";
import TaskSection from "@/components/TaskSection";

function ClassTasksSection({ tasks, className }: { tasks: any[]; className?: string }) {
  return (
    <TaskSection title="Class" className={cn("w-full", className)}>
      <ClassTasksList classTasks={tasks} />
    </TaskSection>
  );
}

export default ClassTasksSection;
