import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-my-contentrepository-demand-side',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, FormsModule, CommonModule, DatePipe],
  templateUrl: './my-contentrepository-demand-side.component.html',
  styleUrls: ['./my-contentrepository-demand-side.component.css']
})
export class MyContentrepositoryDemandSideComponent {

  private subscription: Subscription = new Subscription();

  selectedFile: File | null = null;
  fileSize: string | null = null;
  filePreview: string | ArrayBuffer | null = null;
  fileAccept: string = 'video/*';
  promoForm: FormGroup;
  repository: any;
  mediaRunCount: string | number | null = null;
  showMedia: boolean = true;
  repoContent: any[] = [];
  readonly MAX_FILE_SIZE_MB = 100;
  editForm: boolean = false;

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";
  action = "../../../../../assets/arrow.png"
  logo = "../../../../../assets/adConnectleftIcon.jpg"

  isPanIndiaChecked: boolean = true;
  isRewardChecked: boolean = false;

  isPopupIptvPaymentAllocation = false;
  isPopupAddIptv = false;
  isPopupDetailLog = false;

  isPopupHTML = false;
  isPopupAddHTML = false;
  isPopupHTMLDetailLog = false;

  isSidebarVisible: boolean = false;
  userData: any = {}; 

  isPopupDOOHAlloactionVisible  = false;

  onRewardCheckedChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.isRewardChecked = true;
    } else {
      this.isRewardChecked = false;
    }
  }

  onPanIndiaCheckedChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.isPanIndiaChecked = false;
    } else {
      this.isPanIndiaChecked = true;
    }
  }

  toggleDOOHAlloaction(){
    this.isPopupDOOHAlloactionVisible = !this.isPopupDOOHAlloactionVisible
  }

  toggleIptvPaymentAllocation() {
    this.isPopupIptvPaymentAllocation = !this.isPopupIptvPaymentAllocation
  }

  toggleHTML(){
    this.isPopupHTML = !this.isPopupHTML
  }

  toggleDetailLog(){
    this.isPopupDetailLog = !this.isPopupDetailLog;
  }

  toggleDetailLogHTML(){
    this.isPopupHTMLDetailLog = !this.isPopupHTMLDetailLog
  }

  toggleAddIptv(){
    this.isPopupAddIptv = !this.isPopupAddIptv
    this.isPanIndiaChecked = true;
    this.isRewardChecked = false;
  }

  toggleAddHTML(){
    this.isPopupAddHTML = !this.isPopupAddHTML
    this.isPanIndiaChecked = true;
    this.isRewardChecked = false;
  }

  constructor(
    private apiService: APIService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.promoForm = new FormGroup({
      mediaId: new FormControl(),
      promo_Name: new FormControl('', Validators.required),
      med_Typ: new FormControl('', Validators.required),
      med_File: new FormControl('', Validators.required),
      med_storage_Size: new FormControl('', Validators.required),
      med_Run_Seconds_Counts: new FormControl('', Validators.required)
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

  @ViewChild('addNewContent') addNewContent!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  openPopupForNewContent() {
    this.editForm = false;
    this.isEditMode = false; 
    this.resetForm();
    this.promoForm.patchValue({
      mediaId: this.repository.adConnectCloudRepoId
    });
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.addNewContent, {
        width: '50%',
        height: '500px',
      });
    }, 50);
  }

  selectedImageUrl: string | null = null;
  isShowMediaVisible = false;
  mediaToShowType: string = '';

  showImagePreview(item?: any) {
    
    if(item){
      const baseUrl = "http://www.shripatigroup.com/";
      const relativePath = item.adMediaFile;  // Adjust this based on your actual data structure
  
      const formattedMediaUrl = relativePath
          ? baseUrl + relativePath.replace(/\\/g, '/').replace('~/', '')
          : '';
  
      console.log("Formatted Media URL: ", formattedMediaUrl);
  
      this.selectedImageUrl = formattedMediaUrl;

      this.mediaToShowType = item.adConnectMediaTyp;
    }

    this.isShowMediaVisible = !this.isShowMediaVisible;

  }

  @ViewChild('addNewContents') addNewContents!: TemplateRef<any>;

  getRepo() {
  this.apiService.getRepository().subscribe((res: any) => {
    this.repository = res[0];
    console.log("Repository is --------->", this.repository);
    this.promoForm.patchValue({
      mediaId: this.repository.adConnectCloudRepoId
    });
    
    // Call getRepositoryContent() only after the repository is set
    this.getRepositoryContent();
  });
}

getRepositoryContent() {
  if (!this.repository) {
    console.error("Repository is not available yet!");
    return;
  }

  console.log("This.repository", this.repository);
  const payLoad = this.repository?.adConnectCloudRepoId;
  this.apiService.getRepoContent(payLoad).subscribe((res: any) => {
    this.repoContent = res;
    console.log("repo content is ", this.repoContent);
  });
}


  onMediaTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    switch (value) {
      case 'image':
        this.fileAccept = 'image/*';
        break;
      case 'video':
        this.fileAccept = 'video/*';
        break;
      case 'audio':
        this.fileAccept = 'audio/*';
        break;
      case 'gif':
        this.fileAccept = 'image/gif';
        break;
      default:
        this.fileAccept = '';
    }
    this.resetMediaSelection();
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const fileSizeMB = this.selectedFile.size / (1024 * 1024);
      this.fileSize = `${fileSizeMB.toFixed(1)} MB`;
      this.promoForm.patchValue({
        med_storage_Size: parseFloat(fileSizeMB.toFixed(2)),
      });

      if (fileSizeMB > this.MAX_FILE_SIZE_MB) {
        this.resetMediaSelection();
        this.showSnackbar('Please upload media less than 100 MB.');
        return;
      }

      this.mediaRunCount = 0;
      this.showMedia = false;
      this.filePreview = null;

      await this.calculateMediaRunCount();
    }
  }

  async calculateMediaRunCount(): Promise<void> {
    if (this.selectedFile) {
      const fileType = this.selectedFile.type.toLowerCase();
      if (fileType.startsWith('image') || fileType === 'image/gif') {
        this.mediaRunCount = 1;
        this.checkMediaRunCount();
      } else if (fileType.startsWith('video')) {
        try {
          const duration = await this.getVideoDuration();
          this.mediaRunCount = `${Math.round(duration)} sec`;
          this.checkMediaRunCount();
        } catch (error) {
          console.error('Error loading video metadata:', error);
          this.resetMediaSelection();
          this.showSnackbar('Error loading video. Please select a valid media file.');
        }
      } else if (fileType.startsWith('audio')) {
        try {
          const duration = await this.getAudioDuration();
          this.mediaRunCount = `${Math.round(duration)} sec`;
          this.checkMediaRunCount();
        } catch (error) {
          console.error('Error loading audio metadata:', error);
          this.resetMediaSelection();
          this.showSnackbar('Error loading audio. Please select a valid media file.');
        }
      } else {
        this.mediaRunCount = 0;
        this.checkMediaRunCount();
      }
    }
  }

  private getVideoDuration(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (!this.selectedFile) {
        reject('No file selected.');
        return;
      }

      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      videoElement.onloadedmetadata = () => {
        resolve(videoElement.duration);
        videoElement.remove();
      };
      videoElement.onerror = (event) => {
        reject(event);
        videoElement.remove();
      };
      videoElement.src = URL.createObjectURL(this.selectedFile);
      document.body.appendChild(videoElement);
    });
  }

  private getAudioDuration(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (!this.selectedFile) {
        reject('No file selected.');
        return;
      }

      const audioElement = document.createElement('audio');
      audioElement.preload = 'metadata';
      audioElement.onloadedmetadata = () => {
        resolve(audioElement.duration);
        audioElement.remove();
      };
      audioElement.onerror = (event) => {
        reject(event);
        audioElement.remove();
      };
      audioElement.src = URL.createObjectURL(this.selectedFile);
      document.body.appendChild(audioElement);
    });
  }

  checkMediaRunCount(): void {
    if (this.mediaRunCount !== null && parseInt(this.mediaRunCount as string, 10) > 180) {
      this.resetMediaSelection();
      this.showSnackbar('The media should be less or equal to 180 seconds.');
    } else {
      this.promoForm.patchValue({
        med_Run_Seconds_Counts: parseInt(this.mediaRunCount as string, 10),
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const arrayBuffer = e.target.result as ArrayBuffer;
          const base64String = this.arrayBufferToBase64(new Uint8Array(arrayBuffer));
          this.filePreview = `data:${this.selectedFile?.type};base64,${base64String}`;
          this.showMedia = true;
          this.promoForm.patchValue({
            med_File: base64String
          });
          console.log("Media file is ", this.promoForm.value.med_File);
        }
      };
      reader.readAsArrayBuffer(this.selectedFile as Blob);
    }
  }

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  resetMediaSelection(): void {
    this.selectedFile = null;
    this.filePreview = null;
    this.showMedia = false;
    this.fileSize = null;
    this.mediaRunCount = null;

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  resetForm(): void {
    this.promoForm.reset();
    this.resetMediaSelection();
  }

  showSnackbar(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    this.snackBar.open(message, 'Close', config);
  }

  isImage(): boolean {
    return this.selectedFile ? this.selectedFile.type.startsWith('image') : false;
  }

  isVideo(): boolean {
    return this.selectedFile ? this.selectedFile.type.startsWith('video') : false;
  }

  isAudio(): boolean {
    return this.selectedFile ? this.selectedFile.type.startsWith('audio') : false;
  }

  // Assuming you have a repoContent array that holds your items
  editLoading: { [key: string]: boolean } = {};
  
  isLoading = false;

  savePromo() {
  this.isLoading = true; // Start loader

  if (!this.editForm) {
    if (this.promoForm.invalid) {
      this.promoForm.markAllAsTouched();
      this.isLoading = false; // Stop loader
      return;
    }

    const payload = {
      ...this.promoForm.value, // Spread promo form values
      repoid: this.repository.adConnectCloudRepoId // Add the repoid to the payload
    };

    console.log("Payload is ----------------->& ", payload);

    this.apiService.savePromoForDOOH(payload).subscribe({
      next: (data: any) => {
        this.snackBar.open('Entry has been Saved successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.isLoading = false;
        this.resetForm();
        this.getRepo();
        this.getRepositoryContent();
        this.editLoading[this.currentItem.adConnectMediaId] = false;
         // Stop loader
      },
      error: (error: any) => {
        this.isLoading = false; // Stop loader on error
        // Check if the error response contains a specific message
        if (error.error.text == "Content Name is already present in repository") {
          this.showSnackbar('Content Name is already present in repository');
        } else if (error.error.text == "You have Exceeded the Maximum counts of Media Files in Repository") {
          this.showSnackbar("You have Exceeded the Maximum counts of Media Files in Repository");
        } else {
          this.showSnackbar('You have Exceeded the Maximum counts of Media Files in Repository.');
        }
      }
    });

  } else {
    // Modify payload for editing, replacing promo_Name with mediaName
    const editPayload = {
      ...this.promoForm.value,
      mediaName: this.promoForm.value.promo_Name // Replace promo_Name with mediaName
    };
    delete editPayload.promo_Name; // Remove promo_Name

    this.apiService.editPromoForDOOH(editPayload).subscribe({
      next: (data: any) => {
        this.snackBar.open('Entry has been edited successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.resetForm();
        this.getRepo();
        this.getRepositoryContent();
        this.editLoading[this.currentItem.adConnectMediaId] = false;
        this.isLoading = false; // Stop loader
      },
      error: (error: any) => {
        this.isLoading = false; // Stop loader on error
        this.editLoading[this.currentItem.adConnectMediaId] = false;
        // Check if the error response contains a specific message
        if (error.error.text == "Content Name is already present in repository") {
          this.showSnackbar('Content Name is already present in repository');
        } else if (error.error.text == "You have Exceeded the Maximum counts of Media Files in Repository") {
          this.showSnackbar("You have Exceeded the Maximum counts of Media Files in Repository");
        } else {
          this.showSnackbar('You have Exceeded the Maximum counts of Media Files in Repository.');
        }
      }
    });
  }
}

  // used to check which button is clicked
  activeButton: string = 'manage';

 setActiveButton(button: string) {

    this.getRepo();
    this.getRepositoryContent();

    this.activeButton = button;

    // Open modal if the 'Add' button is clicked
    if (button === 'add') {
      this.openPopupForNewContent();
    }
  }

  closePopup() {
    if (this.promoForm.invalid) {
      // Mark all form controls as touched to show validation errors
      this.promoForm.markAllAsTouched();
      return;
    }
    if (this.dialogRef) {
      setTimeout(() => {
        this.dialogRef.close();
      }, 150);
    }
  }

  manageAllocation(adConnectMediaId: number) {
  const selectedMedia = this.repoContent.find(item => item.adConnectMediaId === adConnectMediaId);

  if (selectedMedia) {
    if (selectedMedia.adConnectMediaValidatedBySystem === '1') {
      // If the media is validated by the system
      const payLoad = {
        Accountid: this.userData.accT_ID,
        subacctid: 0
      };

      this.apiService.screenAllocation(payLoad).subscribe({
        next: (data: any) => {
          if (!data || Object.keys(data).length === 0) {
            // Show Snackbar if the response is empty
            this.snackBar.open('No data available', 'Close', {
              duration: 5000, // Duration in milliseconds
              verticalPosition: 'top',
              horizontalPosition: 'center' // Position of the Snackbar
            });
          } else {
          }

          console.log("Data: ", data)
        },
        error: (error: any) => {
          // Handle errors if needed
          console.error("Error during screen allocation:", error);
          this.snackBar.open('An error occurred during screen allocation.', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    } else {
      // If the media has not been validated
      this.snackBar.open('Please validate the screen first', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar' // Apply custom class
      });
    }
  } else {
    // If the media item is not found
    this.snackBar.open('Media item not found', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar' // Apply custom class
    });
  }
  }

  isEditMode: boolean = false;  // Declare the isEditMode property
  currentItem: any;
  editDoohContent(item: any) {
  console.log("Item of edit is ", item);
  this.currentItem = item;
  this.openPopupForNewContent();
  this.isEditMode = true;  // Set to true when editing    
  this.editForm = true;

  // Define the base URL
  const baseUrl = "http://www.shripatigroup.com/";

  // Apply transformations to format the adMediaFile path
  const relativePath = item.adMediaFile;
  const formattedMediaUrl = relativePath
    ? baseUrl + relativePath.replace(/\\/g, '/').replace('~/', '')
    : '';

  console.log("Formatted Image URL: ", formattedMediaUrl);

  this.promoForm.patchValue({
    mediaId: item.adConnectMediaId,
    promo_Name: item.adConnectMediaName,
    med_Typ: item.adConnectMediaTyp,
    med_File: formattedMediaUrl, // Use the formatted URL for the media file
    med_storage_Size: item.adConnectMediaStorageSize,
    med_Run_Seconds_Counts: item.adConnectMediaRunSecCounts,
  });
  }
  
  

  
  @ViewChild('buyPrivateRepository') buyPrivateRepository!: TemplateRef<any>;
  
  // Function to open the Buy Private Repository modal
  openModalForPrivateRepository() {
    this.dialog.open(this.buyPrivateRepository, {
      width: '600px', // You can set width and other modal configurations here
    });
  }

  ngOnInit(): void {

      this.sharedService.currentSidebar.subscribe(value => {
        this.isSidebarVisible = value; // Get the latest value
      });

      this.subscription.add(
        this.authService.userData$.subscribe({
          next: (data) => {
            this.userData = data;
            // Perform any additional logic with userData here
          },
          error: (error) => {
            console.error('Error fetching user data', error);
          }
        })
      );

      this.authService.userData$.subscribe(data => {
        this.userData = data;
      });
      
      console.log("User Data: ", this.userData);
  }

}