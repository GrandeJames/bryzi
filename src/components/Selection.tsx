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
        <div className="text-gray-300 flex gap-2 font-medium items-center">
          <div className="flex items-center justify-center h-4 w-4">{icon}</div> {title}
        </div>
      </header>
      <div className="flex justify-between px-5 py-2 bg-neutral-900 rounded-md">
        {items.map((item, index) => (
          <button
            key={index}
            className={`py-1 px-3 rounded-md text-sm text-neutral-200 ${
              defaultValue === item.value && "bg-orange-400"
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
