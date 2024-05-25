import { Progress } from "./ui/progress";

export function TotalProgress({ className }: { className?: string }) {
  return (
    <Progress value={70} className={className} />
  );
}