type TaskImpact = 1 | 2 | 3 | 4;
type TaskDifficulty = 1 | 2 | 3 | 4;

const TASK_IMPACT: Record<TaskImpact, string> = {
  1: "Minor",
  2: "Moderate",
  3: "High",
  4: "Critical",
};

const TASK_DIFFICULTY: Record<TaskDifficulty, string> = {
  1: "Easy",
  2: "Medium",
  3: "Challenging",
  4: "Complex",
};

export { TASK_IMPACT, TASK_DIFFICULTY };
