import { NgModule } from '@angular/core';
import { TasksListComponent } from "./pages/tasks-list/tasks-list.component";
import { DetailedTaskComponent } from "./pages/detailed-task/detailed-task.component";
import { SharedModule } from "../shared/shared.module";
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { AddTaskComponent } from './components/add-task/add-task.component';


@NgModule({
  declarations: [
    TasksListComponent,
    DetailedTaskComponent,
    TaskItemComponent,
    AddTaskComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class TasksModule {}
