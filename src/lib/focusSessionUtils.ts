import { Task } from "@/types/task";
import { handleTaskComplete } from "./taskUtils";

function handleStartSession(startSession: () => void) {}

function handleExitSession(reset: () => void) {
  document.title = "Focus";
  reset();
}

function handleCompleteSession(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  document.title = "Focus";
  reset();
  handleTaskComplete(task, updateTask);

  // TODO: save focus duration
  // create a focus sessions store which will store an array of objects with task id, start date, end date, and maybe duration

export function getNextStage(currentStage: string | undefined) {
  if (!currentStage) {
    return STAGES[0];
  }

  const currentStageIndex = STAGES.indexOf(currentStage);
  return STAGES[currentStageIndex + 1];
}

}

// saveFocusDuration: () => {
//     set((state) => {
//       const currentDate = new Date();
//       const minutesDifference = differenceInMinutes(currentDate, state.focusStartDate!);
//       return { focusedDuration: state.focusedDuration + minutesDifference };
//     });
//   },

export { handleStartSession, handleExitSession, handleCompleteSession };
