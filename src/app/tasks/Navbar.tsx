"use client";

import { useState } from "react";

function TasksNavbar({ className }: { className?: string }) {
  const [selectedTab, setSelectedTab] = useState("Inbox");

  const onTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className={className}>
      <ul className="flex font-bol text-gray-600 font-bold text-4xl space-x-7">
        <li>
          <button
            className={`${selectedTab === "All" && "text-white"}`}
            onClick={() => onTabClick("All")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Inbox" && "text-white"}`}
            onClick={() => onTabClick("Inbox")}
          >
            Inbox
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Completed" && "text-white"}`}
            onClick={() => onTabClick("Completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TasksNavbar;
