import express, { Router } from 'express';
import { createTask, getTasks, getTask, deleteTask, updateTask, toggleTask } from '../controllers/tasksController';

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTask);
router.patch("/toggle/:id", toggleTask);

export default router;
