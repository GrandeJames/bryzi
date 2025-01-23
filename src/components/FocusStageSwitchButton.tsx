import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { Task } from "@/types/task";

function FocusStageSwitchButton({
  task: taskProp,
  className,
  children,
}: {
  task?: Task;
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
