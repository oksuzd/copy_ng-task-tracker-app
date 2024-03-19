import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private storageKey: string = 'Tasks';

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = this.getLocalStorageEntities();
    return of(tasks);
  }

  createTask(task: Task): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
    };
    const entities: Task[] = this.getLocalStorageEntities();
    entities.push(newTask);
    localStorage.setItem(this.storageKey, JSON.stringify(entities));
    return of(newTask);
  }

  getTaskById(id: string): Observable<Task> {
    const taskList: Task[] = this.getLocalStorageEntities();
    const task: Task | undefined = taskList.find(task => task.id === id);
    if (!task) {
      return throwError(() => new Error('Entity not found'));
    }
    return of(task);
  }

  updateTask(updatedTask: Task): Observable<boolean> {
    const tasks: Task[] = this.getLocalStorageEntities();
    const index: number = tasks.findIndex(task => {
      return task.id === updatedTask.id;
    });
    if (index === -1) {
      return throwError(() => new Error('Task not found'));
    }
    tasks[index] = updatedTask;
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return of(true);
  }

  deleteTask(id: string): Observable<boolean> {
    let tasks: Task[] = this.getLocalStorageEntities();
    const initialLength: number = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length === initialLength) {
      return throwError(() => new Error('Task not found or could not be deleted'));
    }
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return of(true);
  }

  private getLocalStorageEntities(): Task[] {
    const entitiesJSON: string | null = localStorage.getItem(this.storageKey);
    if (!entitiesJSON) {
      return [];
    }
    try {
      return JSON.parse(entitiesJSON);
    } catch (e) {
      throwError(() => new Error('Invalid storage data'));
      return [];
    }
  }
}
