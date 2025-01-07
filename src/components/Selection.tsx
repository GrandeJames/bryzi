import { useState } from "react";

function Selection({
  title,
  items,
  defaultItemId,
  icon,
}: {
  title: string;
  items: string[];
  defaultItemId?: number;
  icon?: React.ReactNode;
}) {
  const [selectedItem, setSelectedItem] = useState(defaultItemId);
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <div className="text-gray-300 flex gap-1 font-medium items-center">
          <div className="flex items-center justify-center h-4 w-4">{icon}</div> {title}
        </div>
      </header>
      <div className="flex justify-between px-5 py-2 bg-neutral-900 rounded-md">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setSelectedItem(index);
            }}
            className={`py-1 px-3 rounded-md ${
              selectedItem == index && "bg-neutral-700 font-semibold"
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
