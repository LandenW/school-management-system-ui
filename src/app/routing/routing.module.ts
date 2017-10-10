import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AssignmentsComponent }   from '../assignments/assignments.component';

 
const routes: Routes = [
  { path: 'assignments',  component: AssignmentsComponent },
] 
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
