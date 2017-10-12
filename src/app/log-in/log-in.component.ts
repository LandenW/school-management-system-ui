import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})


export class LogInComponent {

  constructor(
    private dataService: DataService,
    private route: Router
  ) {}

  username: string;
  password: string;
  message: string

  //subject is a specific channel of communication
  //other components can subscribe to userChanged event, listen for and act
  //methods below will be source of info for subject; can pass info through it

  submitCredentials() {
    this.dataService
    .login("session", this.username, this.password)
      .subscribe(
                user => {
                  if (user) {
                    this.route.navigate(['/home']);
                    console.log("Logged in Successful")
                    this.dataService.getCurrentUser()
                  } else {
                    this.message = 'Could not log in with those credentials';
                  }
                },
                 e => this.message = 'Oops! We ran into the following error: ' + e
              );
   }





}