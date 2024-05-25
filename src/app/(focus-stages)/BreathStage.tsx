"use client";

import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";
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
      <div className="flex flex-col align-middle text-center">
        <div className="font-semibold text-9xl text-orange-400">{cyclesLeft}</div>
        {stage === "inhale" && <div>{breathLabels.inhale}</div>}
        {stage === "hold" && <div>{breathLabels.hold}</div>}
        {stage === "exhale" && <div>{breathLabels.exhale}</div>}
      </div>

      <ActionsContainer>
        <ExitStage />
        <SkipStage />
      </ActionsContainer>
    </>
  );
}
