import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { APIService} from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.css'
})
export class ManageScheduleComponent {
  scheduleForm: FormGroup;
  Schedules: any[] = [];
  showForm: boolean = false;

  constructor(private apiService: APIService, private http: HttpClient, private dialog: MatDialog) {
    this.scheduleForm = new FormGroup({
      scheduleId: new FormControl("", [Validators.required]),
      scheduleName: new FormControl("", [Validators.required]),
      active: new FormControl("Yes", [Validators.required]),
      startDateTime: new FormControl("", [Validators.required]),
      endDateTime: new FormControl("", [Validators.required]),
      hr1: new FormControl("00",),
      min1: new FormControl("00",),
      hr2: new FormControl("00",),
      min2: new FormControl("00",),
      // action:new FormControl("", [Validators.required])
    })
  }
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  Openpopup() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '50%',
      height: '400px',
    });
  }

  editEntry(index: number) {
    // Populate the form fields with data of the selected entry
    const selectedEntry = this.Schedules[index];
    this.scheduleForm.patchValue({
      scheduleId: selectedEntry.scheduleId,
      scheduleName: selectedEntry.scheduleName,
      active: selectedEntry.active,
      startDateTime: selectedEntry.startDateTime,
      endDateTime: selectedEntry.endDateTime,
      // action: selectedEntry.action,
      hr1: selectedEntry.hr1,
      min1: selectedEntry.min1,
      hr2: selectedEntry.hr1,
      min2: selectedEntry.min1,
    });
    // this.selectedIndex = index; // Store the index of the selected entry
    // this.showForm = !this.showForm
  }

  saveSchedule() {

    const scheduleData = this.scheduleForm.value;
    this.Schedules.push(scheduleData); // Push form values into the playlists array
    this.scheduleForm.reset();
    // Now you can send this.playlists to your backend or perform any other action
    
  }

  addForm() {
    this.showForm = true;
    
  }

  closeForm() {
    this.showForm = false;
  }

  closePopup() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
