/*
 * Purpose: Provide a schedule recommendation based on the tasks provided.
 *
 * Two loops are used to ensure proper distribution of tasks accross days.
 * Afterwards, incomplete tasks' focus sessions are filled overtime to the lowest duration
 * day to ensure balance accross the days, except for the tasks due the current day.
 */

// TODO: do not add scheduled tasks to the final schedule because it should only be showing classwork

import { Task } from "@/types/task";
import { startOfTomorrow, differenceInMinutes, differenceInCalendarDays } from "date-fns";

const IDEAL_TIME_LIMIT_HRS = 8;
const IDEAL_TIME_LIMIT_MINS = IDEAL_TIME_LIMIT_HRS * 60;
const BLOCK_SIZE = 60;

type DayProps = ScheduleTaskProps[];

interface ScheduleTaskProps {
  taskId: Task["id"];
  title?: Task["title"];
  duration: number;
  daysUntilDeadline?: number;
  type?: string;
}

const schedule: DayProps[] = [];

function insertSingleDayTasks(SINGLE_DAY_TASKS: ScheduleTaskProps[]) {
  for (const scheduledTask of SINGLE_DAY_TASKS) {
    if (!schedule[scheduledTask.daysUntilDeadline!]) {
      schedule[scheduledTask.daysUntilDeadline!] = [
        {
          taskId: String(scheduledTask.taskId),
          title: scheduledTask.title,
          duration: scheduledTask.duration,
          daysUntilDeadline: scheduledTask.daysUntilDeadline,
        },
      ];
    } else {
      schedule[scheduledTask.daysUntilDeadline!].push({
        taskId: String(scheduledTask.taskId),
        title: scheduledTask.title,
        duration: scheduledTask.duration,
        daysUntilDeadline: scheduledTask.daysUntilDeadline,
      });
    }
  }
}

function distributeMultiDayTasks(MULTI_DAY_TASKS: ScheduleTaskProps[]) {
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
        let remainingMinsInDay = getIdealRemainingTimeInDay(tasksForSelectedDay, dayIndex);

        if (remainingMinsInDay > 0) {
          const sessionDuration = Math.min(remainingTaskDuration, remainingMinsInDay, BLOCK_SIZE);
          taskScheduled = scheduleTaskOnDay(tasksForSelectedDay, scheduleTask, sessionDuration);
          remainingTaskDuration -= sessionDuration;
        }
      }

      if (!taskScheduled) {
        while (remainingTaskDuration > 0) {
          let lowestDurationDayIndex = 0;
          for (let dayIndex = 0; dayIndex < schedule.length; dayIndex++) {
            const totalDuration = getTotalDurationForDay(dayIndex);

            if (totalDuration < getTotalDurationForDay(lowestDurationDayIndex)) {
              lowestDurationDayIndex = dayIndex;
            }
          }

          if (scheduleTask.daysUntilDeadline == 0) {
            lowestDurationDayIndex = 0;
          }

          const day = schedule[lowestDurationDayIndex];

          const sessionDuration = Math.min(remainingTaskDuration, BLOCK_SIZE);
          scheduleTaskOnDay(day, scheduleTask, sessionDuration);
          remainingTaskDuration -= sessionDuration;
        }
      }
    }
  }
}

function getTotalDurationForDay(dayIndex: number) {
  return schedule[dayIndex].reduce((acc, task) => acc + task.duration, 0);
}

function scheduleTaskOnDay(day: DayProps, task: ScheduleTaskProps, duration: number) {
  const taskInDay = day.find((t) => task.taskId === t.taskId);

  if (taskInDay) {
    taskInDay.duration += duration;
  } else {
    day.push({
      taskId: task.taskId,
      title: task.title,
      duration: duration,
      daysUntilDeadline: task.daysUntilDeadline,
      // type: task.type,
    });
  }
  return true;
}

function getIdealRemainingTimeInDay(day: DayProps, dayIndex: number) {
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

function getCalendarDaysUntilDeadline(task: Task) {
  return differenceInCalendarDays(task.deadline!, new Date());
}

function getRemainingDuration(task: Task) {
  return task.estimatedDurationInMins! - task.actualDurationInMins!;
}

function distributeNoDeadlineTasks(NO_DEADLINE_TASKS: ScheduleTaskProps[]) {
  for (const task of NO_DEADLINE_TASKS) {
    let remainingTaskDuration = task.duration;

    for (let dayIndex = 0; remainingTaskDuration > 0; dayIndex++) {
      // Ensure the day exists in the schedule
      if (!schedule[dayIndex]) {
        schedule[dayIndex] = [];
      }

      const tasksForDay = schedule[dayIndex];
      const remainingTimeInDay = getIdealRemainingTimeInDay(tasksForDay, dayIndex);

      if (remainingTimeInDay > 0) {
        const sessionDuration = Math.min(remainingTaskDuration, remainingTimeInDay, BLOCK_SIZE);
        scheduleTaskOnDay(tasksForDay, task, sessionDuration);
        remainingTaskDuration -= sessionDuration;
      } else {
        // If no time left in the day, move to the next day
        continue;
      }
    }
  }
}

function getRecommendedClassWorkList(
  classWork: Task[],
  scheduledTasks: Task[],
  noDeadlineTasks: Task[]
) {
  // TODO: create new tasks data from tasks provided
  // Should return an array like these:
  let singleDayTasks: ScheduleTaskProps[] = [
    { taskId: "10", title: "lecture0", duration: 35, daysUntilDeadline: 1 },
    { taskId: "12", title: "lecture3333", duration: 50, daysUntilDeadline: 2 },
    { taskId: "11", title: "lecture2222", duration: 75, daysUntilDeadline: 2 },
    { taskId: "13", title: "work", duration: 270, daysUntilDeadline: 3 },
  ];

  // singleDayTasks = scheduledTasks.map((task) => {
  //   return {
  //     taskId: task.id,
  //     title: task.title,
  //     duration: getRemainingDuration(task),
  //     daysUntilDeadline: getCalendarDaysUntilDeadline(task),
  //   };
  // });

  // get incomplete tasks
  // TODO: set duration to estimated duration - actual duration, assuming that actual duration is less than estimated duration
  // TODO: ensure provided tasks have minimum daysUntilDeadline of 0
  let multiDayTasks: ScheduleTaskProps[] = [
    { taskId: "1", title: "post", duration: 35, daysUntilDeadline: 0 },
    { taskId: "2", title: "essay", duration: 500, daysUntilDeadline: 0 },
    { taskId: "3", title: "read chap", duration: 120, daysUntilDeadline: 1 },
    { taskId: "4", title: "create presentation", duration: 200, daysUntilDeadline: 2 },
    { taskId: "5", title: "build app", duration: 450, daysUntilDeadline: 3 },
    { taskId: "6", title: "paper", duration: 900, daysUntilDeadline: 4 },
    { taskId: "7", title: "post2", duration: 25, daysUntilDeadline: 4 },
    { taskId: "8", title: "review for exam", duration: 500, daysUntilDeadline: 5 },
    { taskId: "9", title: "write research paper", duration: 1200, daysUntilDeadline: 24 },
  ];

  // multiDayTasks = classWork.map((task) => {
  //   return {
  //     taskId: task.id,
  //     title: task.title,
  //     duration: getRemainingDuration(task),
  //     daysUntilDeadline: getCalendarDaysUntilDeadline(task),
  //   };
  // });

  let tasksWithNodeadlines: ScheduleTaskProps[] = [
    // Tasks with no deadlines
    { taskId: "101", title: "explore extra topics", duration: 240 },
    { taskId: "102", title: "practice exercises", duration: 300 },
  ];

  insertSingleDayTasks(singleDayTasks);
  distributeMultiDayTasks(multiDayTasks);
  distributeNoDeadlineTasks(tasksWithNodeadlines);

  // TODO: sort and filter tasks to only show classwork

  const filteredSchedule = schedule.map((day) => {
    return day.map((task) => {
      return {
        taskId: task.taskId,
        title: task.title,
        duration: task.duration,
      };
    });
  });

  console.log(filteredSchedule);

  return filteredSchedule;
}

export { getRecommendedClassWorkList };

// TODO: handle tasks with no deadline
