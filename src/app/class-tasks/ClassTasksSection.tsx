"use client";

import { ClassTask } from "@/types/classTask";
import { addDays, format } from "date-fns";
import { DayProps, getRecommendedClassWorkList } from "@/lib/classWorkRecommendation";
import ClassTaskItem from "./ClassTaskItem";
import { BookIcon } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import ClassTasksList from "./ClassTasksList";

function ClassTasksSection({ tasks, className }: { tasks: any[]; className?: string }) {
  return (
    <section className={className}>
      <header className="flex justify-between gap-2 items-center">
        <h2 className="font-semibold text-xl text-neutral-300 mb-2 flex items-center gap-2">
          Class Tasks
        </h2>
        <HoverCard openDelay={500}>
          <HoverCardTrigger asChild>
            <button className="border-orange-400 dark:bg-orange-400/30 dark:text-orange-400 font-semibold text-[0.6rem] px-3 rounded-full flex gap-1 items-center h-min py-1 hover:dark:bg-orange-400/15">
              <span>AUTO PLAN</span>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 text-sm dark:bg-neutral-950/70 backdrop-blur-lg dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">
              Tasks are automatically selected and organized to present you with a list of tasks and
              their respective order, eliminating the need for manual planning.
            </p>
            {/* <Link href="/feedback" className="mt-2 inline-block text-blue-500 hover:underline">
              Give Feedback →
            </Link> */}
          </HoverCardContent>
        </HoverCard>
      </header>
      <div className="px-2">
        <ClassTasksList classTasks={tasks} />
      </div>
    </section>
  );
}



export default ClassTasksSection;
