import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { ClassTask } from "@/types/classTask";

function FocusStageSwitchButton({
  task: taskProp,
  className,
  children,
}: {
  task?: ClassTask;
  className?: string;
  children?: React.ReactNode;
}) {
  const initializeSession = useFocusSessionStore.getState().initializeSession;
  const currentStage = useFocusSessionStore.getState().sessionStage;

  return (
    <button
      className={className}
      onClick={() => {
        if (!currentStage) {
          taskProp && initializeSession(taskProp);
        } else {
          useFocusSessionStore.getState().proceedToNextStage();
        }
      }}
    >
      {children}
    </button>
  );
}

export default FocusStageSwitchButton;
