import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-B2B-AccountManagement',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,FormsModule],
  templateUrl: './B2B-Account.component.html',
  styleUrl: './B2B-Account.component.css'
})
export class B2BAccountManagementComponent {

  constructor(private apiService: APIService, private http: HttpClient, private dialog: MatDialog,private snackBar: MatSnackBar) {
    this.addNewAccountFormForInventoryUser = new FormGroup({
      "invntrY_ACCOUNT_UID": new FormControl(""),
      "ACCOUNT_NAME": new FormControl("", [Validators.required,Validators.minLength(3)]),
      "SUBACCT_FLG": new FormControl(true, [Validators.required]),
      "ACCOUNT_ADDRESS": new FormControl("",[Validators.required, Validators.minLength(5)]),
      "ACCOUN_BANK": new FormControl("", [Validators.required]),
      "ACCOUNT_BANK_NUMBR": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(18)]),
      "ACCOUNT_BANK_IFSC": new FormControl("", [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]),
      "ACCOUNT_BRANCH": new FormControl("", [Validators.required]),
      "ACCOUNT_PRIMARY_MOBL_NUMBR": new FormControl("", [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]),
      "ACCOUNT_USER_NAME": new FormControl()
    })
    this.addNewAccountFormForAdvertiser = new FormGroup({
      "promO_REP_ACCOUNT_ID":new FormControl(""),
      "ACCOUNT_NAME": new FormControl("", [Validators.required]),
      "promO_ACCT_ADDRESS": new FormControl("", [Validators.required]),
      "promO_SUBACCT_FLG": new FormControl("", [Validators.required]),
      "primarY_MOBL_NUMBR": new FormControl("", [Validators.required, Validators.pattern('^[789]\\d{9}$')]),
      
    })
  }

  get primaryMobileNumber() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUNT_PRIMARY_MOBL_NUMBR');
  }

  get accountName() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUNT_NAME');
  }

  get accountAddress() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUNT_ADDRESS');
  }

   get accountBank() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUN_BANK');
  }

  get accountBankIFSC() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUNT_BANK_IFSC');
  }

  get accountBranch() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUNT_BRANCH');
  }

  get accountBankNumber() {
    return this.addNewAccountFormForInventoryUser.get('ACCOUNT_BANK_NUMBR');
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void { 
    this.apiService.getInventoryHolders().subscribe((res: any) => {
      this.invntryHolders = res;
    });
     this.apiService.getAdvertisers().subscribe((res: any) => {
      this.advertisers = res;
    });
  }

  // manage account and manage bo user
  selectedButton: string = 'accounts';
  addNewAccountFormForInventoryUser: FormGroup;
  invntryHolders: any[] = [];
  selectedUid: string | null = null; // To store the selected UID
  selectedPUser: string | null = null;
  bankDetails: any = {}; // Object to store bank details
  InventoryPUserDetails: any = {}; // Object to store user details
  selectedUser: string ='Inventory Holder User';  // Either the user is advertiser or inventory user
  selectedOption: any;
  SaveButtonForInventory = "Add New Account";

  // variables to  show the form for Inventory
  showFormForInventory: boolean = false;
  formHeading: string | undefined;
  saveButton: string | undefined;
  editFormForInventory: boolean = false;

  // for serching the entry
  searchTermForInventory: string = '';

  // to fetch the searched item for inevntory
  currentPageForInventory: number = 1;
  itemsPerPageForInventory: number = 10;


// used for Inventory used addition
  @ViewChild('dialogTemplateforInventory') dialogTemplateforInventory!: TemplateRef<any>;
  dialogRefForInventory!: MatDialogRef<any>;

  OpenpopupForInventory() {
    this.formHeading = 'Add New Playlist';
    this.SaveButtonForInventory = "Save New Account";
    this.editFormForInventory = false; 
    this.addNewAccountFormForInventoryUser.reset();
    setTimeout(() => { 
      this.dialogRefForInventory = this.dialog.open(this.dialogTemplateforInventory, {
      width: '50%',
      height: '550px',
    });
    },50);   
  }



  closePopupForInventory() {
   if (this.dialogRefForInventory) {
      setTimeout(() => {
        this.dialogRefForInventory.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }

  // Used to show inventory user bank details
  @ViewChild('dialogTemplateforInventoryUserBankDetail') dialogTemplateforInventoryUserBankDetail!: TemplateRef<any>;
  dialogRefforInventoryUserBankDetail!: MatDialogRef<any>;

  OpenpopupForInventoryUserBankDetail() {
    setTimeout(() => { 
      this.dialogRefforInventoryUserBankDetail = this.dialog.open(this.dialogTemplateforInventoryUserBankDetail, {
      width: '25%',
      height: '170px',
    });
    },50);   
  }
  closePopupForInventoryForInventoryUserBankDetail() {
   if (this.dialogRefforInventoryUserBankDetail) {
      setTimeout(() => {
        this.dialogRefforInventoryUserBankDetail.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }

  // used for Inventory P user detail
  @ViewChild('dialogTemplateForInventoryPUserDetail') dialogTemplateForInventoryPUserDetail!: TemplateRef<any>;
  dialogRefForInventoryPUserDetail!: MatDialogRef<any>;

  OpenpopupForInventoryPUserDetail() {
    setTimeout(() => { 
      this.dialogRefForInventoryPUserDetail = this.dialog.open(this.dialogTemplateForInventoryPUserDetail, {
      width: '25%',
      height: '240px',
    });
    },50);   
  }
  closePopupForInventoryPUserDetail() {
   if (this.dialogRefForInventoryPUserDetail) {
      setTimeout(() => {
        this.dialogRefForInventoryPUserDetail.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }


    loading: boolean = false;  // Set to true when the API call starts

  saveNewAccountForInventoryUser(addNewAccountForm: any) {
    this.loading = true;  // Start loading spinner

    if (!this.editFormForInventory) {
      const payLoad = {
        ACCOUNT_ADDRESS: addNewAccountForm.ACCOUNT_ADDRESS,
        ACCOUNT_BANK_IFSC: addNewAccountForm.ACCOUNT_BANK_IFSC,
        ACCOUNT_BANK_NUMBR: addNewAccountForm.ACCOUNT_BANK_NUMBR,
        ACCOUNT_BRANCH: addNewAccountForm.ACCOUNT_BRANCH,
        ACCOUNT_NAME: addNewAccountForm.ACCOUNT_NAME,
        ACCOUNT_PRIMARY_MOBL_NUMBR: addNewAccountForm.ACCOUNT_PRIMARY_MOBL_NUMBR,
        ACCOUNT_USER_NAME: addNewAccountForm.ACCOUNT_USER_NAME,
        ACCOUN_BANK: addNewAccountForm.ACCOUN_BANK,
        SUBACCT_FLG: addNewAccountForm.SUBACCT_FLG,
      };

      this.apiService.addNewAccountForInventory(payLoad).subscribe({
        next: (data: any) => {
          this.snackBar.open('Entry has been saved successfully!', 'Close', {
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top'
          });
          this.fetchUsers();
          this.loading = false;  // Stop loading spinner
        },
        error: (error) => {
          // Check if the error message matches the specific case
          if (error.error === 'Mobile Number is Already registered with Account') {
            this.snackBar.open('Mobile Number is Already registered with Account', 'Close', {
              duration: 3000, 
              horizontalPosition: 'center', 
              verticalPosition: 'top'
            });
          } else {
            this.snackBar.open('Something went wrong, please try again.', 'Close', {
              duration: 3000, 
              horizontalPosition: 'center', 
              verticalPosition: 'top'
            });
          }
          this.loading = false;  // Stop loading spinner
        }
      });
    } else {
      const payload = {
        accounT_ID: addNewAccountForm.invntrY_ACCOUNT_UID,
        subaccT_FLG: addNewAccountForm.SUBACCT_FLG,
        accounT_ADDRESS: addNewAccountForm.ACCOUNT_ADDRESS,
        accouN_BANK: addNewAccountForm.ACCOUN_BANK,
        accounT_BANK_NUMBR: addNewAccountForm.ACCOUNT_BANK_NUMBR,
        accounT_BANK_IFSC: addNewAccountForm.ACCOUNT_BANK_IFSC,
        accounT_BRANCH: addNewAccountForm.ACCOUNT_BRANCH,
      };
      
      this.apiService.editAccountForInventory(payload).subscribe({
        next: (data: any) => {
          this.snackBar.open('Entry has been Edited successfully!', 'Close', {
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top'
          });
          this.fetchUsers();
          this.loading = false;  // Stop loading spinner
        },
        error: (error) => {
          if (error.error === 'Mobile Number is Already registered with Account') {
            this.snackBar.open('Mobile Number is Already registered with Account', 'Close', {
              duration: 3000, 
              horizontalPosition: 'center', 
              verticalPosition: 'top'
            });
          } else {
            this.snackBar.open('Something went wrong, please try again.', 'Close', {
              duration: 3000, 
              horizontalPosition: 'center', 
              verticalPosition: 'top'
            });
          }
          this.loading = false;  // Stop loading spinner
        }
      });
    }
}


  populateFormFieldsForInventory(item: any) {
    this.OpenpopupForInventory();
    this.SaveButtonForInventory = "Edit Account";
    this.editFormForInventory = true;
    // Assuming you have a reference to the form group
    this.addNewAccountFormForInventoryUser.patchValue({

      // ACCOUNT_NAME: { value: item.invntrY_ACCOUNT_NAME, disabled: true },
      // ACCOUNT_ADDRESS: { value: item.invntrY_ACCOUNT_CORP_ADDRESS, disabled: true },
      invntrY_ACCOUNT_UID: item.invntrY_ACCOUNT_UID,
      ACCOUNT_NAME: item.invntrY_ACCOUNT_NAME,
      ACCOUNT_ADDRESS: item.invntrY_ACCOUNT_CORP_ADDRESS,
      SUBACCT_FLG: item.invntrY_ACCOUNT_SUBACCTS_ACTIVATED_FLG,
      ACCOUNT_PRIMARY_MOBL_NUMBR: item.admediA_MOBL_NUMBR,
      ACCOUN_BANK: item.invntrY_ACCOUNT_BANK_NAME,
      ACCOUNT_BANK_IFSC: item.invntrY_ACCOUNT_IFSC_NUMBR,
      ACCOUNT_BRANCH: item.invntrY_ACCOUNT_IFSC_BRANCH,
      ACCOUNT_BANK_NUMBR: item.invntrY_ACCOUNT_BANK_ACCT_NUMBR,
      // ACCOUNT_USER_NAME: item.invntrY_USER_NAME
    });
  }

  // addFormForInventory() {
  //   this.showFormForInventory = true;
    
  // }
  // closeFormForInventory() {
  //   this.showFormForInventory = false;
  // }

  showBankDetailsForInventoryUser(uid: string) {
    // Find the bank details related to the selected UID
    // You can replace this with your logic to fetch bank details from the server or any other source
    this.bankDetails = this.getBankDetailsByUidForInventoryUser(uid);
    this.selectedUid = uid; // Set the selected UID
    this.OpenpopupForInventoryUserBankDetail();
  }
  
  getBankDetailsByUidForInventoryUser(uid: string) {
    if (!this.invntryHolders) {
      return {}; // Return an empty object if InvntryHolders is undefined or null
    }

    // Find the item in InvntryHolders array with the matching UID
    const selectedItem = this.invntryHolders.find(item => item.invntrY_ACCOUNT_UID === uid);

    if (!selectedItem) {
      return {}; // Return an empty object if no item with the given UID is found
    }

    // Extract bank details from the selected item
    const bankDetails = {
      bankName: selectedItem.invntrY_ACCOUNT_BANK_NAME,
      ifsc: selectedItem.invntrY_ACCOUNT_IFSC_NUMBR,
      branch: selectedItem.invntrY_ACCOUNT_IFSC_BRANCH,
      accountNumber: selectedItem.invntrY_ACCOUNT_BANK_ACCT_NUMBR
    };

    return bankDetails;
  }

  closeBankDetailsForInventoryUser() {
    this.selectedUid = null;
    this.bankDetails = {}; // Clear bank details when closing
  }
  
  showDetailForInventoryPUserDetail(uid: string) {
    this.InventoryPUserDetails = this.getUserDetailsForInventory(uid);
    this.selectedPUser = uid; // Set the selected PIN
    this.OpenpopupForInventoryPUserDetail();
  }
      
  getUserDetailsForInventory(uid: string) {
    if (!this.invntryHolders) {
      return {}; // Return an empty object if InvntryHolders is undefined or null
    }

    // Find the item in InvntryHolders array with the matching UID
    const selectedItem = this.invntryHolders.find(item => item.invntrY_ACCOUNT_UID === uid);

    if (!selectedItem) {
      return {}; // Return an empty object if no item with the given PIN is found
    }

    // Extract user details from the selected item
    const userDetails = {
      // You can extract the specific details you need here
      // For example:
      admediA_MOBL_NUMBR: selectedItem.admediA_MOBL_NUMBR,
      admediA_PRIMARY_USER_FLAG: selectedItem.admediA_PRIMARY_USER_FLAG,
      admediA_ROLE_ID: selectedItem.admediA_ROLE_ID,
      admediA_ROLE_NAME: selectedItem.admediA_ROLE_NAME,
      admediA_ECOMAPP_PIN: selectedItem.admediA_ECOMAPP_PIN,
      admediA_SCREENPLAYER_PIN: selectedItem.admediA_SCREENPLAYER_PIN,
      admediA_WEBAPP_PIN: selectedItem.admediA_WEBAPP_PIN
      // Add more properties as needed
    };

    return userDetails;
  }



// -----------------------------The below variables are for advertisor-------------------------------------------------------------------

  // for advertiser
  searchTermForAdvertiser: string = '';
  currentPageForAdvertiser: number = 1;
  itemsPerPageForAdvertiser: number = 10;
  advertisers: any[] = [];
  addNewAccountFormForAdvertiser: FormGroup;
  selectedPUserForAdvertiser: string | null = null;
  selectedPUserDetailsForAdvertiser: any = {};
  showFormForAdvertiser: boolean = false;
  editFormForAdvertiser : boolean = false;
  SaveButtonForAdvertiser = "Add New Advertiser";




  get totalItemsForInventory(): number {
    return this.invntryHolders.length;
  }

  get totalPagesForInventory(): number {
    return Math.ceil(this.invntryHolders.length / this.itemsPerPageForInventory);
  }

  get startItemForInventory(): number {
    return (this.currentPageForInventory - 1) * this.itemsPerPageForInventory + 1;
  }

  get endItemForInventory(): number {
    const end = this.currentPageForInventory * this.itemsPerPageForInventory;
    return end > this.invntryHolders.length ? this.invntryHolders.length : end;
  }

  getPaginatedInventoryUsers(): any[] {
    const startIndex = (this.currentPageForInventory - 1) * this.itemsPerPageForInventory;
    return this.invntryHolders.slice(startIndex, startIndex + this.itemsPerPageForInventory);
  }

  get filteredInventoryUser(): any[] {
    if (!this.searchTermForInventory.trim()) {
      return this.getPaginatedInventoryUsers();
    }

    const searchTermLC = this.searchTermForInventory.toLowerCase().trim();
    return this.getPaginatedInventoryUsers().filter(invntryHolder =>
      invntryHolder.invntrY_ACCOUNT_UID.toLowerCase().includes(searchTermLC) ||
      invntryHolder.invntrY_ACCOUNT_NAME.toLowerCase().includes(searchTermLC) ||
      invntryHolder.invntrY_ACCOUNT_CORP_ADDRESS.toLowerCase().includes(searchTermLC)
    );
  }

  changePageForInventory(page: number): void {
    if (page >= 1 && page <= this.totalPagesForInventory) {
      this.currentPageForInventory = page;
    }
  }

  // -----------------------------Below are the functions for advertiser------------------ 

  get totalItemsForAdvertiser(): number {
    return this.advertisers.length;
  }

  get totalPagesForAdvertiser(): number {
    return Math.ceil(this.advertisers.length / this.itemsPerPageForAdvertiser);
  }

  get startItemForAdvertiser(): number {
    return (this.currentPageForAdvertiser - 1) * this.itemsPerPageForAdvertiser + 1;
  }

  get endItemForAdvertiser(): number {
    const end = this.currentPageForAdvertiser * this.itemsPerPageForAdvertiser;
    return end > this.advertisers.length ? this.advertisers.length : end;
  }

  getPaginatedAdvertiserUsers(): any[] {
    const startIndex = (this.currentPageForAdvertiser - 1) * this.itemsPerPageForAdvertiser;
    return this.advertisers.slice(startIndex, startIndex + this.itemsPerPageForAdvertiser);
  }

  get filteredAdvertiserUser(): any[] {
    if (!this.searchTermForAdvertiser.trim()) {
      return this.getPaginatedAdvertiserUsers();
    }

    const searchTerm = this.searchTermForAdvertiser.toLowerCase().trim();
    return this.getPaginatedAdvertiserUsers().filter(advertiser =>
      advertiser.promO_REP_ACCOUNT_ID.toLowerCase().includes(searchTerm) ||
      advertiser.admediA_ROLE_NAME.toLowerCase().includes(searchTerm) ||
      advertiser.promO_REP_ACCOUNT_CORP_ADDRESS.toString().toLowerCase().includes(searchTerm)
    );
  }

  changePageForAdvertiser(page: number): void {
    if (page >= 1 && page <= this.totalPagesForAdvertiser) {
      this.currentPageForAdvertiser = page;
    }
  }

  // to fetch the searched item for advertisor
  // get filteredAdvertiserUser() {
  //   return this.advertisers.filter(advertiser => 
  //     advertiser.promO_REP_ACCOUNT_ID.toLowerCase().includes(this.searchTermForAdvertiser.toLowerCase()) ||
  //     advertiser.admediA_ROLE_NAME.toLowerCase().includes(this.searchTermForAdvertiser.toLowerCase()) ||
  //     advertiser.promO_REP_ACCOUNT_CORP_ADDRESS.toString().toLowerCase().includes(this.searchTermForAdvertiser.toLowerCase())
  //   );
  // }

  // used for amange account and manage bo account tab
  selectButton(button: string) {
    this.selectedButton = button;
  }
  
  

  
  // to show the modal for advertiser when adding or editing the account
  @ViewChild('dialogTemplateForAdvertiser') dialogTemplateForAdvertiser!: TemplateRef<any>;
  dialogRefForAdvertiser!: MatDialogRef<any>;

  OpenpopupForAdvertiser() {
    this.SaveButtonForAdvertiser = " Add New Advertiser";
    this.editFormForAdvertiser = false; 
    this.addNewAccountFormForAdvertiser.reset();
    setTimeout(() => { 
      this.dialogRefForAdvertiser = this.dialog.open(this.dialogTemplateForAdvertiser, {
      width: '35%',
      height: '500px',
    });
    },50);   
  }

  closePopupForAdvertiser() {
   if (this.dialogRefForAdvertiser) {
      setTimeout(() => {
        this.dialogRefForAdvertiser.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }

  // showing primary user modal for advertiser
  @ViewChild('dialogTemplateForAdvertiserPrimaryUserDetails') dialogTemplateForAdvertiserPrimaryUserDetails!: TemplateRef<any>;
  dialogRefForAdvertiserPrimaryUserDetails!: MatDialogRef<any>;

  OpenpopupForAdvertiserPrimaryUserDetails() {
    setTimeout(() => { 
      this.dialogRefForAdvertiserPrimaryUserDetails = this.dialog.open(this.dialogTemplateForAdvertiserPrimaryUserDetails, {
      width: '25%',
      height: '250px',
    });
    },50);   
  }

  closePopupForAdvertiserPrimaryUserDetails() {
   if (this.dialogRefForAdvertiserPrimaryUserDetails) {
      setTimeout(() => {
        this.dialogRefForAdvertiserPrimaryUserDetails.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }

  // modal to show advertiser detail when clicked on details button
  @ViewChild('dialogTemplateForAdvertiserDetails') dialogTemplateForAdvertiserDetails!: TemplateRef<any>;
  dialogRefForAdvertiserDetails!: MatDialogRef<any>;

  OpenpopupForAdvertiserDetails() {
    setTimeout(() => { 
      this.dialogRefForAdvertiserDetails = this.dialog.open(this.dialogTemplateForAdvertiserDetails, {
      width: '20%',
      height: '130px',
    });
    },50);   
  }

  closePopupForAdvertiserDetails() {
   if (this.dialogRefForAdvertiserDetails) {
      setTimeout(() => {
        this.dialogRefForAdvertiserDetails.close();
      }, 150); // Delay in milliseconds (500ms = 0.5 seconds)
    }   
  }
  

  

  

  loadingForAdvertiser: boolean = false;

  saveNewAccountForAdvertiserUser(addNewAccountForm: any) {
      this.loadingForAdvertiser = true; // Start loading
    if (!this.editFormForAdvertiser) {
      const payLoad = {
        promO_ACCT_NAME: addNewAccountForm.ACCOUNT_NAME,
        promO_SUBACCT_FLG: addNewAccountForm.promO_SUBACCT_FLG,
        promO_ACCT_ADDRESS: addNewAccountForm.promO_ACCT_ADDRESS,
        primarY_MOBL_NUMBR: addNewAccountForm.primarY_MOBL_NUMBR
      };

      this.apiService.addNewAccountForAdvertiser(payLoad).subscribe({
        next: (data: any) => {
          this.snackBar.open('Entry has been saved successfully!', 'Close', {
            duration: 3000, // 3 seconds
            horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
            verticalPosition: 'top' // Can be 'top' or 'bottom'
          });
          this.fetchUsers();
          this.loadingForAdvertiser = false; // Stop loading
        },
        error: (error) => {
          let errorMessage = 'Error saving entry!';
          if (error.status === 400) { // assuming 400 is the status code for entry already exists
            errorMessage = 'Entry already exists!';
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000, // 3 seconds
            horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left' or 'right'
            verticalPosition: 'top' // Can be 'top' or 'bottom'
          });
          this.loadingForAdvertiser = false; // Stop loading
        }
      });
    }
    else {
      const payload = {
        promO_ACCT_ID: addNewAccountForm.promO_REP_ACCOUNT_ID,
        promO_SUBACCT_FLG: addNewAccountForm.promO_SUBACCT_FLG,
        promO_ACCT_ADDRESS: addNewAccountForm.promO_ACCT_ADDRESS
      };

      this.apiService.editADvertiser(payload).subscribe({
        next: (data: any) => {
          this.snackBar.open('Entry has been edited successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.fetchUsers();
          this.loadingForAdvertiser = false; // Stop loading
        },
        error: (error) => {
          this.snackBar.open('Error editing entry!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.loadingForAdvertiser = false; // Stop loading
        }
      });
    }
    
  }

  populateFormFieldsForAdvertiser(item: any) { 
    this.OpenpopupForAdvertiser();
    this.SaveButtonForAdvertiser = " Edit Advertiser";
    this.editFormForAdvertiser = true;
    this.addNewAccountFormForAdvertiser.patchValue({
        promO_REP_ACCOUNT_ID:item.promO_REP_ACCOUNT_ID,
        ACCOUNT_NAME:item.admediA_ROLE_NAME,
        promO_ACCT_ID:item.promO_ACCT_ID,
        promO_SUBACCT_FLG: item.promO_REP_SUBACCTS_ACTIVATED_FLG,
        promO_ACCT_ADDRESS: item.promO_REP_ACCOUNT_CORP_ADDRESS,
        primarY_MOBL_NUMBR: item.admediA_MOBL_NUMBR,
    });
  }

  showPUserDetailsForAdvertiser(uid: string) {
    this.OpenpopupForAdvertiserPrimaryUserDetails();
     this.selectedPUserDetailsForAdvertiser = this.showAdvertiserDetails(uid);
     this.selectedPUserForAdvertiser = uid;
  }

  AdvertiserDetails: any = {};
  showdetailsForAdvertiserUser(uid: string) { 
    this.OpenpopupForAdvertiserDetails();
    const advertiser = this.advertisers.find(ad => ad.promO_REP_ACCOUNT_ID === uid);
    if (advertiser) {
      this.AdvertiserDetails.admediA_MOBL_NUMBR = advertiser.admediA_MOBL_NUMBR;
      this.AdvertiserDetails.admediA_ROLE_NAME = advertiser.admediA_ROLE_NAME;
    }
  }

  // function to fetch advertiser details
  showAdvertiserDetails(id: any) {

    if (!this.advertisers) {
      return {}; // Return an empty object if InvntryHolders is undefined or null
    }
    const selectedItem = this.advertisers!.find(uid => uid.promO_REP_ACCOUNT_ID === id);
    

    if (!selectedItem) {
      return {}; // Return an empty object if no item with the given UID is found
    }

    // Extract bank details from the selected item
    const  details = {
     primaryUser : selectedItem.admediA_PRIMARY_USER_FLAG,
      mobNumber: selectedItem.admediA_MOBL_NUMBR,
      roleId:selectedItem.admediA_ROLE_ID,
      roleName:selectedItem.admediA_ROLE_NAME,
      webAppPin:selectedItem.admediA_WEBAPP_PIN,
      screenPlayerPin : selectedItem.admediA_SCREENPLAYER_PIN,
      eCommAppPin :selectedItem.admediA_ECOMAPP_PIN,
    };

    return details;
  }

  

  addFormForAdvertiser() {
    this.showFormForAdvertiser = true;
    
  }
  closeFormForAdvertiser() {
    this.showFormForAdvertiser = false;
  }


}
