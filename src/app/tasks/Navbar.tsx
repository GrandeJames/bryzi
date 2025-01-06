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
            className={`${selectedTab === "Today" && "text-white"}`}
            onClick={() => onTabClick("Today")}
          >
            Today
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Upcoming" && "text-white"}`}
            onClick={() => onTabClick("Upcoming")}
          >
            Upcoming
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
