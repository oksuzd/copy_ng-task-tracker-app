import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from '../../models/task.model';
import { DataService } from "../../services/data.service";
import { getFullName } from '../../helpers/helpers';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from "../../components/delete-confirmation/delete-confirmation.component";
import { TaskEditorComponent } from "../../components/task-editor/task-editor.component";
import { catchError, Subject, take, takeUntil, throwError } from "rxjs";


@Component({
  selector: 'app-detailed-task',
  templateUrl: './detailed-task.component.html',
  styleUrls: ['./detailed-task.component.scss']
})
export class DetailedTaskComponent implements OnInit, OnDestroy {

  private notifier$: Subject<null> = new Subject();
  protected readonly getFullName = getFullName;
  task!: Task;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getTask();
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  getTask() {
    const taskId = this.route.snapshot.params['id'];
    this.dataService.getTaskById(taskId)
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((data) => {
        this.task = data;
      });
  }

  editTask(task: Task) {
    const dialogRef: MatDialogRef<TaskEditorComponent> = this.dialog.open(TaskEditorComponent, {
      data: task
    });
    dialogRef.afterClosed().subscribe(res => {
      !!res && this.updateTask(res);
    });
  }

  updateTask(task: Task) {
    this.dataService.updateTask(task)
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err)))
      .subscribe((res) => {
          if (res) {
            this.task = task;
          }
        }
      );
  }

  deleteTask(id: string) {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent,
      {width: '250px'});
    dialogRef.afterClosed().subscribe(res => {
      if (!!res) {
        this.dataService.deleteTask(id)
          .pipe(
            take(1),
            takeUntil(this.notifier$),
            catchError((err) => throwError(() => err))
          )
          .subscribe((res: boolean) => {
            if (res) {
              this.router.navigate(['/']).then();
            }
          });
      }
    });
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString('en-US', {dateStyle: "full"});
  }
}
