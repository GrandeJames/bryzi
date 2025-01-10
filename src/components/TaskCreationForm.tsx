"use client";

import { addLocalTask, getLocalTasks } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/lib/utils";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";
import { ClockIcon, FlameIcon, RepeatIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import Selection from "./Selection";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Subtask } from "@/types/subtask";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

function TaskCreationForm({
  className,
  onSubmission,
}: {
  className?: string;
  onSubmission?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [impact, setImpact] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [frequency, setFrequency] = useState<"once" | "daily" | "weekly" | "monthly">("once");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const handleTitleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleTaskFormSubmit = (e: any) => {
    console.log("Task Form submitted");
    e.preventDefault();
    onSubmission && onSubmission();

    const newTask = {
      id: uuidv4(),
      title,
      completed: false,
      deadline: date,
      impact,
      difficulty,
      estimatedDuration,
      actualDurationInMinutes: 0,
      description,
      recurrence: {
        frequency: frequency,
        daysOfWeek: daysOfWeek,
      },
      subtasks,
    };

    const updateLocalStorageTasks = () => {
      addLocalTask(newTask);
    };

    const updateTasksStore = () => {
      const tasks = useTasksStore.getState().tasks;
      const setTasks = useTasksStore.getState().setTasks;
      setTasks([...tasks, newTask]);
    };

    console.log("New Task:", newTask);

    e.preventDefault();
    updateLocalStorageTasks();
    updateTasksStore();

    setTitle("");
    setDate(undefined);
    setImpact("");
    setDifficulty("");
    setEstimatedDuration(0);
    setFrequency("once");
    setDaysOfWeek([]);
    setDescription("");
    setSubtasks([]);

    console.log("LocalStorage Tasks:", getLocalTasks());
    console.log("Tasks Store:", useTasksStore.getState().tasks);
  };

  return (
    <form onSubmit={handleTaskFormSubmit} className={cn(className, "gap-2 flex flex-col relative")}>
      <input
        type="text"
        placeholder="Add Task"
        onChange={handleTitleInputChange}
        value={title}
        // onFocus={() => setInputFocused(true)}
        // onBlur={() => setInputFocused(false)}
        className={`px-3 py-2 outline-blue-600 outline-4 w-full placeholder-gray-600 bg-neutral-800 rounded-md`}
      />

      <div className={`flex gap-1 absolute right-2`}>
        <DatePickerWithPresets date={date} setDate={setDate} />
      </div>
      <div className="flex flex-col gap-7 mt-5 mb-14">
        <Selection
          title="Impact"
          items={[
            { text: "Minor", value: "minor" },
            { text: "Moderate", value: "moderate" },
            { text: "Critical", value: "critical" },
          ]}
          icon={<ZapIcon />}
          onSelect={setImpact}
          defaultValue={impact}
        />
        <Selection
          title="Difficulty"
          items={[
            { text: "Simple", value: "simple" },
            { text: "Moderate", value: "moderate" },
            { text: "Complex", value: "complex" },
          ]}
          icon={<FlameIcon />}
          onSelect={setDifficulty}
          defaultValue={difficulty}
        />
        <Selection
          title="Estimated Duration"
          items={[
            { text: "5", value: 5 },
            { text: "25", value: 25 },
            { text: "60", value: 60 },
            { text: "90", value: 90 },
            { text: "3h", value: 180 },
            { text: "5h", value: 300 },
            { text: "8h", value: 480 },
          ]}
          icon={<ClockIcon />}
          onSelect={setEstimatedDuration}
          defaultValue={estimatedDuration}
        />
        <Textarea
          className="resize-none border-none focus-visible:ring-0 bg-neutral-800"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Add subtask"
            className="border-none bg-neutral-800 focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Subtask added:", (e.target as HTMLInputElement).value);
                e.preventDefault();
                setSubtasks([
                  ...subtasks,
                  { id: uuidv4(), title: (e.target as HTMLInputElement).value, completed: false },
                ]);
                (e.target as HTMLInputElement).value = ""; // to clear the input field
              }
            }}
          />
          <div className="flex flex-col gap-2 mb-4">
            {subtasks.map((subtask, index) => (
              <div className="flex space-x-2" key={index}>
                <Checkbox
                  id={`subtask-${index}`}
                  checked={subtask.completed}
                  onClick={() => {
                    const updatedSubtasks = subtasks.map((item) =>
                      item.id === subtask.id ? { ...item, completed: !item.completed } : item
                    );
                    setSubtasks(updatedSubtasks);
                  }}
                />
                <label
                  htmlFor={`subtask-${index}`}
                  className="text-sm font-medium leading-none text-neutral-200"
                >
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button className="dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
                Repeat
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-3">
                <Selection
                  title={"Repeat"}
                  items={[
                    { text: "Once", value: "once" },
                    { text: "Daily", value: "daily" },
                    { text: "Weekly", value: "weekly" },
                    { text: "Monthly", value: "monthly" },
                  ]}
                  icon={<RepeatIcon />}
                  onSelect={setFrequency}
                  defaultValue={frequency}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <button
        className={`bg-orange-400 py-2 px-4 rounded-lg w-full font-bold sticky bottom-0 disabled:bg-orange-200`}
        disabled={!title}
        onClick={handleTaskFormSubmit}
      >
        Create task
      </button>
    </form>
  );
}

export default TaskCreationForm;
