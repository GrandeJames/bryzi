import { useEffect, useState } from "react";
import { useFocusStore } from "./useFocusStore";

const INHALE_TIME_SECONDS = 4;
const HOLD_TIME_SECONDS = 7;
const EXHALE_TIME_SECONDS = 8;
const BREATHING_CYCLES = 4;

export function useBreathingCycle() {
  const { complete } = useFocusStore();

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
          complete();
        }
      }
    }, stageDurations[stage] * 1000);

    return () => clearTimeout(timer);
  }, [cycle, complete, stage]);

  const cyclesLeft = BREATHING_CYCLES - cycle + 1;

  return { stage, cyclesLeft };
}
