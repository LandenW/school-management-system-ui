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
    // this.dataService.getRecords("students")
    //   .subscribe(students => {

    //     this.route.params
    //       .switchMap((params: Params) => this.dataService.getGradesForOneRecord("grades", "assignments", +params['id']))
    //       .subscribe(assignments => {
    //         this.assignments = assignments
    //         for (let assignment of assignments) {
    //           const student = students.find(({userId}) => userId === assignment.gradeStudentId)
    //           if (student) {
    //             assignment['lastName'] = student.lastName
    //             assignment['firstName'] = student.firstName
    //             this.assignmentsWithStudent.push(assignment)
    //           }
    //         }
    //         this.assignmentsWithStudent.sort((a, b) => a.gradeStudentId - b.gradeStudentId)
    //     })
    //   },
    //   error => this.errorMessage = <any>error
    // )

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
          listOfGrades.sort((a, b) => a.gradeStudentId - b.gradeStudentId);
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

