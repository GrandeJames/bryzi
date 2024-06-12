import { TotalProgress } from "@/components/TotalProgress";
import { useFocusStore } from "@/hooks/useFocusStore";
import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";

function HomeStage() {
  const todaysTasks = [
    {
      title: "Attend class",
      class: "ICS 311: Data Structures & Algorithms",
      importance: 3,
      difficulty: 3,
      date: "2022-01-01",
      startTime: "08:00",
      endTime: "09:15",
      completed: true,
    },
    {
      title: "Discussion Post 2",
      date: "2022-01-01",
      class: "ICS 425: Computer Security & Ethics",
      importance: 1,
      deadline: "2022-01-01",
      completed: false,
      expectedDuration: "0:30",
      currentDuration: "0:22",
    },
    {
      title: "Office hour",
      class: "ICS 212: Program Structure",
      difficulty: 2,
      date: "2022-01-01",
      startTime: "11:30",
      completed: true,
    },
    {
      title: "Attend class",
      class: "MATH 307: Linear Algebra & Differential Equations",
      importance: 3,
      date: "2022-01-01",
      startTime: "14:00",
      endTime: "15:15",
      completed: false,
    },
    {
      title: "Attend class",
      class: "SPAN 202: Spanish",
      date: "2022-01-01",
      startTime: "16:00",
      endTime: "16:50",
      completed: true,
    },
    {
      title: "Appointment",
      date: "2022-01-01",
      startTime: "17:00",
      completed: true,
    },
    { title: "Work", date: "2022-01-01", startTime: "17:00", endTime: "21:00", completed: false },
    {
      title: "Module 1 Essay",
      date: "2022-01-01",
      class: "IP 364: Philippine Popular Culture",
      importance: 3,
      difficulty: 3,
      deadline: "2022-01-03",
      expectedDuration: "4:30",
      completed: false,
    },

    {
      title: "Homework",
      date: "2022-01-01",
      class: "MATH 307: Linear Algebra & Differential Equations",
      importance: 1,
      difficulty: 2,
      deadline: "2022-01-01",
      completed: true,
      expectedDuration: "1:40",
    },
    {
      title: "Work on personal project",
      date: "2022-01-01",
      importance: 2,
      difficulty: 1,
      deadline: "2022-01-01",
      expectedDuration: "3:30",
      currentDuration: "1:30",
    },
    {
      title: "Discussion Post",
      date: "2022-01-01",
      class: "ICS 425: Computer Security & Ethics",
      importance: 1,
      deadline: "2022-01-01",
      completed: true,
      expectedDuration: "0:30",
    },

    { title: "Gym💪", date: "2022-01-01", importance: 3, difficulty: 3, completed: true },
  ];

  const scheduledTasks = todaysTasks.filter((task) => task.startTime);
  const focusTasks = todaysTasks.filter((task) => task.expectedDuration);
  const miscTasks = todaysTasks.filter((task) => !task.startTime && !task.expectedDuration);

  // TODO: sort focus tasks by importance then difficulty and then duration
  const focusTasksSorted = focusTasks.sort((a, b) => (b.importance || 0) - (a.importance || 0));

  return (
    <>
      <Timeline className="my-3" />
      <TotalProgress className="my-3" />
      <button className="fixed bottom-3 right-3">
        <div className="flex gap-2 rounded-md p-1">
          <div className="flex items-center text-orange-500 font-semibold">Create Task</div>
          <div className="bg-neutral-800 px-2 py-1 rounded-md text-neutral-400">⌘ K</div>
        </div>
      </button>
      <div className="relative space-y-10">
        <div className="absolute top-0 right-0 text-right">
          <div className="font-bold text-neutral-200 text-xl">364 pts</div>
        </div>

        <div className="pb-20 space-y-5">
          <header className="flex flex-col gap-1">
            <div className="font-bold text-3xl text-neutral-100">Your Tasks for the Day</div>
          </header>
          <div className="space-y-8">
            <section>
              <header className="font-semibold text-xl mb-1 text-neutral-100">Schedule</header>
              <div className="flex gap-7 divide-x first:px-0">
                {scheduledTasks.map((task, index) => (
                  <div key={index} className=" border-neutral-800 max-w-sm px-5 py-1">
                    <div className="text-sm font-semibold">{task.title}</div>
                    <div className="text-sm text-neutral-300">
                      <div>MATH 307: Linear Algebra</div>
                      <div className="text-orange-400">
                        {task.startTime} {task.endTime && ` - ${task.endTime}`}
                      </div>
                      <div className="text-red-500">Starting in 1 hour and 22 mins</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <header className="flex gap-2">
                <div className="font-semibold text-xl mb-2 text-neutral-100 ">Focus Work</div>
              </header>
              <ul className="grid grid-cols-1 max-w-3xl space-y-2 divide-neutral-800 divide-y">
                {focusTasksSorted.map((task, index) => (
                  <FocusWork key={index} task={task} />
                ))}
              </ul>
            </section>
            <section>
              <header className="font-semibold text-xl mb-2 text-neutral-100">Misc.</header>
              <ul className="grid grid-cols-1 max-w-3xl space-y-2 divide-neutral-800 divide-y">
                {miscTasks.map((task, index) => (
                  <MiscTask key={index} task={task} />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

interface TaskInterface {
  task: {
    title: string;
    class?: string;
    importance?: number;
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
        <div className="font-semibold">
          {task.title}
          {task.importance && getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="text-red-500 text-center">2d left</div>
      {task.completed && (
        <div className="flex flex-col col-span-2 px-5">
          <div className=" flex justify-center">
            <Progress value={80}></Progress>
          </div>
          <p className="text-xs text-neutral-500">2.7/3.0 hrs</p>
          <p className="text-green-400">Completed</p>
        </div>
      )}
      {!task.completed && task.currentDuration && (
        <div className="flex flex-col col-span-2 px-5">
          <div className=" flex justify-center">
            <Progress value={40}></Progress>
          </div>
          <p className="text-xs text-neutral-500">2.2/3.0 hrs</p>
        </div>
      )}
      {!task.completed && !task.currentDuration && (
        <div className="flex flex-col col-span-2 px-5">
          <div className=" flex justify-center">
            <Progress value={0}></Progress>
          </div>
          <p className="text-xs text-neutral-500">0/3.0 hrs</p>
        </div>
      )}
      {!task.completed && !task.currentDuration && (
        <button className="text-orange-500 font-bold text-center" onClick={start}>
          Start
        </button>
      )}
      {!task.completed && task.currentDuration && (
        <button className="text-orange-500 font-bold text-center" onClick={start}>
          Continue
        </button>
      )}
    </div>
  );
}

function MiscTask({ task }: TaskInterface) {
  return (
    <div className="grid grid-cols-5 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">
          {task.title}
          {task.importance && getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="text-center text-green-500">Completed</div>
      <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
    </div>
  );
}

function getImportance(importance: number) {
  switch (importance) {
    case 1:
      return "!";
    case 2:
      return "!!";
    case 3:
      return "!!!";
    default:
      return "";
  }
}

export { HomeStage };
