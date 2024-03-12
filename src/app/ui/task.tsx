import { useEffect, useState } from "react";

const TASK_TIME_MINUTES = 90;

function Task({ onComplete }: { onComplete: () => void }) {
  const [minutesLeft, setMinutesLeft] = useState(TASK_TIME_MINUTES);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, TASK_TIME_MINUTES * 60 * 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesLeft((prev) => prev - 1);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="font-semibold">
        <span className="text-9xl text-orange-400">{minutesLeft}</span> minutes left
      </div>
      <div className="text-gray-200">Focus on your task. You got this!</div>
    </>
  );
}

export default Task;
