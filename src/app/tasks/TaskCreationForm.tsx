"use client";

import { addLocalTask, getLocalTasks } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";

function TaskCreationForm() {
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
      className="border border-gray-800 h-min w-[30rem]"
      onSubmit={handleTaskFormSubmit}
      onKeyDown={handleKeyPress}
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
            <div>Deadline</div>
            <div>Impact</div>
            <div>Est. Duration (hrs)</div>
            <input
              id="est-duration"
              type="number"
              step={0.5}
              className="w-12 border-gray-600 border-2"
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
