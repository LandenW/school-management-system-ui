import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatDialogConfig} from "@angular/material";
@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialModalRef: MatDialogRef<any>) { }

  ngOnInit() {
    this.dialModalRef.updatePosition({ top: "-25%", left: "10%"});
  }

}
