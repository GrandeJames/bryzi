import { useEffect } from "react";

const TASK_TIME_MINUTES = 90;

function Task({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, TASK_TIME_MINUTES * 60 * 1000);

    return () => clearTimeout(timer);
  });

  return <div>Focus on the task for {TASK_TIME_MINUTES} minutes</div>;
}

export default Task;
