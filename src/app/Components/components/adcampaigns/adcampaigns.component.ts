import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adcampaigns',
  templateUrl: './adcampaigns.component.html',
  styleUrls: ['./adcampaigns.component.scss']
})
export class ADCampaignsComponent {
  constructor(public dialogRef: MatDialogRef<ADCampaignsComponent>) {}

  modalHide(){
    this.dialogRef.close();
  }
}
