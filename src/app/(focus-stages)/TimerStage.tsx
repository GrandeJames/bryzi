"use client";

import ActionsContainer from "@/components/Actions";
import DiscardSessionButton from "@/app/(focus-stages)/DiscardSessionButton";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Progress } from "@/components/ui/progress";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { useTimer } from "@/hooks/useTimer";
import { Checkbox } from "@/components/ui/checkbox";
import { Subtask } from "@/types/subtask";
import { handleTaskUpdate } from "@/lib/taskUtils";
import useTasksStore from "@/stores/tasksStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { handleSessionEnd } from "@/lib/focusSessionUtils";

function TimerStage() {
  const focusTask = useFocusSessionStore((state) => state.sessionTask);
  const setFocusTask = useFocusSessionStore((state) => state.setSessionTask);
  const reset = useFocusSessionStore((state) => state.reset);
  const updateTask = useTasksStore((state) => state.updateTask);

  const { secondsLeft, endTime, paused, play, pause, percentComplete } = useTimer(focusTask!);

  // The Select component uses string values for the selected item, so storing subtaskId instead of the subtask object
  const [subtaskId, setSubtaskId] = useState<string>(
    focusTask?.subtasks?.find((subtask) => !subtask.completed)?.id ?? ""
  );

  const getSubtask = () => focusTask?.subtasks?.find((subtask) => subtask.id === subtaskId);

  const handleSubtaskToggle = () => {
    if (!focusTask || !subtaskId) {
      return;
    }

    const updatedSubtask = { ...getSubtask()!, completed: !getSubtask()!.completed };
    const updatedTask = {
      ...focusTask,
      subtasks: (focusTask.subtasks ?? []).map((subtask) =>
        subtask.id === updatedSubtask.id ? updatedSubtask : subtask
      ),
    };

    handleTaskUpdate(updatedTask, updateTask);
    setFocusTask(updatedTask);

    const nextIncompleteSubtask =
      updatedTask.subtasks.find((subtask) => !subtask.completed)?.id || "";
    setSubtaskId(nextIncompleteSubtask);
  };

  return (
    <div className="flex flex-col h-[75vh] w-full relative">
      <header className="py-3">
        <Progress value={percentComplete()} />
        <div className="text-center font-extrabold text-3xl underline underline-offset-8 my-5">
          {focusTask?.title
            ? focusTask.title.charAt(0).toUpperCase() + focusTask.title.slice(1)
            : ""}
        </div>
        {(focusTask?.subtasks?.length || 0) > 0 && (
          <div className="flex justify-center gap-2 items-center">
            <Checkbox
              checked={getSubtask()?.completed}
              disabled={!subtaskId}
              onCheckedChange={handleSubtaskToggle}
            />
            <Select value={subtaskId} onValueChange={setSubtaskId} defaultValue={subtaskId}>
              <SelectTrigger className="w-auto border-none focus:outline-none focus:ring-0">
                <SelectValue placeholder="Select a subtask" />
              </SelectTrigger>
              <SelectContent className="dark:bg-neutral-900/70 backdrop-blur-lg border dark:border-neutral-800 rounded-xl">
                <SelectGroup>
                  {focusTask?.subtasks?.map((subtask: Subtask) => (
                    <SelectItem
                      key={subtask.id}
                      value={subtask.id}
                      className={subtask.completed ? "line-through dark:text-neutral-400" : ""}
                      onClick={() => {
                        setSubtaskId(subtask.id);
                      }}
                    >
                      {subtask.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </header>
      <main className="flex justify-center place-items-center h-full">
        <div className="text-center">
          <div className="font-semibold">
            <span className="text-[13rem] leading-none text-orange-400">
              {timerDisplay(secondsLeft).number}
            </span>
          </div>
          <div className="dark:text-gray-200 text-gray-700">{paused && "Paused"}</div>
        </div>
      </main>
      <ActionsContainer>
        <button
          className="bg-neutral-800 rounded-full size-9"
          onClick={() => handleSessionEnd(reset, focusTask!, updateTask)}
        >
          ✔
        </button>
        <DiscardSessionButton confirmBeforeDiscard={true} />
        <button
          className="dark:bg-neutral-800 bg-neutral-100 rounded-full p-2"
          onClick={paused ? play : pause}
        >
          {paused ? <PauseIcon className="text-orange-400" /> : <PlayIcon />}
        </button>
      </ActionsContainer>
    </div>
  );
}

function timerDisplay(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return {
      number: `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`,
      label: "minutes",
    };
  }

  return {
    number: remainingSeconds,
    label: remainingSeconds === 1 ? "second" : "seconds",
  };
}

export default TimerStage;
