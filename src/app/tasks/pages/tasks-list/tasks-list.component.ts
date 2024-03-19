import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TaskEditorComponent } from "../../components/task-editor/task-editor.component";
import { Task } from '../../models/task.model';
import { DataService } from "../../services/data.service";
import { catchError, Subject, take, takeUntil, tap, throwError } from "rxjs";
import { PRIORITIES } from "../../constants";
import { FilteringService } from "../../services/filtering.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, OnDestroy{

  tasks: Task[] = [];
  selectedSort = 'nameAsc';
  selectedFilter = 'notCompleted';
  private initialTasks: Task[] = [];
  private notifier$: Subject<null> = new Subject();

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
        // console.log('data', data);
        // console.log('date', typeof data[0].deadline);
        // this.cdr.detectChanges();
      });
    this.onStatusChange();
    this.sortTasks();

  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  sortTasks() {
    switch (this.selectedSort) {
      case 'nameAsc':
        this.tasks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.tasks.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'dateAsc':
        this.tasks.sort((a, b) => {
          const dateA = new Date(a.deadline).getTime();
          const dateB = new Date(b.deadline).getTime();
          return dateA - dateB;
        });
        break;
      case 'dateDesc':
        this.tasks.sort((a, b) => {
          const dateA = new Date(a.deadline).getTime();
          const dateB = new Date(b.deadline).getTime();
          return dateB - dateA;
        });
        break;
      case 'priorityAsc':
        this.tasks.sort((a, b) => a.priority - b.priority);
        break;
      case 'priorityDesc':
        this.tasks.sort((a, b) => b.priority - a.priority);
        break;
    }
    this.filterTasks();
  }

  filterTasks() {
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
    const dialogRef = this.dialog.open(TaskEditorComponent, {
      data: {
        id: '',
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      !!res && this.createTask(res);
      // console.log('res', res)
    });
  }

  private createTask(task: Task): void {
    this.dataService.createTask(task)
      .pipe(
        // take(1),
        // takeUntil(this.notifier$),this.data.id
        // catchError((err) => throwError(() => err))
      )
      .subscribe((res) => {
          // console.log(res);
          this.tasks.push(res);
          this.cdr.detectChanges();
        }
      );
  }

  // protected readonly PRIORITIES = PRIORITIES;

  onStatusChange() {
    this.filterService.statusChange$
      .pipe()
      .subscribe(() => this.filterTasks())
  }
}
