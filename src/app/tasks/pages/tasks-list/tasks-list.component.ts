import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../../components/add-task/add-task.component";
import { Priority, Task } from '../../models/task.model';
import { PERFORMERS } from "../../../shared/mock/mock-data";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  tasks: Task[] = [
    {
      id: 57768799,
      status: false,
      name: 'First task',
      description: 'aaaaaaaaaaaaa',
      assignedTo: PERFORMERS[0],
      deadline: 'Mar 29',
      priority: Priority.p1
    },
  ]

  constructor(
    public dialog: MatDialog,
  ) {}

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(res => {
      !!res && this.createTask(res);
    })
  }

  private createTask(task: Task): void {

  }
}
