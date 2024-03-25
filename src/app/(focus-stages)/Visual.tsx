import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";
import { useEffect } from "react";

const VISUAL_FOCUS_TIME_SECONDS = 90;

interface VisualProps {
  onComplete: () => void;
  handleExit: () => void;
  handleSkipStage: () => void;
}

export function Visual({ onComplete, handleExit, handleSkipStage }: VisualProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, VISUAL_FOCUS_TIME_SECONDS * 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      <p className="dark:text-gray-200 text-gray-900">
        Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds{" "}
      </p>
      <div className="flex items-center justify-center h-[300px]">
        <div className="rounded-full bg-orange-400 size-10"></div>
      </div>

      <Actions>
        <ExitStage handleExitStage={handleExit} />
        <SkipStage handleSkipStage={handleSkipStage} />
      </Actions>
    </>
  );
}
