import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { DayProps, getRecommendedClassWorkList } from "@/lib/classWorkRecommendation";
import { ClassTask } from "@/types/classTask";
import { BookIcon } from "lucide-react";
import ClassTaskItem from "./ClassTaskItem";
import { addDays, format } from "date-fns";

function ClassTasksList({ classTasks }: { classTasks: ClassTask[] }) {
  const incompleteTasks = classTasks.filter((task) => !task.completed);
  const completedTasks = classTasks.filter((task) => task.completed);

  let schedule = getRecommendedClassWorkList(incompleteTasks, [], []);

  getTasksForDay(schedule[0], incompleteTasks);

  const week: any[] = [];

  for (let i = 0; i < 7; i++) {
    week.push(getTasksForDay(schedule[i], incompleteTasks));
  }

  incompleteTasks.sort((task1, task2) => {
    if (task1.impact === task2.impact) {
      return (task1.difficulty ?? 0) - (task2.difficulty ?? 0);
    }
    return (task1.impact ?? 0) - (task2.impact ?? 0);
  });

  incompleteTasks.reverse();

  return (
    <div className="space-y-5">
      {classTasks.length === 0 && (
        <EmptyPlaceholder
          icon={<BookIcon />}
          title="No Tasks"
          description="Looks like you’re all caught up with your class tasks!"
          className="my-[10rem]"
        />
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
                      <ClassTaskItem task={task} />
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
                  <ClassTaskItem task={task} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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

export default ClassTasksList;
