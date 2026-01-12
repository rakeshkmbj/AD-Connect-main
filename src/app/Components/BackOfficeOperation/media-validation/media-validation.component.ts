import { Component, TemplateRef, ViewChild } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../../services/shared.service'
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import {  OnInit, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';
 
@Component({
  selector: 'app-media-validation',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgFor, DatePipe, ReactiveFormsModule, NgFor, NgIf,FormsModule, CommonModule],
  templateUrl: './media-validation.component.html',
  styleUrl: './media-validation.component.css'
})
export class MediaValidationComponent implements OnInit, OnDestroy{
  player: any;

  pendingMedia : any[] = [];
  form: FormGroup;
  isLoading: boolean = true;
  selectedMedia: any;
  selectedButton: string | null = 'Pending Media Validation'; // Variable to store the selected button
  validatedMediaList: any[] = [];
  rejectedMediaList: any[] = [];
  mediaFileUrl: string | null = null;
  

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sharedService: SharedService) {
    this.getBObellCount();
    this.form = this.fb.group({
    fullFileSeen: ['', Validators.required],
    rejectionConfirmed: ['', Validators.required],
    approvalConfirmed: ['', Validators.required],
    reason: ['', Validators.required] // Add this line for the select element
  });

  }

  Validationstatus:string = '';

  onValidationChange(event: any) {
    this.Validationstatus = event.target.value;
    console.log('Validation Status:', this.Validationstatus);
  }

  SelectedReason:string = '';

  onSelectReason(event: any){
    this.SelectedReason = event.target.value;
    console.log('Selected Reason:', this.SelectedReason);
  }

   onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName; // Store the selected button
     this.getrejectedMediaList();
  }

  // Method to check if the button is selected
  isSelected(buttonName: string): boolean {
    return this.selectedButton === buttonName;
  }

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  isVideoFile(url: string): boolean {
    // Check if the URL has a common video file extension
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  Openpopup(adConnectBoMedId: any): void {
    this.Validationstatus = '';
    this.SelectedReason = '';
    this.selectedMedia = adConnectBoMedId;
    console.log("the selectd media is ", this.selectedMedia);
  
  // Define the base URL
  const baseURL = 'http://www.shripatigroup.com/';
  
  // Find the matching media file
  const matchingMedia = this.pendingMedia.find(media => media.adConnectBoMedId === adConnectBoMedId);
  
  // If a match is found, construct the media file URL
  if (matchingMedia) {
    console.log(matchingMedia)
    // Construct the correct URL by replacing ~\ with media/ and using forward slashes
    this.mediaFileUrl = baseURL + matchingMedia.adMediaFile.replace(/\\/g, '/').replace(/^~\//, '');


    // this.mediaFileUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    
    console.log("The media file URL is: ", this.mediaFileUrl);
  }

  // Open the dialog
  this.dialogRef = this.dialog.open(this.dialogTemplate, {
    width: '55%',
    height: '500px',
  });
}


  closePopup(): void {
    if (this.dialogRef) {
      this.form.reset();
      this.dialogRef.close();
    }
  }

  zoomLevel: number = 1;  // Default zoom level

  // Zoom in functionality
  zoomIn() {
    this.zoomLevel += 0.1;
  }

  // Zoom out functionality
  zoomOut() {
    if (this.zoomLevel > 0.1) {
      this.zoomLevel -= 0.1;
    }
  }

  ngOnInit(): void {
    this.getBObellCount();
    this.getPendMedia4Validation();
    this.getValidatedMediaList();
    this.player = videojs('videoPlayer');
  }

  // ngOnInit(): void {
  //   this.player = videojs('videoPlayer');
  // }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  bellCount: any[] = [];

  getBObellCount() {
    this.apiService.getBellCount().subscribe((res: any) => {
      this.bellCount = res;
      this.sharedService.updateBellCount(res); // Update the shared service with the bell count
    });
  }

  getPendMedia4Validation() {
  this.isLoading = true;
  this.apiService.displayPendMedia4Validation().subscribe((res: any) => {
    this.isLoading = false;
    
    // Filter out media with unique adConnectBoMedId
    const uniqueMedia = Array.from(
      new Map(res.map((item: any) => [item.adConnectBoMedId, item])).values()
    );
    
    this.pendingMedia = uniqueMedia;
    console.log("This is the pending media with unique adConnectBoMedId", this.pendingMedia);
  });
}


  getValidatedMediaList() {
  this.isLoading = true;
  this.apiService.getValidatedMediaList().subscribe((res: any) => {
    this.isLoading = false;

    // Filter out media with unique adConnectBoMedId
    const uniqueValidatedMedia = Array.from(
      new Map(res.map((item: any) => [item.adConnectBoMedId, item])).values()
    );

    this.validatedMediaList = uniqueValidatedMedia;
    console.log("This is the validated media with unique adConnectBoMedId", this.validatedMediaList);
  });
}


  getrejectedMediaList() {
    this.isLoading = true;
  this.apiService.getRejectedmediaList().subscribe((res: any) => {
    this.isLoading = false;

    // Filter out media with unique adConnectBoMedId
    const uniqueRejectedMedia = Array.from(
      new Map(res.map((item: any) => [item.adConnectBoMedId, item])).values()
    );

    this.rejectedMediaList = uniqueRejectedMedia;
    console.log("This is the rejected media with unique adConnectBoMedId", this.rejectedMediaList);
  });
  }

  formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() is zero-based
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


  validateMedia() {
  this.apiService.validateMedia(this.selectedMedia).subscribe({
    next: (res: any) => {
      console.log("response is ", res);
      if (res === 'Media Is Validated Successfully in System') {
        this.snackBar.open('Media Is Validated Successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center', // Center horizontally
          verticalPosition: 'top'
        });

        this.closePopup();
        this.getBObellCount();
        this.getPendMedia4Validation();
      } else {
        this.snackBar.open('Something went wrong', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center', // Center horizontally
          verticalPosition: 'top'
        });
      }
    },
    error: (error: any) => {
      console.error('Validation error:', error);
      const errorMessage = error?.error?.title || 'Something went wrong';
      this.snackBar.open(errorMessage, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center', // Center horizontally
        verticalPosition: 'top'
      });
    }
  });
  }
  
  async rejectMedia() {
  // Define the payload with correct object syntax
  const payload = {
    mediaId: this.selectedMedia,
    reason1: this.SelectedReason,
    reason2: "null",
    reason3: "null"
  };

  console.log("Payload: ", payload )

  const apiUrl = "http://www.shripatigroup.com/ADMedia/api/ADMedia/MediaRejected"

   try {
          // const response = await firstValueFrom(this.http.post(apiUrl, payload));
          const response = await firstValueFrom(this.http.post(apiUrl, payload, { responseType: 'text' }));

          console.log("Channel updated successfully:", response);
          this.snackBar.open('Media Is Rejected Successfully', 'Close', {
            duration: 3000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top' 
          });  

           // Close the popup and refresh the data
      this.closePopup();
      this.getBObellCount();
      this.getPendMedia4Validation();

      } catch (error) {
          console.error("Error updating channel:", error);
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 3000,
              panelClass: ['error-snackbar'],
              horizontalPosition: 'center', // Center horizontally
              verticalPosition: 'top' // Position at the top
          });
      }

}
}