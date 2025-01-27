import { startOfTomorrow, differenceInMinutes } from "date-fns";

const IDEAL_TIME_LIMIT_HRS = 8;
const IDEAL_TIME_LIMIT_MINS = IDEAL_TIME_LIMIT_HRS * 60;
const FULL_FOCUS_SESSION_MINS = 90;

const scheduled_tasks = [
  { title: "lecture", duration: 35, daysUntilDeadline: 1 },
  { title: "lecture2", duration: 75, daysUntilDeadline: 2 },
  { title: "lecture3", duration: 50, daysUntilDeadline: 2 },
  { title: "work", duration: 270, daysUntilDeadline: 3 },
];

// get incomplete tasks
// TODO: set duration to estimated duration - actual duration, assuming that actual duration is less than estimated duration
const sorted_class_work = [
  { title: "post", duration: 35, daysUntilDeadline: 0 },
  { title: "essay", duration: 500, daysUntilDeadline: 0 },
  { title: "read chap", duration: 120, daysUntilDeadline: 1 },
  { title: "create presentation", duration: 200, daysUntilDeadline: 2 },
  { title: "work on building app", duration: 450, daysUntilDeadline: 3 },
  { title: "paper", duration: 900, daysUntilDeadline: 4 },
  { title: "post2", duration: 25, daysUntilDeadline: 4 },
  { title: "review for exam", duration: 500, daysUntilDeadline: 5 },
  { title: "write research paper", duration: 1200, daysUntilDeadline: 24 },
];

const recommendedScheduleToFill = [];

for (let i = 0; i < sorted_class_work.length; i++) {
  const task = sorted_class_work[i];
  const daysLeftUntilTaskDeadline = task.daysUntilDeadline + 1;
  let currentTaskDuration = task.duration;

  while (currentTaskDuration > 0) {
    let taskScheduled = false;

    for (let j = 0; j < daysLeftUntilTaskDeadline; j++) {
      if (!recommendedScheduleToFill[j]) {
        recommendedScheduleToFill[j] = [];
      }
      const tasksForSelectedDay = recommendedScheduleToFill[j];
      let remainingTimeInDay = getIdealRemainingTimeInDay(tasksForSelectedDay, j);

      if (remainingTimeInDay >= FULL_FOCUS_SESSION_MINS) {
        if (currentTaskDuration >= FULL_FOCUS_SESSION_MINS) {
          tasksForSelectedDay.push({
            title: task.title,
            duration: FULL_FOCUS_SESSION_MINS,
            daysUntilDeadline: task.daysUntilDeadline,
          });
          currentTaskDuration -= FULL_FOCUS_SESSION_MINS;
          taskScheduled = true;
        } else if (currentTaskDuration > 0) {
          tasksForSelectedDay.push({
            title: task.title,
            duration: currentTaskDuration,
            daysUntilDeadline: task.daysUntilDeadline,
          });
          currentTaskDuration = 0;
          taskScheduled = true;
        }
      } else if (remainingTimeInDay > 0) {
        if (currentTaskDuration >= remainingTimeInDay) {
          tasksForSelectedDay.push({
            title: task.title,
            duration: remainingTimeInDay,
            daysUntilDeadline: task.daysUntilDeadline,
          });
          currentTaskDuration -= remainingTimeInDay;
          taskScheduled = true;
        }
      }
    }

    // this allows tasks that goes over the time limit to be scheduled overtime
    if (!taskScheduled) {
      while (currentTaskDuration > 0) {
        for (let j = 0; j < daysLeftUntilTaskDeadline; j++) {
          const day = recommendedScheduleToFill[j];

          if (currentTaskDuration >= FULL_FOCUS_SESSION_MINS) {
            day.push({
              title: task.title,
              duration: FULL_FOCUS_SESSION_MINS,
              daysUntilDeadline: task.daysUntilDeadline,
            });
            currentTaskDuration -= FULL_FOCUS_SESSION_MINS;
          } else {
            day.push({
              title: task.title,
              duration: currentTaskDuration,
              daysUntilDeadline: task.daysUntilDeadline,
            });
            currentTaskDuration = 0;
            break;
          }
        }
        break;
      }
    }
  }
}

function getIdealRemainingTimeInDay(day, j) {
  if (j == 0) {
    if (!day) {
      return Math.min(getMinutesUntilMidnight(), IDEAL_TIME_LIMIT_MINS);
    }

    const timeSpent = day.reduce((acc, task) => acc + task.duration, 0);
    return Math.min(getMinutesUntilMidnight(), IDEAL_TIME_LIMIT_MINS) - timeSpent;
  }
  if (!day) {
    return IDEAL_TIME_LIMIT_MINS;
  }
  const timeSpent = day.reduce((acc, task) => acc + task.duration, 0);
  return IDEAL_TIME_LIMIT_MINS - timeSpent;
}

function getMinutesUntilMidnight() {
  const now = new Date();

  const midnight = startOfTomorrow();
  return differenceInMinutes(midnight, now);
}

for (const [index, day] of recommendedScheduleToFill.entries()) {
  console.log(`day ${index}`, day);

  let sumDuration = 0;
  for (const task of day) {
    sumDuration += task.duration;
  }
  console.log("Total Duration:", sumDuration);
  console.log("");
}
