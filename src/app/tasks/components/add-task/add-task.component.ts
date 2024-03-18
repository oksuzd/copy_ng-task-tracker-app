import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  events: string[] = [];

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const formattedDate = event.value?.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
    });
    // }).replace(',', '');
    console.log(formattedDate);

    // const date = new Date('2022-06-15');
    // const monthName = date.toLocaleString('default', { month: 'short' });
    // console.log(monthName);

    // console.log(event.value?.getDate());
    // console.log(event.value?.toDateString());

    // this.events.push(`${type}: ${event.value}`);
    // console.log(`${type}: ${event.value}, 'typeof: ',`, typeof event.value);
    // console.log(event.value?.);
    // console.log(event.value?.toISOString());
  }
}
