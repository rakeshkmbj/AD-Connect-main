import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancellation-refund',
  standalone: true,
  imports: [],
  templateUrl: './cancellation-refund.component.html',
  styleUrl: './cancellation-refund.component.css'
})
export class CancellationRefundComponent {
  constructor(private dialogRef: MatDialogRef<any>) {}
  
  closePopup() {
    this.dialogRef.close(); 
  }

}
