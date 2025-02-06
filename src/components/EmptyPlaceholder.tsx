import { cn } from "@/utils.ts/cn";
import { BookIcon } from "lucide-react";

interface EmptyPlaceholderProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

function EmptyPlaceholder({ icon, title, description, className }: EmptyPlaceholderProps) {
  return (
    <div className={cn("text-center", className)}>
      {icon && <div className="size-5 text-neutral-500 mx-auto mb-3">{icon}</div>}
      {title && <div className="font-medium text-neutral-500 text-sm">No Tasks</div>}
      {description && (
        <div className="flex justify-center mt-1">
          <p className="text-xs text-neutral-600 max-w-[15rem]">{description}</p>
        </div>
      )}
    </div>
  );
}

export default EmptyPlaceholder;
