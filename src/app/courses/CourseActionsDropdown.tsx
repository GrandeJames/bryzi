import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { handleCourseRemove } from "./utils/courseUtils";
import useDialogStore from "../dialogs/dialogStore";

export default function CourseActionsDropdown({ courseId }: { courseId: string }) {
  const openDialog = useDialogStore((state) => state.openDialog);

  const handleEditClick = () => {
    console.log("Edit clicked");

    openDialog("editCourse", { courseId }, "Edit Course");

  };

  const handleDeleteClick = (courseId: string) => {
    console.log("Delete clicked");

    handleCourseRemove(courseId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 space-y-1">
        <ActionItem label="Edit" onClick={handleEditClick} />
        <ActionItem label="Delete" onClick={() => handleDeleteClick(courseId)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ActionItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <DropdownMenuItem
      className="cursor-pointer py-1 px-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {label}
    </DropdownMenuItem>
  );
}
