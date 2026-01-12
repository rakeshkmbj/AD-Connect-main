import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-day-slabs',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, DatePipe, FormsModule],
  templateUrl: './manage-day-slabs.component.html',
  styleUrl: './manage-day-slabs.component.css'
})
export class ManageDaySlabsComponent implements OnInit {
  daySlabForm: FormGroup;
  slabs: any[] = []; // Array to store day slabs
  showForm: boolean = false; // Flag to show/hide the form
  isLoading: boolean = false; // Flag to indicate loading state
  
  // For searching the entry
  searchTerm: string = ''; 

  // To store whether the form is open or in edit mode
  editForm: boolean = false;

  // Button label to show the save button or edit button
  buttonLabel: string = "Save Schedule";

  constructor(private apiService: APIService, private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {
    // Initialize the form group with form controls and validators
    this.daySlabForm = new FormGroup({
      daY_SLAB_ID: new FormControl(""),
      daY_SLAB_NAME: new FormControl("", [Validators.required]),
      slaB_ACTIV_FLG: new FormControl("", [Validators.required]),
      slaB_START_TIME: new FormControl("", [Validators.required]),
      slaB_END_TIME: new FormControl("", [Validators.required]),
      hr1: new FormControl("00"),
      min1: new FormControl("00"),
      hr2: new FormControl("00"),
      min2: new FormControl("00"),
    });
  }

  // Pagination and filtering logic
  currentPage: number = 1; // Current page number for pagination
  itemsPerPage: number = 20; // Number of items per page

  get totalItems(): number {
    return this.slabs.length; // Total number of slabs
  }

  get totalPages(): number {
    return Math.ceil(this.slabs.length / this.itemsPerPage); // Total number of pages
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1; // Starting item index for current page
  }

  get endItem(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.slabs.length ? this.slabs.length : end; // Ending item index for current page
  }

  getPaginatedSlabs(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.slabs.slice(startIndex, startIndex + this.itemsPerPage); // Get slabs for the current page
  }

  get filteredSlabs(): any[] {
    if (!this.searchTerm.trim()) {
      return this.getPaginatedSlabs(); // Return paginated slabs if no search term
    }

    const searchTermLC = this.searchTerm.toLowerCase().trim();
    return this.getPaginatedSlabs().filter(slab =>
      slab.daY_SLAB_ID.toLowerCase().includes(searchTermLC) ||
      slab.daY_SLAB_NAME.toLowerCase().includes(searchTermLC) ||
      this.formatDate(slab.slaB_START_TIME).toLowerCase().includes(searchTermLC) ||
      this.formatDate(slab.slaB_END_TIME).toLowerCase().includes(searchTermLC)
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page; // Change to the specified page number
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options); // Format date to a readable string
  }

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // Lifecycle hook to fetch slabs when component initializes
  ngOnInit(): void {
    this.fetchSlabs();
  }

  // Fetch day slabs from the API
  fetchSlabs(): void {
    this.apiService.getSlabs().subscribe((res: any) => {
      this.slabs = res;
    });
  }

  // Open the popup dialog to add/edit a day slab
  Openpopup(): void {
    this.editForm = false;
    this.showForm = true;
    this.buttonLabel = "Save Schedule";
    this.daySlabForm.reset();
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '50%',
      height: '400px',
    });
  }

  startFormattedDateTime!: string;
  endFormattedDateTime!: string;

  // Save or edit a day slab based on the form data
  saveSlab(schedule: any): void {
    const startDate = new Date(schedule.slaB_START_TIME);
    startDate.setHours(schedule.hr1, schedule.min1);

    const endDate = new Date(schedule.slaB_END_TIME);
    endDate.setHours(schedule.hr2, schedule.min2);

    // Format the start date to the desired format: yyyy-MM-ddTHH:mm:ss.SSS
    const startYear = startDate.getFullYear();
    const startMonth = ('0' + (startDate.getMonth() + 1)).slice(-2);
    const startDay = ('0' + startDate.getDate()).slice(-2);
    const startHours = ('0' + startDate.getHours()).slice(-2);
    const startMinutes = ('0' + startDate.getMinutes()).slice(-2);
    const startSeconds = ('0' + startDate.getSeconds()).slice(-2);
    const startMilliseconds = ('00' + startDate.getMilliseconds()).slice(-3);
    this.startFormattedDateTime = `${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}:${startSeconds}.${startMilliseconds}`;

    // Format the end date to the desired format: yyyy-MM-ddTHH:mm:ss.SSS
    const endYear = endDate.getFullYear();
    const endMonth = ('0' + (endDate.getMonth() + 1)).slice(-2);
    const endDay = ('0' + endDate.getDate()).slice(-2);
    const endHours = ('0' + endDate.getHours()).slice(-2);
    const endMinutes = ('0' + endDate.getMinutes()).slice(-2);
    const endSeconds = ('0' + endDate.getSeconds()).slice(-2);
    const endMilliseconds = ('00' + endDate.getMilliseconds()).slice(-3);
    this.endFormattedDateTime = `${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}:${endSeconds}.${endMilliseconds}`;

    let payLoad: any = {};
    if (!this.editForm) {
      // Payload for adding a new slab
      payLoad = {
        "slab_Name": schedule.daY_SLAB_NAME,
        "start_Time": this.startFormattedDateTime,
        "end_Time": this.endFormattedDateTime,
        "slaB_ACTIV_FLG": schedule.slaB_ACTIV_FLG === "Yes" ? "true" : "false"
      };
      this.apiService.addNewSlabs(payLoad).subscribe({
        next: (data: any) => {
          this.snackBar.open('Entry has been Saved successfully!', 'Close', {
            duration: 3000, // 3 seconds
            horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
            verticalPosition: 'top' // Can be 'top' or 'bottom'
          });
          this.fetchSlabs(); // Refresh the slab list
        },
        error: (error) => {
          this.snackBar.open('Entry already exist!', 'Close', {
            duration: 3000, // 3 seconds
            horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
            verticalPosition: 'top'
          });
        }
      });
    } else {
      // Payload for editing an existing slab
      payLoad = {
        "slab_Id": schedule.daY_SLAB_ID,
        "start_Time": this.startFormattedDateTime,
        "end_Time": this.endFormattedDateTime,
        "activeFlg": this.daySlabForm.get('slaB_ACTIV_FLG')!.value === 'Yes'
      };
      this.apiService.editSlab(payLoad).subscribe((data: any) => {
        this.snackBar.open('Entry has been Edited successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchSlabs(); // Refresh the slab list
      });
    }
  }

  // Populate form fields for editing a slab
  populateFormFields(item: any): void {
    this.Openpopup();
    this.buttonLabel = "Edit Schedule";
    this.showForm = true;
    this.editForm = true;

    const startDate = new Date(item.slaB_START_TIME);
    const endDate = new Date(item.slaB_END_TIME);

    // Fetch the slab start date, hour, and minute
    const startDay = startDate.getDate().toString().padStart(2, '0');
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const startYear = startDate.getFullYear().toString();
    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
    const formattedStartHour = startDate.getHours().toString().padStart(2, '0');
    const formattedStartMinute = startDate.getMinutes().toString().padStart(2, '0');

    // Fetch the slab end date, hour, and minute
    const endDay = endDate.getDate().toString().padStart(2, '0');
    const endMonth = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const endYear = startDate.getFullYear().toString();
    const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
    const formattedEndHour = startDate.getHours().toString().padStart(2, '0');
    const formattedEndMinute = startDate.getMinutes().toString().padStart(2, '0');

    // Populate form fields with the fetched values
    this.daySlabForm.patchValue({
      daY_SLAB_ID: item.daY_SLAB_ID,
      daY_SLAB_NAME: item.daY_SLAB_NAME,
      slaB_START_TIME: formattedStartDate,
      slaB_END_TIME: formattedEndDate,
      hr1: formattedStartHour,
      min1: formattedStartMinute,
      hr2: formattedEndHour,
      min2: formattedEndMinute,
      slaB_ACTIV_FLG: item.slaB_ACTIV_FLG === true ? "Yes" : "No"
    });
  }

  // Close the popup dialog
  closePopup(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
