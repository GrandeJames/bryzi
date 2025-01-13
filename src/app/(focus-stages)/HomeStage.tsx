import { useFocusStore } from "@/hooks/useFocusStore";
import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";
import TaskCreationDialog from "@/components/TaskCreationDialog";
import { tasks } from "@/lib/data";
import { format } from "date-fns";

function HomeStage() {
  const scheduledTasks = tasks.filter((task) => task.startTime);
  const focusTasks = tasks.filter((task) => task.expectedDuration);
  const miscTasks = tasks.filter((task) => !task.startTime && !task.expectedDuration);

  // TODO: sort focus tasks by impact then difficulty and then duration
  focusTasks.sort((a, b) => (b.impact || 0) - (a.impact || 0));
  miscTasks.sort((a, b) => (b.impact || 0) - (a.impact || 0));

  return (
    <div className="max-h-screen overflow-hidden">
      <Progress value={70} label="3/5 Tasks" className="mb-2 mt-5 text-xs" />
      <Timeline className="mb-4" />
      <TaskCreationDialog />
      <div className="relative space-y-10">
        <div className="pb-20 pt-5 space-y-5">
          <DateHeading />
          <div className="space-y-8">
            <section>
              <header className="font-semibold text-xl mb-1 text-blue-300">Schedule</header>
              <div className="flex gap-7 divide-x">
                {scheduledTasks.map((task, index) => (
                  <ScheduledTask key={index} task={task} />
                ))}
              </div>
            </section>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
              <section className="col-span-8">
                <header className="flex gap-2">
                  <div className="font-semibold text-xl mb-2 text-orange-300">Assignments</div>
                </header>
                <ul className="grid grid-cols-1 space-y-2 divide-neutral-800 divide-y">
                  {focusTasks.map((task, index) => (
                    <FocusWork key={index} task={task} />
                  ))}
                </ul>
              </section>
              <section className="col-span-4">
                <header className="font-semibold text-xl mb-2 text-neutral-100">
                  Miscellaneous
                </header>
                <ul className="grid grid-cols-1 space-y-2 divide-neutral-800 divide-y">
                  {miscTasks.map((task, index) => (
                    <MiscTask key={index} task={task} />
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TaskInterface {
  task: {
    title: string;
    class?: string;
    impact?: number;
    difficulty?: number;
    completed?: boolean;
    currentDuration?: string;
  };
}

function FocusWork({ task }: TaskInterface) {
  const { start } = useFocusStore();

  return (
    <div className="grid grid-cols-7 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">{task.title}</div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="text-red-500 text-center">2d left</div>
      {task.completed && (
        <div className="flex flex-col col-span-2 px-5">
          <Progress value={80} label="2.7/3.0 hrs" className="text-xs" />
        </div>
      )}
      {!task.completed && task.currentDuration && (
        <div className="flex flex-col col-span-2 px-5">
          <Progress value={40} label="2.2/3.0 hrs" className="text-xs" />
        </div>
      )}
      {!task.completed && !task.currentDuration && (
        <div className="flex flex-col col-span-2 px-5">
          <Progress value={0} label="0/3.0 hrs" className="text-xs" />
        </div>
      )}
      {!task.completed && !task.currentDuration && (
        <button className="text-orange-500 font-bold text-center" onClick={() => start(task.title)}>
          Start
        </button>
      )}
      {!task.completed && task.currentDuration && (
        <button className="text-orange-500 font-bold text-center" onClick={() => start(task.title)}>
          Continue
        </button>
      )}
      {task.completed && (
        <div className="border rounded-md border-neutral-800 size-5 mx-auto relative">
          <span className="text-orange-500 text-3xl absolute bottom-0 left-1">✔</span>
        </div>
      )}
    </div>
  );
}

function MiscTask({ task }: TaskInterface) {
  return (
    <div className="grid grid-cols-4 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">{task.title}</div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
    </div>
  );
}

// TODO: make dynamic
function ScheduledTask({ task }: { task: any }) {
  return (
    <div className=" border-neutral-900 min-w-56 max-w-sm px-5 py-1">
      <div className="text-sm font-semibold">{task.title}</div>
      <div className="text-sm text-neutral-300">
        <div>{task.class}</div>
        <div className="text-orange-400">
          {task.startTime} {task.endTime && ` - ${task.endTime}`}
        </div>
        {task.class === "ICS 311: Data Structures & Algorithms" && (
          <div className="text-red-500">Starting in 22 mins</div>
        )}
      </div>
    </div>
  );
}

function DateHeading() {
  const today = new Date();

  const day = format(today, "EEEE"); // Full day name, e.g., "Monday"
  const monthAndDay = format(today, "MMM d"); // Month and day, e.g., "Jan 13"

  return (
    <header className="flex items-end gap-2">
      <span className="text-3xl font-bold text-neutral-200">{day}</span>
      <span className="text-2xl font-bold text-neutral-500">{monthAndDay}</span>
    </header>
  );
}

export { HomeStage };
