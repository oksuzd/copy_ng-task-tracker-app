import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditorComponent implements OnInit {
  titleName: string = '';
  isNewTask: boolean = false;
  priorities: PrioritySettings[] = PRIORITIES;
  performers: Performer[] = PERFORMERS;
  protected readonly getFullName = getFullName;

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
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<TaskEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Task>
  ) {
  }

  ngOnInit() {
    if (!!this.data.id) {
      this.titleName = 'Edit Task';
      console.log("edit");
      // this.cdr.detectChanges();
    } else {
      this.titleName = 'New Task';
      // this.isNewTask = true;
      console.log("new");
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  compareFn(user1: Performer, user2: Performer): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

}
