import { Task } from "@/types/task";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { create } from "zustand";
import { Subtask } from "@/types/subtask";
import { removeLocalTask } from "@/lib/localStorageTasks";
import useTasksStore from "@/stores/tasksStore";
import { CircleCheckIcon, PencilIcon, Repeat2Icon, Trash2Icon } from "lucide-react";

interface TaskDialogStore {
  isTaskDetailsDialogOpen: boolean;
  task?: Task;
  setTask: (task: Task) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useTaskDialogStore = create<TaskDialogStore>((set) => ({
  isTaskDetailsDialogOpen: false,
  task: undefined,
  setTask: (task) => set({ task }),
  openDialog: () => set({ isTaskDetailsDialogOpen: true }),
  closeDialog: () => set({ isTaskDetailsDialogOpen: false }),
}));

function TaskDetailsDialog() {
  const { isTaskDetailsDialogOpen, closeDialog, task } = useTaskDialogStore();
  const removeTask = useTasksStore((state) => state.removeTask);

  if (!task) {
    return null;
  }

  const handleTaskDelete = () => {
    removeLocalTask(task.id);
    removeTask(task.id);
    closeDialog();
    console.log("task deleted");
  };

  const handleTaskComplete = () => {
    closeDialog();
    console.log("task completed");
  };

  const handleTaskEdit = () => {
    closeDialog();
    console.log("task edited");
  };

  return (
    <Dialog open={isTaskDetailsDialogOpen}>
      <DialogContent onInteractOutside={closeDialog} className="sm:max-w-xl">
        <div>
          <div className="text-neutral-500 text-sm">
            {task.recurrence?.frequency !== "once" && (
              <div className="flex gap-1 items-center">
                <Repeat2Icon className="size-4" />
                {task.recurrence && <p>{task.recurrence.frequency}</p>}
              </div>
            )}
          </div>
          <div className="font-bold text-xl mb-1">{task.title}</div>
          <div className="text-neutral-200">{task.description && <p>{task.description}</p>}</div>
        </div>
        <div className="my-2">
          {task.subtasks &&
            task.subtasks.map((subtask: Subtask) => (
              <div key={subtask.id} className="flex gap-2 items-center">
                {/* <input type="checkbox" checked={subtask.completed} /> this is current causing a console error */}
                <span>{subtask.title}</span>
              </div>
            ))}
        </div>
        <div className="text-orange-400 text-sm font-semibold flex flex-col gap-5">
          <div className="flex gap-5">
            <button
              className="w-full bg-neutral-800/80 rounded-md py-4 flex flex-col items-center gap-2"
              onClick={handleTaskDelete}
            >
              <Trash2Icon className="size-4" />
              <span>Delete</span>
            </button>
            <button
              className="w-full bg-neutral-800/80 rounded-md py-4 flex flex-col items-center gap-2"
              onClick={handleTaskComplete}
            >
              <CircleCheckIcon className="size-4" />
              <span>Complete</span>
            </button>
          </div>
          <button
            className="w-full bg-neutral-800/80 rounded-md py-4 flex justify-center gap-2"
            onClick={handleTaskEdit}
          >
            <PencilIcon className="size-4" />
            <span>Edit</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
