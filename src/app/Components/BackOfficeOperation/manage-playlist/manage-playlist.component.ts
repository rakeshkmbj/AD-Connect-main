import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIService} from '../../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-playlist',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf,FormsModule],
  templateUrl: './manage-playlist.component.html',
  styleUrl: './manage-playlist.component.css'
})
export class ManagePlaylistComponent {
  playlistForm: FormGroup;
  playlists: any[] = [];
  editForm: boolean = false;
  saveButton: string = 'Save playlist';
  isLoading: boolean = true;
  formHeading: string = 'Add New Playlist';

  // for serching the entry


  constructor(private apiService: APIService, private http: HttpClient,private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.playlistForm = new FormGroup({
      playlisT_ID: new FormControl(),
      playlist_name: new FormControl('', Validators.required),
      global_Flg: new FormControl('', Validators.required), // Form control for playlist name with required validator
      seconds_Duration: new FormControl('', Validators.required),      // Form control for duration with required validator
      type: new FormControl('',Validators.required)                                // Form control for the radio button group
    });

     
  }

  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';

  get totalItems(): number {
    return this.playlists.length;
  }

  get totalPages(): number {
    return Math.ceil(this.playlists.length / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.playlists.length ? this.playlists.length : end;
  }

  getPaginatedPlaylists(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.playlists.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get filteredProducts(): any[] {
    if (!this.searchTerm.trim()) {
      return this.getPaginatedPlaylists();
    }

    const searchTermLC = this.searchTerm.toLowerCase().trim();
    return this.getPaginatedPlaylists().filter(playlist =>
      playlist.playlisT_ID.toString().toLowerCase().includes(searchTermLC) ||
      playlist.playlisT_NAME.toLowerCase().includes(searchTermLC) ||
      playlist.playlisT_MAX_PLAY_DURATION_SEC_COUNTS.toString().toLowerCase().includes(searchTermLC)
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }



  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  Openpopup() {
    this.formHeading = 'Add New Playlist';
    this.saveButton = 'Save Playlist';
    this.editForm = false; 
    this.playlistForm.reset();
    setTimeout(() => { 
      this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '50%',
      height: '500px',
    });
    },50);   
  }
  
  ngOnInit(): void {
    this.fetchPlaylists();
  }

  fetchPlaylists(): void {
    this.isLoading = true;
    this.apiService.getPlaylists().subscribe((res: any) => {
      this.playlists = res;
      this.isLoading = false;
    });
  }

  onSubmit() {

    this.isLoading = true;
    if (!this.editForm) {
        const payload = {
        playlist_name: this.playlistForm.value.playlist_name,
        seconds_Duration: this.playlistForm.value.seconds_Duration,
        global_Flg: this.playlistForm.value.global_Flg === 'Yes',
        adV_TYP_FLG: this.playlistForm.value.type === 'adV_TYP_FLG',
        otT_TYP_FLG: this.playlistForm.value.type === 'otT_TYP_FLG',
        menU_TYP_FLG: this.playlistForm.value.type === 'menU_TYP_FLG',
        signboarD_TYP_FLG: this.playlistForm.value.type === 'signboarD_TYP_FLG',
        tutoriaL_TYPE_FLG: this.playlistForm.value.type === 'tutoriaL_TYPE_FLG',
        livE_STREAM_TYP_FLG: this.playlistForm.value.type === 'livE_STREAM_TYP_FLG'
      };
      this.apiService.addNewPlaylist(payload).subscribe((data: any) => {
        this.snackBar.open('Entry has  saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchPlaylists();
        this.isLoading = false;
      });
      
    }
    else {
      const payload = {
        playlisT_ID : this.playlistForm.value.playlisT_ID,
        playlist_name: this.playlistForm.value.playlist_name,
        seconds_Duration: this.playlistForm.value.seconds_Duration,
        global_Flg: this.playlistForm.value.global_Flg === 'Yes',
        adV_TYP_FLG: this.playlistForm.value.type === 'adV_TYP_FLG',
        otT_TYP_FLG: this.playlistForm.value.type === 'otT_TYP_FLG',
        menU_TYP_FLG: this.playlistForm.value.type === 'menU_TYP_FLG',
        signboarD_TYP_FLG: this.playlistForm.value.type === 'signboarD_TYP_FLG',
        tutoriaL_TYPE_FLG: this.playlistForm.value.type === 'tutoriaL_TYPE_FLG',
        livE_STREAM_TYP_FLG: this.playlistForm.value.type === 'livE_STREAM_TYP_FLG' 
      }
      this.apiService.editPlaylist(payload).subscribe((data: any) => {
        this.snackBar.open('Entry has been Edited successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
          verticalPosition: 'top' // Can be 'top' or 'bottom'
        });
        this.fetchPlaylists();
        this.isLoading = false;
      });
      
    }
    
  }

  populateFormFields(item: any) {
    this.Openpopup();
    this.saveButton = 'Edit Playlist';
    this.formHeading = 'Edit Playlist';
    this.editForm = true
    this.editForm = true;
    this.playlistForm.patchValue({
      playlisT_ID: item.playlisT_ID,
      playlist_name: item.playlisT_NAME,
      seconds_Duration: item.playlisT_MAX_PLAY_DURATION_SEC_COUNTS,
      global_Flg: item.true,
      // ACCOUNT_NAME: item.invntrY_ACCOUNT_NAME,
      // ACCOUNT_ADDRESS: item.invntrY_ACCOUNT_CORP_ADDRESS,
      // SUBACCT_FLG: item.invntrY_ACCOUNT_SUBACCTS_ACTIVATED_FLG,
      // ACCOUNT_PRIMARY_MOBL_NUMBR: item.admediA_MOBL_NUMBR,
      // ACCOUNT_USER_NAME: item.invntrY_USER_NAME
    });
    
  }

  // addForm() {
  //   this.editForm = false;
  //   this.showForm = true;
  //   this.playlistForm.reset();
    // const modalDiv = document.getElementById('myModal');
    // if (modalDiv != null) {
    //   modalDiv.style.display = 'block';
    // }
  // }

  closePopup() {
   if (this.dialogRef) {
      setTimeout(() => {
        this.dialogRef.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }

}
