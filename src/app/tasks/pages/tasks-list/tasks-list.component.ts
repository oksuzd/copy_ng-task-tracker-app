import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TaskEditorComponent } from "../../components/task-editor/task-editor.component";
import { Task } from '../../models/task.model';
import { DataService } from "../../services/data.service";
import { catchError, Subject, take, takeUntil, throwError } from "rxjs";
import { FilteringService } from "../../services/filtering.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, OnDestroy {

  private initialTasks: Task[] = [];
  private notifier$: Subject<null> = new Subject();
  tasks: Task[] = [];
  selectedSort: string = 'nameAsc';
  selectedFilter: string = 'notCompleted';

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private filterService: FilteringService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.dataService.getTasks()
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((data) => {
        this.initialTasks = this.tasks = data;
      });
    this.onStatusChange();
    this.sortTasks();

  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  onStatusChange(): void {
    this.filterService.statusChange$
      .pipe(
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe(() => this.filterTasks());
  }

  sortTasks(): void {
    switch (this.selectedSort) {
      case 'nameAsc':
        this.tasks.sort((a: Task, b: Task ) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.tasks.sort((a: Task, b: Task) => b.name.localeCompare(a.name));
        break;
      case 'dateAsc':
        this.tasks.sort((a: Task, b: Task) => {
          const dateA: number = new Date(a.deadline).getTime();
          const dateB: number = new Date(b.deadline).getTime();
          return dateA - dateB;
        });
        break;
      case 'dateDesc':
        this.tasks.sort((a: Task, b: Task) => {
          const dateA: number = new Date(a.deadline).getTime();
          const dateB: number = new Date(b.deadline).getTime();
          return dateB - dateA;
        });
        break;
      case 'priorityAsc':
        this.tasks.sort((a: Task, b: Task) => a.priority - b.priority);
        break;
      case 'priorityDesc':
        this.tasks.sort((a: Task, b: Task) => b.priority - a.priority);
        break;
    }
    this.initialTasks = this.tasks;
    this.filterTasks();
  }

  filterTasks(): void {
    switch (this.selectedFilter) {
      case 'notCompleted':
        this.tasks = this.initialTasks;
        this.tasks = this.tasks.filter(task => !task.status);
        break;
      case 'completed':
        this.tasks = this.initialTasks;
        this.tasks = this.tasks.filter(task => task.status);
        break;
      case 'all':
        this.tasks = this.initialTasks;
        break;
    }
  }

  addTask(): void {
    const dialogRef: MatDialogRef<TaskEditorComponent> = this.dialog.open(TaskEditorComponent, {
      data: {id: ''}
    });
    dialogRef.afterClosed().subscribe(res => {
      !!res && this.createTask(res);
    });
  }

  private createTask(task: Task): void {
    this.dataService.createTask(task)
      .pipe(
        take(1),
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe((res: Task) => {
          this.tasks.push(res);
          this.initialTasks.push(res);
          this.cdr.detectChanges();
        }
      );
  }
}
