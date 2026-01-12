import { NgIf,NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { FormControl,FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage-uptime',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,DatePipe,FormsModule],
  templateUrl: './manage-uptime.component.html',
  styleUrl: './manage-uptime.component.css'
})
export class ManageUptimeComponent implements OnInit {
  upTimeForm: FormGroup; // Form group for uptime form
  upTimes: any[] = []; // Array to store uptimes
  showForm: boolean = false; // Flag to toggle form visibility
  editForm: boolean = true; // Flag to toggle edit mode
  saveButton: string = 'Save playlist'; // Text for the save button
  date: any; // Variable for date
  hrs: any; // Variable for hours
  mins: any; // Variable for minutes
  selectedUptime: any; // Variable to store selected uptime

  // Variable for searching the entry
  searchTerm: string = ''; 
  currentPage: number = 1; // Current page number for pagination
  itemsPerPage: number = 10; // Items per page for pagination

  // Getter for total items count
  get totalItems(): number {
    return this.upTimes.length;
  }

  // Getter for total pages count
  get totalPages(): number {
    return Math.ceil(this.upTimes.length / this.itemsPerPage);
  }

  // Getter for the start item index of the current page
  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  // Getter for the end item index of the current page
  get endItem(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.upTimes.length ? this.upTimes.length : end;
  }

  // Function to get paginated uptimes
  getPaginatedUptimes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.upTimes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Function to get filtered uptimes based on the search term
  get filteredUptime(): any[] {
    if (!this.searchTerm.trim()) {
      return this.getPaginatedUptimes();
    }

    const searchTermLC = this.searchTerm.toLowerCase().trim();
    return this.getPaginatedUptimes().filter(upTime =>
      upTime.uptimE_ID.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      upTime.uptimeName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Function to change the current page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Constructor to inject necessary services and initialize the form
  constructor(
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.upTimeForm = this.formBuilder.group({
      uptimE_ID: [''],
      uptimeName: ['', Validators.required],
      
      uptimeSundayFlg: "false",
      uptimeSundayStartHr: ['', Validators.required],
      uptimeSundayStartMin: ['', Validators.required],
      uptimeSundayEndHr: ['', Validators.required],
      uptimeSundayEndMin: ['', Validators.required],
      
      uptimeMondayFlg: [false],
      uptimeMondayStartHr: ['', Validators.required],
      uptimeMondayStartMin: ['', Validators.required],
      uptimeMondayEndHr: ['', Validators.required],
      uptimeMondayEndMin: ['', Validators.required],
      
      uptimeTuesdayFlg: [false],
      uptimeTuesdayStartHr: ['', Validators.required],
      uptimeTuesdayStartMin: ['', Validators.required],
      uptimeTuesdayEndHr: ['', Validators.required],
      uptimeTuesdayEndMin: ['', Validators.required],
      
      uptimeWednesdayFlg: [false],
      uptimeWednesdayStartHr: ['', Validators.required],
      uptimeWednesdayStartMin: ['', Validators.required],
      uptimeWednesdayEndHr: ['', Validators.required],
      uptimeWednesdayEndMin: ['', Validators.required],
      
      uptimeThursdayFlg: [false],
      uptimeThursdayStartHr: ['', Validators.required],
      uptimeThursdayStartMin: ['', Validators.required],
      uptimeThursdayEndHr: ['', Validators.required],
      uptimeThursdayEndMin: ['', Validators.required],
      
      uptimeFridayFlg: [false],
      uptimeFridayStartHr: ['', Validators.required],
      uptimeFridayStartMin: ['', Validators.required],
      uptimeFridayEndHr: ['', Validators.required],
      uptimeFridayEndMin: ['', Validators.required],
      
      uptimeSaturdayFlg: [false],
      uptimeSaturdayStartHr: ['', Validators.required],
      uptimeSaturdayStartMin: ['', Validators.required],
      uptimeSaturdayEndHr: ['', Validators.required],
      uptimeSaturdayEndMin: ['', Validators.required],
      
      uptimeActivFlg: [true]
    });
  }

  // ngOnInit lifecycle hook to fetch uptimes on component initialization
  ngOnInit(): void {
    this.fetchUptimes();
  }

  // Function to fetch uptimes from the API
  fetchUptimes(): void { 
    this.apiService.getUptimes().subscribe((res: any) => {
      this.upTimes = res;
    });
  }

  // Decorator to access the dialog template
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // Function to open the popup for adding/editing uptimes
  Openpopup() {
    this.saveButton = "Save Uptime";
    this.editForm = false; 
    if (!this.editForm) {
      this.upTimeForm.reset(); 
      
      // Set initial values after resetting
      this.upTimeForm.patchValue({
        uptimeSundayFlg: false,
        uptimeMondayFlg: false,
        uptimeTuesdayFlg: false,
        uptimeWednesdayFlg: false,
        uptimeThursdayFlg: false,
        uptimeFridayFlg: false,
        uptimeSaturdayFlg: false,
        uptimeActivFlg: true
      });
    }
    setTimeout(() => { 
      this.dialogRef = this.dialog.open(this.dialogTemplate, {
        width: '50%',
        height: '600px',
      });
    }, 50);
  }

  // Function to close the popup
  closePopup() {
    if (this.dialogRef) {
      setTimeout(() => {
        this.dialogRef.close();
      }, 150); // Delay in milliseconds (150ms = 0.15 seconds)
    }   
  }

  // used to show detail modal
  @ViewChild('detailTemplate') detailTemplate!: TemplateRef<any>;
  dialogRefForDetail!: MatDialogRef<any>;

  OpenpopupForDetail(item: any): void {
    this.selectedUptime = item;
    setTimeout(() => { 
      this.dialogRefForDetail = this.dialog.open(this.detailTemplate, {
      width: '50%',
      height: '450px',   
    });
    }, 50);
  }

  closePopupForDetail() {
   if (this.dialogRefForDetail) {
      setTimeout(() => {
        this.dialogRefForDetail.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }
  

  saveUpTime(upTime: any){
    const sunday = new Date();

    // Sunday start time 
    sunday.setHours(upTime.uptimeSundayStartHr, upTime.uptimeSundayStartMin);
    const SundayStartYear = sunday.getFullYear();
    const SundayStartMonth = ('0' + (sunday.getMonth() + 1)).slice(-2);
    const SundayStartDay = ('0' + sunday.getDate()).slice(-2);
    const SundayStartHours = ('0' + sunday.getHours()).slice(-2);
    const SundayStartMinutes = ('0' + sunday.getMinutes()).slice(-2);
    const SundayStartSeconds = ('0' + sunday.getSeconds()).slice(-2);
    const SundayStartMilliseconds = ('00' + sunday.getMilliseconds()).slice(-3);
    let sundayStartTime = `${SundayStartYear}-${SundayStartMonth}-${SundayStartDay}T${SundayStartHours}:${SundayStartMinutes}:${SundayStartSeconds}.${SundayStartMilliseconds}`;
    
    // Sunday end time

    sunday.setHours(upTime.uptimeSundayEndHr, upTime.uptimeSundayEndMin);
    const SundayEndYear = sunday.getFullYear();
    const SundayEndMonth = ('0' + (sunday.getMonth() + 1)).slice(-2);
    const SundayEndDay = ('0' + sunday.getDate()).slice(-2);
    const SundayEndHours = ('0' + sunday.getHours()).slice(-2);
    const SundayEndMinutes = ('0' + sunday.getMinutes()).slice(-2);
    const SundayEndSeconds = ('0' + sunday.getSeconds()).slice(-2);
    const SundayEndMilliseconds = ('00' + sunday.getMilliseconds()).slice(-3);
    let sundayEndTime = `${SundayEndYear}-${SundayEndMonth}-${SundayEndDay}T${SundayEndHours}:${SundayEndMinutes}:${SundayEndSeconds}.${SundayEndMilliseconds}`;
    
    // Monday start time 
    const Monday = new Date();
    Monday.setHours(upTime.uptimeMondayStartHr, upTime.uptimeMondayStartMin);
    const mondayStartYear = Monday.getFullYear();
    const mondayStartMonth = ('0' + (Monday.getMonth() + 1)).slice(-2);
    const mondayStartDay = ('0' + Monday.getDate()).slice(-2);
    const mondayStartHours = ('0' + Monday.getHours()).slice(-2);
    const mondayStartMinutes = ('0' + Monday.getMinutes()).slice(-2);
    const mondayStartSeconds = ('0' + Monday.getSeconds()).slice(-2);
    const mondayStartMilliseconds = ('00' + Monday.getMilliseconds()).slice(-3);
    let mondayStartTime = `${mondayStartYear}-${mondayStartMonth}-${mondayStartDay}T${mondayStartHours}:${mondayStartMinutes}:${mondayStartSeconds}.${mondayStartMilliseconds}`;
    
    // Monday end time
    Monday.setHours(upTime.uptimeMondayEndHr, upTime.uptimeMondayEndMin);
    const MondayEndYear = Monday.getFullYear();
    const MondayEndMonth = ('0' + (Monday.getMonth() + 1)).slice(-2);
    const MondayEndDay = ('0' + Monday.getDate()).slice(-2);
    const MondayEndHours = ('0' + Monday.getHours()).slice(-2);
    const MondayEndMinutes = ('0' + Monday.getMinutes()).slice(-2);
    const MondayEndSeconds = ('0' + Monday.getSeconds()).slice(-2);
    const MondayEndMilliseconds = ('00' + Monday.getMilliseconds()).slice(-3);
    let mondayEndTime = `${MondayEndYear}-${MondayEndMonth}-${MondayEndDay}T${MondayEndHours}:${MondayEndMinutes}:${MondayEndSeconds}.${MondayEndMilliseconds}`;
    
    // Tuesday start time 
    const Tuesday = new Date();
    Tuesday.setHours(upTime.uptimeTuesdayStartHr, upTime.uptimeTuesdayStartMin);
    const TuesdayStartYear = Tuesday.getFullYear();
    const TuesdayStartMonth = ('0' + (Tuesday.getMonth() + 1)).slice(-2);
    const TuesdayStartDay = ('0' + Tuesday.getDate()).slice(-2);
    const TuesdayStartHours = ('0' + Tuesday.getHours()).slice(-2);
    const TuesdayStartMinutes = ('0' + Tuesday.getMinutes()).slice(-2);
    const TuesdayStartSeconds = ('0' + Tuesday.getSeconds()).slice(-2);
    const TuesdayStartMilliseconds = ('00' + Tuesday.getMilliseconds()).slice(-3);
    let TuesdayStartTime = `${TuesdayStartYear}-${TuesdayStartMonth}-${TuesdayStartDay}T${TuesdayStartHours}:${TuesdayStartMinutes}:${TuesdayStartSeconds}.${TuesdayStartMilliseconds}`;
    
    // Tuesday end time
    Tuesday.setHours(upTime.uptimeTuesdayEndHr, upTime.uptimeTuesdayEndMin);
    const TuesdayEndYear = Tuesday.getFullYear();
    const TuesdayEndMonth = ('0' + (Tuesday.getMonth() + 1)).slice(-2);
    const TuesdayEndDay = ('0' + Tuesday.getDate()).slice(-2);
    const TuesdayEndHours = ('0' + Tuesday.getHours()).slice(-2);
    const TuesdayEndMinutes = ('0' + Tuesday.getMinutes()).slice(-2);
    const TuesdayEndSeconds = ('0' + Tuesday.getSeconds()).slice(-2);
    const TuesdayEndMilliseconds = ('00' + Tuesday.getMilliseconds()).slice(-3);
    let TuesdayEndTime = `${TuesdayEndYear}-${TuesdayEndMonth}-${TuesdayEndDay}T${TuesdayEndHours}:${TuesdayEndMinutes}:${TuesdayEndSeconds}.${TuesdayEndMilliseconds}`;
    
    // Wednesday start time 
    const Wednesday = new Date();
    Wednesday.setHours(upTime.uptimeWednesdayStartHr, upTime.uptimeWednesdayStartMin);
    const WednesdayStartYear = Wednesday.getFullYear();
    const WednesdayStartMonth = ('0' + (Wednesday.getMonth() + 1)).slice(-2);
    const WednesdayStartDay = ('0' + Wednesday.getDate()).slice(-2);
    const WednesdayStartHours = ('0' + Wednesday.getHours()).slice(-2);
    const WednesdayStartMinutes = ('0' + Wednesday.getMinutes()).slice(-2);
    const WednesdayStartSeconds = ('0' + Wednesday.getSeconds()).slice(-2);
    const WednesdayStartMilliseconds = ('00' + Wednesday.getMilliseconds()).slice(-3);
    let WednesdayStartTime = `${WednesdayStartYear}-${WednesdayStartMonth}-${WednesdayStartDay}T${WednesdayStartHours}:${WednesdayStartMinutes}:${WednesdayStartSeconds}.${WednesdayStartMilliseconds}`;
    
    // Wednesday end time
    Wednesday.setHours(upTime.uptimeWednesdayEndHr, upTime.uptimeWednesdayEndMin);
    const WednesdayEndYear = Wednesday.getFullYear();
    const WednesdayEndMonth = ('0' + (Wednesday.getMonth() + 1)).slice(-2);
    const WednesdayEndDay = ('0' + Wednesday.getDate()).slice(-2);
    const WednesdayEndHours = ('0' + Wednesday.getHours()).slice(-2);
    const WednesdayEndMinutes = ('0' + Wednesday.getMinutes()).slice(-2);
    const WednesdayEndSeconds = ('0' + Wednesday.getSeconds()).slice(-2);
    const WednesdayEndMilliseconds = ('00' + Wednesday.getMilliseconds()).slice(-3);
    let WednesdayEndTime = `${WednesdayEndYear}-${WednesdayEndMonth}-${WednesdayEndDay}T${WednesdayEndHours}:${WednesdayEndMinutes}:${WednesdayEndSeconds}.${WednesdayEndMilliseconds}`;
    
    // Thursday start time 
    const Thursday = new Date();
    Thursday.setHours(upTime.uptimeThursdayStartHr, upTime.uptimeThursdayStartMin);
    const ThursdayStartYear = Thursday.getFullYear();
    const ThursdayStartMonth = ('0' + (Thursday.getMonth() + 1)).slice(-2);
    const ThursdayStartDay = ('0' + Thursday.getDate()).slice(-2);
    const ThursdayStartHours = ('0' + Thursday.getHours()).slice(-2);
    const ThursdayStartMinutes = ('0' + Thursday.getMinutes()).slice(-2);
    const ThursdayStartSeconds = ('0' + Thursday.getSeconds()).slice(-2);
    const ThursdayStartMilliseconds = ('00' + Thursday.getMilliseconds()).slice(-3);
    let ThursdayStartTime = `${ThursdayStartYear}-${ThursdayStartMonth}-${ThursdayStartDay}T${ThursdayStartHours}:${ThursdayStartMinutes}:${ThursdayStartSeconds}.${ThursdayStartMilliseconds}`;
    
    // Thursday end time
    Thursday.setHours(upTime.uptimeThursdayEndHr, upTime.uptimeThursdayEndMin);
    const ThursdayEndYear = Thursday.getFullYear();
    const ThursdayEndMonth = ('0' + (Thursday.getMonth() + 1)).slice(-2);
    const ThursdayEndDay = ('0' + Thursday.getDate()).slice(-2);
    const ThursdayEndHours = ('0' + Thursday.getHours()).slice(-2);
    const ThursdayEndMinutes = ('0' + Thursday.getMinutes()).slice(-2);
    const ThursdayEndSeconds = ('0' + Thursday.getSeconds()).slice(-2);
    const ThursdayEndMilliseconds = ('00' + Thursday.getMilliseconds()).slice(-3);
    let ThursdayEndTime = `${ThursdayEndYear}-${ThursdayEndMonth}-${ThursdayEndDay}T${ThursdayEndHours}:${ThursdayEndMinutes}:${ThursdayEndSeconds}.${ThursdayEndMilliseconds}`;
    
    // Friday start time 
    const Friday = new Date();
    Friday.setHours(upTime.uptimeFridayStartHr, upTime.uptimeFridayStartMin);
    const FridayStartYear = Friday.getFullYear();
    const FridayStartMonth = ('0' + (Friday.getMonth() + 1)).slice(-2);
    const FridayStartDay = ('0' + Friday.getDate()).slice(-2);
    const FridayStartHours = ('0' + Friday.getHours()).slice(-2);
    const FridayStartMinutes = ('0' + Friday.getMinutes()).slice(-2);
    const FridayStartSeconds = ('0' + Friday.getSeconds()).slice(-2);
    const FridayStartMilliseconds = ('00' + Friday.getMilliseconds()).slice(-3);
    let FridayStartTime = `${FridayStartYear}-${FridayStartMonth}-${FridayStartDay}T${FridayStartHours}:${FridayStartMinutes}:${FridayStartSeconds}.${FridayStartMilliseconds}`;
    
    // Friday end time
    Friday.setHours(upTime.uptimeFridayEndHr, upTime.uptimeFridayEndMin);
    const FridayEndYear = Friday.getFullYear();
    const FridayEndMonth = ('0' + (Friday.getMonth() + 1)).slice(-2);
    const FridayEndDay = ('0' + Friday.getDate()).slice(-2);
    const FridayEndHours = ('0' + Friday.getHours()).slice(-2);
    const FridayEndMinutes = ('0' + Friday.getMinutes()).slice(-2);
    const FridayEndSeconds = ('0' + Friday.getSeconds()).slice(-2);
    const FridayEndMilliseconds = ('00' + Friday.getMilliseconds()).slice(-3);
    let FridayEndTime = `${FridayEndYear}-${FridayEndMonth}-${FridayEndDay}T${FridayEndHours}:${FridayEndMinutes}:${FridayEndSeconds}.${FridayEndMilliseconds}`;
    
    // Saturday start time 
    const Saturday = new Date();
    Saturday.setHours(upTime.uptimeSaturdayStartHr, upTime.uptimeSaturdayStartMin);
    const SaturdayStartYear = Saturday.getFullYear();
    const SaturdayStartMonth = ('0' + (Saturday.getMonth() + 1)).slice(-2);
    const SaturdayStartDay = ('0' + Saturday.getDate()).slice(-2);
    const SaturdayStartHours = ('0' + Saturday.getHours()).slice(-2);
    const SaturdayStartMinutes = ('0' + Saturday.getMinutes()).slice(-2);
    const SaturdayStartSeconds = ('0' + Saturday.getSeconds()).slice(-2);
    const SaturdayStartMilliseconds = ('00' + Saturday.getMilliseconds()).slice(-3);
    let SaturdayStartTime = `${SaturdayStartYear}-${SaturdayStartMonth}-${SaturdayStartDay}T${SaturdayStartHours}:${SaturdayStartMinutes}:${SaturdayStartSeconds}.${SaturdayStartMilliseconds}`;
    
    // Saturday end time
    Saturday.setHours(upTime.uptimeSaturdayEndHr, upTime.uptimeSaturdayEndMin);
    const SaturdayEndYear = Saturday.getFullYear();
    const SaturdayEndMonth = ('0' + (Saturday.getMonth() + 1)).slice(-2);
    const SaturdayEndDay = ('0' + Saturday.getDate()).slice(-2);
    const SaturdayEndHours = ('0' + Saturday.getHours()).slice(-2);
    const SaturdayEndMinutes = ('0' + Saturday.getMinutes()).slice(-2);
    const SaturdayEndSeconds = ('0' + Saturday.getSeconds()).slice(-2);
    const SaturdayEndMilliseconds = ('00' + Saturday.getMilliseconds()).slice(-3);
    let SaturdayEndTime = `${SaturdayEndYear}-${SaturdayEndMonth}-${SaturdayEndDay}T${SaturdayEndHours}:${SaturdayEndMinutes}:${SaturdayEndSeconds}.${SaturdayEndMilliseconds}`;
    
    // Check if the uptime already exists in the array
    const existingUpTime = this.upTimes.find(item => item.name === upTime.name);

      if (!this.editForm) {
        const addPayLoad = {
            uptime_Name: upTime.uptimeName,
            Sunday_Flg: upTime.uptimeSundayFlg === true,
            Sunday_Start_time: sundayStartTime,
            Sunday_End_Time: sundayEndTime,
            Monday_Flg: upTime.uptimeMondayFlg === true,
            Monday_Start_time: mondayStartTime,
            Monday_End_Time: mondayEndTime,
            Tuesday_Flg: upTime.uptimeTuesdayFlg === true,
            Tuesday_Start_time: TuesdayStartTime,
            Tuesday_End_Time: TuesdayEndTime,
            Wednesday_Flg: upTime.uptimeWednesdayFlg === true,
            Wednesday_Start_time: WednesdayStartTime,
            Wednesday_End_Time: WednesdayEndTime,
            Thursday_Flg: upTime.uptimeThursdayFlg === true,
            Thursday_Start_time: ThursdayStartTime,
            Thursday_End_Time: ThursdayEndTime,
            Friday_Flg: upTime.uptimeFridayFlg === true,
            Friday_Start_time: FridayStartTime,
            Friday_End_Time: FridayEndTime,
            Saturday_Flg: upTime.uptimeSaturdayFlg === true,
            Saturday_Start_time: SaturdayStartTime,
            Saturday_End_Time: SaturdayEndTime,
        };
        this.apiService.addUpTime(addPayLoad).subscribe({
            next: (data: any) => {
                this.snackBar.open('Entry has saved successfully!', 'Close', {
                    duration: 3000, // 3 seconds
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                this.fetchUptimes();
            },
            error: (error) => {
                this.snackBar.open('Uptime already Present!', 'Close', {
                    duration: 3000, // 3 seconds
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        });
    }
    else {
      const editPayLoad = {
        uptimE_ID: upTime.uptimE_ID,
        Sunday_Flg: upTime.uptimeSundayFlg,
        Sunday_Start_time: sundayStartTime,
        Sunday_End_Time: sundayEndTime,
        Monday_Flg: upTime.uptimeMondayFlg,
        Monday_Start_time: mondayStartTime,
        Monday_End_Time: mondayEndTime,
        Tuesday_Flg: upTime.uptimeTuesdayFlg,
        Tuesday_Start_time:TuesdayStartTime,
        Tuesday_End_Time: TuesdayEndTime,
        Wednesday_Flg: upTime.uptimeWednesdayFlg,
        Wednesday_Start_time:WednesdayStartTime,
        Wednesday_End_Time: WednesdayEndTime,
        Thursday_Flg: upTime.uptimeThursdayFlg,
        Thursday_Start_time: ThursdayStartTime,
        Thursday_End_Time: ThursdayEndTime,
        Friday_Flg: upTime.uptimeFridayFlg,
        Friday_Start_time: FridayStartTime,
        Friday_End_Time: FridayEndTime,
        Saturday_Flg: upTime.uptimeSaturdayFlg,
        Saturday_Start_time: SaturdayStartTime,
        Saturday_End_Time: SaturdayEndTime,
        ActiveFlg:true
      }
      this.apiService.editUpTime(editPayLoad).subscribe((data: any) => {
        
          this.snackBar.open('Entry has been edited successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchUptimes();
      });
    }
    
  }

     
    
  populateFormFields(item: any) {
      this.Openpopup();
      this.saveButton = 'Edit UpTime';
      this.editForm = true;
      this.editForm = true;
      this.upTimeForm.patchValue({
        uptimE_ID : item.uptimE_ID,
        uptimeName: item. uptimeName,
       
        uptimeSundayFlg: item.uptimeSundayFlg,
        uptimeSundayStartHr: (new Date(item.uptimeSundayStartTime)).getHours(),
        uptimeSundayStartMin: (new Date(item.uptimeSundayStartTime)).getMinutes(),
        uptimeSundayEndHr:  (new Date(item.uptimeSundayEndTime)).getHours(),
        uptimeSundayEndMin: (new Date(item.uptimeSundayEndTime)).getMinutes(),
        
        uptimeMondayFlg: item.uptimeMondayFlg,
        uptimeMondayStartHr: (new Date(item.uptimeMondayStartTime)).getHours(),
        uptimeMondayStartMin: (new Date(item.uptimeMondayStartTime)).getMinutes(),
        uptimeMondayEndHr: (new Date(item.uptimeMondayEndTime)).getHours(),
        uptimeMondayEndMin: (new Date(item.uptimeMondayEndTime)).getMinutes() ,
        
        uptimeTuesdayFlg: item.uptimeTuesdayFlg,
        uptimeTuesdayStartHr: (new Date(item.uptimeTuesdayStartTime)).getHours(),
        uptimeTuesdayStartMin: (new Date(item.uptimeTuesdayStartTime)).getMinutes(),
        uptimeTuesdayEndHr: (new Date(item.uptimeTuesdayEndTime)).getHours(),
        uptimeTuesdayEndMin: (new Date(item.uptimeTuesdayEndTime)).getMinutes(),
        
        uptimeWednesdayFlg: item.uptimeWednesdayFlg,
        uptimeWednesdayStartHr: (new Date(item.uptimeWednesdayStartTime)).getHours(),
        uptimeWednesdayStartMin: (new Date(item.uptimeWednesdayStartTime)).getMinutes(),
        uptimeWednesdayEndHr: (new Date(item.uptimeWednesdayEndTime)).getHours(),
        uptimeWednesdayEndMin:(new Date(item.uptimeWednesdayEndTime)).getMinutes(),
        
        uptimeThursdayFlg: item.uptimeThursdayFlg,
        uptimeThursdayStartHr: (new Date(item.uptimeThursdayStartTime)).getHours(),
        uptimeThursdayStartMin:(new Date(item.uptimeThursdayStartTime)).getMinutes(),
        uptimeThursdayEndHr:(new Date(item.uptimeThursdayEndTime)).getHours(),
        uptimeThursdayEndMin:(new Date(item.uptimeThursdayEndTime)).getMinutes() ,
        
        uptimeFridayFlg: item.uptimeFridayFlg,
        uptimeFridayStartHr: (new Date(item.uptimeFridayStartTime)).getHours(),
        uptimeFridayStartMin:(new Date(item.uptimeFridayStartTime)).getMinutes(),
        uptimeFridayEndHr: (new Date(item.uptimeFridayEndTime)).getHours(),
        uptimeFridayEndMin: (new Date(item.uptimeFridayEndTime)).getMinutes(),
        
        uptimeSaturdayFlg: item.uptimeSaturdayFlg,
        uptimeSaturdayStartHr:(new Date(item.uptimeSaturdayStartTime)).getHours(),
        uptimeSaturdayStartMin: (new Date(item.uptimeSaturdayStartTime)).getMinutes(),
        uptimeSaturdayEndHr: (new Date(item.uptimeSaturdayEndTime)).getHours(),
        uptimeSaturdayEndMin: (new Date(item.uptimeTuesdayEndTime)).getMinutes(),
        
        uptimeActivFlg:item.uptimeActivFlg,
      });
    }
}
