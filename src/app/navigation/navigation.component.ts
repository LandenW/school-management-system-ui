import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'
import { DataService } from '../data.service'
import { User } from "../user";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }

  currentUser: User;

  ngOnInit() {
    this.dataService
    .userChanged
    .subscribe(user => this.currentUser = user); //sets current user to user passed in
    this.currentUser = this.dataService.getCurrentUser();  
  }
}
