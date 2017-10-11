import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DataService } from '../data.service'

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  announcements: any[];
  mode = 'Observable';

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() { this.getAnnouncements(); }
  
   getAnnouncements() {
     this.dataService.getRecords("announcements")
       .subscribe(
         announcements => this.announcements = announcements,
         error =>  this.errorMessage = <any>error);
   }
  } 