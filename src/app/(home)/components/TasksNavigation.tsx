import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useTasksNavStore } from "../stores/tasksNavStore";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

function TasksNavigation() {
  const activeNavItem = useTasksNavStore((state) => state.activeNavItem);
  const setNavItem = useTasksNavStore((state) => state.setNavItem);

  return (
    <div className="flex items-center space-x-4 mr-5">
      <NavButton isActive={activeNavItem === "today"} onClick={() => setNavItem("today")}>
        Today
      </NavButton>
      <NavButton isActive={activeNavItem === "upcoming"} onClick={() => setNavItem("upcoming")}>
        Upcoming
      </NavButton>
      <NavButton isActive={activeNavItem === "inbox"} onClick={() => setNavItem("inbox")}>
        Inbox
      </NavButton>
      <NavButton isActive={activeNavItem === "completed"} onClick={() => setNavItem("completed")}>
        Completed
      </NavButton>
    </div>
  );
}

function NavButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const activeButtonClassName =
    "!text-neutral-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[2px] after:bg-orange-400";

  return (
    <button
      className={`text-xl font-bold text-neutral-600 hover:text-neutral-400 ${
        isActive && activeButtonClassName
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TasksNavigation;
