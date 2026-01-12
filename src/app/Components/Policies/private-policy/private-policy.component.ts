import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-private-policy',
  standalone: true,
  imports: [],
  templateUrl: './private-policy.component.html',
  styleUrl: './private-policy.component.css'
})
export class PrivatePolicyComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}
  
  closePopup() {
    this.dialogRef.close(); 
  }

}
