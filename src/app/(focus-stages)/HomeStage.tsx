import { TotalProgress } from "@/components/TotalProgress";
import { useFocusStore } from "@/hooks/useFocusStore";
import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";

function getDifficultyLabel(difficulty: number) {
  switch (difficulty) {
    case 1:
      return <p className="text-neutral-300">Low</p>;
    case 2:
      return <p className="text-yellow-500">Medium</p>;
    case 3:
      return <p className="text-orange-500">High</p>;
    case 4:
      return <p className="text-red-500">Very High</p>;
    default:
      return "";
  }
}

function HomeStage() {
  const { start } = useFocusStore();

  const focusWork = [
    {
      title: "Module 1 Essay",
      class: "IP 364: Philippine Popular Culture",
      importance: 3,
      difficulty: 3,
      deadline: "2022-01-01",
      expectedDuration: "4:30",
    },
    {
      title: "Homework",
      class: "MATH 307: Linear Algebra & Differential Equations",
      importance: 1,
      difficulty: 2,
      deadline: "2022-01-01",
    },
    { title: "Work on personal project", importance: 2, difficulty: 1, deadline: "2022-01-01" },
    { title: "Work on personal project", importance: 2, difficulty: 1, deadline: "2022-01-01" },
    { title: "Work on personal project", importance: 2, difficulty: 1, deadline: "2022-01-01" },
    { title: "Work on personal project", importance: 2, difficulty: 1, deadline: "2022-01-01" },

  ];

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
          <div className="font-semibold text-green-600">Points: 364</div>
          <div className="text-neutral-600 text-sm">
            Gain points completing tasks, doing sessions, and more!
          </div>
        </div>

        <header className="flex flex-col gap-1">
          <div className="flex gap-2 items-baseline">
            <div className="font-bold text-3xl text-neutral-100">Your Activities for the Day</div>
            <div className="text-5xl">😈</div>
          </div>
          <div className="flex gap-10 overflow-scroll max-w-screen">
            <div className="text-neutral-700 text-xl font-semibold text-nowrap">
              &quot;Lock the fuck in&quot; - You 🔓
            </div>
            <div className="text-neutral-700 text-xl font-semibold  text-nowrap">
              &quot;gym later? text me&quot; - Jane Doe 🔓
            </div>
            <div className="text-neutral-700 text-xl font-semibold  text-nowrap">
              &quot;lock innnn&quot; - John Doe 🔓
            </div>
            <div className="text-neutral-700 text-xl font-semibold  text-nowrap">
              &quot;yo&quot; - Trixy 🔒
            </div>
          </div>
        </header>
        <section>
          <header className="font-semibold text-xl mb-1 text-neutral-100">Schedule</header>
          <div className="flex gap-7 divide-x first:px-0">
            <div className=" border-neutral-800 max-w-sm py-1">
              <div className="text-sm font-semibold">Attend Class</div>
              <div className="text-sm text-neutral-300">
                <div>ICS 311: Algorithms</div>
                <div>10:30 am - 11:15 am</div>
                <div className="text-red-500">Starting in 23 minutes</div>
              </div>
            </div>
            <div className=" border-neutral-800 max-w-sm px-5 py-1">
              <div className="text-sm font-semibold">Office hour</div>
              <div className="text-sm text-neutral-300">
                <div>ICS 212: Program Structure</div>
                <div>11:30 am</div>
                <div className="text-red-500">Starting in 1 hour</div>
              </div>
            </div>
            <div className=" border-neutral-800 max-w-sm px-5 py-1">
              <div className="text-sm font-semibold">Attend Class</div>
              <div className="text-sm text-neutral-300">
                <div>MATH 307: Linear Algebra & Differential Equations</div>
                <div>2:00 pm - 3:15 pm</div>
              </div>
            </div>
            <div className=" border-neutral-800 max-w-sm px-5 py-1">
              <div className="text-sm font-semibold">Attend Class</div>
              <div className="text-sm text-neutral-300">
                <div>SPAN 201: Spanish</div>
                <div>4:00 pm - 4:50 pm</div>
              </div>
            </div>
            <div className=" border-neutral-800 max-w-sm px-5 py-1">
              <div className="text-sm font-semibold">Appointment</div>
              <div className="text-sm text-neutral-300">
                <div>5:00 pm</div>
              </div>
            </div>
            <div className=" border-neutral-800 max-w-sm px-5 py-1">
              <div className="text-sm font-semibold">Work</div>
              <div className="text-sm text-neutral-300">
                <div>5:00 pm - 9:00 pm</div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <header className="flex gap-2">
            <div className="font-semibold text-xl mb-2 text-neutral-100 ">Focus Work</div>
            <div></div>
          </header>
          <ul className="grid grid-cols-1 max-w-3xl space-y-2 divide-neutral-800 divide-y">
            {focusWork.map((task, index) => (
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
    </>
  );
}

function ScheduledTask() {
  return (
    <div className=" border-neutral-800 max-w-sm px-5 py-2">
      <div className="text-sm font-semibold">Data Structures & Algorithms Class</div>
      <div className="text-sm text-neutral-200">
        <div>ICS 311</div>
        <div>10:30 am - 11:15 am</div>
        <div className="text-red-500">starting in 46 minutes</div>
      </div>
    </div>
  );
}

interface TaskInterface {
  task: {
    title: string;
    class: string;
    importance: number;
    difficulty: number;
  };
}

function FocusWork({ task }: TaskInterface) {
  return (
    <div className="grid grid-cols-9 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">
          {task.title}
          {getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="col-span-2 text-center">{getDifficultyLabel(task.difficulty)}</div>
      <div className="text-red-500 text-center">2d left</div>
      <div className="col-span-2 flex justify-center p-3">
        <Progress value={40}></Progress>
      </div>
      <div className="text-orange-500 font-bold text-center">Start</div>
    </div>
  );
}

function MiscTask({ task }: TaskInterface) {
  return (
    <div className="grid grid-cols-7 py-1">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold">
          {task.title}
          {getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
      <div className="col-span-2 text-center text-orange-400">High</div>
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
