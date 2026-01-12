import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tv-manufactures',
  standalone: true,
  imports: [],
  templateUrl: './tv-manufactures.component.html',
  styleUrl: './tv-manufactures.component.css'
})
export class TvManufacturesComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
