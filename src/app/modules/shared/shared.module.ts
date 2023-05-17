import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignUnassignComponent } from './assign-unassign/assign-unassign.component';



@NgModule({
  declarations: [
    AssignUnassignComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AssignUnassignComponent]
})
export class SharedModule { }
