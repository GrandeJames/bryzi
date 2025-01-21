import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import NextStageButton from "@/components/SkipStageButton";

export function PrepareStage() {
  const prepareMessages = ["Declutter your space (physical and digital)", "Hydrate"];

  return (
    <>
      <div className="h-[75vh] flex justify-center items-center">
        <ul>
          {prepareMessages.map((message, index) => (
            <li key={index} className="text-orange-400">
              - {message}
            </li>
          ))}
        </ul>
      </div>

      <ActionsContainer>
        <ExitStage />
        <NextStageButton />
      </ActionsContainer>
    </>
  );
}
