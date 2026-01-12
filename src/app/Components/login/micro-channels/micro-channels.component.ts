import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-micro-channels',
  standalone: true,
  imports: [],
  templateUrl: './micro-channels.component.html',
  styleUrl: './micro-channels.component.css'
})
export class MicroChannelsComponent {
  
  constructor(private dialogRef: MatDialogRef<any>) {}

  closePopup() {
    this.dialogRef.close(); 
  }


}
