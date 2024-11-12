import { PrismaClient } from "@prisma/client";
import express from "express";

const rateLimit = require("express-rate-limit");

const prisma = new PrismaClient();
const app = express();

const port = 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use(limiter);
app.use(express.json());

app.post(`/create-user`, async (req, res) => {
  const { id, name, email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        email,
      },
    });
    console.log("User created");
    res.json(newUser);
  } else {
    console.log("User already exists");
    res.json(user);
  }
});

// Endpoint to create a task
app.post("/task", async (req, res) => {
  const { userId, title, completed, date, deadline, expectedDuration, currentDuration } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        userId, // Assuming userId is provided in the request
        title,
        completed: completed || false, // Default to false if not provided
        date: new Date(date), // Convert date string to Date object
        deadline: deadline ? new Date(deadline) : null, // If no deadline provided, set it to null
        expectedDuration,
        currentDuration,
      },
    });
    res.json(newTask); // Return the created task
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
});

// Endpoint to get all tasks
app.get("/tasks", async (req, res) => {
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
});

// Endpoint to get a task by ID
app.get("/task/:id", async (req, res) => {
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
});

// Endpoint to get a task by user ID
app.get("/tasks/user/:id", async (req, res) => {
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
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
