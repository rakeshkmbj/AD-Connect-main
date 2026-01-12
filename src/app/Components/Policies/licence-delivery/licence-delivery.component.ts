import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-licence-delivery',
  standalone: true,
  imports: [],
  templateUrl: './licence-delivery.component.html',
  styleUrl: './licence-delivery.component.css'
})
export class LicenceDeliveryComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  image = "../../../../assets/Ad-licence-delivery.png"
  
  closePopup() {
    this.dialogRef.close(); 
  }

}
