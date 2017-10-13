import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) {}

  user: User;


  ngOnInit() {
    this.dataService
    .userChanged
    .subscribe(user => this.user = user); //sets current user to user passed in
  }

  title = 'School Management System';

}
