"use client";

import useDialogStore from "@/stores/dialogStore";
import { Dialog, DialogContent } from "./ui/dialog";
import ClassTaskForm from "./ClassTaskForm";
import { ScrollArea } from "./ui/scroll-area";
import ClassTaskDetails from "./ClassTaskDetails";
import PersonalTaskForm from "./PersonalTaskForm";

function DynamicDialog() {
  const { openDialogName, closeDialog, dialogData } = useDialogStore();

  // onOpenChange is provided to ensure that when the dialog is closed, the openDialog state is set to null so that the dialog is closed.
  return (
    <Dialog open={!!openDialogName} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="max-w-md px-0">
        <ScrollArea className="max-h-[80vh]">
          {openDialogName === "createClassTask" && <ClassTaskForm />}
          {openDialogName === "createPersonalTask" && <PersonalTaskForm />}
          {openDialogName === "classTaskDetails" && <ClassTaskDetails task={dialogData.task} />}
          {openDialogName === "editClassTask" && <ClassTaskForm initialTask={dialogData.task} />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default DynamicDialog;
