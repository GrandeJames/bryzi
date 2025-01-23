import { Task } from "@/types/task";
import { STAGES } from "@/stores/focusSessionStore";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { addLocalStorageItems } from "./localStorageUtils";

export function handleSessionDiscard(reset: () => void) {
  handleSessionExit(reset);
}

export function handleSessionEnd(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  saveFocusEntries();
  handleSessionExit(reset);
}

export function handleSessionSave(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  saveFocusEntries();
  handleSessionExit(reset);
}

function saveFocusEntries() {
  const temporaryFocusEntries = useFocusTrackerStore.getState().temporaryFocusEntries;
  console.log("focus entries to add", temporaryFocusEntries);
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
