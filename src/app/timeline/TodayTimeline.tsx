import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { isToday } from "date-fns";
import { Timeline } from "./Timeline";
import useCoursesStore from "@/stores/coursesStore";
import { getCurrentDate } from "@/utils/dateUtils";

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

  const currentDayIndex = getCurrentDate().getDay();

  const todayCourses = courses.filter(
    (course) => course.days?.includes(currentDayIndex) && !course.isAsynchronous
  );

  const courseEvents = todayCourses?.map((course) => ({
    start: new Date(`2025-02-03T${course?.startTime}`), // date doesn't matter, only time
    end: new Date(`2025-02-03T${course?.endTime}`), // date doesn't matter, only time
    type: "course" as "course",
  }));

  const focusEntries = useFocusTrackerStore((state) => state.focusEntries);
  const todayFocusEntries = focusEntries.filter((entry) => isToday(entry.startDate));

  const todayFocusEvents = todayFocusEntries.map((entry) => ({
    start: new Date(entry.startDate),
    end: new Date(entry.endDate),
    type: "focus" as "focus",
  }));

  return (
    <div className="mx-5 my-2">
      <Timeline startTime="6:00" endTime="23:00" events={[...todayFocusEvents, ...courseEvents]} />
    </div>
  );
}

export default TodayTimeline;
