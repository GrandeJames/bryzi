import { useTaskNavigationStore } from "../stores/taskNavigationStore";

function DateNavigation() {
  const activeNavItem = useTaskNavigationStore((state) => state.activeNavItem);
  const setNavItem = useTaskNavigationStore((state) => state.setNavItem);

  return (
    <div className="flex items-center space-x-4 mr-5">
      <NavButton isActive={activeNavItem === "today"} onClick={() => setNavItem("today")}>
        Today
      </NavButton>
      <NavButton isActive={activeNavItem === "tomorrow"} onClick={() => setNavItem("tomorrow")}>
        Tomorrow
      </NavButton>
      <NavButton
        isActive={activeNavItem === "nextSevenDays"}
        onClick={() => setNavItem("nextSevenDays")}
      >
        Next 7 Days
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

export default DateNavigation;
