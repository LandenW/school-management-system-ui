import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { User } from "../user";
import { AppComponent } from "../app.component";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  @ViewChild('passwordForm') currentForm: NgForm;

  currentUser: User;
  students;
  teachers;
  userInfo;
  endpoint;
  successMessage;
  errorMessage;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService
    .userChanged
    .subscribe(user => this.currentUser = user); //sets current user to user passed in
    this.currentUser = this.dataService.getCurrentUser();
      if(this.currentUser.roleName == "STUDENT"){
        this.endpoint = "students";
        this.userInfo = this.getRecordToCompare(this.endpoint, this.currentUser.userId);
      }
      else if(this.currentUser.roleName == "TEACHER"){
        this.endpoint = "teachers";
        this.userInfo = this.getRecordToCompare(this.endpoint, this.currentUser.userId);
      }
      else{
        this.userInfo = this.currentUser;
      }
    (<HTMLInputElement>document.getElementById("submitPass")).disabled = true 
  }

  getRecordToCompare(endpoint, userId){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord(endpoint, userId))
      .subscribe(userInfo => this.userInfo = userInfo);
  }

  validate() {
    var nPassword = (<HTMLInputElement>document.getElementById("nPassword")).value;
    var cnPassword = (<HTMLInputElement>document.getElementById("cnPassword")).value;
    if( nPassword === cnPassword ) {
      (<HTMLInputElement>document.getElementById("submitPass")).disabled = false    
    }
    else {
      (<HTMLInputElement>document.getElementById("submitPass")).disabled = true    
    }
  }

  savePassword(password: NgForm){
    if (this.currentUser.roleName == "STUDENT") {
      this.dataService.editStudentRecord("teachers", this.userInfo.teacherId , "students", this.currentUser.userId, password.value)
      .subscribe(
        password => this.successMessage = "Password updated succesfully",
        error =>  this.errorMessage = <any>error);
    } else {
    this.dataService.editRecord(this.endpoint, password.value, this.currentUser.userId)
      .subscribe(
        password => this.successMessage = "Password updated succesfully",
        error =>  this.errorMessage = <any>error);
    }
    (<HTMLInputElement>document.getElementById("nPassword")).value = ""; 
    (<HTMLInputElement>document.getElementById("cnPassword")).value = ""    
  }
}
