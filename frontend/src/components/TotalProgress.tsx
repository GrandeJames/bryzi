import { Progress } from "./ui/progress";

export function TotalProgress({ className, ...props }: { className?: string }) {
  return (
    <Progress value={70} className={className} {...props} />
  );
}