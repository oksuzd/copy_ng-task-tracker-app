import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { BackButtonComponent } from './back-button/back-button.component';


const materialModules = [
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
];


@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    BackButtonComponent,
  ],
})
export class SharedModule { }
