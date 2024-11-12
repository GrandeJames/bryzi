import express from "express";
import { createUser } from "../controllers/userController";

const router = express.Router();

// POST / - Create a new user
router.post("/", createUser);

export default router;
