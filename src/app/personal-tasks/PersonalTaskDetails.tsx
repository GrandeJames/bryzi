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
import ActionButton from "../app/(tasks)/components/ActionButton";

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

  const openEditPersonalTaskDialog = () => openDialog("editPersonalTask", { task }, "Edit personal task");

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
    openEditPersonalTaskDialog(); // TODO: change to edit personal task dialog // TODO: prevent this even working
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
          <div className="font-bold text-xl mb-1 dark:text-neutral-200 text-neutral-800">
            {task.title}
          </div>
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
          <ActionButton icon={Trash2Icon} label="Delete" onClick={handleTaskDeleteClick} />
          <ActionButton
            icon={CircleCheckIcon}
            label={task.completed ? "Incomplete" : "Complete"}
            onClick={() => {
              handleTaskComplete(task, updateTask);
              closeDialog();
            }}
          />
        </div>
        <ActionButton
          icon={PencilIcon}
          label="Edit"
          onClick={() => {
            handleTaskEditClick();
          }}
          inline
        />
      </div>
    </div>
  );
}

export default PersonalTaskDetails;
