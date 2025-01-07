"use client";

import { addLocalTask, getLocalTasks } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/lib/utils";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";
import { Clock, ClockIcon, FlameIcon, RepeatIcon, Zap as ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import Selection from "./Selection";

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
            <Selection
              title="Impact"
              items={["Minor", "Moderate", "Critical"]}
              icon={<ZapIcon />}
            />
            {/* difficulty */}
            <Selection
              title="Difficulty"
              items={["Simple", "Moderate", "Complex"]}
              icon={<FlameIcon />}
            />
            <Selection title="Duration" items={["5m", "25m", "60m", "90m"]} icon={<ClockIcon />} />
            <Selection
              title={"Repeat"}
              items={["Once", "Daily", "Weekly", "Monthly"]}
              defaultItemId={0}
              icon={<RepeatIcon />}
            />

            {/* <Selection title="Recurring" items={["Once", "Daily", "Weekly", "Monthly"]} defaultItemId={0} /> */}
            <Textarea
              className="resize-none border-none focus-visible:ring-0 bg-neutral-900"
              placeholder="Description"
            />
            <input placeholder="Add subtask" className="py-2 px-3 rounded-md" />
          </div>
          <div className="mt-5">
            <button className="bg-orange-500 py-2 px-4 rounded-lg w-full font-bold">Create task</button>
          </div>
        </>
      )}
    </form>
  );
}

export default TaskCreationForm;
