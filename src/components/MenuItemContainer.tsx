import { cn } from "@/utils.ts/cn";
import { ReactNode } from "react";

function MenuItemContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        className,
        "font-bold text-xl flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
}

export { MenuItemContainer };
