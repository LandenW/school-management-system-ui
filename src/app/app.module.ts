import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

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
import { AddAccountsFormComponent } from './add-accounts-form/add-accounts-form.component';
import { AssignmentsFormComponent } from './assignments-form/assignments-form.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';


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
    AssignmentsComponent,
    AddAccountsFormComponent,
    AssignmentsFormComponent,
    HomeComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
