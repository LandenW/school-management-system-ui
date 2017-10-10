import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AssignmentsComponent }   from '../assignments/assignments.component';
import { AddAccountsComponent }   from '../add-accounts/add-accounts.component';
import { AddAccountsFormComponent }   from '../add-accounts-form/add-accounts-form.component';
import { AnnouncementsComponent }   from '../announcements/announcements.component';
import { AnnouncementsFormComponent }   from '../announcements-form/announcements-form.component';
import { CalendarComponent }   from '../calendar/calendar.component';
import { GradesComponent }   from '../grades/grades.component';
import { GradesFormComponent }   from '../grades-form/grades-form.component';
import { LogInComponent }   from '../log-in/log-in.component';
import { NavigationComponent }   from '../navigation/navigation.component';
import { PreferencesComponent }   from '../preferences/preferences.component';

const routes: Routes = [
  { path: 'assignments',  component: AssignmentsComponent },
] 
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
