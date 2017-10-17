import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {


  errorMessage: string;
  successMessage: string;
  letterGradeValue: string;
  assignments;
  gradeId;
  gradeStudentId;
 rowItem;
  
  constructor(private dataService: DataService ) {

   
   }

  //  gradeId: number, gradeStudentId: number, letterGradeValue: string 
  //  this.gradeId = gradeId;
  //  this.gradeStudentId = gradeStudentId;
  // this.letterGradeValue = letterGradeValue;
  ngOnInit() {
    this.getGradesforOneStudent();

  }
  getGradesforOneStudent() {
    this.dataService.getGradesForOneRecord("grades", "assignments", 5)
      .subscribe(
        assignments => this.assignments = assignments,
        error =>  this.errorMessage = <any>error);
        
  }

  getIndex(index, assignment){
    console.log(assignment.gradeId);
  }


  saveGrades(grade: NgForm){

    if(typeof this.assignments.gradeId === "number"){
      this.dataService.editRecord("grades", this.assignments.value, this.assignments.gradeId)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }

  }

  
}

