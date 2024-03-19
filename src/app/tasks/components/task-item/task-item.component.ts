import { Component, Input, OnDestroy } from '@angular/core';
import { KeyName, Priority, PRIORITY_NAMES, PrioritySettings, Task } from '../../models/task.model';
import { PRIORITIES } from "../../constants";
import { Performer } from "../../../shared/models/mock.models";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { DataService } from "../../services/data.service";
import { FilteringService } from "../../services/filtering.service";
import { catchError, Subject, takeUntil, throwError } from "rxjs";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnDestroy {

  private notifier$: Subject<null> = new Subject();
  @Input() public task!: Task;

  protected readonly PRIORITY_NAMES: KeyName<Priority>[] = PRIORITY_NAMES;

  constructor(
    private dataService: DataService,
    private filterService: FilteringService
  ) {
  }

  ngOnDestroy() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  onStatusChange(event: MatCheckboxChange): void {
    this.dataService.updateTask({
        ...this.task,
        status: event.checked
      }
    )
      .pipe(
        takeUntil(this.notifier$),
        catchError((err) => throwError(() => err))
      )
      .subscribe(() => {
        this.filterService.setStatus();
      });
  }

  getPriority(priority: Priority): PrioritySettings {
    const filtered: PrioritySettings[] = PRIORITIES.filter((obj) => obj.key === priority);
    return filtered[0];
  }

  getPerformerInitials(performer: Performer): string {
    return performer.firstName[0] + performer.lastName[0];
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  }
}
