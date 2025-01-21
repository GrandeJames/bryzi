import { Task } from "@/types/task";
import { handleTaskComplete } from "./taskUtils";
import { STAGES } from "@/stores/focusSessionStore";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { addLocalStorageItem } from "./localStorageUtils";

function handleExitSession(reset: () => void) {
  document.title = "Focus";
  reset();
}

// TODO: refactor
function handleCompleteSession(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  document.title = "Focus";
  reset();
  handleTaskComplete(task, updateTask);

  const temporaryStartDate = useFocusTrackerStore.getState().temporaryStartDate;

  if (!temporaryStartDate) {
    return;
  }
  useFocusTrackerStore.getState().addFocusEntry({
    taskId: task.id,
    startDate: temporaryStartDate,
    endDate: new Date(),
  });
  addLocalStorageItem("focusEntries", {
    taskId: task.id,
    startDate: temporaryStartDate,
    endDate: new Date(),
  });

  // TODO: handle pausing
  console.log("log entries", useFocusTrackerStore.getState().focusEntries);
}

export function getNextStage(currentStage: string | undefined) {
  if (!currentStage) {
    return STAGES[0];
  }

  const currentStageIndex = STAGES.indexOf(currentStage);
  return STAGES[currentStageIndex + 1];
}

// saveFocusDuration: () => {
//     set((state) => {
//       const currentDate = new Date();
//       const minutesDifference = differenceInMinutes(currentDate, state.focusStartDate!);
//       return { focusedDuration: state.focusedDuration + minutesDifference };
//     });
//   },

export { handleExitSession, handleCompleteSession };
