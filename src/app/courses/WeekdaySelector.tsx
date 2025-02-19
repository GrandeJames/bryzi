import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Day {
  label: string;
  value: string;
}

export default function WeekdaySelector() {
  const days: Day[] = [
    {
      label: "M",
      value: "mon",
    },
    {
      label: "T",
      value: "tue",
    },
    {
      label: "W",
      value: "wed",
    },
    {
      label: "T",
      value: "thu",
    },
    {
      label: "F",
      value: "fri",
    },
  ];

  const [selectedDays, setSelectedDays] = useState<Day["value"][]>([]);

  function Day({ day }: { day: { label: string; value: string } }) {
    const handleDayClick = (event: React.MouseEvent) => {
      event.preventDefault();
      console.log(`Day ${day.value} clicked`);
      setSelectedDays((prevSelectedDays) => {
        if (prevSelectedDays.includes(day.value)) {
          return prevSelectedDays.filter((selectedDay) => selectedDay !== day.value);
        } else {
          return [...prevSelectedDays, day.value];
        }
      });
    };
    return (
      <button
        className={`size-10 rounded-full flex justify-center items-center ${
          selectedDays.includes(day.value)
            ? "bg-orange-400 text-white"
            : "bg-neutral-100 text-neutral-300"
        }`}
        onClick={handleDayClick}
      >
        {day.label}
      </button>
    );
  }

  return (
    <div className="flex gap-3">
      {days.map((day) => (
        <Day key={day.value} day={day} />
      ))}
    </div>
  );
}
