"use client";

import { useState } from "react";

function Tasks() {
  const [selectedTab, setSelectedTab] = useState("Today");

  const onTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex min-h-screen">
      <ul className="flex flex-col border-r border-gray-800">
        <button
          className={`${selectedTab === "Today" && "bg-white text-black"}`}
          onClick={() => onTabClick("Today")}
        >
          Today
        </button>
        <button
          className={`${selectedTab === "Tomorrow" && "bg-white text-black"}`}
          onClick={() => onTabClick("Tomorrow")}
        >
          Tomorrow
        </button>
        <button
          className={`${selectedTab === "Next 7 Days" && "bg-white text-black"}`}
          onClick={() => onTabClick("Next 7 Days")}
        >
          Next 7 Days
        </button>
        <button
          className={`${selectedTab === "Inbox" && "bg-white text-black"}`}
          onClick={() => onTabClick("Inbox")}
        >
          Inbox
        </button>
        <button
          className={`${selectedTab === "Completed" && "bg-white text-black"}`}
          onClick={() => onTabClick("Completed")}
        >
          Completed
        </button>
      </ul>
      <div>test</div>
    </div>
  );
}

export default Tasks;
