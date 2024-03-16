import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";

const materialModules = [
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
  ]
})
export class SharedModule { }
