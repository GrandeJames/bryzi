"use client";

import useDialogStore from "@/app/dialogs/dialogStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import ClassTaskForm from "../app/(tasks)/components/forms/ClassTaskForm";
import { ScrollArea } from "../../components/ui/scroll-area";
import ClassTaskDetails from "../../components/ClassTaskDetails";
import PersonalTaskForm from "../app/(tasks)/components/forms/PersonalTaskForm";
import PersonalTaskDetails from "../personal-tasks/PersonalTaskDetails";
import CourseForm from "../courses/CourseForm";

function DynamicDialog() {
  const { openDialogName, closeDialog, dialogData, title } = useDialogStore();

  // console.log("title", title);
  // console.log("dialogData", dialogData);

  // onOpenChange is provided to ensure that when the dialog is closed, the openDialog state is set to null so that the dialog is closed.
  return (
    <Dialog open={!!openDialogName} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="w-fit px-0 flex flex-col divide-y dark:divide-neutral-800 divide-neutral-100">
        {title && (
          <DialogHeader className="px-6">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <ScrollArea className="flex-1">
          <div className={`${title ? "pt-4" : ""} max-h-[75vh]`}>
            {openDialogName === "createClassTask" && <ClassTaskForm />}
            {openDialogName === "createPersonalTask" && <PersonalTaskForm />}
            {openDialogName === "classTaskDetails" && <ClassTaskDetails task={dialogData.task} />}
            {openDialogName === "personalTaskDetails" && (
              <PersonalTaskDetails task={dialogData.task} />
            )}
            {openDialogName === "editClassTask" && <ClassTaskForm initialTask={dialogData.task} />}
            {openDialogName === "editPersonalTask" && (
              <PersonalTaskForm initialTask={dialogData.task} />
            )}
            {openDialogName === "createCourse" && <CourseForm />}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default DynamicDialog;
