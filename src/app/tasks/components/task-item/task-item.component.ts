import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Priority, PrioritySettings, Task } from '../../models/task.model';
import { PRIORITIES } from "../../constants";
import { Performer } from "../../../shared/models/mock.models";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { DataService } from "../../services/data.service";
import { FilteringService } from "../../services/filtering.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() public task!: Task;

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService,
    private filterService: FilteringService
  ) {
  }

  ngOnInit() {
    this.cdr.detectChanges();
    // console.log(this.task.priority);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  }

  getPriority(priority: Priority): PrioritySettings {
    const filtered = PRIORITIES.filter((obj) => obj.key === priority);
    return filtered[0];
  }

  getPerformerInitials(performer: Performer): string {
    return performer.firstName[0] + performer.lastName[0];
  }

  onStatusChange(event: MatCheckboxChange) {
    this.dataService.updateTask({
        ...this.task,
        status: event.checked
      }
    )
      .pipe()
      .subscribe(() => {
        this.filterService.setStatus()
      });
    // console.log(event.checked);
  }
}
