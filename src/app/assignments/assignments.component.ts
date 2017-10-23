import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

import { DataService } from '../data.service';
import { User } from "../user";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  assignments;
  mode = 'Observable';
  currentUser: User;

  constructor (private dataService: DataService, public dialog: MatDialog) {}


  ngOnInit() { 
      this.dataService
      .userChanged
      .subscribe(user => this.currentUser = user); //sets current user to user passed in
      this.currentUser = this.dataService.getCurrentUser();  
      this.getAssignments();
    }
  
  getAssignments() {
    this.dataService.getTeacherAssignments("teachers", this.currentUser.userId, "assignments")
      .subscribe(
        assignments => {this.assignments = assignments;
          for (let i=0; i < this.assignments.length; i++) {
            this.assignments[i].assignmentDueDate = this.assignments[i].assignmentDueDate + 28800000
          }
        error =>  this.errorMessage = <any>error});
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

