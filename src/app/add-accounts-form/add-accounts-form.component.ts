import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

import { environment } from '../../environments/environment'

@Component({
  selector: 'app-add-accounts-form',
  templateUrl: './add-accounts-form.component.html',
  styleUrls: ['./add-accounts-form.component.css']
})
export class AddAccountsFormComponent implements OnInit {
  
  @ViewChild('studentForm') currentForm: NgForm;
  
  successMessage: string;
  errorMessage: string;
  students;
  teachers;
  teacherId;
  roleName: string;
  gradeLevel: number;


  getRecordForEdit(){
    this.route.params
    .switchMap((params: Params) => this.dataService.getRecord("students", +params['id']))
    .subscribe(students => this.students = students);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
 

  getTeachersByGrade(gradeLevel) {
    this.gradeLevel = parseInt(gradeLevel) 
    this.dataService.getMultRecords("grade-level", gradeLevel, "teachers")
      .subscribe(
        teachers => this.teachers = teachers,
        error => this.errorMessage = <any>error
      );
  }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    })
  }

  saveStudent({ value: student }: NgForm){
    student.roleName = 'STUDENT';
    student.gradeLevel = parseInt(student.gradeLevel);
    this.teacherId = parseInt(student.teacherId);
    if(typeof student.id === "number"){
      this.dataService.editStudentRecord("teachers", this.teacherId, "students", student.id, student)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error => this.errorMessage = <any>error
          );
    } else {
      student.password = 'password';
      this.dataService
          .addStudentRecord("teachers", this.teacherId, "students", student)
          .subscribe(
            success => {
              this.successMessage = "Record added succesfully"
            },
            error => this.errorMessage = <any>error
          );
      this.students = { };
    }
  }

  //Validations

  studentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
  this.studentForm = this.currentForm;
  this.studentForm.valueChanges
    .subscribe(
      data => this.onValueChanged(data)
    );
  }

  onValueChanged(data?: any) {
  let form = this.studentForm.form;

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
  'firstName': '',
  'lastName': '',
  'email': '',
  'gradeLevel': ''
  };

  validationMessages = {
  'firstName': {
    'required': 'First Name is Required.',
    'pattern': 'First Name must be letters only.',
    'minlength': 'First Name cannot be less than 2 characters.',
    'maxlength': 'First Name cannot be greater than 30 characters.'
    },
  'lastName': {
    'required': 'Last Name is Required.',
    'pattern': 'Last Name must be letters only.',
    'minlength': 'Last Name cannot be less than 2 characters.',
    'maxlength': 'Last Name cannot be greater than 30 characters.'
    },
  'email': {
    'required': 'Email is required.',
    'pattern': 'Email must be in the format of example@domain.com .'
    }
  };  
}
