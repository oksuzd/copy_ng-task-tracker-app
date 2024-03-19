import { NgModule } from '@angular/core';
import { TasksListComponent } from "./pages/tasks-list/tasks-list.component";
import { DetailedTaskComponent } from "./pages/detailed-task/detailed-task.component";
import { SharedModule } from "../shared/shared.module";
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { TaskEditorComponent } from "./components/task-editor/task-editor.component";
import { MatTooltipModule } from "@angular/material/tooltip";


@NgModule({
  declarations: [
    TasksListComponent,
    DetailedTaskComponent,
    TaskItemComponent,
    TaskEditorComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
})
export class TasksModule {}
