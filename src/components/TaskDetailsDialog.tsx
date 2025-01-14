import { Dialog, DialogContent } from "./ui/dialog";
import { create } from "zustand";

interface TaskDialogStore {
  isTaskDetailsDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useTaskDialogStore = create<TaskDialogStore>((set) => ({
  isTaskDetailsDialogOpen: false,
  openDialog: () => set({ isTaskDetailsDialogOpen: true }),
  closeDialog: () => set({ isTaskDetailsDialogOpen: false }),
}));

// Opening will be handled by the parent component to make this easier to reuse

function TaskDetailsDialog() {
  const { isTaskDetailsDialogOpen, openDialog, closeDialog } = useTaskDialogStore();

  return (
    <Dialog open={isTaskDetailsDialogOpen}>
      <DialogContent onInteractOutside={closeDialog} className="sm:max-w-sm p-0">test</DialogContent>
    </Dialog>
  );
}

export default TaskDetailsDialog;
