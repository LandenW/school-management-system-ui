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
    console.log(this.gradeLevel)
    this.gradeLevel = parseInt(gradeLevel)
    console.log(this.gradeLevel)    
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
    console.log(environment)
  }

  saveStudent({ value: student }: NgForm){
    student.roleName = 'STUDENT';
    student.gradeLevel = parseInt(student.gradeLevel);
    const teacherId = parseInt(student.teacherId);
    console.log(student);
    if(typeof student.id === "number"){
      this.dataService.editStudentRecord("teachers", teacherId, "students", student.id, student)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error => this.errorMessage = <any>error
          );
    } else {
      student.password = 'password';
      console.log(student.value)
      this.dataService
          .addStudentRecord("teachers", teacherId, "students", student)
          .subscribe(
            success => {
              this.successMessage = "Record added succesfully"
            },
            error => this.errorMessage = <any>error
          );
      this.students = { };
    }


  }

  

  
}
