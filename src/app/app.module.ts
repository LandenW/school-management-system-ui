import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddAccountsComponent } from './add-accounts/add-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddAccountsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
