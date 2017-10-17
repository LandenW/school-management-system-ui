import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import * as _ from 'lodash';
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
  students; 
 

  constructor(private dataService: DataService ) { }

   

  //  gradeId: number, gradeStudentId: number, letterGradeValue: string 
  //  this.gradeId = gradeId;
  //  this.gradeStudentId = gradeStudentId;
  // this.letterGradeValue = letterGradeValue;
  ngOnInit() {
    this.getGradesforOneStudent();
    this.mergeGradeStudent();
  }


  getGradesforOneStudent() {
    this.dataService.getGradesForOneRecord("grades", "assignments", 5)
    .subscribe(
      assignments => this.assignments = assignments,
      error => this.errorMessage = <any>error
    );   
    this.dataService.getRecords("students")
    .subscribe(
      students => this.students = students,
      error => this.errorMessage = <any>error
    );   
  }

  mergeGradeStudent(){
    const nextState = _.merge(this.assignments, this.students);
    console.log(nextState)  
  }

  saveGrades(indexOfAssignment){
    console.log(this.assignments)
    this.dataService.editRecord("grades", this.assignments[indexOfAssignment], this.assignments[indexOfAssignment].gradeId)
        .subscribe(
          assignment => this.successMessage = "Record updated succesfully",
          error => this.errorMessage = <any>error
        );
       
  }

  
}

