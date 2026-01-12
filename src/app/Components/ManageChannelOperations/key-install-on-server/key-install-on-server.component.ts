import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

interface VirtualMeet {
  channel_id: string;
  conf_Flg: boolean;
  webinar_Flg: boolean;
  livestreaming_Flg: boolean;
  roomid: string;
  class_Name: string;
  chapter: string;
  class_Detail: string;
  max_Particpnt_Counts: number;
  meet_Max_Host_Counts: number;
  lead_Host_Usr_id: string;
  host2_Usr_id: string;
  host3_Usr_id: string;
  host4_Usr_Id: string;
  host5_Usr_id: string;
  host6_Usr_ID: string;
}

interface Schedule {
  channelid: string;
  classid: string;
  timezone: string;
  dateinDDMMYYYY: string;
  starttime_Hour: number;
  starttime_MINS: number;
  aM_Flg: boolean;
  pM_Flg: boolean;
  duration_In_Mins: number;
}

interface AllocateVirtualMeet {
  channelid: string;
  office_Flg: boolean;
  individual_FlG: boolean;
  corp_Flg: boolean;
  corpid: string;
  divisionid: string;
  classid: string;
  userid: string;
}

interface CorporateDetails {
  cldtvCorpAddress: string;
  cldtvCorpContEmailid: string;
  cldtvCorpContMobNumbr: string;
  cldtvCorpContPerson: string;
  cldtvCorpEnrolmentActivFlg: null | boolean;
  cldtvCorpId: string;
  cldtvCorpName: string;
}

interface CorporateDivisionDetails {
  cldtvCorpId: string;
  cldtvDivActivFlg: boolean | null;
  cldtvDivConName: string;
  cldtvDivContEmailid: string;
  cldtvDivContMobNumbr: string;
  cldtvDivId: string;
}

interface B2BSubscriber {
  b2bCddtvSubcribrLastName: string;
  b2bCldtvChannelId: string;
  b2bCldtvMasterMoblNumbr: string;
  b2bCldtvMoblRgstrdDatetime: string; // ISO date string
  b2bCldtvSubscribrCorpFlg: boolean;
  b2bCldtvSubscribrEmailId: string;
  b2bCldtvSubscribrFirstName: string;
  b2bCldtvSubscribrGenderId: string;
  b2bCldtvSubscribrId: string;
  b2bCldtvSubscribrProfImage: string;
  b2bCldtvSubscribrValdFrmDate: string; // ISO date string
  b2bCldtvSubscribrValdToDate: string; // ISO date string
  b2bCldtvSubscribrWithSystemFeeFlg: boolean | null;
  b2bCldtvSubscribrWithoutSystemFeeFlg: boolean | null;
}

@Component({
  selector: 'app-key-install-on-server',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './key-install-on-server.component.html',
  styleUrl: './key-install-on-server.component.css'
})
export class KeyInstallOnServerComponent {

  private subscription: Subscription = new Subscription();

  isSidebarVisible: boolean = false;
  userData: any = {}; // Initialize with an empty object or a default value
  today: any;
  currentTime: any;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private sharedService: SharedService,
    private authService: AuthService) {
    const currentDate = new Date();
    this.today = new Date().toISOString().split('T')[0];
    this.currentTime = new Date().toISOString().slice(11, 16);
  }

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";
  action = "../../../../../assets/arrow.png";
  logo = "../../../../../assets/adConnectleftIcon.jpg";

  isManageVirtualMeetVisible = true;
  isAllocationOfParticipantsVisible = false;
  isVirtualMeetDashboardVisible = false;

  isPendingMeetVisible = true;
  isCompletedMeetVisible = false;
  isNotCompletedMeetVisible = false;
  isToBeScheduledMeetVisible = false;

  isAddNewVirtualMeetVisible = false;

  isNonCorpUserVisible = false;
  isCorpUserVisible = true;

  isAllocateVirtualMeetVisible = false;
  isPopupViewAllocationVisible = false;

  isScheduleTestVisible = false;

  scheduleTime = ''

  virtualMeet: VirtualMeet = {
    channel_id: '',
    conf_Flg: false,
    webinar_Flg: false,
    livestreaming_Flg: false,
    roomid: '',
    class_Name: '',
    chapter: '',
    class_Detail: '',
    max_Particpnt_Counts: 0,
    meet_Max_Host_Counts: 0,
    lead_Host_Usr_id: '',
    host2_Usr_id: '',
    host3_Usr_id: '',
    host4_Usr_Id: '',
    host5_Usr_id: '',
    host6_Usr_ID: ''
  };

  addVirtualMeet: AllocateVirtualMeet = {
    channelid: '',
    office_Flg: false,
    individual_FlG: false,
    corp_Flg: false,
    corpid: '',
    divisionid: '',
    classid: '',
    userid: ''
  }

  schedule: Schedule = {
    channelid: '',
    classid: '',
    timezone: '',
    dateinDDMMYYYY: '',
    starttime_Hour: 0,
    starttime_MINS: 0,
    aM_Flg: false,
    pM_Flg: false,
    duration_In_Mins: 0
  };

  selectedCorp = '';
  selectedDiv = '';

  corporateArr: CorporateDetails[] = [];
  divisionsArr: CorporateDivisionDetails[] = [];
  B2BSubscriberArr: B2BSubscriber[] = [];

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`; // Convert DD/MM/YYYY to YYYY-MM-DD
  }

  selectedMeet = ''
  selectMeetType(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log("Selected Meet Type: ", selectedValue);

    if (selectedValue == "conf") {
      this.virtualMeet.conf_Flg = true;
      this.virtualMeet.webinar_Flg = false;
      this.virtualMeet.livestreaming_Flg = false;
    } else if (selectedValue == "webinar") {
      this.virtualMeet.conf_Flg = false;
      this.virtualMeet.webinar_Flg = true;
      this.virtualMeet.livestreaming_Flg = false;
    } else if (selectedValue == "livesteam") {
      this.virtualMeet.conf_Flg = false;
      this.virtualMeet.webinar_Flg = false;
      this.virtualMeet.livestreaming_Flg = true;
    } else if (selectedValue == "") {
      this.virtualMeet.conf_Flg = false;
      this.virtualMeet.webinar_Flg = false;
      this.virtualMeet.livestreaming_Flg = false;
    }
  }

  async toggleViewAllocation(subId?: string) {

    if (subId) {
      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetUserScheduleClasses/${subId}`;
      try {
        const response = await firstValueFrom(this.http.get<any[]>(apiUrl));
        console.log("Fetched data for subId:", subId, response);


        this.isPopupViewAllocationVisible = !this.isPopupViewAllocationVisible
      } catch (error) {
        console.error("Error fetching data for subId:", subId, error);
        this.showSnackbar("No allocations found for the selected user.");
      }
    }

  }

  toggleAllocateVirtualMeet(subId?:string) {

    if(subId){
      this.addVirtualMeet = {
        channelid: this.userData.accT_ID,
        office_Flg: false,  // what is this
        individual_FlG: this.isNonCorpUserVisible,
        corp_Flg: this.isCorpUserVisible,
        corpid: this.selectedCorp,
        divisionid: this.selectedDiv,
        classid: this.userData.accT_ID,
        userid: subId
      }
    }

    this.isAllocateVirtualMeetVisible = !this.isAllocateVirtualMeetVisible
  }

  toggleCorpUserPopup() {
    this.isCorpUserVisible = true;
    this.isNonCorpUserVisible = false;
  }

  toggleNonCorpUserPopup() {
    this.isCorpUserVisible = false;
    this.isNonCorpUserVisible = true;
  }

  toggleManageVirtualMeet() {
    this.isManageVirtualMeetVisible = true;
    this.isAllocationOfParticipantsVisible = false;
    this.isVirtualMeetDashboardVisible = false;
  }

  toggleAllocationOfParticipants() {
    this.isManageVirtualMeetVisible = false;
    this.isAllocationOfParticipantsVisible = true;
    this.isVirtualMeetDashboardVisible = false;
  }

  toggleVirtualMeetDashboard() {
    this.isManageVirtualMeetVisible = false;
    this.isAllocationOfParticipantsVisible = false;
    this.isVirtualMeetDashboardVisible = true;
  }

  async onSelectCorporate(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    const selectedItem = this.corporateArr[+selectedIndex]; // Retrieve the full object based on the index
    console.log('Selected Corp:', selectedItem);

    this.selectedCorp = selectedItem.cldtvCorpId;

    this.divisionsArr = [];
    this.selectedDiv = ''

    this.fetchDivisions(selectedItem.cldtvCorpId, 1);
  }


  async onSelectDivision(event: Event) {
    const selectedDivision = (event.target as HTMLSelectElement).value;
    this.selectedDiv = selectedDivision;
    console.log('Selected DivId:', selectedDivision);

  }

  async fetchDivisions(selectedValue: string, type: number) {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetCorpDivisions/${selectedValue}`;
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));

      this.divisionsArr = res.map(item => ({
        cldtvCorpId: item.cldtvCorpId,
        cldtvDivActivFlg: item.cldtvDivActivFlg,
        cldtvDivConName: item.cldtvDivConName,
        cldtvDivContEmailid: item.cldtvDivContEmailid,
        cldtvDivContMobNumbr: item.cldtvDivContMobNumbr,
        cldtvDivId: item.cldtvDivId
      }))

      console.log(`all division for corid ${selectedValue}: `, this.divisionsArr)

      this.selectedDiv = this.divisionsArr[0].cldtvDivId;

    } catch (error) {
      console.error(error);
      // this.showSnackbar('No divisions for this corp');
    }
  }

  async fetchCorporate(): Promise<void> {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetB2BCorporates/${this.userData.accT_ID}`; // to chnage the channelid
    console.log("fetchCorporate: ", apiUrl)
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log(res)

      this.corporateArr = res.map(item => ({
        cldtvCorpAddress: item.cldtvCorpAddress,
        cldtvCorpContEmailid: item.cldtvCorpContEmailid,
        cldtvCorpContMobNumbr: item.cldtvCorpContMobNumbr,
        cldtvCorpContPerson: item.cldtvCorpContPerson,
        cldtvCorpEnrolmentActivFlg: item.cldtvCorpEnrolmentActivFlg,
        cldtvCorpId: item.cldtvCorpId,
        cldtvCorpName: item.cldtvCorpName,
      }));

      console.log("all corporates: ", this.corporateArr)

      this.selectedCorp = this.corporateArr[0].cldtvCorpId;

      this.divisionsArr = [];
      await this.fetchDivisions(this.selectedCorp, 1);

    } catch (error) {
      console.error(error);
      // this.showSnackbar('No Corporate');
    }
  }

  async getMeeting(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean) {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelVirtualMeets`;

    const data = {
      channelid: this.userData.accT_ID,
      pending_Flg: flag1,
      completed_Flg: flag2,
      cancld_Flg: flag3,
      to_be_scheduled_Flg: flag4
    }

    try {
      const res = await firstValueFrom(this.http.post<any[]>(apiUrl, data));
      console.log("Meetings: ", res)

      // have to map the res
    } catch (error) {
      console.log("error: ", error)
    }
  }

  async toggleisPendingMeet() {
    await this.getMeeting(true, false, false, false)

    this.isPendingMeetVisible = true;
    this.isCompletedMeetVisible = false;
    this.isNotCompletedMeetVisible = false;
    this.isToBeScheduledMeetVisible = false;
  }

  async toggleisCompletedMeet() {
    await this.getMeeting(false, true, false, false)

    this.isPendingMeetVisible = false;
    this.isCompletedMeetVisible = true;
    this.isNotCompletedMeetVisible = false;
    this.isToBeScheduledMeetVisible = false;
  }

  async toggleisNotCompletedMeet() {
    await this.getMeeting(false, false, true, false)

    this.isPendingMeetVisible = false;
    this.isCompletedMeetVisible = false;
    this.isNotCompletedMeetVisible = true;
    this.isToBeScheduledMeetVisible = false;
  }

  async toggleisToBeSheduledMeet() {
    await this.getMeeting(false, false, false, true)

    this.isPendingMeetVisible = false;
    this.isCompletedMeetVisible = false;
    this.isNotCompletedMeetVisible = false;
    this.isToBeScheduledMeetVisible = true;
  }

  toggleAddNewVirtualMeet() {

    this.virtualMeet = {
      channel_id: this.userData.accT_ID,
      conf_Flg: false,
      webinar_Flg: false,
      livestreaming_Flg: false,
      roomid: '',
      class_Name: '',
      chapter: '',
      class_Detail: '',
      max_Particpnt_Counts: 0,
      meet_Max_Host_Counts: 0,
      lead_Host_Usr_id: '',
      host2_Usr_id: '',
      host3_Usr_id: '',
      host4_Usr_Id: '',
      host5_Usr_id: '',
      host6_Usr_ID: ''
    };

    this.isAddNewVirtualMeetVisible = !this.isAddNewVirtualMeetVisible
  }

  toggleScheduleTest() {

    this.schedule = {
      channelid: this.userData.accT_ID,
      classid: this.userData.accT_ID,
      timezone: '',
      dateinDDMMYYYY: '',
      starttime_Hour: 0,
      starttime_MINS: 0,
      aM_Flg: false,
      pM_Flg: false,
      duration_In_Mins: 0
    };

    this.isScheduleTestVisible = !this.isScheduleTestVisible
  }

  async addNewVirtualMeet(formRef: NgForm) {

    if (formRef.invalid) {
      return;
    }

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/AddVirtualMeet`;

    try {
      const res = await firstValueFrom(this.http.post<any[]>(apiUrl, this.virtualMeet));
      console.log("responce: ", res)

    } catch (error) {
      console.log("error: ", error)
      this.showSnackbar("Error adding the virtual meet")
    }

    this.isAddNewVirtualMeetVisible = !this.isAddNewVirtualMeetVisible

  }

  async addSchedule(formRef: NgForm) {
    if (formRef.invalid) {
      return;
    }

    const [hours, minutes] = this.scheduleTime.split(':').map(Number);

    this.schedule.starttime_Hour = hours > 12 ? hours - 12 : hours;
    this.schedule.starttime_MINS = minutes;
    this.schedule.aM_Flg = hours < 12;
    this.schedule.pM_Flg = hours >= 12;

    console.log("Full schedule data: ", this.schedule)

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/SaveMeetSchedule`;

    try {
        const res = await firstValueFrom(this.http.post<any[]>(apiUrl, this.schedule));
        console.log("responce: ",res)
        this.showSnackbar("Schedule added successfully.")

    } catch (error){
      console.log("error: ", error)
      this.showSnackbar("Error while scheduling the meet")
    }

    this.isScheduleTestVisible = !this.isScheduleTestVisible

  }

  async allocateVirtualMeet(formRef: NgForm) {
    if (formRef.invalid) {
      return;
    }

    //   http://www.shripatigroup.com/ADMedia/api/ADMedia/AllocateParticipanttoClass
    // {
    //   "channelid": "string",
    //   "office_Flg": true,
    //   "individual_FlG": true,
    //   "corp_Flg": true,
    //   "corpid": "string",
    //   "divisionid": "string",
    //   "classid": "string",
    //   "userid": "string"
    // }

  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async manageB2Buser() {
    let data = {};

    this.B2BSubscriberArr = [];

    if (this.isCorpUserVisible) {
      data = {
        "channelid": this.userData.accT_ID,
        "corpId": this.selectedCorp,
        "divId": this.selectedDiv,
        "individual_Flg": false,
        "corporate_Flg": true
      };
    } else {
      data = {
        "channelid": this.userData.accT_ID,
        "corpId": '0',
        "divId": '0',
        "individual_Flg": true,
        "corporate_Flg": false
      };
    }

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/ManageB2Buser';

    console.log("Manage B2B: ", data);

    try {
      const response = await firstValueFrom(this.http.post<B2BSubscriber[]>(apiUrl, data));

      this.B2BSubscriberArr = response.map(subscriber => ({
        b2bCddtvSubcribrLastName: subscriber.b2bCddtvSubcribrLastName,
        b2bCldtvChannelId: subscriber.b2bCldtvChannelId,
        b2bCldtvMasterMoblNumbr: subscriber.b2bCldtvMasterMoblNumbr,
        b2bCldtvMoblRgstrdDatetime: subscriber.b2bCldtvMoblRgstrdDatetime,
        b2bCldtvSubscribrCorpFlg: subscriber.b2bCldtvSubscribrCorpFlg,
        b2bCldtvSubscribrEmailId: subscriber.b2bCldtvSubscribrEmailId,
        b2bCldtvSubscribrFirstName: subscriber.b2bCldtvSubscribrFirstName,
        b2bCldtvSubscribrGenderId: subscriber.b2bCldtvSubscribrGenderId,
        b2bCldtvSubscribrId: subscriber.b2bCldtvSubscribrId,
        b2bCldtvSubscribrProfImage: subscriber.b2bCldtvSubscribrProfImage,
        b2bCldtvSubscribrValdFrmDate: subscriber.b2bCldtvSubscribrValdFrmDate,
        b2bCldtvSubscribrValdToDate: subscriber.b2bCldtvSubscribrValdToDate,
        b2bCldtvSubscribrWithSystemFeeFlg: subscriber.b2bCldtvSubscribrWithSystemFeeFlg,
        b2bCldtvSubscribrWithoutSystemFeeFlg: subscriber.b2bCldtvSubscribrWithoutSystemFeeFlg
      }));

      console.log("Manage B2B called successfully:", this.B2BSubscriberArr);
      this.showSnackbar("Manage B2B called successfully");

    } catch (error) {
      console.error("Error calling Manage B2B:", error);
      this.showSnackbar("Failed to call Manage B2B. Please try again.");
    }
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

    this.fetchCorporate()

  }

}
