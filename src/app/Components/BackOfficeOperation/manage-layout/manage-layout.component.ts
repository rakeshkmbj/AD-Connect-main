import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage-layout',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor,FormsModule],
  templateUrl: './manage-layout.component.html',
  styleUrl: './manage-layout.component.css'
})
export class ManageLayoutComponent {
  
  layoutForm: FormGroup;
  showForm: boolean = false;
  editForm: boolean = false;
  formHeading: string = 'Add New Playlist';
  saveButton: string = 'Save playlist';
  selectedTemplate: string = 'template1';  // Initialize with the default value
  isLoading: boolean = true;

  // for serching the entry
  searchTerm: string = '';

  // two display the layouts on screen
  layouts: any[] = [];  

  // forr template1
  template1W1Length: number | null = null;
  template1W1Width: number | null = null;

  // for template2
  template2W1Length: number | null = null;
  template2W1Width: number | null = null;

  // for template3
  template3W1Length: number | null = null;
  template3W1Width: number | null = null;
  template3W2Length: number | null = null;
  template3W2Width: number | null = null;

  // for template4
  template4W1Length: number | null = null;
  template4W1Width: number | null = null;
  template4W2Length: number | null = null;
  template4W2Width: number | null = null;

  // for template5
  template5W1Length: number | null = null;
  template5W1Width: number | null = null;
  template5W2Length: number | null = null;
  template5W2Width: number | null = null;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  Openpopup() {
    this.formHeading = 'Add New Playlist';
    this.saveButton = 'Save Playlist';
    this.editForm = false; 
    this.layoutForm.reset();
    setTimeout(() => { 
      this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '70%',
      height: '650px',
    });
    },50);
    
  }

  closePopup() {
   if (this.dialogRef) {
      setTimeout(() => {
        this.dialogRef.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }


  
  constructor(private apiService: APIService, private http: HttpClient, private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.layoutForm = new FormGroup({
      aD_LAYOUT_ID: new FormControl("", [Validators.required]),
      aD_LAYOUT_NAME: new FormControl("", [Validators.required]),
      aD_LAYOUT_ACTIV_FLG: new FormControl("", [Validators.required]),
      template : new FormControl("", [Validators.required]),
      aD_SCREEN_TEMPLATE_FLG : new FormControl("",),
      aD_SCREEN_SINGLE_WINDOW_FLG:new FormControl("",),
      aD_SCREEN_DOUBLE_WINDOW_FLG: new FormControl("",),
      template1LengthRatio: new FormControl("",),
      template1WidthRatio: new FormControl("",),
      template2LengthRatio: new FormControl("",),
      template2WidthRatio: new FormControl("",),
      template3W1Length: new FormControl("",),
      template3W1Width: new FormControl("",),
      template3W2Length: new FormControl("",),
      template3W2Width: new FormControl("", ),
      template4W1Length: new FormControl("", ),
      template4W1Width: new FormControl("", ),
      template4W2Length: new FormControl("", ),
      template4W2Width: new FormControl("", ),
      template5W1Length: new FormControl("",),
      template5W1Width: new FormControl("", ),
      template5W2Length: new FormControl("", ),
      template5W2Width: new FormControl("", ),
      template3SeperatorLengthFlag: new FormControl([{ value: '', disabled: true }], ),
      template3SeperatorWidthFlag: new FormControl([{ value: '', disabled: true }], ),
      template4SeperatorLengthFlag: new FormControl([{ value: '', disabled: true }],),
      template4SeperatorWidthFlag: new FormControl([{ value: '', disabled: true }],),
      template5SeperatorLengthFlag: new FormControl([{ value: '', disabled: true }],),
      template5SeperatorWidthFlag: new FormControl([{ value: '', disabled: true }],),
    })
  }

  currentPage: number = 1;
  itemsPerPage: number = 10;

  get totalItems(): number {
    return this.layouts.length;
  }

  get totalPages(): number {
    return Math.ceil(this.layouts.length / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.layouts.length ? this.layouts.length : end;
  }

  getPaginatedLayouts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.layouts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get filteredLayouts(): any[] {
    this.isLoading = false;
    if (!this.searchTerm.trim()) {
      return this.getPaginatedLayouts();
    }

    const searchTermLC = this.searchTerm.toLowerCase().trim();
    return this.getPaginatedLayouts().filter(layout =>
      layout.aD_LAYOUT_ID.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
     layout.aD_LAYOUT_NAME.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }


  ngOnInit(): void {
    this.fetchLayouts();
  }

  fetchLayouts(): void { 
    this.isLoading= true;
    this.apiService.getLayouts().subscribe((res: any) => {
       // Handle the API response here
      this.layouts = res;
      this.isLoading = false;
    });
    this.isLoading = false;
    // Subscribe to value changes to achieve two-way binding
    this.layoutForm.get('template')?.valueChanges.subscribe(value => {
      this.selectedTemplate = value;
      this.onTemplateChange();
    });
  }
  onTemplateChange(): void {
    const fieldsToReset = [
      'template1LengthRatio', 'template1WidthRatio', 'template2LengthRatio', 'template2WidthRatio',
      'template3W1Length', 'template3W1Width', 'template3W2Length', 'template3W2Width',
      'template4W1Length', 'template4W1Width', 'template4W2Length', 'template4W2Width',
      'template5W1Length', 'template5W1Width', 'template5W2Length', 'template5W2Width',
      'template3SeperatorLengthFlag', 'template3SeperatorWidthFlag',
      'template4SeperatorLengthFlag', 'template4SeperatorWidthFlag',
      'template5SeperatorLengthFlag', 'template5SeperatorWidthFlag'
    ];

    fieldsToReset.forEach(field => {
      if (field.includes(this.selectedTemplate)) {
        this.layoutForm.get(field)?.enable();
      } else {
        this.layoutForm.get(field)?.reset({ value: '', disabled: true });
      }
    });
  }

  
  saveLayout(layout: any) {
    this.isLoading = true;
    if (this.selectedTemplate === "template1") { 
      const payload = {
        layout_Name: layout.aD_LAYOUT_NAME,
        landscape_Flg: true,
        portrait_Flg: false,
        t1_Flg: true,
        t2_Flg: false,
        t3_Flg: false,
        t4_Flg: false,
        t5_Flg: false,
        single_Window_Flg: true,
        double_Window_Flg: false,
        separator_Len_Flg: false,
        separator_Bre_Flg: false,
        window1_Len_ratio_count: layout.template1LengthRatio,
        window1_Bre_ratio_count: layout.template1WidthRatio,
        window2_Len_ratio_Count: 0,
        window2_Bre_ratio_Count: 0
      }
      this.apiService.addScreenLayout(payload).subscribe((data: any) => {
        this.snackBar.open('Layout saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchLayouts();
        this.isLoading = false;
      });
    }
    else if (this.selectedTemplate === "template2") { 
      const payload = {
        layout_Name: layout.aD_LAYOUT_NAME,
        landscape_Flg: false,
        portrait_Flg: true,
        t1_Flg: false,
        t2_Flg: true,
        t3_Flg: false,
        t4_Flg: false,
        t5_Flg: false,
        single_Window_Flg: true,
        double_Window_Flg: false,
        separator_Len_Flg: false,
        separator_Bre_Flg: false,
        window1_Len_ratio_count: layout.template2LengthRatio,
        window1_Bre_ratio_count: layout.template2WidthRatio,
        window2_Len_ratio_Count: 0,
        window2_Bre_ratio_Count: 0
      }
      this.apiService.addScreenLayout(payload).subscribe((data: any) => {
        this.snackBar.open('Layout saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchLayouts();
        this.isLoading = false;
      });
    }
    else if (this.selectedTemplate === "template3") { 
      const payload = {
        layout_Name: layout.aD_LAYOUT_NAME,
        landscape_Flg: true,
        portrait_Flg: false,
        t1_Flg: false,
        t2_Flg: false,
        t3_Flg: true,
        t4_Flg: false,
        t5_Flg: false,
        single_Window_Flg: false,
        double_Window_Flg: true,
        separator_Len_Flg: true,
        separator_Bre_Flg: true,
        window1_Len_ratio_count: layout.template3W1Length,
        window1_Bre_ratio_count: layout.template3W1Width,
        window2_Len_ratio_Count: layout.template3W2Length,
        window2_Bre_ratio_Count: layout.template3W2Width,
      }
      this.apiService.addScreenLayout(payload).subscribe((data: any) => {
        this.snackBar.open('Layout saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchLayouts();
        this.isLoading = false;
      });
    }
    else if (this.selectedTemplate === "template4") {
      const payload = {
        layout_Name: layout.aD_LAYOUT_NAME,
        landscape_Flg: false,
        portrait_Flg: true,
        t1_Flg: false,
        t2_Flg: false,
        t3_Flg: false,
        t4_Flg: true,
        t5_Flg: false,
        single_Window_Flg: false,
        double_Window_Flg: true,
        separator_Len_Flg: true,
        separator_Bre_Flg: true,
        window1_Len_ratio_count: layout.template4W1Length,
        window1_Bre_ratio_count: layout.template4W1Width,
        window2_Len_ratio_Count: layout.template4W2Length,
        window2_Bre_ratio_Count: layout.template4W2Width,
      }
      this.apiService.addScreenLayout(payload).subscribe((data: any) => {
        this.snackBar.open('Layout saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchLayouts();
        this.isLoading = false;
      });
     }
    else {
      const payload = {
        layout_Name: layout.aD_LAYOUT_NAME,
        landscape_Flg: false,
        portrait_Flg: true,
        t1_Flg: false,
        t2_Flg: false,
        t3_Flg: false,
        t4_Flg: false,
        t5_Flg: true,
        single_Window_Flg: false,
        double_Window_Flg: true,
        separator_Len_Flg: true,
        separator_Bre_Flg: true,
        window1_Len_ratio_count: layout.template5W1Length,
        window1_Bre_ratio_count: layout.template5W1Width,
        window2_Len_ratio_Count: layout.template5W2Length,
        window2_Bre_ratio_Count: layout.template5W2Width,
      }
      this.apiService.addScreenLayout(payload).subscribe((data: any) => {
        this.snackBar.open('Layout saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchLayouts();
        this.isLoading = false;
      });
    }
  }
  
  addForm() {
    this.showForm = true;
    this.editForm = false;
  }

  closeForm() {
    this.showForm = false;
  }

  editEntry() {
     this.showForm = true;
    this.editForm = true;
  }
}
