import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-add-accounts-form',
  templateUrl: './add-accounts-form.component.html',
  styleUrls: ['./add-accounts-form.component.css']
})
export class AddAccountsFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  student: object = {
    firstName: '',
    lastName: '',
    email: '',
    gradeLevel: ''
  };
  teacher: object = {
    firstName: '',
    lastName: '',
    email: ''
  };

  teachers;

  roleName: string;
  gradeLevel: number;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student", +params['id']))
      .subscribe(student => this.student = student);
  }
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    
  ) { }
 

  getTeachersByGrade(gradeLevel) {
    console.log(this.gradeLevel)
    // console.log(this.teachers.id)
    this.dataService.getMultRecords("grade-level", gradeLevel, "teachers")
      .subscribe(
        teachers => this.teachers = teachers,
        error =>  this.errorMessage = <any>error);
//console.log(teacherdropdown.value)
    
  }

  ngOnInit() {


    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    });
  }
  saveStudent(student: NgForm){
    student.value.roleName = 'STUDENT';
    student.value.gradeLevel = parseInt(student.value.gradeLevel);
    const teacherId = parseInt(student.value.teacherId);
    console.log(student.value);
    if(typeof student.value.id === "number"){
      this.dataService.editRecord("students", student.value, student.value.id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      
      this.dataService.addStudentRecord("students", teacherId, student.value)
          .subscribe(
            student => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.student = {
              firstName: '',
              lastName: '',
              email: '',
              gradeLevel: ''
            };
    }

  }


  
}
