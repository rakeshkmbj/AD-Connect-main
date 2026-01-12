import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dooh',
  standalone: true,
  imports: [],
  templateUrl: './dooh.component.html',
  styleUrl: './dooh.component.css'
})
export class DoohComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  doohnew = "../../../../assets/doohnew.jpg"

  closePopup() {
    this.dialogRef.close(); 
  }

}
