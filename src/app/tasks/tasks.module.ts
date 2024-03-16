import { NgModule } from '@angular/core';
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import { TasksListComponent } from "./pages/tasks-list/tasks-list.component";
import { DetailedTaskComponent } from "./pages/detailed-task/detailed-task.component";
import { SharedModule } from "../shared/shared.module";
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";


@NgModule({
  declarations: [
    TasksListComponent,
    AddTaskComponent,
    DetailedTaskComponent,
    TaskItemComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterLink,
    NgOptimizedImage,
  ],
})
export class TasksModule {}
