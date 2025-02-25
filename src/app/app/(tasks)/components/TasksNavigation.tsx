import Link from "next/link";
import { usePathname } from "next/navigation";

function TasksNavigation() {
  return (
    <div className="flex items-center space-x-4">
      <NavLink href="/app/today" label="Today" />
      <NavLink href="/app/upcoming" label="Upcoming" />
      <NavLink href="/app/inbox" label="Inbox" />
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const activeButtonClassName =
    "dark:text-neutral-300 text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-[2px] after:bg-neutral-600";

  return (
    <Link
      href={href}
      className={`text-xl font-bold  dark:hover:text-neutral-400 hover:text-neutral-700 ${
        pathname === href ? activeButtonClassName : "dark:text-neutral-600 text-neutral-300"
      }`}
    >
      {label}
    </Link>
  );
}

export default TasksNavigation;
