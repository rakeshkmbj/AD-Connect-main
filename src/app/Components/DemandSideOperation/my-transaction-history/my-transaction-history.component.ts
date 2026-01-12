import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-transaction-history',
  standalone: true,
  imports: [],
  templateUrl: './my-transaction-history.component.html',
  styleUrl: './my-transaction-history.component.css'
})
export class MyTransactionHistoryComponent {

  @ViewChild('datePickerInput') datePickerInput: ElementRef<HTMLInputElement> | undefined;

  openDatePicker() {
    // Focus on the date input when the div is clicked
    if (this.datePickerInput) {
      this.datePickerInput.nativeElement.focus();
    }
  }
}
