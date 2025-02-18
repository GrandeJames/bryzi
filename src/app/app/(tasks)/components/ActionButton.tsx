import { LucideIcon } from "lucide-react";

export default function ActionButton({
  icon: Icon,
  label,
  onClick,
  inline = false,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  inline?: boolean;
}) {
  return (
    <button
      className={`w-full dark:bg-neutral-800/80 bg-neutral-50 rounded-md py-4 flex  items-center gap-2 ${
        inline ? "flex-row justify-center" : "flex-col"
      }`}
      onClick={onClick}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </button>
  );
}
