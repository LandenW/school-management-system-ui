import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-announcements-form',
  templateUrl: './announcements-form.component.html',
  styleUrls: ['./announcements-form.component.css']
})
export class AnnouncementsFormComponent implements OnInit {

  announcementsForm: NgForm;
  @ViewChild('announcementsForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  announcements: any;
  announcement;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("announcements", +params['id']))
      .subscribe(announcements => {this.announcements = announcements
        var date = this.announcements.date
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate() + 1;
        date = year + "-" + month + "-" + day
        this.announcements.date = date     
      });
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }
  
  saveAnnouncements(announcements: NgForm){
    if(typeof announcements.value['announcements.id'] === "number"){
      this.dataService.editRecord("announcements", announcements.value, announcements.value['announcements.id'])
          .subscribe(
            announcements => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
            this.announcements = {};
    }else{
      this.dataService.addRecord("announcements", announcements.value)
          .subscribe(
            announcements => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.announcements = {};
    }

  }
  
    // ngAfterViewChecked() {
    //   this.formChanged();
    // }
  
    // formChanged() {
    //   this.announcementsForm = this.currentForm;
    //   this.announcementsForm.valueChanges
    //     .subscribe(
    //       data => this.onValueChanged(data)
    //     );
    // }
  
  // onValueChanged(data?: any) {
  //   let form = this.announcementsForm.form;
  
  //   for (let field in this.formErrors) {
  //     this.formErrors[field] = '';
  //     const control = form.get(field);
  
  //     if (control && control.dirty && !control.valid) {
  //       const messages = this.validationMessages[field];
  //       for (const key in control.errors) {
  //         this.formErrors[field] += messages[key] + ' ';
  //       }
  //     }
  //   }
  // }

   //Validations


  ngAfterViewChecked() {
  this.formChanged();
  }

  formChanged() {
  this.announcementsForm = this.currentForm;
  this.announcementsForm.valueChanges
    .subscribe(
      data => this.onValueChanged(data)
    );
  }

  onValueChanged(data?: any) {
  let form = this.announcementsForm.form;

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
  'title': ''
  };

  validationMessages = {
    'title': {
      'required': 'Title is Required.',
      'minlength': 'First Name cannot be less than 2 characters.',
    }
  };
}

