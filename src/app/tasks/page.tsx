"use client";

import { useState } from "react";

function Tasks() {
  // TODO: obtain all of users tasks
  // TODO: filter tasks based on selected tab
  // TODO: clean up repetitive code

  return (
    <div className="flex min-h-screen">
      <TasksNavbar />
      <div>test</div>
    </div>
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
            className={`${selectedTab === "Next 7 Days" && "bg-white text-black"}`}
            onClick={() => onTabClick("Next 7 Days")}
          >
            Next 7 Days
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Inbox" && "bg-white text-black"}`}
            onClick={() => onTabClick("Inbox")}
          >
            Inbox
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
