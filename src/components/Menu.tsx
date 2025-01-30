"use client";

import { QueueListIcon } from "@/components/icons/QueueListIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItemContainer } from "./MenuItemContainer";
import { HomeIcon } from "./icons/HomeIcon";
import { ComponentPlaceholderIcon } from "@radix-ui/react-icons";
import { Cog6ToothIcon } from "./icons/Cog6ToothIcon";
import clsx from "clsx"; // Import clsx for conditional classNames
import { ChartBarIcon } from "./icons/ChartBarIcon";
import Icon1 from "./icons/Icon1";
import Icon2 from "./icons/Icon2";

const mainMenuItems = [
  { href: "/", icon: <HomeIcon />, label: "Home" },
  { href: "/tasks", icon: <QueueListIcon />, label: "Tasks" },
  { href: "/data-insights", icon: <ChartBarIcon />, label: "Analytics" },
];

const bottomMenuItems = [
  { href: "/settings", icon: <Cog6ToothIcon />, label: "Settings" },
  { href: "/profile", icon: <ComponentPlaceholderIcon />, label: "Profile" },
];

export function Menu() {
  const pathname = usePathname();

  const activeStyle = "text-orange-500";

  return (
    <div className="flex flex-col h-screen justify-between px-5 py-7 sticky top-0 bg-neutral-900/60 text-neutral-400">
      <Link className="flex justify-center mb-8" href="/landing">
        <Icon2 />
      </Link>

      <div className="flex flex-col space-y-12 flex-grow mt-20">
        {mainMenuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <MenuItemContainer
              className={clsx(pathname === item.href && activeStyle)} // Conditionally apply the active style
            >
              {item.icon}
            </MenuItemContainer>
          </Link>
        ))}
      </div>

      <div className="flex flex-col space-y-12">
        {bottomMenuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <MenuItemContainer
              className={clsx(pathname === item.href && activeStyle)} // Conditionally apply the active style
            >
              {item.icon}
            </MenuItemContainer>
          </Link>
        ))}
      </div>
    </div>
  );
}
