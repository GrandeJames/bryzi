import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import SkipStage from "@/components/SkipStage";

export function PrepareStage() {

  // TODO: make this configurable
  const prepareMessages = ["Declutter your space (physical and digital)", "Hydrate"];

  return (
    <>
      <ul>
        {prepareMessages.map((message, index) => (
          <li key={index} className="text-orange-400">
            - {message}
          </li>
        ))}
      </ul>

      <ActionsContainer>
        <ExitStage />
        <SkipStage />
      </ActionsContainer>
    </>
  );
}
