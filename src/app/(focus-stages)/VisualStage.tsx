"use client";

import ActionsContainer from "@/components/Actions";
import DiscardSessionButton from "@/app/(focus-stages)/DiscardSessionButton";
import NextStageButton from "@/app/(focus-stages)/NextStageButton";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { useEffect } from "react";

const VISUAL_FOCUS_TIME_SECONDS = 90;

export function VisualStage() {
  const { nextSessionStage: skipStage } = useFocusSessionStore();

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
        <DiscardSessionButton />
        <NextStageButton />
      </ActionsContainer>
    </>
  );
}
