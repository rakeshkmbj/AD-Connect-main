import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';
import { HttpHeaders } from '@angular/common/http';

interface ChannelItem {
    channel_id: number;
    itemId: string;
    itemName: string;
    sequenceNumber: number;
    active: boolean;
}

interface ChannelDeatils {
  adcChannelItemId: string,
  adcChannelItemName: string,
  adcChannelItemActivFlg: boolean,
  adcChannelItemChannelGenrtdFlg: boolean,
  adcChannelItemSystemGenrtdFlg: boolean,
  adcChannelPrioritySeqNumbr: number
}

@Component({
  selector: 'app-manage-channel-tems',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './manage-channel-items.component.html',
  styleUrl: './manage-channel-items.component.css'
})
export class ManageChannelTemsComponent {

  private subscription: Subscription = new Subscription();

  isSidebarVisible: boolean = false;
  userData: any = {}; // Initialize with an empty object or a default value

  constructor(
      private snackBar: MatSnackBar, 
      private http: HttpClient,
      private sharedService: SharedService,
      private authService: AuthService){}

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";
  action = "../../../../../assets/arrow.png"

  AddChannelItem : ChannelItem = {
      channel_id: 0,
      itemId: "",
      itemName: "",
      sequenceNumber: 0,
      active: true
  }

  EditChannelItem : ChannelItem = {
      channel_id: 0,
      itemId: "",
      itemName: "",
      sequenceNumber: 0,
      active: true
  }

  data: any = {
    channel_id: 0,
    itemName: "string",
    sequenceNumber: 0
  }

  EditData : any = {
    channel_id: 0,
    itemId: "",
    itemName: "",
    sequenceNumber: 0,
    active: true
  }

  ChannelItemsArr: ChannelDeatils [] = [];

  isPopupVisible1 = false;
  isPopupVisible2 = false;

  isCombosVisible = false;
  isSubscriptionVisible = true;

  isAddSubscriptionVisible = false;
  isEditSubscriptionVisible = false;
  isActionforComboVisible = false;
  isActionForSubscritionVisible = false;

  toggleActionForSbscription() {
    this.isActionForSubscritionVisible = !this.isActionForSubscritionVisible
  }
  
  toggleActionForCombo() {
    this.isActionforComboVisible = !this.isActionforComboVisible
  }

  toggleAddSbscription() {
    this.isAddSubscriptionVisible = !this.isAddSubscriptionVisible
  }

  toggleEditSbscription() {
    this.isEditSubscriptionVisible = !this.isEditSubscriptionVisible
  }

  toggleSubscription(){
    this.isSubscriptionVisible = true;
    this.isCombosVisible = false;
  }

  toggleCombos(){
    this.isSubscriptionVisible = false;
    this.isCombosVisible = true;
  }

  togglePopup1() {

    this.AddChannelItem = {
        channel_id: 0,
        itemId: "",
        itemName: "",
        sequenceNumber: 0,
        active: true
    }

    this.isPopupVisible1 = !this.isPopupVisible1;
  }

  togglePopup2(channelItem?: any) {

    if(channelItem) {
      this.EditChannelItem = {
          channel_id: this.userData.accT_ID, // this also need to be changed
          itemId: channelItem.adcChannelItemId,
          itemName: channelItem.adcChannelItemName,
          sequenceNumber: channelItem.adcChannelPrioritySeqNumbr,
          active: channelItem.adcChannelItemActivFlg
      }
    }

    console.log("Edit data ye he: ", this.EditChannelItem)

    this.isPopupVisible2 = !this.isPopupVisible2;
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
    });
  }

  async fetchChannelitems(): Promise<void> {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelItems/${this.userData.accT_ID}`; // to chnage the channelid
    try {
        const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
        console.log(res)
        this.ChannelItemsArr = res.map(item => ({
          adcChannelItemId: item.adcChannelItemId,
          adcChannelItemName: item.adcChannelItemName,
          adcChannelItemActivFlg: item.adcChannelItemActivFlg,
          adcChannelItemChannelGenrtdFlg: item.adcChannelItemChannelGenrtdFlg,
          adcChannelItemSystemGenrtdFlg: item.adcChannelItemSystemGenrtdFlg,
          adcChannelPrioritySeqNumbr: item.adcChannelPrioritySeqNumbr
        }));

    } catch (error) {
        console.error(error);
        this.showSnackbar('No Channel Items');
    }
  }

  async addChannelItem(formRef: NgForm) {
      if (formRef.invalid) {
        return; // Stop form submission if invalid
      }

      const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddChannelItem';

      this.data = {
        // channel_id: this.AddChannelItem.channel_id,
        channel_id: this.userData.accT_ID,
        itemName: this.AddChannelItem.itemName,
        sequenceNumber: this.AddChannelItem.sequenceNumber
      }
    
      try {
          const response = await firstValueFrom(this.http.post(apiUrl, this.data));
          console.log("Channel item added successfully:", response);
          this.showSnackbar("Channel item added successfully!");
  
      } catch (error) {
          console.error("Error Adding Channel item:", error);
          this.showSnackbar("Failed to Add Channel item. Please try again.");
      }

      this.data = {
        channel_id: 0,
        itemName: "",
        sequenceNumber: 0
      }

      await this.fetchChannelitems()
      this.togglePopup1()

  }

   async editChannelItem() {
      const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditChannelItem';

      this.EditData = {
        channel_id: this.EditChannelItem.channel_id,
        itemId: this.EditChannelItem.itemId,
        itemName: this.EditChannelItem.itemName,
        sequenceNumber: this.EditChannelItem.sequenceNumber,
        active: this.EditChannelItem.active
      }
    
      console.log("Data before: ", this.EditData)

      try {
          const response = await firstValueFrom(this.http.post(apiUrl, this.EditData));
          console.log("Channel item saved successfully:", response);
          this.showSnackbar("Channel item saved successfully!");
  
      } catch (error) {
          console.error("Error Saving Channel item:", error);
          this.showSnackbar("Failed to Save Channel item. Please try again.");
      }

      this.EditData = {
        channel_id: 0,
        itemId: "",
        itemName: "",
        sequenceNumber: 0,
        active: true
      }

      console.log("Data After: ", this.EditData)
      await this.fetchChannelitems()
      this.togglePopup2()

  }

  ngOnInit(): void {
      // this.updateSidebarVisibility();
  
      this.sharedService.currentSidebar.subscribe(value => {
        this.isSidebarVisible = value; // Get the latest value
      });
  
      this.subscription.add(
        this.authService.userData$.subscribe({
          next: (data) => {
            this.userData = data;
            // Perform any additional logic with userData here
          },
          error: (error) => {
            console.error('Error fetching user data', error);
          }
        })
      );
  
      this.authService.userData$.subscribe(data => {
        this.userData = data;
      });
      
      console.log("User Data: ", this.userData);

      this.fetchChannelitems()
  
  }

}