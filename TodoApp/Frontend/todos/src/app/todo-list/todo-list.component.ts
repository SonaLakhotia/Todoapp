import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {  Task } from '../../model/Task';
import { TodoService } from '../../service/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [NgFor, NgIf, FormsModule, NgClass],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit{

  tasks: Task[] = [];
  todoList = inject(TodoService);
  //filteredTasks: Task[] = [];
  //uniqueTags: string[] = [];
  editedTaskId: string = '' ;
  isLoading: boolean = true;
  editedTask: Task = { _id: '', title: '', description: '', tags: [], subtasks: [], completed: false };

  ngOnInit(): void {
    this.isLoading = true;
    console.log("first the isloading value in init", this.isLoading);
    this.todoList.tasks$.subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false; 
        console.log("this is inside the ngoninit", this.isLoading);
      },
      error: (err) => {
        console.error("Error in getting tasks", err);
        this.isLoading = false;
      },
    });

    this.todoList.updateTasks();
  }
  // extractTags(){
  //   const tagSet = new Set<string>();
  //   this.tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
  //   this.uniqueTags = Array.from(tagSet);
  // }

  // filterTasks(tag: string){
  //   this.filteredTasks = this.tasks.filter(task => task.tags.includes(tag));
  //   console.log(this.filteredTasks);
  // }

  // resetFilter(){
  //   this.filteredTasks = this.tasks;
  // }
  
  toggleTask(task: Task){
    this.todoList.toggleTask(task._id ?? '').subscribe((updatedTask) =>{
      task.completed = updatedTask.completed
    })
  }

  deleteTask(id: string){
    this.isLoading = true
    this.todoList.deleteTask(id).subscribe({
      next: () => {
        this.todoList.updateTasks();
        this.cancelEdit();
      },
      error: (err) => {
        console.error("Error deleting the task", err);
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  editTask(task: Task){
    this.editedTaskId = task._id ?? ''
    this.editedTask = {...task}
  }

  cancelEdit(){
    this.editedTaskId = '';
    this.editedTask = { _id: '', title: '', description: '', tags: [], subtasks: [], completed: false };

  }
  saveTask() {
    if (this.editedTaskId) {
      this.todoList.editTask(this.editedTaskId, this.editedTask).subscribe(() => {
        this.todoList.updateTasks(); 
        this.cancelEdit();
      });
    }
  }


}
