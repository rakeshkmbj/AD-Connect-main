import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-digital-consultation',
  templateUrl: './digital-consultation.component.html',
  styleUrls: ['./digital-consultation.component.scss']
})
export class DigitalConsultationComponent {
  constructor(public dialogRef: MatDialogRef<DigitalConsultationComponent>) {}

  modalHide(){
    this.dialogRef.close();
  }
}