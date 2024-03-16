import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from "./tasks/pages/tasks-list/tasks-list.component";
import { NotFoundComponent } from "./core/pages/not-found/not-found.component";
import { DetailedTaskComponent } from "./tasks/pages/detailed-task/detailed-task.component";


const routes: Routes = [
  { path: '', redirectTo: 'tasks-list', pathMatch: 'full' },
  { path: 'tasks-list', component: TasksListComponent },
  { path: 'task/:id', component: DetailedTaskComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
