import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
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

  student: object = {
    firstName: '',
    lastName: '',
    email: ''
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
      .switchMap((params: Params) => this.dataService.getRecord("teachers", +params['id']))
      .subscribe(teacher => this.teacher = teacher);
  }
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    
  ) { }
 

  ngOnInit() {
    
    this.route.params
    .subscribe((params: Params) => {
      (+params['id']) ? this.getRecordForEdit() : null;
    });
  }

  saveTeacher(teacher: NgForm){
    teacher.value.roleName = 'TEACHER';
    teacher.value.gradeLevel = parseInt(teacher.value.gradeLevel);
    console.log(teacher.value);
    if(typeof teacher.value.id === "number"){
      this.dataService.editRecord("teachers", teacher.value, teacher.value.id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("teachers", teacher.value)
          .subscribe(
            teacher => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.teacher = {
              firstName: '',
              lastName: '',
              email: ''
            };
    }

  }
}
