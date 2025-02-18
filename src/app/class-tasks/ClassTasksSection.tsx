import { cn } from "@/utils.ts/cn";
import ClassTasksList from "./ClassTasksList";
import TaskSection from "@/components/TaskSection";

function ClassTasksSection({ tasks, className }: { tasks: any[]; className?: string }) {
  return (
    <TaskSection title="Class" className={cn("w-full max-w-3xl xl:max-w-3xl", className)}>
      <ClassTasksList classTasks={tasks} />
    </TaskSection>
  );
}

export default ClassTasksSection;
