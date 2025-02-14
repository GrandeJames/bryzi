"use client";

import { QueueListIcon } from "@/components/icons/QueueListIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItemContainer } from "./MenuItemContainer";
import { Cog6ToothIcon } from "./icons/Cog6ToothIcon";
import clsx from "clsx";
import { ChartBarIcon } from "./icons/ChartBarIcon";
import Icon2 from "./icons/Icon2";
import { CalendarIcon } from "./icons/CalendarIcon";

const mainMenuItems = [
  { href: "/app/today", icon: <QueueListIcon />, label: "Dashboard" },
  { href: "/app/calendar", icon: <CalendarIcon />, label: "Calendar" },
  { href: "/app/analytics", icon: <ChartBarIcon />, label: "Analytics" },
];

const bottomMenuItems = [{ icon: <Cog6ToothIcon />, label: "Settings" }];

export function Menu() {
  const pathname = usePathname();

  const activeStyle = "text-orange-500";

  // Check if the pathname matches any of the 'Dashboard' related pages
  const isDashboardActive =
    pathname.startsWith("/app/today") ||
    pathname.startsWith("/app/inbox") ||
    pathname.startsWith("/app/upcoming") ||
    pathname.startsWith("/app/generate");

  return (
    <div className="flex flex-col h-screen justify-between px-5 py-7 sticky top-0 bg-neutral-900/60 text-neutral-400">
      <Link className="flex justify-center mb-8" href="/">
        <Icon2 />
      </Link>

      <div className="flex flex-col space-y-12 flex-grow mt-20">
        {mainMenuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <MenuItemContainer
              className={clsx(
                (pathname === item.href || (item.label === "Dashboard" && isDashboardActive)) &&
                  activeStyle
              )}
            >
              {item.icon}
            </MenuItemContainer>
          </Link>
        ))}
      </div>

      <div className="flex flex-col space-y-12">
        {bottomMenuItems.map((item) => (
          <MenuItemContainer key={item.label}>{item.icon}</MenuItemContainer>
        ))}
      </div>
    </div>
  );
}
