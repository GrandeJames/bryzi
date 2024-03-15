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
    <div className="flex space-x-7 sticky bottom-0 w-full justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>Tl</MenuButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl backdrop-blur-xl border-none dark:bg-white/5">
          <DialogHeader>
            <DialogTitle>To-do list</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>Rw</MenuButton>
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
          <MenuButton>S</MenuButton>
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
          <MenuButton>Si</MenuButton>
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

export default Menu;
