import { getNextStage } from "@/lib/focusSessionUtils";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
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
  const sessionTask = useFocusSessionStore.getState().sessionTask;

  const initializeFocusTracker = useFocusTrackerStore.getState().intializeFocusTracker;

  return (
    <button
      className={className}
      onClick={() => {
        if (getNextStage(currentStage) === "timer") {
          sessionTask && initializeFocusTracker(sessionTask.id);
        }
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
