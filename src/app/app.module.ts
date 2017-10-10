import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GradesComponent } from './grades/grades.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementsFormComponent } from './announcements-form/announcements-form.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { PreferencesComponent } from './preferences/preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    GradesComponent,
    AnnouncementsComponent,
    AnnouncementsFormComponent,
    GradesFormComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
