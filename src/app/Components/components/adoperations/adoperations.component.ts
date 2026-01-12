import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adoperations',
  templateUrl: './adoperations.component.html',
  styleUrls: ['./adoperations.component.scss']
})
export class ADOperationsComponent {

  constructor(public dialogRef: MatDialogRef<ADOperationsComponent>) {}

  modalHide(){
    this.dialogRef.close();
  }
}