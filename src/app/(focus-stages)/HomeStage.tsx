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
      date: {
        date: "2022-01-01",
        startTime: "10:30",
        endTime: "11:15",
      },
      completed: true,
    },
    {
      title: "Office hour",
      class: "ICS 212: Program Structure",
      difficulty: 2,
      date: {
        startTime: "11:30",
      },
      completed: true,
    },
    {
      title: "Attend class",
      class: "MATH 307: Linear Algebra & Differential Equations",
      importance: 3,
      date: {
        startTime: "14:00",
        endTime: "15:15",
      },
      completed: true,
    },
    {
      title: "Attend class",
      class: "SPAN 202: Spanish",
      date: {
        startTime: "16:00",
        endTime: "16:50",
      },
      completed: true,
    },
    {
      title: "Appointment",
      date: {
        startTime: "17:00",
      },
      completed: true,
    },
    { title: "Work", date: { startTime: "17:00", endTime: "21:00" } },
    {
      title: "Module 1 Essay",
      class: "IP 364: Philippine Popular Culture",
      importance: 3,
      difficulty: 3,
      deadline: "2022-01-01",
      expectedDuration: "4:30",
      completed: true,
    },
    {
      title: "Homework",
      class: "MATH 307: Linear Algebra & Differential Equations",
      importance: 1,
      difficulty: 2,
      deadline: "2022-01-01",
      completed: true,
    },
    { title: "Work on personal project", importance: 2, difficulty: 1, deadline: "2022-01-01" },
    {
      title: "Discussion Post",
      class: "ICS 425: Computer Security & Ethics",
      importance: 1,
      deadline: "2022-01-01",
      completed: true,
    },
    { title: "Gym💪", importance: 3, difficulty: 3, doDate: "2022-01-01", completed: true },
  ];

  const scheduledTasks = todaysTasks.filter((task) => task.date);

  const miscTasks = [{ title: "Gym💪", importance: 3, difficulty: 3, doDate: "2022-01-01" }];

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

        <div className="pb-20">
          <header className="flex flex-col gap-1">
            <div className="flex gap-2 items-baseline">
              <div className="font-bold text-3xl text-neutral-100">Your Tasks for the Day</div>
              <div className="text-5xl"></div>
            </div>
          </header>
          <div className="space-y-10">
            <section>
              <header className="font-semibold text-xl mb-1 text-neutral-100">Schedule</header>
              <div className="flex gap-7 divide-x first:px-0">
                {scheduledTasks.map((task, index) => (
                  <div key={index} className=" border-neutral-800 max-w-sm px-5 py-1">
                    <div className="text-sm font-semibold">{task.title}</div>
                    <div className="text-sm text-neutral-300">
                      <div>MATH 307: Linear Algebra</div>
                      <div className="text-orange-400">
                        {task.date?.startTime} - {task.date?.endTime}
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
                {todaysTasks.map((task, index) => (
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
  };
}

function FocusWork({ task }: TaskInterface) {
  const { start } = useFocusStore();

  return (
    <div className="grid grid-cols-9 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">
          {task.title}
          {task.importance && getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="col-span-2 text-center">
        {task.difficulty && getDifficultyLabel(task.difficulty)}
      </div>
      <div className="text-red-500 text-center">2d left</div>
      <div className="col-span-2 flex justify-center p-3">
        <Progress value={40}></Progress>
      </div>
      <button className="text-orange-500 font-bold text-center" onClick={start}>Start</button>
    </div>
  );
}

function MiscTask({ task }: TaskInterface) {
  return (
    <div className="grid grid-cols-7 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">
          {task.title}
          {task.importance && getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="col-span-2 text-center text-neutral-400">High</div>
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

function getDifficultyLabel(difficulty: number) {
  switch (difficulty) {
    case 1:
      return <p className="">Low</p>;
    case 2:
      return <p className="">Medium</p>;
    case 3:
      return <p className="">High</p>;
    case 4:
      return <p className="">Very High</p>;
    default:
      return "";
  }
}

export { HomeStage };
