import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-tv-on-cloud',
  standalone: true,
  imports: [NgIf],
  templateUrl: './create-tv-on-cloud.component.html',
  styleUrl: './create-tv-on-cloud.component.css'
})
export class CreateTvOnCloudComponent {

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";

  isPopupVisible1 = false;
  isPopupVisible2 = false;


  togglePopup1() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }

  togglePopup2() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }

  async addChannel() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }

  async editChannel() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }

}
