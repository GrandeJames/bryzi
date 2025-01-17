"use client";

import useDialogStore from "@/stores/dialogStore";
import { Dialog, DialogContent } from "./ui/dialog";
import TaskForm from "./TaskForm";
import { ScrollArea } from "./ui/scroll-area";
import TaskDetails from "./TaskDetails";

function DynamicDialog() {
  const { openDialogName, closeDialog, dialogData } = useDialogStore();

  // onOpenChange is provided to ensure that when the dialog is closed, the openDialog state is set to null so that the dialog is closed.
  return (
    <Dialog open={!!openDialogName} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="max-w-md">
        <ScrollArea className="max-h-[80vh]">
          {openDialogName === "create" && <TaskForm />}
          {openDialogName === "details" && <TaskDetails task={dialogData.task} />}
          {openDialogName === "edit" && <TaskForm initialTask={dialogData.task} />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default DynamicDialog;
