import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PrioritySettings, Task } from "../../models/task.model";
import { PRIORITIES } from "../../constants";
import { Performer } from "../../../shared/models/mock.models";
import { PERFORMERS } from "../../../shared/mock/mock-data";
import { getFullName } from "../../helpers/helpers";

@Component({
  selector: 'task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss'],
})
export class TaskEditorComponent implements OnInit {
  protected readonly getFullName = getFullName;
  titleName: string = '';
  priorities: PrioritySettings[] = PRIORITIES;
  performers: Performer[] = PERFORMERS;

  taskForm: FormGroup = this.fb.group({
    id: this.data?.id ?? 0,
    status: this.data?.status ?? false,
    name: [this.data?.name ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    description: [this.data?.description ?? '',],
    priority: [this.data?.priority ?? '', [Validators.required]],
    assignedTo: [this.data?.assignedTo ?? '', [Validators.required]],
    deadline: [this.data?.deadline ?? '', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Task>
  ) {
  }

  ngOnInit() {
    if (!!this.data.id) {
      this.titleName = 'Edit Task';
    } else {
      this.titleName = 'New Task';
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  compareFn(performer1: Performer, performer2: Performer): boolean {
    return performer1 && performer2 ? performer1.id === performer2.id : performer1 === performer2;
  }
}
