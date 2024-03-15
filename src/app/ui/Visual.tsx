import { useEffect } from "react";

const VISUAL_FOCUS_TIME_SECONDS = 90;

function Visual({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, VISUAL_FOCUS_TIME_SECONDS * 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="space-y-10">
      <p className="text-gray-200">Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds </p>
      <div className="flex items-center justify-center h-[200px]">
        <div className="rounded-full bg-orange-400 size-10"></div>
      </div>
    </div>
  );
}

export default Visual;
