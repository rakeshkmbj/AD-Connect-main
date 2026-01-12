import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  constructor(public dialogRef: MatDialogRef<PrivacyPolicyComponent>) {}

  modalHide(){
    this.dialogRef.close();
  }
}
