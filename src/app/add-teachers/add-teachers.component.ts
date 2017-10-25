import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrls: ['./add-teachers.component.css']
})

export class AddTeachersComponent implements OnInit {
  successMessage: string;
  errorMessage: string;
  teacher: any = {
    firstName: '',
    lastName: '',
    email: '',
    gradeLevel: ''
  };
  teachers;
  roleName: string;
  gradeLevel: number;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    
  ) { }
 
  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("teachers", +params['id']))
      .subscribe(teacher => this.teacher = teacher);
  }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    });
  }

  saveTeacher(teacher: NgForm){
    teacher.value.roleName = 'TEACHER';
    teacher.value.gradeLevel = parseInt(teacher.value.gradeLevel);

    if(typeof teacher.value.userId === "number"){
      this.dataService.editRecord("teachers", teacher.value, teacher.value.userId)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
            this.teacher = {
              firstName: '',
              lastName: '',
              email: '',
              gradeLevel: ''
            }
    }else{
      teacher.value.password = 'password';
      this.dataService.addRecord("teachers", teacher.value)
          .subscribe(
            teacher => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.teacher = { 
              firstName: '',
              lastName: '',
              email: '',
              gradeLevel: ''
            };
    }

  }

 //Validations

  teacherForm: NgForm;
  @ViewChild('teacherForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.teacherForm = this.currentForm;
    this.teacherForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.teacherForm.form;

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
    },
    'gradeLevel': {
      'required': 'Grade Level is required'
    }
  };
}
