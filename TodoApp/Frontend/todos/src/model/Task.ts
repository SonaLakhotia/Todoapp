export type Subtask = {
  title: string
  priority: "low" | "medium" | "high"

}

export type Task = {
  _id?: string,
  title: string,
  description: string,
  completed: boolean,
  subtasks: Subtask[],
  tags: string[]
}