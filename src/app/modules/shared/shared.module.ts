import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AssignUnassignComponent } from './assign-unassign/assign-unassign.component';



@NgModule({
  declarations: [
    AssignUnassignComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    AssignUnassignComponent,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SharedModule { }
