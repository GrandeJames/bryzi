import { PersonalTask } from "@/types/personalTask";
import useDialogStore from "../dialogs/dialogStore";
import useTasksStore from "@/stores/tasksStore";
import MarkTaskCompleteCheckbox from "@/components/MarkTaskCompleteCheckbox";

function PersonalTaskItem({ personalTask }: { personalTask: PersonalTask }) {
  const open = useDialogStore((state) => state.openDialog);
  const openPersonalTaskDetailsDialog = () => open("personalTaskDetails", { task: personalTask });
  const updateTask = useTasksStore((state) => state.updateTask);

  return (
    <div className="grid grid-cols-12 py-4 px-5 bg-neutral-900/60 rounded-2xl">
      <div
        className="col-span-10 hover:cursor-pointer"
        onClick={() => openPersonalTaskDetailsDialog()}
      >
        <div className="flex flex-col col-span-3">
          <div className="font-semibold text-neutral-200">{personalTask.title}</div>
        </div>
      </div>
      <div className="col-span-2">
        <MarkTaskCompleteCheckbox task={personalTask} updateTask={updateTask} />
      </div>
    </div>
  );
}

export default PersonalTaskItem;
