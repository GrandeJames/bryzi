import { useState, MouseEvent } from "react";

function Selection({
  title,
  items,
  icon,
  defaultValue,
  onSelect,
}: {
  title: string;
  items: {
    text: string;
    value: any;
  }[];
  icon?: React.ReactNode;
  defaultValue?: any;
  onSelect: (value: any) => void;
}) {
  const handleSelectionButtonClick = (e: MouseEvent, item: any) => {
    e.preventDefault();
    onSelect(item.value ? item.value : item);
    console.log("Selected item:", item);
  };

  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <div className="dark:text-neutral-300 text-neutral-800 flex gap-2 font-medium items-center">
          {title}
        </div>
      </header>
      <div className="flex justify-between px-5 py-2 dark:bg-neutral-900 bg-neutral-50 rounded-md">
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            className={`py-1 px-3 rounded-md text-sm dark:text-neutral-200 text-neutral-400 ${
              defaultValue === item.value &&
              "bg-orange-400 dark:text-white text-neutral-50 font-medium"
            }`}
            onClick={(e) => handleSelectionButtonClick(e, item)}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Selection;
