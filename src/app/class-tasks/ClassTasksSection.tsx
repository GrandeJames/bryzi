import ClassTasksList from "./ClassTasksList";
import TaskSection from "@/components/TaskSection";

function ClassTasksSection({ tasks, className }: { tasks: any[]; className?: string }) {
  return (
    <TaskSection title="Class" className={className}>
      <ClassTasksList classTasks={tasks} />
    </TaskSection>
  );
}

export default ClassTasksSection;
