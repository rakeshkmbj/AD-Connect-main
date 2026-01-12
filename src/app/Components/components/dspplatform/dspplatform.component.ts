import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dspplatform',
  templateUrl: './dspplatform.component.html',
  styleUrls: ['./dspplatform.component.scss']
})
export class DSPPlatformComponent {
  constructor(public dialogRef: MatDialogRef<DSPPlatformComponent>) {}

  modalHide(){
    this.dialogRef.close();
  }
}
