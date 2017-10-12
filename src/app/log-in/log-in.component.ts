import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { User } from "../user";



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
  private currentUser: User;


  submitCredentials() {
    this.dataService
    .login("session", this.username, this.password)
      .subscribe(
                user => {
                  if (user) {
                    this.route.navigate(['']);
                    console.log("Logged in Successful")
                    this.dataService.getCurrentUser()
                  } else {
                    this.message = 'Could not log in with those credentials';
                  }
                },
                 e => this.message = 'Oops! We ran into the following error: ' + e
              );
   }
  logoutUser() {
    this.dataService
    .logout("session")
      .subscribe(user => this.currentUser = user);
      console.log("Log Out Successful")
      this.dataService.getCurrentUser()    
  }
  

  ngOnInit() {
    this.dataService
    .userChanged
    .subscribe(user => this.currentUser = user); //sets current user to user passed in
  }


}     
  
