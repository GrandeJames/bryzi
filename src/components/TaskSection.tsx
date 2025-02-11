"use client";

import { cn } from "@/utils/cn";

interface TaskSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

function TaskSection({ title, className, children }: TaskSectionProps) {
  return (
    <section className={cn(className, "flex flex-col gap-3")}>
      <header>
        <h2 className="font-semibold text-lg text-neutral-300">{title}</h2>
      </header>
      <div className="px-2">{children}</div>
    </section>
  );
}

export default TaskSection;
