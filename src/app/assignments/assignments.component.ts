import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

import { DataService } from '../data.service';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  assignments: any[];
  mode = 'Observable';

  constructor (private dataService: DataService, public dialog: MatDialog) {}


  ngOnInit() { this.getAssignments(); }
  
  getAssignments() {
    this.dataService.getRecords("assignments")
      .subscribe(
        assignments => this.assignments = assignments,
        error =>  this.errorMessage = <any>error);
  }

  deleteAssignment(id:number) {
    
        let dialogRef = this.dialog.open(DeleteConfirmComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.dataService.deleteRecord("assignments", id)
              .subscribe(
                assignments => {this.successMessage = "Record(s) deleted succesfully"; this.getAssignments(); },
                error =>  this.errorMessage = <any>error);
          }
        });
      }
  }

