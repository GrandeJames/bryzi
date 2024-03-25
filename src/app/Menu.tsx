import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { Cog6ToothIcon } from "@/components/icons/Cog6ToothIcon";
import { GiftIcon } from "@/components/icons/GiftIcon";
import { QueueListIcon } from "@/components/icons/QueueListIcon";
import { UserCircleIcon } from "@/components/icons/UserCircleIcon";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function Menu() {
  return (
    <div className="flex space-x-7 sticky bottom-0 w-full justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <QueueListIcon />
          </MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl backdrop-blur-xl border-none dark:bg-white/5 py-10 px-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Tasks</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <div className="absolute bottom-5 right-10 bg-orange-500 rounded-full size-12 flex items-center justify-center text-xl">
              +
            </div>
            <div className="flex space-x-[50px]">
              <div>
                <ul>
                  <li className="text-gray-500 text-lg font-medium">Inbox</li>
                  <li className="text-lg font-medium">Today</li>
                  <li className="text-gray-500 text-lg font-medium">Upcoming</li>
                </ul>
              </div>
              <div className="space-y-[10px] h-[50vh] overflow-y-auto w-full">
                <div>
                  <div>Write Essay</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Study</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essay oiahwd oiawd awidj</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essa pojawdo paowjdy</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essay</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essay paowjd awd</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essa pojawdo paowjdy</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essay</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
                <div>
                  <div>Write Essay paowjd awd</div>
                  <div className="text text-gray-500">random desc</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <GiftIcon />
          </MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl backdrop-blur-xl border-none dark:bg-white/5">
          <DialogHeader>
            <DialogTitle>Rewards</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <ChartBarIcon />
          </MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl backdrop-blur-xl border-none dark:bg-white/5">
          <DialogHeader>
            <DialogTitle>Data Insights</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <Cog6ToothIcon />
          </MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl backdrop-blur-xl border-none dark:bg-white/5">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <UserCircleIcon />
          </MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl backdrop-blur-xl border-none dark:bg-white/5">
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
