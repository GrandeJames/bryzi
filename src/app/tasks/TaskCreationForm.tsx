"use client";

import { addLocalTask, getLocalTasks } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/lib/utils";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";

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
      className={cn(className, "gap-2 flex flex-col")}
    >
      <input
        type="text"
        placeholder="Add Task"
        onChange={handleTitleInputChange}
        value={title}
        className="px-3 py-2 outline-blue-600 outline-4 w-full placeholder-gray-600"
      />
      {title && (
        <div>
          <div className="flex gap-5">
            <DatePickerWithPresets />
            <div>Impact</div>
            <div>Est. Duration (hrs)</div>
            <input
              id="est-duration"
              type="number"
              step={0.5}
              className="w-12 border-gray-600 border"
              max={10}
              min={0}
              onChange={(e) => setEstimatedDuration(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default TaskCreationForm;
