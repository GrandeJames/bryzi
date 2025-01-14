import { Task } from "@/types/task";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { create } from "zustand";
import { Subtask } from "@/types/subtask";

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

  if (!task) {
    return null;
  }

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
                <div>
                  <input type="checkbox" checked={subtask.completed} />
                  <span>{subtask.title}</span>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full bg-neutral-800 rounded-md py-2">Edit</button>
            <button className="w-full bg-neutral-800 rounded-md py-2">Delete</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
