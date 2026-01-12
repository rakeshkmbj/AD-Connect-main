import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  loginDetail: any;
  private redirectAfterLogin = false;
  isDropdownOpen = false;
  selectedApplication: any = null;

  applications = [
    { value: '1', label: 'ADC Backoffice' },
    { value: '2', label: 'ADC Inventory Owners' },
    { value: '3', label: 'ADC Advertisers & Marketers' },
    { value: '4', label: 'ADC TV on Cloud' },
    { value: '5', label: 'ADC Channels & Multiple Service Operators' },
    { value: '6', label: 'ADC D2D & D2C Users' },
  ];

  constructor(
    private apiService: APIService,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<any>,
    private fb: FormBuilder
  ) {
      this.loginForm = this.fb.group({
        applicationId: ['', Validators.required]
      });
      this.loginForm = new FormGroup({
      applicationId: new FormControl('', [
        Validators.required // Makes the field required
      ]),
      mobNumber: new FormControl('', [
        Validators.required, // Makes the field required
        Validators.pattern('^[0-9]{10}$') // Pattern validator for 10-digit phone number
      ]),
      password: new FormControl('', [
        Validators.required // Makes the field required
      ]),
    });
  }

  ngOnInit(): void {
    // Subscribe to router events to show snackbar after navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.redirectAfterLogin) {
        this.showSnackbar();
        this.redirectAfterLogin = false; // Reset the flag after showing snackbar
      }
    });
  }

  submitloginForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // console.log("Hello ji : ",this.loginForm.value.applicationId); //added by me  to add tem cloutv -----------------------------

    // if(this.loginForm.value.applicationId == 7){ // temp redirecting to cloutv ---------------------
    //   this.router.navigate(['/cloud-tv']);
       
    // }

    this.isLoading = true; // Set loading state to true when form is submitted

    const payload = {
      appId: String(this.loginForm.value.applicationId),
      mobileNumber: String(this.loginForm.value.mobNumber),
      password: String(this.loginForm.value.password)
    };

    this.apiService.login(payload).subscribe({
      next: (res: any) => {
        this.loginDetail = res;
        console.log("loginDetails are", this.loginDetail);

        // Store the login data in the AuthService
        this.authService.setUserData(res);

        console.log("Ye he ji res: ", res)

        // Set a flag to show snackbar after navigation
        this.redirectAfterLogin = true;

        // Redirect based on the login response data
        this.redirectUser(res); //-----------------------------------------------------------
        this.isLoading = false; // Reset loading state after successful response
      },
      error: (err) => {
    console.error('Login failed', err);

    // Show a specific error message in the snackbar based on the error response
    if (err.status === 404 || err.status === 400) {
      // Assuming 401 or 400 status code indicates invalid username/password
      this.snackBar.open('Invalid username or password', 'Close', {
        duration: 3000, // Snackbar will automatically dismiss after 3 seconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      // Generic error message for other errors
      this.snackBar.open('An error occurred. Please try again later.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

    this.isLoading = false; // Reset loading state after error
  },
});
  
    this.closePopup()
  }

  private redirectUser(data: any) {
    // Determine redirection logic based on user data
    if (data.admediA_ROLE_NAME === 'BO Super Admin' || data.admediA_ROLE_NAME === 'BO Admin' || data.admediA_ROLE_NAME === 'BO Manager Supply' || data.admediA_ROLE_NAME === 'BO Manager Demand' || data.admediA_ROLE_NAME === 'BO Media Validator') {     
      this.router.navigate(['/backoffice']);
    } else if (data.admediA_ROLE_NAME === 'SS Super Admin' || data.admediA_ROLE_NAME === 'SS Admin' || data.admediA_ROLE_NAME === 'SS  SUBACCT  User') {
      this.router.navigate(['/supply-side']);
    } else if (data.admediA_ROLE_NAME === 'DS Super Admin' || data.admediA_ROLE_NAME === 'DS Admin' || data.admediA_ROLE_NAME === 'DS SUBACCT User') {
      this.router.navigate(['/demand-side']);
    } else if (data.admediA_ROLE_NAME === 'CLDTV Super Admin' || data.admediA_ROLE_NAME === 'CLDTV Admin' || data.admediA_ROLE_NAME === 'CLDTV D2C  Executive' || data.admediA_ROLE_NAME === 'CLDTV B2B Executive') {
      this.router.navigate(['/cloud-tv']);
    } else if (data.admediA_ROLE_NAME === 'Channel Super Admin' || data.admediA_ROLE_NAME === 'Channel Content Manager' || data.admediA_ROLE_NAME === 'Channel Content Executive') {
      this.router.navigate(['/manage-ch-opr']);
    } else {
      this.router.navigate(['/default-route']); // Default route if no match
    }
  }

  private showSnackbar(): void {
    this.snackBar.open('Logged in successfully!', 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // Adjust position as needed
      verticalPosition: 'top', // Adjust position as needed
    });
  }

  closePopup() {
    this.dialogRef.close(); 
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectApplication(option: any) {
    this.selectedApplication = option;
    this.loginForm.patchValue({
      applicationId: option.value
    });
    this.isDropdownOpen = false;
  }
}