import useDialogStore from "@/app/dialogs/dialogStore";
import { SparklesIcon, CalendarIcon, CircleCheckIcon, NotebookPenIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

function PlannerCreationMenu() {
  const open = useDialogStore((state) => state.openDialog);
  const openCreateClassTaskDialog = () => open("createClassTask", undefined, "New school task");
  const openCreatePersonalTaskDialog = () =>
    open("createPersonalTask", undefined, "New personal task");

  const router = useRouter();

  const menuItems = [
    { icon: NotebookPenIcon, text: "Add class task", onClick: openCreateClassTaskDialog },
    { icon: CircleCheckIcon, text: "Add personal task", onClick: openCreatePersonalTaskDialog },
    { icon: CalendarIcon, text: "Add event" },
    {
      icon: SparklesIcon,
      text: "Generate class tasks",
      onClick: () => router.push("/app/generate"),
    },
  ];

  // TODO: make the menu in the middle of the page, not the screen

  return (
    <div className="fixed bottom-7 transform -translate-x-1/2 left-1/2">
      <div className="flex w-fit items-center gap-2 dark:bg-neutral-900 bg-white px-3 py-1 rounded-full shadow-lg dark:shadow-neutral-950 shadow-neutral-300">
        {menuItems.map(({ icon: Icon, text, onClick }, index) => (
          <TooltipProvider key={index} delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onClick}
                  className="p-3 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                >
                  <Icon className="size-4 dark:text-neutral-300 text-neutral-500 dark:hover:text-white hover:text-neutral-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="dark:bg-neutral-100 bg-neutral-800 dark:text-black text-white"
              >
                <p>{text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

export default PlannerCreationMenu;
