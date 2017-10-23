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

  user: User;


  ngOnInit() {
    this.dataService
    .userChanged
    .subscribe(user => this.user = user); //sets current user to user passed in
    this.user = this.dataService.getCurrentUser();  
    
  }

  title = 'School Management System';

}
