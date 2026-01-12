import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modoohservice',
  templateUrl: './modoohservice.component.html',
  styleUrls: ['./modoohservice.component.scss']
})
export class MODOOHServiceComponent {
  constructor(public dialogRef: MatDialogRef<MODOOHServiceComponent>) {}

  modalHide(){
    this.dialogRef.close();
  }
}