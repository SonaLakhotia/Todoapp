import Task  from "../models/task";
import { Request, Response } from "express";

export const createTask = async (req:Request, res:Response) => {
  try{
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}

export const getTasks = async (req: Request, res: Response ) => {
  try{
    const tasks = await Task.find();
    res.status(200).json(tasks);
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}

export const getTask = async (req:Request, res: Response): Promise<any> => {
  try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found"})
    res.status(200).json(task)
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}

export const deleteTask = async (req: Request, res: Response):Promise<any> => {
  try{
     const task = await Task.findByIdAndDelete(req.params.id);
     if(!task) return res.status(404).json({ message: "Task not found"});
     res.json({ message: "Task deleted successfully"});
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const updateTask = async (req: Request, res: Response):Promise<any> => {
  try{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!task) return res.status(404).json({ message: "Task not found"});
    res.json({ message: "Task updated sucessfully"})
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const toggleTask = async(req: Request, res: Response):Promise<any> => {
  try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found"});
    task.completed = !task.completed
    await task.save();
    res.json(task)
  }catch(error){
    res.status(500).json({ error: error.message })
  }
}