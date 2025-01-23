import { Task } from "@/types/task";
import { STAGES } from "@/stores/focusSessionStore";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { addLocalStorageItems } from "./localStorageUtils";
import { getActualDurationInMinutes, handleTaskUpdate } from "./taskUtils";

export function handleSessionDiscard(reset: () => void) {
  handleSessionExit(reset);
}

export function handleSessionSave(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  saveFocusEntries();

  const actualDuration = getActualDurationInMinutes(task);

  const updatedTask = {
    ...task,
    actualDurationInMins: actualDuration,
  };
  handleTaskUpdate(updatedTask, updateTask); // this is necessary to update the task in the task list

  handleSessionExit(reset);
}

function saveFocusEntries() {
  const temporaryFocusEntries = useFocusTrackerStore.getState().temporaryFocusEntries;
  addLocalStorageItems("focusEntries", temporaryFocusEntries);
}

function handleSessionExit(reset: () => void) {
  document.title = "Focus";
  reset();

  const resetFocusTracker = useFocusTrackerStore.getState().resetFocusTracker;
  resetFocusTracker();
}

export function getNextStage(currentStage: string | undefined) {
  if (!currentStage) {
    return STAGES[0];
  }

  const currentStageIndex = STAGES.indexOf(currentStage);
  return STAGES[currentStageIndex + 1];
}
