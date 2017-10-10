import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { GradesComponent } from './grades/grades.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementsFormComponent } from './announcements-form/announcements-form.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddAccountsComponent } from './add-accounts/add-accounts.component';
import { AppRoutingModule } from './routing/routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AssignmentsComponent } from './assignments/assignments.component';


@NgModule({
  declarations: [
    AppComponent,
    GradesComponent,
    AnnouncementsComponent,
    AnnouncementsFormComponent,
    GradesFormComponent,
    PreferencesComponent,
    CalendarComponent,
    AddAccountsComponent,
    LogInComponent,
    NavigationComponent,
    AssignmentsComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
