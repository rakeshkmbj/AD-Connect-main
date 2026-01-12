import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-retail-business',
  standalone: true,
  imports: [],
  templateUrl: './retail-business.component.html',
  styleUrl: './retail-business.component.css'
})
export class RetailBusinessComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
