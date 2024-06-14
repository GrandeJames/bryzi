"use client";

import { useState } from "react";

function Tasks() {
  // TODO: obtain all of users tasks
  // TODO: filter tasks based on selected tab
  // TODO: clean up repetitive code

  return (
    <div className="flex min-h-screen">
      <TasksNavbar />
      <CreateTaskForm />
    </div>
  );
}

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

function CreateTaskForm() {
  const [title, setTitle] = useState("");

  const handleTitleInputChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: create a post request.
    console.log("handle submit. e,", e);
  };

  return (
    <form className="border border-gray-800 h-min">
      <input type="text" placeholder="Task title" onChange={handleTitleInputChange} />
      {title && (
        <div>
          <div>Date</div>
          <div>Deadline</div>
          <div>Importance</div>
          <div>Difficulty</div>
          <div>Duration</div>
          <div>Reward</div>
          <div>Tag</div>
        </div>
      )}
    </form>
  );
}

function TasksNavbar() {
  const [selectedTab, setSelectedTab] = useState("Today");

  const onTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <ul className="flex flex-col px-5 py-10 space-y-1">
        <li>
          <button
            className={`${selectedTab === "Today" && "bg-white text-black"}`}
            onClick={() => onTabClick("Today")}
          >
            Today
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Tomorrow" && "bg-white text-black"}`}
            onClick={() => onTabClick("Tomorrow")}
          >
            Tomorrow
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Next 5 Days" && "bg-white text-black"}`}
            onClick={() => onTabClick("Next 5 Days")}
          >
            Next 5 Days
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Inbox" && "bg-white text-black"}`}
            onClick={() => onTabClick("Inbox")}
          >
            All
          </button>
        </li>
        <hr />
        <li>
          <button
            className={`${selectedTab === "Completed" && "bg-white text-black"}`}
            onClick={() => onTabClick("Completed")}
          >
            Completed
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Deleted" && "bg-white text-black"}`}
            onClick={() => onTabClick("Deleted")}
          >
            Deleted
          </button>
        </li>
      </ul>
    </>
  );
}

export default Tasks;
