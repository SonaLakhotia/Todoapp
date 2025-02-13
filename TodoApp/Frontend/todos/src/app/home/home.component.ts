import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  imports: [AppComponent, TodoListComponent],
  template: `

<h1 class="text-3xl font-bold text-center mb-8">Task Management</h1>

<div class="flex space-x-4">
  <div class="w-1/4 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
    <app-root></app-root>
  </div>
  <div class="w-3/4 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
    <app-todo-list></app-todo-list>
  </div>
</div>
  `
  
})
export class HomeComponent {

}
