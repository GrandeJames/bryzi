import { Task } from "@/types/task";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { create } from "zustand";
import { Subtask } from "@/types/subtask";
import { removeLocalTask } from "@/lib/localStorageTasks";
import useTasksStore from "@/stores/tasksStore";

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

  return (
    <Dialog open={isTaskDetailsDialogOpen}>
      <DialogContent onInteractOutside={closeDialog} className="sm:max-w-sm p-3">
        <DialogHeader>
          {task.class?.abbreviation ? `${task.class.abbreviation} - ` : ""}
          {task.title}
        </DialogHeader>
        <div>
          <div>
            {task.subTasks &&
              task.subTasks.map((subtask: Subtask) => (
                <div key={subtask.id}>
                  <input type="checkbox" checked={subtask.completed} />
                  <span>{subtask.title}</span>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-neutral-700 rounded-md py-2">Edit</button>
            <button className="w-full bg-red-500 rounded-md py-2" onClick={handleTaskDelete}>
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
