import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { handleCourseRemove } from "./utils/courseUtils";

export default function CourseActionsDropdown({ courseId }: { courseId: string }) {
  const handleEditClick = () => {
    console.log("Edit clicked");
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
      <DropdownMenuContent className="bg-white space-y-1">
        <ActionItem label="Edit" onClick={handleEditClick} />
        <ActionItem label="Delete" onClick={() => handleDeleteClick(courseId)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ActionItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <DropdownMenuItem
      className="cursor-pointer py-1 px-2 hover:bg-neutral-100 rounded-md"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {label}
    </DropdownMenuItem>
  );
}
