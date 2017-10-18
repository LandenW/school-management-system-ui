import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import * as _ from 'lodash';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


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
  nextState;

  constructor(private dataService: DataService,
    private route: ActivatedRoute ) { }

   

  //  gradeId: number, gradeStudentId: number, letterGradeValue: string 
  //  this.gradeId = gradeId;
  //  this.gradeStudentId = gradeStudentId;
  // this.letterGradeValue = letterGradeValue;
  ngOnInit() {
    this.getGradesforOneStudent();
    
  }


  getGradesforOneStudent() {
    this.route.params
    .switchMap((params: Params) => this.dataService.getGradesForOneRecord("grades", "assignments", +params['id']))
    .subscribe(
      assignments => {
        this.assignments = assignments
        this.dataService.getRecords("students")
          .subscribe(
            students => {
              this.students = students
              this.nextState = _.merge(this.assignments, this.students)
              console.log(this.nextState)
              for(let i=0; i < this.nextState.length; i++) {
                if(!this.nextState[i].gradeStudentId) {
                  console.log(this.nextState[i])
                 this.nextState.splice(i, i++)
                }
              }
              console.log(this.nextState)              
            })
      },
      error => this.errorMessage = <any>error
    );
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

