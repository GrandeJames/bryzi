const users = [
  {
    firstName: "John",
    lastName: "Doe",
    tasks: [
      { title: "Complete PostgreSQL Tutorial", reward: undefined, deadline: undefined },
      { title: "Complete daily leetcode problem" },
    ],
  },
  { firstName: "Jake", lastName: "Doe", tasks: [{ title: "Task 1" }, { title: "Task 2" }] },
];

export const tasks = [
  {
    title: "ICS 311: Attend class",
    // class: "ICS 311: Data Structures & Algorithms",
    impact: 3,
    difficulty: 3,
    date: "2022-01-01",
    startTime: "08:00",
    endTime: "09:15",
    completed: true,
  },
  {
    title: "Discussion Post 2",
    date: "2022-01-01",
    class: "ICS 425: Computer Security & Ethics",
    impact: 1,
    deadline: "2022-01-01",
    completed: false,
    expectedDuration: "0:30",
    currentDuration: "0:22",
  },
  {
    title: "Read Chap",
    date: "2022-01-01",
    class: "EDEP 311: Educational Psychology",
    impact: 3,
    deadline: "2022-01-01",
    completed: false,
    expectedDuration: "0:90",
  },
  {
    title: "ICS 212: Office hour",
    // class: "ICS 212: Program Structure",
    difficulty: 2,
    date: "2022-01-01",
    startTime: "11:30",
    completed: true,
  },

  {
    title: "SPAN-202: Attend class",
    // class: "SPAN 202: Spanish",
    date: "2022-01-01",
    startTime: "16:00",
    endTime: "16:50",
    completed: true,
  },
  {
    title: "Appointment",
    date: "2022-01-01",
    startTime: "17:00",
    completed: true,
  },
  { title: "Work", date: "2022-01-01", startTime: "17:00", endTime: "21:00", completed: false },
  // { title: "Sleep", date: "2022-01-01", startTime: "17:00", endTime: "21:00", completed: false },

  {
    title: "Discussion Post",
    date: "2022-01-01",
    class: "ICS 425: Computer Security & Ethics",
    impact: 1,
    deadline: "2022-01-01",
    completed: true,
    expectedDuration: "0:30",
  },
  { title: "Gym", date: "2022-01-01", completed: true },
  { title: "Laundry", date: "2022-01-01", completed: true },
];
