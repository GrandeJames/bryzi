"use client";

import { cn } from "@/utils/cn";

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
        "flex flex-col gap-3 dark:bg-neutral-900/40 bg-none dark:border-neutral-900 border-neutral-50 border py-5 rounded-3xl h-fit"
      )}
    >
      <header className="px-4">
        <h2 className="font-bold text-xs dark:text-neutral-500 text-neutral-400">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

export default TaskSection;
