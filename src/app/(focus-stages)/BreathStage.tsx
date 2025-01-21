"use client";

import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import NextStageButton from "@/components/NextStageButton";
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
          {stage === "inhale" && <div>{breathLabels.inhale}</div>}
          {stage === "hold" && <div>{breathLabels.hold}</div>}
          {stage === "exhale" && <div>{breathLabels.exhale}</div>}
        </div>
      </div>

      <ActionsContainer>
        <ExitStage />
        <NextStageButton />
      </ActionsContainer>
    </>
  );
}
