import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "postcss";
import { ReactNode } from "react";

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
    <div className="space-x-8 rounded-full fixed bottom-14 left-1/2 transform -translate-x-1/2">
      <Dialog>
        <DialogTrigger asChild>
          <MenuButton>TL</MenuButton>
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
          <MenuButton>Rs</MenuButton>
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
          <MenuButton>Ss</MenuButton>
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
    <button className="dark:bg-neutral-900 bg-gray-100 size-[60px] text-orange-400 font-bold text-xl rounded-full">
      {children}
    </button>
  );
}

export default Menu;
