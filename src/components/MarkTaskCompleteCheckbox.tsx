import { handleTaskComplete } from "@/lib/taskUtils";
import { Task } from "@/types/task";

function MarkTaskCompleteCheckbox({ task, updateTask }: { task: Task; updateTask: any}) {
  return (
    <div
      className="border rounded-md border-neutral-800 size-5 mx-auto relative hover:cursor-pointer"
      onClick={() => handleTaskComplete(task, updateTask)}
    >
      {task.completed && (
        <span className="text-orange-500 text-3xl absolute bottom-0 left-1">✔</span>
      )}
    </div>
  );
}

export default MarkTaskCompleteCheckbox;
