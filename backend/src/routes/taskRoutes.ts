import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
} from "../controllers/taskController";

const router = express.Router();

router.post("/", createTask);

router.get("/", getAllTasks);
router.get("/task/:id", getTaskById);
router.get("/user/:id", getTaskByUserId);

export default router;
