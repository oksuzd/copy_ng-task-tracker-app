import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../../components/add-task/add-task.component";
import { Task } from '../../models/task.model';
import { DataService } from "../../services/data.service";
import { tap } from "rxjs";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.dataService.getTasks()
      .pipe(
        // tap((res => console.log('res', res)))
        // take(1),
        // takeUntil(this.notifier$),
        // catchError((err) => throwError(() => err))
      )
      .subscribe((data) => {
        this.tasks = data;
        // console.log('data', data);
        // console.log('date', typeof data[0].deadline);
        // this.cdr.detectChanges();
      });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(res => {
      !!res && this.createTask(res);
    });
  }

  private createTask(task: Task): void {
    this.dataService.createTask(task)
      .pipe(
        // take(1),
        // takeUntil(this.notifier$),
        // catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
          console.log(res);
          this.tasks.push(res);
          this.cdr.detectChanges();
        }
      );
  }
}
