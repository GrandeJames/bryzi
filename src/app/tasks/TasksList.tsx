import { Task } from "@/types/task";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils.ts/cn";

function TasksList({ className }: { className?: string }) {
  const tasks: Task[] = useTasksStore((state) => state.tasks);
  const reversedTasks = [...tasks].reverse(); // we want the latest tasks to be at the top, which makes it easier to create a new task

  return (
    <div className={cn(className, "flex flex-col")}>
      {reversedTasks.map((task: Task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
}

function TaskComponent({ task }: { task: Task }) {
  return (
    <div className="p-3">
      <div className="text-neutral-200">{task.title}</div>
    </div>
  );
}

export default TasksList;
