/*
 * Basically a copy of ClassTaskDetails for now
 */
import { Subtask } from "@/types/subtask";
import useTasksStore from "@/stores/tasksStore";
import { CircleCheckIcon, PencilIcon, Repeat2Icon, Trash2Icon } from "lucide-react";
import useDialogStore from "@/app/dialogs/dialogStore";
import { handleTaskComplete, handleTaskRemove, handleTaskUpdate } from "@/lib/taskUtils";
import { Checkbox } from "@/components/ui/checkbox";
import { PersonalTask } from "@/types/personalTask";

function PersonalTaskDetails({ task }: { task: PersonalTask }) {
  const removeTask = useTasksStore((state) => state.removeTask);
  const updateTask = useTasksStore((state) => state.updateTask);

  const closeDialog = useDialogStore((state) => state.closeDialog);
  const openDialog = useDialogStore((state) => state.openDialog);
  const setDialogData = useDialogStore((state) => state.setDialogData);

  if (!task) {
    console.error("Task not found");
    return null;
  }

  const openEditClassTaskDialog = () => openDialog("editClassTask", { task });

  const handleTaskDeleteClick = () => {
    handleTaskRemove(task, removeTask);
    closeDialog();
  };

  const handleSubtaskCompleteClick = (subtask: Subtask) => {
    const updatedSubtask = { ...subtask, completed: !subtask.completed };
    const updatedTask = {
      ...task,
      subtasks: (task.subtasks ?? []).map((subtask) =>
        subtask.id === updatedSubtask.id ? updatedSubtask : subtask
      ),
    };

    handleTaskUpdate(updatedTask, updateTask);
    setDialogData({ task: updatedTask });
  };

  const handleTaskEditClick = () => {
    closeDialog();
    openEditClassTaskDialog();
  };

  return (
    <div className="flex flex-col gap-7 px-5">
      <div>
        <div>
          <div className="text-neutral-500 text-sm">
            {task.recurrence?.frequency !== "once" && (
              <div className="flex gap-1 items-center">
                <Repeat2Icon className="size-4" />
                {task.recurrence && <p>{task.recurrence.frequency}</p>}
              </div>
            )}
          </div>
          <div className="font-bold text-xl mb-1 text-neutral-200">{task.title}</div>
          <div className="text-neutral-300">{task.description && <p>{task.description}</p>}</div>
        </div>
        <div className="my-2">
          {task.subtasks &&
            task.subtasks.map((subtask: Subtask) => (
              <div key={subtask.id} className="flex gap-2 items-center">
                <Checkbox
                  checked={subtask.completed}
                  onCheckedChange={() => handleSubtaskCompleteClick(subtask)}
                />
                <span>{subtask.title}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="text-orange-400 text-sm font-semibold flex flex-col gap-5">
        <div className="flex gap-5">
          <button
            className="w-full bg-neutral-800/80 rounded-md py-4 flex flex-col items-center gap-2"
            onClick={handleTaskDeleteClick}
          >
            <Trash2Icon className="size-4" />
            <span>Delete</span>
          </button>
          <button
            className="w-full bg-neutral-800/80 rounded-md py-4 flex flex-col items-center gap-2"
            onClick={() => {
              handleTaskComplete(task, updateTask);
              closeDialog();
            }}
          >
            <CircleCheckIcon className="size-4" />
            <span>{task.completed ? "Incomplete" : "Complete"}</span>
          </button>
        </div>
        <button
          className="w-full bg-neutral-800/80 rounded-md py-4 flex justify-center gap-2"
          onClick={handleTaskEditClick}
        >
          <PencilIcon className="size-4" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

export default PersonalTaskDetails;
