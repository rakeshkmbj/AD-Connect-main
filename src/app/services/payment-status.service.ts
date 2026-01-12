import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusService {
  private paymentStatusSubject = new BehaviorSubject<any>(null);
  paymentStatus$ = this.paymentStatusSubject.asObservable(); // Observable for other components

  // Function to update payment status
  updatePaymentStatus(status: any) {
    this.paymentStatusSubject.next(status);
  }
}