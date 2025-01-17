import { useState } from "react";
import TaskCreationForm from "./TaskCreationForm";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

function TaskCreationDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center text-orange-500 font-semibold fixed bottom-5 right-5 z-50"
          variant={"ghost"}
        >
          Create Task
        </Button>
        {/* <div className="bg-neutral-800 px-2 py-1 rounded-md text-neutral-400">⌘ K</div> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm p-0">
        <ScrollArea className="max-h-[80vh] p-6">
          <TaskCreationForm onSubmission={() => setOpen(false)} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCreationDialog;
