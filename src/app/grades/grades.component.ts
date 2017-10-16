import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

import { DataService } from '../data.service';
@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {


  errorMessage: string;
  successMessage: string;

  teachers;
  constructor(private dataService: DataService) { }

  ngOnInit() {


  }
  getGradesforOneStudent() {
    this.dataService.getRecords("teachers")
      .subscribe(
        teachers => this.teachers = teachers,
        error =>  this.errorMessage = <any>error);
        
  }

}
