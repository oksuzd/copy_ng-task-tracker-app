import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PrioritySettings, Task } from "../../models/task.model";
import { PRIORITIES } from "../../constants";
import { Performer } from "../../../shared/models/mock.models";
import { PERFORMERS } from "../../../shared/mock/mock-data";
import { getFullName } from "../../helpers/helpers";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent implements OnInit{
  titleName: string = '';
  isNewTask: boolean = false;
  priorities: PrioritySettings[] = PRIORITIES;
  performers: Performer[] = PERFORMERS;
  protected readonly getFullName = getFullName;


  newTaskForm: FormGroup = this.fb.group({
    status: false,
    name: ['',],
    description: ['',],
    priority: ['',],
    assignedTo: ['',],
    deadline: ['',],
  });

  editTaskForm: FormGroup = this.fb.group({
    status: false,
    name: [this.data.name,],
    description: [this.data.description,],
    priority: [this.data.priority,],
    assignedTo: [getFullName(this.data.assignedTo),],
    deadline: [this.data.deadline,],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: {id: string}
    @Inject(MAT_DIALOG_DATA) public data: Partial<Task>
    // @Inject(MAT_DIALOG_DATA) public data: Task | {id: string}
    // @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
  }

  ngOnInit() {
    // console.log('newTaskForm', this.newTaskForm.value);
    // console.log('data', this.data);
    if (!!this.data.id) {
      this.titleName = 'Edit Task';
      // this.cdr.detectChanges();
      // console.log(this.newTaskForm.value['priority']);
      console.log("edit");
    } else {
      this.titleName = 'New Task';
      this.isNewTask = true;
      // this.isNewTask = true;
      // console.log(this.data.id);
      console.log("new");
      // this.cdr.detectChanges();
    }

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
