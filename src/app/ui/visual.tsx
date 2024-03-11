import { useEffect } from "react";

const VISUAL_FOCUS_TIME_SECONDS = 6;

function Visual({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, VISUAL_FOCUS_TIME_SECONDS * 1000);
  });

  return (
    <>
      <h1>Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds </h1>
      <div className="flex items-center justify-center h-full">
        <div className="rounded-full bg-orange-300 w-10 h-10"></div>
      </div>
    </>
  );
}

export default Visual;
