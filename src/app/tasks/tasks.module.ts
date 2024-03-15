import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import { TasksListComponent } from "./pages/tasks-list/tasks-list.component";
import { DetailedTaskComponent } from "./pages/detailed-task/detailed-task.component";

@NgModule({
  declarations: [
    TasksListComponent,
    AddTaskComponent,
    DetailedTaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class TasksModule {}
