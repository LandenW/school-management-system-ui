import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
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
  
  @ViewChild('studentForm') currentForm: NgForm;
  
  successMessage: string;
  errorMessage: string;
  students;
  teachers;
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
    private location: Location,  
  ) { }
 

  getTeachersByGrade(gradeLevel) {
    console.log(this.gradeLevel)
    this.dataService.getMultRecords("grade-level", gradeLevel, "teachers")
      .subscribe(
        teachers => this.teachers = teachers,
        error =>  this.errorMessage = <any>error);

    
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
            students => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.students = { };
    }

  }


  
}
