import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { User } from "../user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  successMessage: string; 
  announcements: any[];
  mode = 'Observable';
  currentUser: User;

  constructor(private dataService: DataService) { }

  ngOnInit() { 
    this.getAnnouncements();
  }
  
   getAnnouncements() {
     this.dataService.getRecords("announcements")
       .subscribe(
         announcements => {this.announcements = announcements;
          for (let i=0; i < this.announcements.length; i++) {
            this.announcements[i].date = this.announcements[i].date + 28800000
          }
         error =>  this.errorMessage = <any>error});
   }
   
   title = 'School Management System';

  }