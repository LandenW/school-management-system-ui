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
  assignments: object;
  currentUser: User;
  

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignments", +params['id']))
      .subscribe(assignments => this.assignments = assignments);
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
    console.log()
    if(typeof assignments.value['assignments.id'] === "number"){
      this.dataService.editRecord("assignments", assignments.value, assignments.value['assignments.id'])
          .subscribe(
            assignments => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignments = {};
    }else{
      this.dataService.addRecord("assignments", assignments.value)
          .subscribe(       
            assignments => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignments = {};
    }

  }
}