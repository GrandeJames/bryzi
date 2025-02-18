import Link from "next/link";
import { usePathname } from "next/navigation";

function TasksNavigation() {
  const pathname = usePathname();

  console.log("pathname", pathname);

  const activeButtonClassName =
    "!dark:text-neutral-300 !text-neutral-300 !text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[2px] after:bg-orange-400";

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/app/today"
        className={`text-xl font-bold dark:text-neutral-600 text-neutral-300 dark:hover:text-neutral-400 hover:text-neutral-700 ${
          pathname === "/app/today" && activeButtonClassName
        }`}
      >
        Today
      </Link>
      <Link
        href="/app/upcoming"
        className={`text-xl font-bold dark:text-neutral-600 text-neutral-300 dark:hover:text-neutral-400 hover:text-neutral-700 ${
          pathname === "/app/upcoming" && activeButtonClassName
        }`}
      >
        Upcoming
      </Link>
      <Link
        href="/app/inbox"
        className={`text-xl font-bold dark:text-neutral-600 text-neutral-300 dark:hover:text-neutral-400 hover:text-neutral-700 ${
          pathname === "/app/inbox" && activeButtonClassName
        }`}
      >
        Inbox
      </Link>
    </div>
  );
}

export default TasksNavigation;
