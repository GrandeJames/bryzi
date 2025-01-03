'use client';

import { addLocalTask, getLocalTasks } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TaskCreationForm() {
  const [title, setTitle] = useState("");

  const handleTitleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleTaskFormSubmit = (e: any) => {
    console.log("Task Form submitted");

    e.preventDefault();
    addLocalTask({
      id: uuidv4(),
      title,
      completed: false,
    });
    setTitle("");

    console.log("Tasks:", getLocalTasks());
  };

  return (
    <form className="border border-gray-800 h-min w-[30rem]" onSubmit={handleTaskFormSubmit}>
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
            <div>Date</div>
            <div>Impact</div>
            <div>Duration</div>
          </div>
        </div>
      )}
    </form>
  );
}

export default TaskCreationForm;
