/*
 * Purpose: Provide a schedule recommendation based on the tasks provided.
 *
 * Two loops are used to ensure proper distribution of tasks accross days.
 * Afterwards, incomplete tasks' focus sessions are filled overtime to the lowest duration
 * day to ensure balance accross the days, except for the tasks due the current day.
 */

// TODO: do not add scheduled tasks to the final schedule because it should only be showing classwork

import { ClassTask } from "@/types/classTask";
import { startOfTomorrow, differenceInMinutes, differenceInCalendarDays } from "date-fns";

const IDEAL_TIME_LIMIT_HRS = 8;
const IDEAL_TIME_LIMIT_MINS = IDEAL_TIME_LIMIT_HRS * 60;
const BLOCK_SIZE = 60;

export type DayProps = ScheduleTaskProps[];

export interface ScheduleTaskProps {
  taskId: ClassTask["id"];
  title?: ClassTask["title"];
  duration: number;
  daysUntilDeadline?: number;
  type?: string;
}

function insertSingleDayTasks(SINGLE_DAY_TASKS: ScheduleTaskProps[], schedule: DayProps[]) {
  for (const scheduledTask of SINGLE_DAY_TASKS) {
    if (!schedule[scheduledTask.daysUntilDeadline!]) {
      schedule[scheduledTask.daysUntilDeadline!] = [
        {
          taskId: String(scheduledTask.taskId),
          title: scheduledTask.title,
          duration: scheduledTask.duration,
          daysUntilDeadline: scheduledTask.daysUntilDeadline,
          type: "event",
        },
      ];
    } else {
      schedule[scheduledTask.daysUntilDeadline!].push({
        taskId: String(scheduledTask.taskId),
        title: scheduledTask.title,
        duration: scheduledTask.duration,
        daysUntilDeadline: scheduledTask.daysUntilDeadline,
        type: "event",
      });
    }
  }
}

function distributeMultiDayTasks(MULTI_DAY_TASKS: ScheduleTaskProps[], schedule: DayProps[]) {
  for (let i = 0; i < MULTI_DAY_TASKS.length; i++) {
    const scheduleTask = MULTI_DAY_TASKS[i];
    const daysLeftUntilTaskDeadline = scheduleTask.daysUntilDeadline! + 1;

    let remainingTaskDuration = scheduleTask.duration;

    while (remainingTaskDuration > 0) {
      let taskScheduled = false;

      for (let dayIndex = 0; dayIndex < daysLeftUntilTaskDeadline; dayIndex++) {
        if (!schedule[dayIndex]) {
          schedule[dayIndex] = [];
        }
        const tasksForSelectedDay = schedule[dayIndex];
        let remainingMinsInDay = getIdealRemainingTimeInDay(dayIndex, schedule);

        if (remainingMinsInDay > 0) {
          const sessionDuration = Math.min(remainingTaskDuration, remainingMinsInDay, BLOCK_SIZE);
          taskScheduled = scheduleTaskOnDay(
            scheduleTask,
            sessionDuration,
            "class",
            dayIndex,
            schedule
          );
          remainingTaskDuration -= sessionDuration;
        }
      }

      if (!taskScheduled) {
        while (remainingTaskDuration > 0) {
          let lowestDurationDayIndex = 0;
          for (let dayIndex = 0; dayIndex < schedule.length; dayIndex++) {
            const totalDuration = getTotalDurationForDay(dayIndex, schedule);

            if (totalDuration < getTotalDurationForDay(lowestDurationDayIndex, schedule)) {
              lowestDurationDayIndex = dayIndex;
            }
          }

          if (scheduleTask.daysUntilDeadline == 0) {
            lowestDurationDayIndex = 0;
          }

          const day = schedule[lowestDurationDayIndex];

          const sessionDuration = Math.min(remainingTaskDuration, BLOCK_SIZE);
          scheduleTaskOnDay(
            scheduleTask,
            sessionDuration,
            "class",
            lowestDurationDayIndex,
            schedule
          );
          remainingTaskDuration -= sessionDuration;
        }
      }
    }
  }
}

function getTotalDurationForDay(dayIndex: number, schedule: DayProps[]) {
  if (!schedule[dayIndex]) {
    return 0;
  }
  return schedule[dayIndex].reduce((acc, task) => acc + task.duration, 0);
}

function scheduleTaskOnDay(
  task: ScheduleTaskProps,
  duration: number,
  type: string,
  dayIndex: number,
  schedule: DayProps[]
) {
  const day2 = schedule[dayIndex];
  const taskInDay = day2?.find((t) => task.taskId === t.taskId);

  if (!day2) {
    schedule[dayIndex] = [];
  }

  if (taskInDay) {
    taskInDay.duration += duration;
  } else {
    schedule[dayIndex].push({
      taskId: task.taskId,
      title: task.title,
      duration: duration,
      daysUntilDeadline: task.daysUntilDeadline,
      type,
    });
  }
  return true;
}

function getIdealRemainingTimeInDay(dayIndex: number, schedule: DayProps[]) {
  const availableTime =
    dayIndex === 0
      ? Math.min(getMinutesUntilMidnight(), IDEAL_TIME_LIMIT_MINS)
      : IDEAL_TIME_LIMIT_MINS;

  const timeSpent = (schedule[dayIndex] ?? []).reduce((total, task) => total + task.duration, 0);
  return availableTime - timeSpent;
}

function getMinutesUntilMidnight() {
  const now = new Date();

  const midnight = startOfTomorrow();
  return differenceInMinutes(midnight, now);
}

function getCalendarDaysUntilDeadline(task: ClassTask) {
  return Math.max(0, differenceInCalendarDays(task.deadline!, new Date()));
}

function getRemainingDuration(task: ClassTask) {
  return (task.estimatedDurationInMins ?? 90) - (task.actualDurationInMins ?? 0);
}

/*
 *[
    { taskId: "101", title: "explore extra topics", duration: 540 },
    { taskId: "102", title: "practice exercises", duration: 300 },
  ]
*/
function distributeNoDeadlineTasks(NO_DEADLINE_TASKS: ScheduleTaskProps[], schedule: DayProps[]) {
  const durations = NO_DEADLINE_TASKS.map((task) => task.duration);

  const isDurationsEmpty = () => durations.every((duration) => duration <= 0);
  const remainingTimeInDay = () => getIdealRemainingTimeInDay(dayIndex, schedule);

  let taskIndex = 0;
  let dayIndex = 0;

  while (!isDurationsEmpty() && remainingTimeInDay() > 0) {
    const task = NO_DEADLINE_TASKS[taskIndex];

    const sessionDuration = Math.min(task.duration, remainingTimeInDay(), BLOCK_SIZE);
    if (sessionDuration !== 0) {
      scheduleTaskOnDay(task, sessionDuration, "misc", dayIndex, schedule);
      durations[taskIndex] -= sessionDuration;
    }

    if (taskIndex === NO_DEADLINE_TASKS.length - 1) {
      taskIndex = 0;
      if (remainingTimeInDay() <= 0) {
        dayIndex++;
      }
    } else {
      taskIndex++;
    }
  }
}

function isOvertime(dayIndex: number, schedule: DayProps[]) {
  return (
    schedule.reduce((acc, day) => acc + getTotalDurationForDay(dayIndex, schedule), 0) >
    IDEAL_TIME_LIMIT_MINS
  );
}

function getRecommendedClassWorkList(
  classWork: ClassTask[],
  scheduledTasks: ClassTask[],
  noDeadlineTasks: ClassTask[]
) {
  const schedule: DayProps[] = [];

  // TODO: create new tasks data from tasks provided
  // Should return an array like these:
  // let singleDayTasks: ScheduleTaskProps[] = [
  //   { taskId: "10", title: "lecture0", duration: 35, daysUntilDeadline: 1 },
  //   { taskId: "12", title: "lecture3333", duration: 50, daysUntilDeadline: 2 },
  //   { taskId: "11", title: "lecture2222", duration: 75, daysUntilDeadline: 2 },
  //   { taskId: "13", title: "work", duration: 270, daysUntilDeadline: 6 },
  // ];

  // singleDayTasks = scheduledTasks.map((task) => {
  //   return {
  //     taskId: task.id,
  //     title: task.title,
  //     duration: getRemainingDuration(task),
  //     daysUntilDeadline: getCalendarDaysUntilDeadline(task),
  //   };
  // });

  // TODO: set duration to estimated duration - actual duration, assuming that actual duration is less than estimated duration
  // TODO: ensure provided tasks have minimum daysUntilDeadline of 0
  // let multiDayTasks: ScheduleTaskProps[] = [
  //   { taskId: "1", title: "post", duration: 35, daysUntilDeadline: 0 },
  //   { taskId: "2", title: "essay", duration: 500, daysUntilDeadline: 0 },
  //   { taskId: "3", title: "read chap", duration: 120, daysUntilDeadline: 1 },
  //   { taskId: "4", title: "create presentation", duration: 200, daysUntilDeadline: 2 },
  //   { taskId: "5", title: "build app", duration: 450, daysUntilDeadline: 3 },
  //   { taskId: "6", title: "paper", duration: 900, daysUntilDeadline: 4 },
  //   { taskId: "7", title: "post2", duration: 25, daysUntilDeadline: 4 },
  //   { taskId: "8", title: "review for exam", duration: 500, daysUntilDeadline: 5 },
  //   { taskId: "9", title: "write research paper", duration: 1200, daysUntilDeadline: 24 },
  // ];

  // const classWorkWithDeadlines = classWork.filter((task) => task.deadline);
  // const classWorkWithoutDeadlines = classWork.filter((task) => !task.deadline);

  let multiDayTasks: ScheduleTaskProps[] = classWork.map((task) => {
    return {
      taskId: task.id,
      title: task.title,
      duration: getRemainingDuration(task),
      daysUntilDeadline: getCalendarDaysUntilDeadline(task),
    };
  });

  const tasksWithNodeadlines = classWork.map((task) => {
    return {
      taskId: task.id,
      title: task.title,
      duration: getRemainingDuration(task),
    };
  });

  // let tasksWithNodeadlines: ScheduleTaskProps[] = [
  //   { taskId: "101", title: "explore extra topics", duration: 540 },
  //   { taskId: "102", title: "practice exercises", duration: 300 },
  // ];

  // insertSingleDayTasks(singleDayTasks, schedule); // good
  distributeMultiDayTasks(multiDayTasks, schedule);
  // distributeNoDeadlineTasks(tasksWithNodeadlines, schedule);

  // TODO: sort and filter tasks to only show classwork

  const filteredSchedule = schedule.map((day) => {
    return day.map((scheduleTask) => {
      return {
        taskId: scheduleTask.taskId,
        title: scheduleTask.title, // todo: remove
        duration: scheduleTask.duration,
        type: scheduleTask.type, // todo: remove
        daysUntilDeadline: scheduleTask.daysUntilDeadline, // todo: remove
      };
    });
  });

  console.log("fs", filteredSchedule);

  return filteredSchedule;
}

export { getRecommendedClassWorkList };

// TODO: handle tasks with no deadline
