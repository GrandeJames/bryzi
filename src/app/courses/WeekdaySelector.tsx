interface Day {
  label: string;
  value: number;
}

const days: Day[] = [
  {
    label: "M",
    value: 1,
  },
  {
    label: "T",
    value: 2,
  },
  {
    label: "W",
    value: 3,
  },
  {
    label: "T",
    value: 4,
  },
  {
    label: "F",
    value: 5,
  },
];

export default function WeekdaySelector({
  setSelectedDays,
  selectedDays,
}: {
  setSelectedDays: any;
  selectedDays: any;
}) {
  return (
    <div className="flex gap-3">
      {days.map((day: { value: any; label?: string }) => (
        <Day key={day.value} day={day} setDays={setSelectedDays} selectedDays={selectedDays} />
      ))}
    </div>
  );
}

function Day({ day, setDays, selectedDays }: { day: any; setDays: any; selectedDays: any }) {
  const handleDayClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(`Day ${day.value} clicked`);
    console.log("selectedDays", selectedDays);
    setDays((prevSelectedDays: number[]) => {
      if (!prevSelectedDays) {
        return [day.value];
      }
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
        selectedDays?.includes(day.value)
          ? "border border-neutral-200 dark:bg-neutral-200 dark:border-none text-neutral-700 dark:text-neutral-600 font-medium"
          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-500"
      }`}
      onClick={handleDayClick}
    >
      {day.label}
    </button>
  );
}
