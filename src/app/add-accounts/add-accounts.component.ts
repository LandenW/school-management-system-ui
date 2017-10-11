import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

import { DataService } from '../data.service';

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.css']
})
export class AddAccountsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  students: any[];
  mode = 'Observable';

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {

    this.getStudents();

  }

  getStudents() {
    this.dataService.getRecords("students")
      .subscribe(
        students => this.students = students,
        error =>  this.errorMessage = <any>error);
  }

  deleteStudent(id:number) {
    
        let dialogRef = this.dialog.open(DeleteConfirmComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.dataService.deleteRecord("student", id)
              .subscribe(
                student => {this.successMessage = "Record(s) deleted succesfully"; this.getStudents(); },
                error =>  this.errorMessage = <any>error);
          }
        });
   }
}
