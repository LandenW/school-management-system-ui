import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { EmailService } from '../email.service'

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
    private location: Location,  
    private emailService: EmailService  
  ) { }
 

  getTeachersByGrade(gradeLevel) {
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
      this.dataService.editRecord("students", student, student.id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error => this.errorMessage = <any>error
          );
    } else {
      this.dataService
          .addStudentRecord("teachers", teacherId, "students", student)
          .subscribe(
            success => {
              this.emailService.send(student.email)
              this.successMessage = "Record added succesfully"
            },
            error => this.errorMessage = <any>error
          );
      this.students = { };
    }


  }

  

  
}
