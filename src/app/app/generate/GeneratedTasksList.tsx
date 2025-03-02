import GeneratedTaskItem from "./GeneratedTaskItem";

export default function GeneratedTasksList({ object }: { object: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {object?.map((generatedTask: any, index: any) => (
        <GeneratedTaskItem task={generatedTask} key={index} />
      ))}
    </div>
  );
}
