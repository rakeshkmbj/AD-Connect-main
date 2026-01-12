import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-brands-for-marketers',
  standalone: true,
  imports: [],
  templateUrl: './brands-for-marketers.component.html',
  styleUrl: './brands-for-marketers.component.css'
})
export class BrandsForMarketersComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
