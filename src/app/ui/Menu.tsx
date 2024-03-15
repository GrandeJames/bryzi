import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { GearIcon, ListBulletIcon, StarIcon } from "@radix-ui/react-icons";

function Menu() {
  /**
   * Breathwork (toggle)
   * Visual Focus ()
   * Sounds
   * Rewards
   * Todo-list
   * Settings (have the toggles here?)
   */
  return (
    <div className="flex space-x-5 sticky bottom-0 w-full justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <ListBulletIcon className="size-5" />
          </MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl backdrop-blur-xl border-none dark:bg-white/5">
          <DialogHeader>
            <DialogTitle>Todo-list</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>
            <StarIcon className="size-5" />
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
            <GearIcon className="size-5" />
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
            <GearIcon className="size-5" />
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
    </div>
  );
}

function MenuButton({ children }: { children: ReactNode }) {
  return (
    <button className="dark:bg-neutral-900 bg-gray-100 size-[60px] text-orange-400 font-bold text-xl rounded-full dark:hover:bg-neutral-800 flex justify-center items-center">
      {children}
    </button>
  );
}

export default Menu;
