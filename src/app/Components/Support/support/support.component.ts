import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-support',
  standalone: true,
  imports: [],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  image = "../../../../assets/support.jpg"
  image2 = "../../../../assets/support2.jpg"
  
  closePopup() {
    this.dialogRef.close(); 
  }
  
}
