import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";

export function Prepare() {
  return (
    <>
      <p className="text-orange-400">Declutter your space (physical and digital)</p>
      <Actions>
        <ExitStage />
        <SkipStage />
      </Actions>
    </>
  );
}
