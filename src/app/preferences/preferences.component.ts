import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("updatePass")).disabled = true   
  }

  validate() {
    var nPassword = (<HTMLInputElement>document.getElementById("nPassword")).value;
    var cnPassword = (<HTMLInputElement>document.getElementById("cnPassword")).value;
    var oPassword = (<HTMLInputElement>document.getElementById("oPassword")).value;
    
    if( nPassword === cnPassword && oPassword != "" && nPassword != "") {
      console.log("Success");
      (<HTMLInputElement>document.getElementById("updatePass")).disabled = false    
    }
    else {
      console.log("Failed");  
      (<HTMLInputElement>document.getElementById("updatePass")).disabled = true    
    }
  }
}
