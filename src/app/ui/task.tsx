import { useEffect } from "react";

const TASK_TIME = 1000 * 3;

function Task({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, TASK_TIME);

    return () => clearTimeout(timer);
  });

  return <div>Focus on the task for {TASK_TIME}</div>;
}

export default Task;
