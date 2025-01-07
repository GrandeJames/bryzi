"use client";

import { addLocalTask, getLocalTasks } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/lib/utils";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";
import { FlameIcon, Zap as ZapIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";

function TaskCreationForm({ className }: { className?: string }) {
  const [title, setTitle] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState(0);

  const handleTitleInputChange = (e: any) => {
    setTitle(e.target.value);
    console.log("Title:", title);
  };

  const handleTaskFormSubmit = (e: any) => {
    console.log("Task Form submitted");

    const newTask = { id: uuidv4(), title, completed: false };

    const updateLocalStorageTasks = () => {
      addLocalTask(newTask);
    };

    const updateTasksStore = () => {
      const tasks = useTasksStore.getState().tasks;
      const setTasks = useTasksStore.getState().setTasks;
      setTasks([...tasks, newTask]);
    };

    e.preventDefault();
    updateLocalStorageTasks();
    updateTasksStore();
    setTitle(""); // to reset the input field

    console.log("LocalStorage Tasks:", getLocalTasks());
    console.log("Tasks Store:", useTasksStore.getState().tasks);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTaskFormSubmit(e);
      console.log("Enter key pressed");
    }
  };

  return (
    <form
      onSubmit={handleTaskFormSubmit}
      onKeyDown={handleKeyPress}
      className={cn(className, "gap-2 flex flex-col relative")}
    >
      <input
        type="text"
        placeholder="Add Task"
        onChange={handleTitleInputChange}
        value={title}
        // onFocus={() => setInputFocused(true)}
        // onBlur={() => setInputFocused(false)}
        className={`px-3 py-2 outline-blue-600 outline-4 w-full placeholder-gray-600 bg-neutral-900 rounded-md`}
      />
      {title && (
        <>
          <div className={`flex gap-1 absolute right-2`}>
            <DatePickerWithPresets />
          </div>
          <div className="flex flex-col gap-7 mt-5">
            <Selection title="Impact" items={["Low", "Medium", "High"]} icon={<ZapIcon />} />
            {/* difficulty */}
            <Selection title="Difficulty" items={["Low", "Medium", "High"]} icon={<FlameIcon />} />
            {/* <Selection title="Duration" items={["5m", "25m", "60m", "90m"]} />
            <Selection title="Recurring" items={["Once", "Daily", "Weekly", "Monthly"]} defaultItemId={0} /> */}
            <Textarea
              className="resize-none border-none focus-visible:ring-0 bg-neutral-900"
              placeholder="Description"
            />
            <input placeholder="Add subtask" className="py-2 px-3 rounded-md" />
          </div>
          <div className="flex justify-end mt-5">
            <button className="bg-neutral-800 py-2 px-4 rounded-lg">Add task</button>
          </div>
        </>
      )}
    </form>
  );
}

function Selection({
  title,
  items,
  defaultItemId,
  icon,
}: {
  title: string;
  items: string[];
  defaultItemId?: number;
  icon?: React.ReactNode;
}) {
  const [selectedItem, setSelectedItem] = useState(defaultItemId);
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <div className="text-gray-400 flex gap-2">
          {icon} {title}
        </div>
      </header>
      <div className="flex justify-between px-5 py-2 bg-neutral-900 rounded-md">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setSelectedItem(index);
            }}
            className={`py-1 px-4 rounded-md ${selectedItem == index && "bg-neutral-700"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskCreationForm;
