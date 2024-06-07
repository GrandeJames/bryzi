import { ReactNode } from "react";

function MenuItemContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative dark:bg-neutral-900 bg-gray-100 size-[65px] text-orange-400 font-bold text-xl rounded-full dark:hover:bg-neutral-800 flex justify-center items-center overflow-hidden">
      {children}
    </div>
  );
}

export { MenuItemContainer };
