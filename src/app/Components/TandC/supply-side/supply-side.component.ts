import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-supply-side',
  standalone: true,
  imports: [],
  templateUrl: './supply-side.component.html',
  styleUrl: './supply-side.component.css'
})
export class SupplySideComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
