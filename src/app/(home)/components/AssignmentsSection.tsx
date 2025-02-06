"use client";

import { ClassTask } from "@/types/classTask";
import { addDays, format } from "date-fns";
import { DayProps, getRecommendedClassWorkList } from "@/lib/classWorkRecommendation";
import Assignment from "./Assignment";
import { BookIcon } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

function AssignmentsSection({ tasks, className }: { tasks: any[]; className?: string }) {
  return (
    <section className={className}>
      <header className="flex justify-between gap-2 items-center">
        <h2 className="font-semibold text-xl text-neutral-300 mb-2 flex items-center gap-2">
          Class Tasks
        </h2>
        <HoverCard openDelay={500}>
          <HoverCardTrigger asChild>
            <button className="border-orange-400 dark:bg-orange-400/30 dark:text-orange-400 font-semibold text-[0.6rem] px-3 rounded-full flex gap-1 items-center h-min py-1 hover:dark:bg-orange-400/15">
              <span>AUTO SCHEDULE (beta)</span>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 text-sm dark:bg-neutral-950/70 backdrop-blur-lg dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">
              Tasks are automatically scheduled and adjusted so you don’t have to.
            </p>
            {/* <Link href="/feedback" className="mt-2 inline-block text-blue-500 hover:underline">
              Give Feedback →
            </Link> */}
          </HoverCardContent>
        </HoverCard>
      </header>
      <div className="px-2">
        <AssignmentsList classTasks={tasks} />
      </div>
    </section>
  );
}

function getTasksForDay(scheduleDay: DayProps | undefined, allTasks: ClassTask[]): ClassTask[] {
  const dayTasks: ClassTask[] = [];
  scheduleDay?.forEach((dayTask) => {
    const task = allTasks.find((task) => task.id === dayTask.taskId);
    if (task) {
      (task as any).duration = dayTask.duration;

      dayTasks.push(task);
    }
  });
  return dayTasks;
}

function AssignmentsList({ classTasks }: { classTasks: ClassTask[] }) {
  /* TODO: sort by task properties including: deadline, impact, estimated duration, difficulty
   * TODO: the tasks shown should be completable within the day though all tasks due today should be shown even if they are likely not completable
   *
   * Actual: closer deadline ^, higher impact ^, more difficult ^, longer estimated duration ^.
   */

  const incompleteTasks = classTasks.filter((task) => !task.completed);
  const completedTasks = classTasks.filter((task) => task.completed);

  let schedule = getRecommendedClassWorkList(incompleteTasks, [], []);

  let today = schedule[0];
  let tomorrow = schedule[1];

  let todayTasks: ClassTask[] = [];
  let tomorrowTasks: ClassTask[] = [];

  getTasksForDay(schedule[0], incompleteTasks);

  const week: any[] = [];

  for (let i = 0; i < 7; i++) {
    week.push(getTasksForDay(schedule[i], incompleteTasks));
  }

  console.log("week", week);

  incompleteTasks.sort((task1, task2) => {
    if (task1.impact === task2.impact) {
      return (task1.difficulty ?? 0) - (task2.difficulty ?? 0);
    }
    return (task1.impact ?? 0) - (task2.impact ?? 0);
  });

  incompleteTasks.reverse();

  return (
    <div className="space-y-5">
      {incompleteTasks?.length === 0 && completedTasks?.length === 0 && (
        <div className="my-[5rem] text-center">
          <BookIcon className="size-5 text-neutral-500 mx-auto mb-3" />
          <div className="font-medium text-neutral-500 text-sm">No Tasks</div>
          <div className="flex justify-center mt-1">
            <p className="text-xs text-neutral-600 max-w-[15rem]">
              Looks like you’re up to date with your assignments!
            </p>
          </div>
        </div>
      )}
      {incompleteTasks?.length > 0 &&
        week.map((dayTasks, index) => {
          if (week[index].length <= 0) {
            return null; // returning null to skip rendering this day
          }
          return (
            <div key={index}>
              <header className="text-neutral-500 text-xs font-semibold mb-1">
                {index === 0 && "Today"}
                {index === 1 && "Tomorrow"}
                {index > 1 && format(addDays(new Date(), index - 1), "EEEE")}
              </header>
              <ul className="space-y-2">
                {dayTasks.map((task: ClassTask, index: number) => (
                  <li key={index}>
                    <div className="py-0">
                      <Assignment task={task} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      {completedTasks.length > 0 && (
        <div>
          <header className="text-neutral-500 text-xs font-semibold mt-5 mb-1">COMPLETED</header>
          <ul className="space-y-2">
            {completedTasks.map((task, index) => (
              <li key={index}>
                <div className="py-0">
                  <Assignment task={task} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AssignmentsSection;
