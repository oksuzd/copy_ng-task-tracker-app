import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private storageKey: string = 'entities';

  constructor() { }

  getTasks(): Observable<Task[]> {
    const tasks = this.getLocalStorageEntities();
    return of(tasks);
  }

  createTask(task: Task): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
    };
    const entities = this.getLocalStorageEntities();
    entities.push(newTask);
    localStorage.setItem(this.storageKey, JSON.stringify(entities));
    return of(newTask);
  }

  private getLocalStorageEntities(): Task[] {
    const entitiesJSON = localStorage.getItem(this.storageKey);
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
