import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { isToday } from "date-fns";
import { Timeline } from "./Timeline";
import useCoursesStore from "@/stores/coursesStore";

const sampleScheduledItemsToday = [
  {
    start: new Date("2025-02-03T10:30:00"),
    end: new Date("2025-02-03T11:45:00"),
    type: "event" as "event",
  },
  {
    start: new Date("2025-02-03T12:00:00"),
    end: new Date("2025-02-03T13:15:00"),
    type: "focus" as "focus",
  },
  {
    start: new Date("2025-02-03T15:00:00"),
    end: new Date("2025-02-03T16:15:00"),
    type: "event" as "event",
  },
];

function TodayTimeline() {
  const courses = useCoursesStore((state) => state.courses);

  console.log("courses", courses);

  const currentDayIndex = new Date().getDay();

  console.log("currentDayIndex", currentDayIndex);

  const todayCourses = courses.filter((course) => course.days.includes(currentDayIndex));

  const courseEvents = todayCourses.map((course) => ({
    start: course.startTime,
    end: course.endTime,
    type: "course" as "course",
  }));

  console.log("courseEvents", courseEvents);

  const focusEntries = useFocusTrackerStore((state) => state.focusEntries);

  const todayFocusEntries = focusEntries.filter((entry) => isToday(entry.startDate));
  const todayFocusEvents = todayFocusEntries.map((entry) => ({
    start: new Date(entry.startDate),
    end: new Date(entry.endDate),
    type: "focus" as "focus",
  }));

  return (
    <div className="mx-5 my-2">
      <Timeline
        startTime="6:00"
        endTime="23:00"
        events={[...sampleScheduledItemsToday, ...todayFocusEvents, ...courseEvents]}
      />
    </div>
  );
}

export default TodayTimeline;
