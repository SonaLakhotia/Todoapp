import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import Task from "../src/models/task";
import http from "http"; 

let server: http.Server;

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://jmdslovelace:pineapple11@cluster0.n5w3a.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=Cluster0';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB Atlas');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Task API Tests", () => {
  let taskId: string;

  test("Should create a new task", async () => {
    const taskData = {
      title: "Test Task",
      description: "This is a test task",
      completed: false,
      subtasks: [{ title: "Subtask 1", priority: "high" }],
      tags: ["urgent"],
    };

    const response = await request(app).post("/tasks").send(taskData);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(taskData.title);
    expect(response.body.subtasks.length).toBe(1);
    taskId = response.body._id;
  });

  test("Should get all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
  });

  test("Should get a task by ID", async () => {
    const response = await request(app).get(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
  });

  test("Should update a task", async () => {
    const updatedTaskData = { title: "Updated Task" };
    const response = await request(app).put(`/tasks/${taskId}`).send(updatedTaskData);
    expect(response.status).toBe(200);
  });

  test("Should toggle task completion", async () => {
    const response = await request(app).patch(`/tasks/toggle/${taskId}`);
    expect(response.status).toBe(200);
  });

  test("Should delete a task", async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });

  test("Should return 404 for a non-existing task", async () => {
    const nonExistingTaskId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/tasks/${nonExistingTaskId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Task not found");
  });
})
