import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-licence-pricing',
  standalone: true,
  imports: [],
  templateUrl: './licence-pricing.component.html',
  styleUrl: './licence-pricing.component.css'
})
export class LicencePricingComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}
  
  closePopup() {
    this.dialogRef.close(); 
  }


}
