import { addDays, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import Notification from "./Notification";
import { ClassTask } from "@/types/classTask";
import { PersonalTask } from "@/types/personalTask";
import Link from "next/link";

export default function TaskAddNotification({ task }: { task: ClassTask | PersonalTask }) {
  Notification(
    <div>
      Task has been added to{" "}
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
