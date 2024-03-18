import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Priority, PrioritySettings, Task } from '../../models/task.model';
import { PRIORITIES } from "../../constants";
// import { MatDialog } from "@angular/material/dialog";
// import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  // checked: boolean = false;
  @Input() public task!: Task;
  bg =  'blue';

  constructor(
    private cdr: ChangeDetectorRef,
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
    const filtered = PRIORITIES.filter((obj) => obj.key === priority)
    return filtered[0];

  }

  // getPriorityColor(priority: Priority): string {
  //   return '';
  // }
}
