import { Task } from "@/types/task";
import useTasksStore from "@/stores/tasksStore";

function TasksList() {
  const tasks: Task[] = useTasksStore((state) => state.tasks);

  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task: Task) => (
        <div key={task.id} className="border border-gray-800 p-3 rounded-lg">
          <div>{task.title}</div>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
