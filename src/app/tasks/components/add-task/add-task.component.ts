import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Priority, PrioritySettings } from "../../models/task.model";
import { PRIORITIES } from "../../constants";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  events: string[] = [];

  priorities: PrioritySettings[] = PRIORITIES;

  newTaskForm: FormGroup = this.fb.group({
    status: false,
    name: ['',],
    description: ['',],
    priority: ['',],
    assignedTo: ['',],
    deadline: ['',],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
