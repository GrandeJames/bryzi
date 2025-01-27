const sorted_tasks = [
  { title: "post", duration: 35, daysUntilDeadline: 0 },
  { title: "essay", duration: 450, daysUntilDeadline: 0 },
  { title: "read chap", duration: 120, daysUntilDeadline: 1 },
  { title: "create presentation", duration: 200, daysUntilDeadline: 2 },
  { title: "work on building app", duration: 450, daysUntilDeadline: 3 },
  { title: "paper", duration: 900, daysUntilDeadline: 4 },
  { title: "post2", duration: 25, daysUntilDeadline: 4 },
  { title: "review for exam", duration: 450, daysUntilDeadline: 5 },
];

const IDEAL_TIME_LIMIT_HRS = 8;
const IDEAL_TIME_LIMIT_MINS = IDEAL_TIME_LIMIT_HRS * 60;
const FULL_FOCUS_SESSION_MINS = 90;

const recommendedScheduleToFill = [];

for (let i = 0; i < sorted_tasks.length; i++) {
  const task = sorted_tasks[i];
  const daysLeft = task.daysUntilDeadline + 1;
  let currentDuration = task.duration;

  while (currentDuration > 0) {
    let taskScheduled = false;

    for (let j = 0; j < daysLeft; j++) {
      if (!recommendedScheduleToFill[j]) {
        recommendedScheduleToFill[j] = [];
      }
      const day = recommendedScheduleToFill[j];
      const remainingTimeInDay = getIdealRemainingTimeInDay(day);

      if (remainingTimeInDay >= FULL_FOCUS_SESSION_MINS) {
        if (currentDuration >= FULL_FOCUS_SESSION_MINS) {
          day.push({
            title: task.title,
            duration: FULL_FOCUS_SESSION_MINS,
            note: "full",
          });
          currentDuration -= FULL_FOCUS_SESSION_MINS;
          taskScheduled = true;
        } else if (currentDuration > 0) {
          day.push({
            title: task.title,
            duration: currentDuration,
            note: "completed remaining",
          });
          currentDuration = 0;
          taskScheduled = true;
        }
      } else if (remainingTimeInDay > 0) {
        if (currentDuration >= remainingTimeInDay) {
          day.push({
            title: task.title,
            duration: remainingTimeInDay,
            note: "incomplete",
          });
          currentDuration -= remainingTimeInDay;
          taskScheduled = true;
        }
      }
    }

    if (!taskScheduled) {
      while (currentDuration > 0) {
        for (let j = 0; j < daysLeft; j++) {
          const day = recommendedScheduleToFill[j];

          if (currentDuration >= FULL_FOCUS_SESSION_MINS) {
            day.push({
              title: task.title,
              duration: FULL_FOCUS_SESSION_MINS,
              note: "overtime - incomplete",
            });
            currentDuration -= FULL_FOCUS_SESSION_MINS;
          } else {
            day.push({
              title: task.title,
              duration: currentDuration,
              note: "overtime",
            });
            currentDuration = 0;
            break;
          }
        }
        break;
      }
    }
  }
}

function getIdealRemainingTimeInDay(day) {
  if (!day) {
    return IDEAL_TIME_LIMIT_MINS;
  }
  const timeSpent = day.reduce((acc, task) => acc + task.duration, 0);
  return IDEAL_TIME_LIMIT_MINS - timeSpent;
}

console.log("Recommended Schedule:", recommendedScheduleToFill);
