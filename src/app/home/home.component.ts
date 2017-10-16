import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'

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

  constructor(private dataService: DataService) { }

  ngOnInit() { this.getAnnouncements(); }
  
   getAnnouncements() {
     this.dataService.getRecords("announcements")
       .subscribe(
         announcements => this.announcements = announcements,
         error =>  this.errorMessage = <any>error);
   }
  }