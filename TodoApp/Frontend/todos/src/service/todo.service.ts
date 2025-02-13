import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  apiUrl = "http://localhost:5000/tasks";

  http = inject(HttpClient);
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTasks(task: Task): Observable<Task>{
    const { _id, ...t } = task;
    return this.http.post<Task>(this.apiUrl, t);
  }

  editTask(id: string, updatedTask: Partial<Task>){
    return this.http.put(`${this.apiUrl}/${id}`, updatedTask);
  }

  toggleTask(id: string): Observable<Task>{
    return this.http.patch<Task>(`${this.apiUrl}/toggle/${id}`, {});
  }

  deleteTask(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTasks(){
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this.tasksSubject.next(tasks);
      },
      error: (err) => {
        console.error("Error fetching tasks", err);
      }
    });
  }
}
