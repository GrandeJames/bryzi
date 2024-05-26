import { Menu } from "@/components/Menu";
import { TotalProgress } from "@/components/TotalProgress";
import { useFocusStore } from "@/hooks/useFocusStore";

function HomeStage() {
  const { start } = useFocusStore();

  const tasks = [
    { title: "Task title", importance: 4, difficulty: "Hard" },
    { title: "Task title", importance: 4, difficulty: "Hard" },
    { title: "Task title", importance: 4, difficulty: "Hard" },
    { title: "Task title", importance: 4, difficulty: "Hard" },
    { title: "Task title", importance: 4, difficulty: "Hard" },
    { title: "Task title", importance: 4, difficulty: "Hard" },
  ];

  return (
    <>
      <TotalProgress className="my-3" />
      <button onClick={start} className="text-3xl font-bold text-orange-400">
        start
      </button>
      <div className="flex space-x-5">
        <div>
          Goals
          <ul className="grid grid-cols-1 max-w-sm">
            <li className="border border-gray-800">
              <div>Goal title</div>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 font-semibold">Tasks</p>
          <ul className="grid grid-cols-1 max-w-sm space-y-2">
            {tasks.map((task, index) => (
              <Task key={index} task={task} />
            ))}
          </ul>
        </div>
      </div>

      <Menu />
    </>
  );
}

interface TaskInterface {
  task: {
    title: string;
    importance: number;
    difficulty: string;
  };
}

function Task({ task }: TaskInterface) {
  return (
    <li className="border border-gray-800 p-2">
      <div>{task.title}</div>
      <div className="space-x-5">
        <span>Importance: {task.importance}</span>
        <span>Difficulty: {task.difficulty}</span>
      </div>
    </li>
  );
}

export { HomeStage };
