import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../../components/add-task/add-task.component";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  constructor(
    public dialog: MatDialog,
  ) {}

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent,
      {
        // width: '800px',
        // height: '300px'
      });
    dialogRef.afterClosed().subscribe(res => {
      if (!!res) {
        alert(res);
      }
    })
  }

}
