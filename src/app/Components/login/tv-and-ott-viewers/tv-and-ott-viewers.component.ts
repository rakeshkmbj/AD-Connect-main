import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tv-and-ott-viewers',
  standalone: true,
  imports: [],
  templateUrl: './tv-and-ott-viewers.component.html',
  styleUrl: './tv-and-ott-viewers.component.css'
})
export class TvAndOttViewersComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
