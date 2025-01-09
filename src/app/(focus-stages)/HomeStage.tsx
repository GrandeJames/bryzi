import { TotalProgress } from "@/components/TotalProgress";
import { useFocusStore } from "@/hooks/useFocusStore";
import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskCreationForm from "@/components/TaskCreationForm";
import { Label } from "@radix-ui/react-select";
import { Copy } from "lucide-react";
import { Input } from "postcss";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      title: "LLEA 371: Read Omai",
      date: "2022-01-01",
      class: "LLEA 371: Europeans in the Pacific",
      importance: 3,
      deadline: "2022-01-01",
      completed: false,
      expectedDuration: "2:00",
    },
    {
      title: "Read Chap",
      date: "2022-01-01",
      class: "EDEP 311: Educational Psychology",
      importance: 3,
      deadline: "2022-01-01",
      completed: false,
      expectedDuration: "0:90",
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
    { title: "Cardio", date: "2022-01-01", importance: 3, difficulty: 3, completed: true },
  ];

  const scheduledTasks = todaysTasks.filter((task) => task.startTime);
  const focusTasks = todaysTasks.filter((task) => task.expectedDuration);
  const miscTasks = todaysTasks.filter((task) => !task.startTime && !task.expectedDuration);

  // TODO: sort focus tasks by importance then difficulty and then duration
  focusTasks.sort((a, b) => (b.importance || 0) - (a.importance || 0));
  miscTasks.sort((a, b) => (b.importance || 0) - (a.importance || 0));

  return (
    <>
      <TotalProgress className="my-3" />
      <Timeline className="my-3" />
      {/* <button className="fixed bottom-3 right-3"> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="flex items-center text-orange-500 font-semibold fixed bottom-5 right-5 z-50"
            variant={"ghost"}
          >
            Create Task
          </Button>
          {/* <div className="bg-neutral-800 px-2 py-1 rounded-md text-neutral-400">⌘ K</div> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm p-0">
          <ScrollArea className="max-h-[80vh] p-6">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2"></div>
            </div>
            <TaskCreationForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {/* </button> */}
      <div className="relative space-y-10">
        <div className="pb-20 space-y-5">
          <header className="flex flex-col gap-1">
            <div className="font-bold text-3xl text-neutral-100">Today</div>
          </header>
          <div className="space-y-8">
            <section>
              <header className="font-semibold text-xl mb-1 text-blue-300">Events</header>
              <div className="flex gap-7 divide-x">
                {scheduledTasks.map((task, index) => (
                  <div key={index} className=" border-neutral-800 min-w-56 max-w-sm px-5 py-1">
                    <div className="text-sm font-semibold">{task.title}</div>
                    <div className="text-sm text-neutral-300">
                      <div>MATH 307: Linear Algebra</div>
                      <div className="text-orange-400">
                        {task.startTime} {task.endTime && ` - ${task.endTime}`}
                      </div>
                      <div className="text-red-500">Starting in 22 mins</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
              <section className="col-span-8">
                <header className="flex gap-2">
                  <div className="font-semibold text-xl mb-2 text-orange-400">Focus Work</div>
                </header>
                <ul className="grid grid-cols-1 space-y-2 divide-neutral-800 divide-y">
                  {focusTasks.map((task, index) => (
                    <FocusWork key={index} task={task} />
                  ))}
                </ul>
              </section>
              <section className="col-span-4">
                <header className="font-semibold text-xl mb-2 text-neutral-300">Other</header>
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
        <div className="font-semibold">
          {task.title}
          {task.importance && getImportance(task.importance)}
        </div>
        <div className="text-sm text-neutral-300">{task.class}</div>
      </div>
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
