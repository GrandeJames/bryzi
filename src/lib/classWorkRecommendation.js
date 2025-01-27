/*
 * Purpose: Provide a schedule recommendation based on the tasks provided.
 *
 * Two loops are used to ensure proper distribution of tasks accross days.
 * Afterwards, incomplete tasks' focus sessions are filled overtime to the lowest duration
 * day to ensure balance accross the days, except for the tasks due the current day.
 */

// TODO: do not add scheduled tasks to the final schedule because it should only be showing classwork

import { startOfTomorrow, differenceInMinutes } from "date-fns";

const IDEAL_TIME_LIMIT_HRS = 8;
const IDEAL_TIME_LIMIT_MINS = IDEAL_TIME_LIMIT_HRS * 60;
const BLOCK_SIZE = 25;

const schedule = [];

const SINGLE_DAY_TASKS = [
  { title: "lecture0", duration: 35, daysUntilDeadline: 1 },
  { title: "lecture2", duration: 75, daysUntilDeadline: 2 },
  { title: "lecture3", duration: 50, daysUntilDeadline: 2 },
  { title: "work", duration: 270, daysUntilDeadline: 3 },
];

// get incomplete tasks
// TODO: set duration to estimated duration - actual duration, assuming that actual duration is less than estimated duration
// TODO: ensure provided tasks have minimum daysUntilDeadline of 0
const MULTI_DAY_TASKS = [
  { title: "post", duration: 35, daysUntilDeadline: 0 },
  { title: "essay", duration: 500, daysUntilDeadline: 0 },
  { title: "read chap", duration: 120, daysUntilDeadline: 1 },
  { title: "create presentation", duration: 200, daysUntilDeadline: 2 },
  { title: "build app", duration: 450, daysUntilDeadline: 3 },
  { title: "paper", duration: 900, daysUntilDeadline: 4 },
  { title: "post2", duration: 25, daysUntilDeadline: 4 },
  { title: "review for exam", duration: 500, daysUntilDeadline: 5 },
  { title: "write research paper", duration: 1200, daysUntilDeadline: 24 },
];

function insertSingleDayTasks() {
  for (const scheduledTask of SINGLE_DAY_TASKS) {
    schedule[scheduledTask.daysUntilDeadline] = [
      {
        title: scheduledTask.title,
        duration: scheduledTask.duration,
        daysUntilDeadline: scheduledTask.daysUntilDeadline,
      },
    ];
  }
}

function distributeMultiDayTasks() {
  for (let i = 0; i < MULTI_DAY_TASKS.length; i++) {
    const task = MULTI_DAY_TASKS[i];
    const daysLeftUntilTaskDeadline = task.daysUntilDeadline + 1;

    let remainingTaskDuration = task.duration;

    while (remainingTaskDuration > 0) {
      let taskScheduled = false;

      for (let dayIndex = 0; dayIndex < daysLeftUntilTaskDeadline; dayIndex++) {
        if (!schedule[dayIndex]) {
          schedule[dayIndex] = [];
        }
        const tasksForSelectedDay = schedule[dayIndex];
        let remainingMinsInDay = getIdealRemainingTimeInDay(tasksForSelectedDay, dayIndex);

        if (remainingMinsInDay > 0) {
          const taskDuration = Math.min(remainingTaskDuration, remainingMinsInDay, BLOCK_SIZE);
          taskScheduled = scheduleTaskOnDay(tasksForSelectedDay, task, taskDuration);
          remainingTaskDuration -= taskDuration;
        }
      }

      if (!taskScheduled) {
        while (remainingTaskDuration > 0) {
          let lowestDurationDayIndex = 0;
          for (let z = 0; z < schedule.length; z++) {
            const totalDuration = schedule[z].reduce((acc, task) => acc + task.duration, 0);

            if (
              totalDuration <
              schedule[lowestDurationDayIndex].reduce((acc, task) => acc + task.duration, 0)
            ) {
              lowestDurationDayIndex = z;
            }
          }

          if (task.daysUntilDeadline == 0) {
            lowestDurationDayIndex = 0;
          }

          const day = schedule[lowestDurationDayIndex];

          const taskDuration = Math.min(remainingTaskDuration, BLOCK_SIZE);
          scheduleTaskOnDay(day, task, taskDuration);
          remainingTaskDuration -= taskDuration;
        }
      }
    }
  }
}

function scheduleTaskOnDay(day, task, duration) {
  day.push({
    title: task.title,
    duration: duration,
  });
  return true;
}

function getIdealRemainingTimeInDay(day, dayIndex) {
  const availableTime =
    dayIndex === 0
      ? Math.min(getMinutesUntilMidnight(), IDEAL_TIME_LIMIT_MINS)
      : IDEAL_TIME_LIMIT_MINS;

  const timeSpent = day.reduce((total, task) => total + task.duration, 0);
  return availableTime - timeSpent;
}

function getMinutesUntilMidnight() {
  const now = new Date();

  const midnight = startOfTomorrow();
  return differenceInMinutes(midnight, now);
}

insertSingleDayTasks();
distributeMultiDayTasks();

for (const [index, day] of schedule.entries()) {
  console.log(`day ${index}`, day);

  let sumDuration = 0;
  for (const task of day) {
    sumDuration += task.duration;
  }
  console.log("Total Duration:", sumDuration);
  console.log("");
}

// console.log(recommendedScheduleToFill);
