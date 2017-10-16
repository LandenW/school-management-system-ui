import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent }   from '../assignments/assignments.component';
import { AssignmentsFormComponent }   from '../assignments-form/assignments-form.component';
import { HomeComponent }   from '../home/home.component';
import { AddAccountsComponent }   from '../add-accounts/add-accounts.component';
import { AddAccountsFormComponent }   from '../add-accounts-form/add-accounts-form.component';
import { AnnouncementsComponent }   from '../announcements/announcements.component';
import { AnnouncementsFormComponent }   from '../announcements-form/announcements-form.component';
import { CalendarComponent }   from '../calendar/calendar.component';
import { GradesComponent }   from '../grades/grades.component';
import { GradesFormComponent }   from '../grades-form/grades-form.component';
import { LogInComponent }   from '../log-in/log-in.component';
import { LogOutComponent }   from '../log-out/log-out.component';
import { NavigationComponent }   from '../navigation/navigation.component';
import { PreferencesComponent }   from '../preferences/preferences.component';
import { AddTeachersComponent }   from '../add-teachers/add-teachers.component';
import { StudentAssignmentViewComponent }   from '../student-assignment-view/student-assignment-view.component';

const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'assignments',  component: AssignmentsComponent },
  { path: 'assignments-form',  component: AssignmentsFormComponent },
  { path: 'add-accounts',  component: AddAccountsComponent },
  { path: 'add-accounts-form',  component: AddAccountsFormComponent  },
  { path: 'announcements',  component: AnnouncementsComponent },
  { path: 'announcements-form',  component: AnnouncementsFormComponent },
  { path: 'calendar',  component: CalendarComponent },

  { path: 'grades',  component: GradesComponent },
  { path: 'grades-form',  component: GradesFormComponent },
  { path: 'log-in',  component: LogInComponent },
  { path: 'navigation',  component: NavigationComponent },
  { path: 'preferences',  component: PreferencesComponent },
  { path: 'announcements/add',  component: AnnouncementsFormComponent },
  { path: 'announcements/edit/:id',  component: AnnouncementsFormComponent },

  { path: 'add-accounts-form/add',  component: AddAccountsFormComponent },
  { path: 'add-accounts-form/edit/:id',  component: AddAccountsFormComponent },

  { path: 'add-teachers/add',  component: AddTeachersComponent },
  { path: 'add-teachers/edit/:id',  component: AddTeachersComponent },

  { path: 'assignments-form/add',  component: AssignmentsFormComponent },
  { path: 'assignments-form/edit/:id',  component: AssignmentsFormComponent },

  { path: 'student-assignment-view',  component: StudentAssignmentViewComponent },




]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
