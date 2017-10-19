import { Component, OnInit, Input } from '@angular/core';
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

    console.log("user" + this.currentUser.roleName)
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


    (<HTMLInputElement>document.getElementById("updatePass")).disabled = true 
  }

  getRecordToCompare(endpoint, userId){
    
        this.route.params
          .switchMap((params: Params) => this.dataService.getRecord(endpoint, userId))
          .subscribe(userInfo => this.userInfo = userInfo);

      }

  validate() {
    var nPassword = (<HTMLInputElement>document.getElementById("nPassword")).value;
    var cnPassword = (<HTMLInputElement>document.getElementById("cnPassword")).value;
    //var oPassword = (<HTMLInputElement>document.getElementById("oPassword")).value;
    //&& oPassword != "" && nPassword != ""
    if( nPassword === cnPassword ) {
      console.log("Success");
      (<HTMLInputElement>document.getElementById("updatePass")).disabled = false    
    }
    else {
      console.log("Failed");  
      (<HTMLInputElement>document.getElementById("updatePass")).disabled = true    
    }
  }

  savePassword(password: NgForm){
    console.log(password.value)
      this.dataService.editRecord(this.endpoint, password.value, this.currentUser.userId)
          .subscribe(
            password => this.successMessage = "Password updated succesfully",
            error =>  this.errorMessage = <any>error);

  }
}
