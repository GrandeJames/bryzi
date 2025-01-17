"use client";

import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";
import { useFocusStore } from "@/stores/focusStore";
import { useEffect } from "react";

const VISUAL_FOCUS_TIME_SECONDS = 90;

export function VisualStage() {
  const { skipStage } = useFocusStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      skipStage();
    }, VISUAL_FOCUS_TIME_SECONDS * 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      <div className="h-[75vh] flex justify-center items-center">
        <div>
          <p className="dark:text-gray-200 text-gray-900">
            Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds{" "}
          </p>
          <div className="flex items-center justify-center h-[300px]">
            <div className="rounded-full bg-orange-400 size-10"></div>
          </div>
        </div>
      </div>

      <ActionsContainer>
        <ExitStage />
        <SkipStage />
      </ActionsContainer>
    </>
  );
}
