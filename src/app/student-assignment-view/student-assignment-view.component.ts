import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-assignment-view',
  templateUrl: './student-assignment-view.component.html',
  styleUrls: ['./student-assignment-view.component.css']
})
export class StudentAssignmentViewComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  assignments: any[];
  mode = 'Observable';

  constructor(private dataService: DataService) { }

  ngOnInit() { this.getGradesForStudent(); }
  
  getGradesForStudent(){
    this.dataService.getGradesForOneRecord("grades", "students", 2)
    .subscribe(
      assignments => this.assignments = assignments,
      error =>  this.errorMessage = <any>error);
  }
  

}
