import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req: any, res: any) => {
  const { userId, title, completed, date, deadline, expectedDuration, currentDuration } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const newTask = await prisma.task.create({
      data: {
        userId,
        title,
        completed,
        date,
        deadline,
        expectedDuration,
        currentDuration,
      },
    });
    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
};

export const getAllTasks = async (req: any, res: any) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        subtasks: true, // Optional: Include subtasks related to each task
        user: true, // Optional: Include user info associated with each task
      },
    });
    res.json(tasks); // Return the list of tasks
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const getTaskById = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) }, // Ensure to convert id to a number
      include: {
        subtasks: true, // Optional: Include subtasks related to the task
        user: true, // Optional: Include user info associated with the task
      },
    });

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching task" });
  }
};

export const getTaskByUserId = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: id },
      include: {
        subtasks: true,
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error while fetching tasks" });
  }
};
