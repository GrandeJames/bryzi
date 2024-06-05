import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { Cog6ToothIcon } from "@/components/icons/Cog6ToothIcon";
import { GiftIcon } from "@/components/icons/GiftIcon";
import { QueueListIcon } from "@/components/icons/QueueListIcon";
import { UserCircleIcon } from "@/components/icons/UserCircleIcon";
import Link from "next/link";
import { ReactNode } from "react";
import { HomeIcon } from "./icons/HomeIcon";

export function Menu() {
  return (
    <div className="flex flex-col space-y-3 w-min border-r h-screen border-neutral-800 px-2 py-10">
      <Link href={"/"}>
        <MenuButton>
          <HomeIcon />
        </MenuButton>
      </Link>
      <Link href={"tasks"}>
        <MenuButton>
          <QueueListIcon />
        </MenuButton>
      </Link>
      <Link href={"rewards"}>
        <MenuButton>
          <GiftIcon />
        </MenuButton>
      </Link>
      <Link href={"data-insights"}>
        <MenuButton>
          <ChartBarIcon />
        </MenuButton>
      </Link>
      <MenuButton>
        <Cog6ToothIcon />
      </MenuButton>
      <MenuButton>
        <UserCircleIcon />
      </MenuButton>
    </div>
  );
}

function MenuButton({ children }: { children: ReactNode }) {
  return (
    <button className="dark:bg-neutral-900 bg-gray-100 size-[65px] text-orange-400 font-bold text-xl rounded-full dark:hover:bg-neutral-800 flex justify-center items-center">
      {children}
    </button>
  );
}
