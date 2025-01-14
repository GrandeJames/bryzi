function ScheduleSection({ scheduledTasks }: { scheduledTasks: any[] }) {
  return (
    <section>
      <header className="font-semibold text-xl mb-1 text-blue-300">Schedule</header>
      <div className="flex gap-7 divide-x">
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
    <div className=" border-neutral-900 min-w-56 max-w-sm px-5 py-1">
      <div className="text-sm font-semibold">{task.title}</div>
      <div className="text-sm text-neutral-300">
        <div>{task.class}</div>
        <div className="text-orange-400">
          {task.startTime} {task.endTime && ` - ${task.endTime}`}
        </div>
        {task.class === "ICS 311: Data Structures & Algorithms" && (
          <div className="text-red-500">Starting in 22 mins</div>
        )}
      </div>
    </div>
  );
}

export default ScheduleSection;
