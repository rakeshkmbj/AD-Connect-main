import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admonetization',
  templateUrl: './admonetization.component.html',
  styleUrls: ['./admonetization.component.scss']
})
export class ADMonetizationComponent {
  @ViewChild('template') template!: TemplateRef<any>;
  @ViewChild('template1') template1!: TemplateRef<any>;
  @ViewChild('template2') template2!: TemplateRef<any>;

  dialogRef1!: MatDialogRef<any>;
  dialogRef2!: MatDialogRef<any>;
  dialogRef3!: MatDialogRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ADMonetizationComponent>,
    private dialog: MatDialog
  ) {}

  // Close main dialog
  modalHide() {
    this.dialogRef.close();
  }

  // Open Display Monetization modal
  openModal() {
    this.dialogRef1 = this.dialog.open(this.template, { width: '600px' });
  }
  modalHide1() {
    this.dialogRef1.close();
  }

  // Open Video Monetization modal
  openModal1() {
    this.dialogRef2 = this.dialog.open(this.template1, { width: '600px' });
  }
  modalHide2() {
    this.dialogRef2.close();
  }

  // Open In-App Monetization modal
  openModal2() {
    this.dialogRef3 = this.dialog.open(this.template2, { width: '600px' });
  }
  modalHide3() {
    this.dialogRef3.close();
  }
}