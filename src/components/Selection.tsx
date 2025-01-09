import { useState } from "react";

function Selection({
  title,
  items,
  defaultItemId,
  icon,
  setStateValue,
}: {
  title: string;
  items: string[];
  defaultItemId?: number;
  icon?: React.ReactNode;
  setStateValue: (value: any) => void;
}) {
  const [selectedItem, setSelectedItem] = useState(defaultItemId);
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <div className="text-gray-300 flex gap-2 font-medium items-center">
          <div className="flex items-center justify-center h-4 w-4">{icon}</div> {title}
        </div>
      </header>
      <div className="flex justify-between px-5 py-2 bg-neutral-900 rounded-md dark:bg-neutral-500/10 backdrop-blur-lg">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setSelectedItem(index);
              setStateValue(items[index].toLowerCase());
            }}
            className={`py-1 px-3 rounded-md ${
              selectedItem == index && "bg-orange-400 font-semibold"
            } text-sm`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Selection;
