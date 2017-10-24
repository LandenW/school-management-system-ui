import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { User } from "../user";
import { AppComponent } from "../app.component"


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})


export class LogInComponent {

  constructor(
    private dataService: DataService,
    private appComponent: AppComponent,
    private route: Router
  ) {}

  username: string;
  password: string;
  message: string
  currentUser: User;



  submitCredentials() {
    this.dataService
    .login("session", this.username, this.password)
    .subscribe(
      user => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.route.navigate(['/']);
        } else {
          this.message = 'Could not log in with those credentials';
        }
      },
        e => this.message = 'Oops! We ran into the following error: ' + e
    );
  }  

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }
    this.dataService
    .userChanged
    .subscribe(user => this.currentUser = user); //sets current user to user passed in
    this.currentUser = this.dataService.getCurrentUser();
  }
}     