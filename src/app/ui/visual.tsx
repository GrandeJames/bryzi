import { useEffect } from "react";

const VISUAL_FOCUS_TIME_SECONDS = 90;

function Visual({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, VISUAL_FOCUS_TIME_SECONDS * 1000);
  });

  return (
    <div className="space-y-10 pb-40">
      <p className="text-gray-200">Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds </p>
      <div className="flex items-center justify-center h-full">
        <div className="rounded-full bg-orange-400 size-10"></div>
      </div>
    </div>
  );
}

export default Visual;
