import { ReactNode } from "react";

function MenuItemContainer({ children }: { children: ReactNode }) {
  return (
    <div className="size-[60px] text-orange-400 font-bold text-xl rounded-full dark:hover:text-orange-300 flex justify-center items-center">
      {children}
    </div>
  );
}

export { MenuItemContainer };
