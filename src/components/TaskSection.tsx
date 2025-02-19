"use client";

import { cn } from "@/utils.ts/cn";

interface TaskSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

function TaskSection({ title, className, children }: TaskSectionProps) {
  return (
    <section
      className={cn(
        className,
        "flex flex-col gap-3 dark:bg-neutral-900/40 bg-none dark:border-neutral-900 border-neutral-100 border p-5 rounded-3xl h-fit"
      )}
    >
      <header>
        <h2 className="font-semibold text-lg dark:text-neutral-300 text-black">{title}</h2>
      </header>
      <div className="px-2">{children}</div>
    </section>
  );
}

export default TaskSection;
