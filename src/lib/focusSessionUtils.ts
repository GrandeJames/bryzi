import { Task } from "@/types/task";
import { STAGES } from "@/stores/focusSessionStore";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { addLocalStorageItem } from "./localStorageUtils";

export function handleSessionDiscard(reset: () => void) {
  handleSessionExit(reset);
}

export function handleSessionEnd(reset: () => void, task: Task, updateTask: (task: Task) => void) {
  handleSessionExit(reset);

  // TODO: this shouldnt be called on timer complete
  // taskUtils.handleTaskComplete(task, updateTask);

  addSessionFocusEntry(task);
}

function handleSessionExit(reset: () => void) {
  document.title = "Focus";
  reset();
}

function addSessionFocusEntry(task: Task) {
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

  console.log("log entries", useFocusTrackerStore.getState().focusEntries);
}

export function getNextStage(currentStage: string | undefined) {
  if (!currentStage) {
    return STAGES[0];
  }

  const currentStageIndex = STAGES.indexOf(currentStage);
  return STAGES[currentStageIndex + 1];
}
