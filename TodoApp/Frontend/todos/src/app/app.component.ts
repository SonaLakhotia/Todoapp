import { Component, inject, OnInit,} from '@angular/core';
import { Subtask, Task } from '../model/Task';
import { TodoService } from '../service/todo.service';
import { FormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgFor],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  title: string = "Create a Task";
  isLoading: boolean = true;
  todo = inject(TodoService);
  subtask: Subtask = {title: '', priority: "low"}
  tasks: Task[] = [];
  task: Task = {_id: '',title: '', description: '', completed: false, subtasks: [], tags: []}

  ngOnInit(): void {
    this.todo.tasks$.subscribe((tasks)=>{
      this.tasks = tasks
    })
    this.getTasks();
  }

  
  addSubtask() {
    this.task.subtasks.push({title: '', priority:"low"});
  }

  getTasks (){
    this.todo.updateTasks();
  }
    

  removeSubtask(index: number){
    this.task.subtasks.splice(index, 1);
  }

  resetTask(){
    this.task = {title: '', description: '', completed: false, subtasks: [], tags: []}
  }

  postTask(task: Task): void {
    this.todo.addTasks(task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask); 
        this.todo.updateTasks();
        this.resetTask();
      },
      error: (err)=> {
        console.error("Error adding taks", err);
      }
    })
  }
}
