import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import * as _ from 'lodash';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {


  errorMessage: string;
  successMessage: string;
  letterGradeValue: string;
  assignmentsWithStudent = []
  assignments;
  gradeId;
  gradeStudentId;
  rowItem;

  constructor(private dataService: DataService,
    private route: ActivatedRoute ) { }

   
  ngOnInit() {
    this.getGradesforOneStudent();
  }


  getGradesforOneStudent() {
    this.route
      .params
      .map((params: Params) => +params['id'])
      .subscribe(id => {
        Promise.all([
          this.dataService.getGradesForOneRecord("grades", "assignments", id).toPromise(),
          this.dataService.getRecords("students").toPromise()
        ])
        .then(([listOfGrades, listOfStudents]) => {
          listOfGrades.forEach(g => {
            const student = listOfStudents.find(s => g.gradeStudentId === s.userId);
            g.lastName = student.lastName;
            g.firstName = student.firstName;
          });
          this.assignmentsWithStudent = listOfGrades;
        })
      });
  }

  saveGrades(indexOfAssignment){
    this.dataService.editRecord("grades", this.assignmentsWithStudent[indexOfAssignment], this.assignmentsWithStudent[indexOfAssignment].gradeId)
      .subscribe(
        assignment => this.successMessage = "Record updated succesfully",
        error => this.errorMessage = <any>error
      );
  }
}

