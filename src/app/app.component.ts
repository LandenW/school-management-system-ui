import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { RouterModule, Routes, Router } from '@angular/router'
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(
    private dataService: DataService, private router: Router,
  ) {}

  currentUser: User;


  ngOnInit() {
    if (localStorage.getItem('currentUser') != null ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    } 
    this.dataService
    .userChanged
    .subscribe(user => this.currentUser = user); //sets current user to user passed in
    this.currentUser = this.dataService.getCurrentUser();
  }
  title = 'School Management System';

}
