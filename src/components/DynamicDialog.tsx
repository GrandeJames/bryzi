"use client";

import useDialogStore from "@/stores/dialogStore";
import { Dialog, DialogContent } from "./ui/dialog";
import TaskCreationForm from "./TaskCreationForm";
import { ScrollArea } from "./ui/scroll-area";

function DynamicDialog() {
  const { openDialog, close } = useDialogStore();

  // onOpenChange is provided to ensure that when the dialog is closed, the openDialog state is set to null so that the dialog is closed.
  return (
    <Dialog open={!!openDialog} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <ScrollArea className="max-h-[80vh]">
          {openDialog === "create" && <TaskCreationForm />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default DynamicDialog;
