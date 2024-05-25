import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { Cog6ToothIcon } from "@/components/icons/Cog6ToothIcon";
import { GiftIcon } from "@/components/icons/GiftIcon";
import { QueueListIcon } from "@/components/icons/QueueListIcon";
import { UserCircleIcon } from "@/components/icons/UserCircleIcon";
import { ReactNode } from "react";

export function Menu() {
  return (
    <div className="flex space-x-7 fixed bottom-10 w-full justify-center">
      <MenuButton>
        <QueueListIcon />
      </MenuButton>
      <MenuButton>
        <GiftIcon />
      </MenuButton>
      <MenuButton>
        <ChartBarIcon />
      </MenuButton>
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
