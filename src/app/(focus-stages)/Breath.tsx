import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";
import { useBreathingCycle } from "@/hooks/useBreathingCycle";

interface BreathProps {
  onComplete: () => void;
  handleExit: () => void;
  handleSkipStage: () => void;
}

export function Breath({ onComplete, handleExit, handleSkipStage }: BreathProps) {
  const { stage, cyclesLeft } = useBreathingCycle(onComplete);

  return (
    <>
      <div className="flex flex-col align-middle text-center">
        <div className="font-semibold text-9xl text-orange-400">{cyclesLeft}</div>
        <div>
          {stage === "inhale" && <div>inhale through your nose</div>}
          {stage === "hold" && <div>hold</div>}
          {stage === "exhale" && <div>exhale through your mouth</div>}
        </div>
      </div>

      <Actions>
        <ExitStage handleExitStage={handleExit} />
        <SkipStage handleSkipStage={handleSkipStage} />
      </Actions>
    </>
  );
}
