import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-assignments-form',
  templateUrl: './assignments-form.component.html',
  styleUrls: ['./assignments-form.component.css']
})
export class AssignmentsFormComponent implements OnInit {

  announcementsForm: NgForm;
  @ViewChild('assignmentsForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;
  assignments: object;
  

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignments", +params['id']))
      .subscribe(assignments => this.assignments = assignments);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    });
  }

  saveAssignment(assignments: NgForm){
    console.log(assignments.value['assignments.assignmentId'])
    if(typeof assignments.value['assignments.assignmentId'] === "number"){
      this.dataService.editRecord("assignments", assignments.value, assignments.value['assignments.assignmentId'])
          .subscribe(
            assignments => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignments = {};
    }else{
      this.dataService.addRecord("assignments", assignments.value)
          .subscribe(       
            assignments => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignments = {};
    }

  }
}
  // assignmentForm: NgForm;
  // @ViewChild('assignmentForm') currentForm: NgForm;

  // ngAfterViewChecked() {
  //   this.formChanged();
  // }

  // formChanged() {
  //   this.assignmentForm = this.currentForm;
  //   this.assignmentForm.valueChanges
  //     .subscribe(
  //       data => this.onValueChanged(data)
  //     );
  // }

//   onValueChanged(data?: any) {
//     let form = this.assignmentForm.form;

//     for (let field in this.formErrors) {
//       // clear previous error message (if any)
//       this.formErrors[field] = '';
//       const control = form.get(field);

//       if (control && control.dirty && !control.valid) {
//         const messages = this.validationMessages[field];
//         for (const key in control.errors) {
//           this.formErrors[field] += messages[key] + ' ';
//         }
//       }
//     }
//   }

//   formErrors = {
//     'name': '',
//     'comment': '',
//     'description': ''
//   };

//   validationMessages = {
//     'name': {
//       'required': 'Assignment number is required.',
//       'pattern': 'Must be a number.'
//     },
//     'comment': {
//       'required': 'Grade ID is required.',
//       'pattern': 'Must be a number.'
//     },
//     'description': {
//       'required': 'Class ID is required.',
//       'pattern': 'Must be a number.'
//     }
//   };
// }

