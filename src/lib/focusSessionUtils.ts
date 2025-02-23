import { STAGES } from "@/stores/focusSessionStore";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { addLocalStorageItems } from "./localStorageUtils";
import { getActualDurationMins, handleTaskUpdate } from "./taskUtils";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Task } from "@/types/task";

export function handleSessionDiscard(reset: () => void) {
  handleSessionExit(reset);
}

export function handleSessionSave(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  saveFocusEntries();

  const actualDuration = getActualDurationMins(task);

  const updatedTask = {
    ...task,
    actualDurationInMins: actualDuration,
  };
  handleTaskUpdate(updatedTask, updateTask); // this is necessary to update the task in the task list

  handleSessionExit(reset);
}

/**
 * Using getState is okay here because the page is rerendered after submission/timer end.
 */
function saveFocusEntries() {
  const temporaryFocusEntries = useFocusTrackerStore.getState().temporaryFocusEntries;
  const focusEntries = useFocusTrackerStore.getState().focusEntries;
  const setFocusEntries = useFocusTrackerStore.getState().setFocusEntries;

  setFocusEntries([...focusEntries, ...temporaryFocusEntries]);
  addLocalStorageItems(LOCAL_STORAGE_KEYS.FOCUS_ENTRIES, temporaryFocusEntries);
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
