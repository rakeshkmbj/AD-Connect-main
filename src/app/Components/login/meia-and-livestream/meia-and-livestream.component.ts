import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meia-and-livestream',
  standalone: true,
  imports: [],
  templateUrl: './meia-and-livestream.component.html',
  styleUrl: './meia-and-livestream.component.css'
})
export class MeiaAndLivestreamComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
