import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import GeneratedTaskItem from "./GeneratedTaskItem";

export default function GeneratedTasksList({ object }: { object: GeneratedTask[] }) {
  console.log("object", object);

  return (
    <div className="grid grid-cols-1 gap-3">
      {object?.map((generatedTask, index) => (
        <GeneratedTaskItem task={generatedTask} key={index} />
      ))}
    </div>
  );
}
