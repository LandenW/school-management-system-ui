import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { User } from "../user";

import { DataService } from '../data.service'

@Component({
  selector: 'app-assignments-form',
  templateUrl: './assignments-form.component.html',
  styleUrls: ['./assignments-form.component.css']
})
export class AssignmentsFormComponent implements OnInit {

  @ViewChild('assignmentsForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;
  assignments: any;
  currentUser: User;

  getRecordForEdit(){        
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignments", +params['id']))
      .subscribe(assignments => {this.assignments = assignments;
        var date = this.assignments.assignmentDueDate
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate() + 1;
        date = year + "-" + month + "-" + day
        this.assignments.assignmentDueDate = date        
      });
      
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

    this.dataService
    .userChanged
    .subscribe(user => this.currentUser = user); //sets current user to user passed in
    this.currentUser = this.dataService.getCurrentUser();  
  }

  saveAssignment(assignments: NgForm){
    if(typeof assignments.value['id'] === "number"){
      this.dataService.editRecord("assignments", assignments.value, assignments.value['id'])
          .subscribe(
            assignments => {this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error});
            this.assignments = {};
    }else{
      this.dataService.addAssignment("teachers", this.currentUser.userId, "assignments", assignments.value)
          .subscribe(       
            assignments => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignments = {};
    }

  }

  //Validations

  assignmentsForm: NgForm;

  ngAfterViewChecked() {
  this.formChanged();
  }

  formChanged() {
  this.assignmentsForm = this.currentForm;
  this.assignmentsForm.valueChanges
    .subscribe(
      data => this.onValueChanged(data)
    );
  }

  onValueChanged(data?: any) {
  let form = this.assignmentsForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': 'Assignment Name is Required.',
      'minlength': 'Assignment Name cannot be less than 2 characters.',
    }
  };
}