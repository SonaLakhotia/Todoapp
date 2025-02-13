import mongoose, {Schema, Document} from "mongoose";

type Priority = "high" | "low" | "medium";

type Subtask = {
  title: string,
  priority: Priority
}

type Task = Document & {
  title: string,
  description?: string,
  completed: boolean,
  subtasks: Subtask[],
  tags: string[]
}

const SubtaskSchema = new Schema<Subtask>({
  title: {type: String, required: true},
  priority: { type: String, enum: ["high", "medium", "low"], default: "medium"}
})

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true},
  description: { type: String },
  completed: { type: Boolean, default: false},
  subtasks: { type: [SubtaskSchema], default: []},
  tags: { type: [String], default: []}
})

export default mongoose.model<Task>('Task', TaskSchema);