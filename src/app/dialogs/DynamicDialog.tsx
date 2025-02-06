"use client";

import useDialogStore from "@/app/dialogs/dialogStore";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import ClassTaskForm from "../../components/ClassTaskForm";
import { ScrollArea } from "../../components/ui/scroll-area";
import ClassTaskDetails from "../../components/ClassTaskDetails";
import PersonalTaskForm from "../../components/PersonalTaskForm";

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
