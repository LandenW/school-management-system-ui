import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import * as _ from 'lodash';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-student-assignment-view',
  templateUrl: './student-assignment-view.component.html',
  styleUrls: ['./student-assignment-view.component.css']
})
export class StudentAssignmentViewComponent implements OnInit {

  // errorMessage: string;
  // successMessage: string;
  // assignments: any[];
  // mode = 'Observable';

  errorMessage: string;
  successMessage: string;
  letterGradeValue: string;
  assignmentsForStudent = []
  assignments;
  gradeId;
  gradeStudentId;
  rowItem;

  constructor(private dataService: DataService, private route: ActivatedRoute ) { }

  ngOnInit() { this.getGradesforOneStudent(); }
  
  getGradesforOneStudent(){
  //   this.dataService.getGradesForOneRecord("grades", "students", 2)
  //   .subscribe(
  //     assignments => this.assignments = assignments,
  //     error =>  this.errorMessage = <any>error);
  // }
  
    this.route
      .params
      .map((params: Params) => +params['id'])
      .subscribe(id => {
        Promise.all([
          this.dataService.getGradesForOneRecord("grades", "students", id).toPromise(),
          this.dataService.getRecords("assignments").toPromise()
        ])
        .then(([listOfGrades, listOfAssignments]) => {
          listOfGrades.forEach(g => {
            const assignment = listOfAssignments.find(s => g.gradeAssignmentId === s.assignmentId);
            g.assignmentName = assignment.assignmentName;
            g.assignmentDueDate = assignment.assignmentDueDate + 28800000;
          });
          listOfGrades.sort((a, b) => a.gradeAssignmentId - b.gradeAssignmentId);
          this.assignmentsForStudent = listOfGrades;
        }) 
      });
  }
}

