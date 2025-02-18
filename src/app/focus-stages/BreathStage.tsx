"use client";

import ActionsContainer from "@/components/Actions";
import DiscardSessionButton from "@/app/focus-stages/DiscardSessionButton";
import NextStageButton from "@/app/focus-stages/NextStageButton";
import { useBreathingCycle } from "@/hooks/useBreathingCycle";

export function BreathStage() {
  const { stage, cyclesLeft } = useBreathingCycle();

  const breathLabels = {
    inhale: "inhale through your nose",
    hold: "hold",
    exhale: "exhale through your mouth",
  };

  return (
    <>
      <div className="h-[75vh] flex justify-center">
        <div className="flex flex-col align-middle justify-center text-center">
          <div className="font-semibold text-9xl text-orange-400">{cyclesLeft}</div>
          {stage === "inhale" && <div className="text-neutral-400 dark:text-neutral-300">{breathLabels.inhale}</div>}
          {stage === "hold" && <div className="text-neutral-400 dark:text-neutral-300">{breathLabels.hold}</div>}
          {stage === "exhale" && <div className="text-neutral-400 dark:text-neutral-300">{breathLabels.exhale}</div>}
        </div>
      </div>

      <ActionsContainer>
        <DiscardSessionButton />
        <NextStageButton />
      </ActionsContainer>
    </>
  );
}
