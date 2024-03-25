import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";
import { useBreathingCycle } from "@/hooks/useBreathingCycle";

export function Breath() {
  const { stage, cyclesLeft } = useBreathingCycle();

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
        <ExitStage />
        <SkipStage />
      </Actions>
    </>
  );
}
