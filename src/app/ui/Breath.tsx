import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";
import { useEffect, useState } from "react";

const INHALE_TIME_SECONDS = 4;
const HOLD_TIME_SECONDS = 7;
const EXHALE_TIME_SECONDS = 8;
const BREATHING_CYCLES = 4;

function Breath({
  onComplete,
  handleExit,
  handleSkipStage,
}: {
  onComplete: () => void;
  handleExit: () => void;
  handleSkipStage: () => void;
}) {
  const [stage, setStage] = useState("inhale");
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    const stages = ["inhale", "hold", "exhale"];
    const currentStageIndex = stages.findIndex((s) => s === stage);

    const nextStage = stages[currentStageIndex + 1];

    const stageDurations: { [key: string]: number } = {
      inhale: INHALE_TIME_SECONDS,
      hold: HOLD_TIME_SECONDS,
      exhale: EXHALE_TIME_SECONDS,
    };

    const timer = setTimeout(() => {
      if (nextStage) {
        setStage(nextStage);
      } else {
        setStage(stages[0]);
        if (cycle < BREATHING_CYCLES) {
          setCycle(cycle + 1);
        } else {
          onComplete();
        }
      }
    }, stageDurations[stage] * 1000);

    return () => clearTimeout(timer);
  }, [cycle, onComplete, stage]);

  const cyclesLeft = BREATHING_CYCLES - cycle + 1;

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

export default Breath;
