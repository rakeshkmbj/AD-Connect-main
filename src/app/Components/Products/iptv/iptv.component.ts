import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-iptv',
  standalone: true,
  imports: [],
  templateUrl: './iptv.component.html',
  styleUrl: './iptv.component.css'
})
export class IptvComponent {

  constructor(private dialogRef: MatDialogRef<any>) {}

  iptv = "../../../../assets/iptv.png"
  onetv = "../../../../assets/onetv.jpg"

  
  closePopup() {
    this.dialogRef.close(); 
  }

}
