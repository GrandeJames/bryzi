'use client';

import { useState } from "react";

function TasksNavbar({className}: {className?: string}) {
  const [selectedTab, setSelectedTab] = useState("Today");

  const onTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className={className}>
      <ul className="flex font-bol text-gray-600 font-bold text-4xl space-x-5">
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
            className={`${selectedTab === "Tomorrow" && "text-white"}`}
            onClick={() => onTabClick("Tomorrow")}
          >
            Tomorrow
          </button>
        </li>
        <li>
          <button
            className={`${selectedTab === "Inbox" && "text-white"}`}
            onClick={() => onTabClick("Inbox")}
          >
            All
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TasksNavbar;
