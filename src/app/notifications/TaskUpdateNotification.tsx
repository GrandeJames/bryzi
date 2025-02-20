import { addDays, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import notification from "./Notification";
import { ClassTask } from "@/types/classTask";
import { PersonalTask } from "@/types/personalTask";
import Link from "next/link";

export default function TaskUpdateNotification({ task }: { task: ClassTask | PersonalTask }) {
  notification(
    <div>
      Task has been updated to{" "}
      <Link
        href={
          task.deadline
            ? isBefore(startOfDay(task.deadline), addDays(startOfDay(new Date()), 1))
              ? "/app/today"
              : "/app/upcoming"
            : "/app/inbox"
        }
        className="underline"
        onClick={() => {
          toast.dismiss();
        }}
      >
        {task.deadline
          ? isBefore(startOfDay(task.deadline), addDays(startOfDay(new Date()), 1))
            ? "Today"
            : "Upcoming"
          : "Inbox"}
      </Link>
    </div>
  );
}
