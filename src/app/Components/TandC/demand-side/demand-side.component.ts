import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demand-side',
  standalone: true,
  imports: [],
  templateUrl: './demand-side.component.html',
  styleUrl: './demand-side.component.css'
})
export class DemandSideComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }

}
