import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { User } from "../user";



@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})


export class LogOutComponent {

  constructor(
    private dataService: DataService,
    private route: Router
  ) {}

  username: string;
  password: string;
  message: string
  private currentUser: User;

  //subject is a specific channel of communication
  //other components can subscribe to userChanged event, listen for and act
  //methods below will be source of info for subject; can pass info through it

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
  
