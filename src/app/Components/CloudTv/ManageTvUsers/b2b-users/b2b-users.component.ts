import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-b2b-users',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './b2b-users.component.html',
  styleUrl: './b2b-users.component.css'
})
export class B2bUsersComponent {

    constructor(private snackBar: MatSnackBar, private http: HttpClient){}
  
    edit = "../../../../../assets/editing.png";
    valid = "../../../../../assets/check.png";
    unvalid = "../../../../../assets/uncheck.png";

    usageFrom: string | null = null;
    usageDate: string | null = null;

    isPopupRegisterUserVisible = false;
    isPopupEditUserVisible = false;
    isPopupRegisterUserEditVisible = false;
    isPopupUsageDashboarVisible = false;
    isPopupManageB2BVisible = true;
    isPopupManagePaymentVisible = false;
    isPopupMakeUserPaymentVisible = false;
    isPopupPaymentWindowVisible = false;
    isActivatePayment = false;

    ActivatePayment(){
      this.isActivatePayment = true;
    }
  

    toggleManageB2BPopup() {
      this.isPopupManageB2BVisible = true;
      this.isPopupManagePaymentVisible = false;
    }

    toggleManagePaymentPopup() {
      this.isPopupManageB2BVisible = false;
      this.isPopupManagePaymentVisible = true;
    }

    togglePaymentWindowPopup() {
      this.isPopupPaymentWindowVisible = !this.isPopupPaymentWindowVisible;
      this.isActivatePayment = false;
    }

    toggleMakeUserPaymentPopup() {
      this.isPopupMakeUserPaymentVisible = !this.isPopupMakeUserPaymentVisible;
    }

    toggleRegisterUserPopup() {
      this.isPopupRegisterUserVisible = !this.isPopupRegisterUserVisible;
    }

    toggleEditUserPopup() {
      this.isPopupEditUserVisible = !this.isPopupEditUserVisible;
    }

    toggleRegisterUserEditPopup() {
      this.isPopupRegisterUserEditVisible = !this.isPopupRegisterUserEditVisible;
    }

    toggleUsageDashboarPopup() {
      this.isPopupUsageDashboarVisible = !this.isPopupUsageDashboarVisible;
    }



}
