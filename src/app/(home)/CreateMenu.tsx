import useDialogStore from "@/stores/dialogStore";
import {
  SparklesIcon,
  CalendarIcon,
  CircleCheckIcon,
  NotebookPenIcon,
  PlusIcon,
} from "lucide-react";
import { useCallback } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function CreateMenu() {
  const open = useDialogStore((state) => state.openDialog);
  const openCreateTaskDialog = useCallback(() => open("create"), [open]);

  const menuItems = [
    { icon: SparklesIcon, text: "Generate class tasks" },
    { icon: CalendarIcon, text: "Add event" },
    { icon: CircleCheckIcon, text: "Add personal task" },
    { icon: NotebookPenIcon, text: "Add assignment" },
  ];

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center gap-3">
      <button className="group bg-orange-500 rounded-full p-3 shadow-lg shadow-neutral-950 transition-all duration-300 hover:scale-110 relative">
        <PlusIcon className="size-5 text-neutral-300" />

        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col items-center gap-6 bg-neutral-900 px-3 py-5 rounded-full shadow-lg shadow-neutral-950 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          {menuItems.map(({ icon: Icon, text }, index) => (
            <TooltipProvider key={index} delayDuration={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={openCreateTaskDialog}>
                    <Icon className="size-5 text-neutral-300 hover:text-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="dark:bg-white text-black">
                  <p>{text}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </button>
    </div>
  );
}

export default CreateMenu;