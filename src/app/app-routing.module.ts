import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from "./tasks/pages/tasks-list/tasks-list.component";
import { NotFoundComponent } from "./core/pages/not-found/not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'tasks-list', pathMatch: 'full' },
  { path: 'tasks-list', component: TasksListComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
