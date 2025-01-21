function ScheduleSection({ scheduledTasks }: { scheduledTasks: any[] }) {
  return (
    <section>
      <header className="font-semibold text-xl mb-1 text-blue-200">Schedule</header>
      <div className="flex gap-2">
        {scheduledTasks.map((task, index) => (
          <ScheduledTask key={index} task={task} />
        ))}
      </div>
    </section>
  );
}

// TODO: make dynamic
function ScheduledTask({ task }: { task: any }) {
  return (
    <div className="bg-neutral-900/70 rounded-2xl min-w-56 max-w-sm px-4 py-5">
      <div className="text-xs text-neutral-300">{task.class}</div>
      <div className="text-sm font-semibold text-neutral-200">{task.title}</div>
      <div className="text-sm text-neutral-300">
        <div className="text-neutral-400">
          {task.startTime} {task.endTime && ` - ${task.endTime}`}
        </div>
        {task.class === "Data Structures & Algorithms" && (
          <div className="text-red-500 mt-2">Starting in 22 mins</div>
        )}
      </div>
    </div>
  );
}

export default ScheduleSection;
