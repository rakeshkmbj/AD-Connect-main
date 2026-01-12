import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

type Icon = 'valid' | 'unvalid' | 'edit';

interface Data {
  vertId: string,
  verName: string,
  productId: string,
  prouctName: string,
  image: string,
  activeflg: boolean,
}

interface SuperUserResponse {
  adcCldtvRegstrdMobileNumbr: string;
  adcCldtvUserAdcMpPin: string;
  adcCldtvUserEmailid: string;
  adcCldtvUserFirstName: string;
  adcCldtvUserId: string;
  adcCldtvUserLastName: string;
  adcCldtvUserPortalPin: string;
}

interface ExtraDetails {
  channel_id: number;
  org_Name: string;
  org_Address: string;
  country_id: number;
  state_id: number;
  city_id: number;
  pincd: string;
  adC_Server_Flg: boolean;
  third_Party_server_Flg: boolean;
  iP_Address: string;
  other_Detail: string;
}

interface ChannelDetails {
  adcMasterChannelActivFlg: boolean;
  adcMasterChannelComrclAdAllowdFlg: boolean;
  adcMasterChannelInfoAdAllowdFlg: boolean;
  adcMastrChannelB2bFlg: boolean;
  adcMastrChannelD2cFlg: boolean;
  adcMastrChannelD2cFreeOnairFlg: boolean;
  adcMastrChannelD2cOnSubscrptnFlg: boolean;
  adcMastrChannelId: number;
  adcMastrChannelImage: string;
  adcMastrChannelName: string;
  adcMastrProdlineId: number;
  adcMastrVertId: number;
  verticalName: string;
  productLineName: string;
  isDetailsadded: boolean;
}

interface ChannelData {
  vert_id: string,
  prodLine_id: string,
  name: string,
  image: string,
  d2C_Flg: boolean,
  b2B_Flg: boolean,
  freeAir_flg: boolean,
  subscription_Flg: boolean,
  comm_AD_Flg: boolean,
  info_AD_flg: boolean,
  channel_id: string,
  active: boolean,
  verName: string,
  productLineName: string,
}

interface VerData {
  vertId: string,
  verName: string,
}

interface SuperUser {
  channel_id: number,
  mobileNumber: string,
  firstName: string,
  lastName: string,
  emailId: string,
  userId: string,
  AdcMpPin: string,
  PortalPin: string
}

interface FaceConnect {
  channelid: string;
  billing_Chnl_Flg: boolean;
  billing_Partner_Flg: boolean;
  adC_F_CONCT_Platfrm_Activ_Flg: boolean;
  conf_Flg: boolean;
  webinar_Flg: boolean;
  liveStreaming_Flg: boolean;
  min_User_Counts: number;
  pay_Grow_Flg: boolean;
  smalL_Conf_Count: number;
  big_Conf_Count: number;
  max_Conf_host_Counts: number;
  conf_Min_Minutes: number;
  recording_Destination_URL: string;
  storage_Allocatd: string;
  billing_Planid: string;
}

interface Packages {
  packId: string;
  packName: string;
}

@Component({
  selector: 'app-manage-channels',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './manage-channels.component.html',
  styleUrl: './manage-channels.component.css'
})
export class ManageChannelsComponent {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";

  isPopupVisible = false;
  isPopupVisibleAddChannel = false;
  isPopupVisibleEditChannel = false;
  selectedChannel: any = null;
  isPopupVisibleAddSuser = false;
  isPopupVisibleViewSuser = false;
  isEditPopupVisible = false;
  isFaceCnnStatusVisible = false;
  isFaceConnectVisible = false;

  userData: SuperUser = {
    channel_id: 0,
    mobileNumber: '',
    firstName: '',
    lastName: '',
    emailId: '',
    userId: '',
    AdcMpPin: '',
    PortalPin: ''
  }
  verArr: VerData[] = [];
  ProductLineArr: Data[] = [];
  sampleData: Data[] = [];
  Channels: ChannelDetails[] = [];
  Countries: any[] = [];
  SelectedCountry: any;
  State: any[] = [];
  SelectedState: any;
  City: any[] = [];
  SelectedCity: any;
  Pincode: any[] = [];
  SelectedPincode: any;
  SelectedExtraDetails: ExtraDetails = {
    channel_id: 0,
    org_Name: '',
    org_Address: '',
    country_id: 0,
    state_id: 0,
    city_id: 0,
    pincd: '',
    adC_Server_Flg: false,
    third_Party_server_Flg: false,
    iP_Address: '',
    other_Detail: ''
  }
  SelectedChannel: ChannelDetails = {
    adcMasterChannelActivFlg: true,
    adcMasterChannelComrclAdAllowdFlg: false,
    adcMasterChannelInfoAdAllowdFlg: false,
    adcMastrChannelB2bFlg: false,
    adcMastrChannelD2cFlg: false,
    adcMastrChannelD2cFreeOnairFlg: false,
    adcMastrChannelD2cOnSubscrptnFlg: false,
    adcMastrChannelId: 0,
    adcMastrChannelImage: '',
    adcMastrChannelName: '',
    adcMastrProdlineId: 0,
    adcMastrVertId: 0,
    verticalName: '',
    productLineName: '',
    isDetailsadded: false,
  };

  addFaceConnect: FaceConnect = {
    channelid: '',
    billing_Chnl_Flg: false,
    billing_Partner_Flg: false,
    adC_F_CONCT_Platfrm_Activ_Flg: false,
    conf_Flg: false,
    webinar_Flg: false,
    liveStreaming_Flg: false,
    min_User_Counts: 0,
    pay_Grow_Flg: false,
    smalL_Conf_Count: 0,
    big_Conf_Count: 0,
    max_Conf_host_Counts: 0,
    conf_Min_Minutes: 0,
    recording_Destination_URL: '',
    storage_Allocatd: '',
    billing_Planid: ''
  }

  packagelist: Packages[] = [];

  base64Image = '';
  fileSize = '';
  mediaRunCount: number | string = 0;
  MAX_FILE_SIZE_MB = 100;

  newChannel: ChannelData = {
    vert_id: '',
    prodLine_id: '',
    name: '',
    image: '',
    d2C_Flg: false,
    b2B_Flg: false,
    freeAir_flg: false,
    subscription_Flg: false,
    comm_AD_Flg: false,
    info_AD_flg: false,
    channel_id: '',
    active: true,
    verName: '',
    productLineName: '',
  };

  ChannelData: ChannelData[] = [];
  tempimg: string = ''

  selectChannelType(type: string): void {
    if (type === 'D2C') {
      this.newChannel.d2C_Flg = true;
      this.newChannel.b2B_Flg = false;
    } else if (type === 'B2B') {
      this.newChannel.d2C_Flg = false;
      this.newChannel.b2B_Flg = true;
    }
  }

  selectBasedType(type: string): void {
    if (type === 'FreeAir') {
      this.newChannel.freeAir_flg = true;
      this.newChannel.subscription_Flg = false;
    } else if (type === 'Subscription') {
      this.newChannel.freeAir_flg = false;
      this.newChannel.subscription_Flg = true;
    }
  }

  selectAdType(type: string): void {
    if (type === 'Common') {
      this.newChannel.comm_AD_Flg = true;
      this.newChannel.info_AD_flg = false;
    } else if (type === 'Info') {
      this.newChannel.comm_AD_Flg = false;
      this.newChannel.info_AD_flg = true;
    }
  }

  selectserver(type: string): void {
    if (type === 'connect') {
      this.SelectedExtraDetails.adC_Server_Flg = true;
      this.SelectedExtraDetails.third_Party_server_Flg = false;
    } else if (type === 'party') {
      this.SelectedExtraDetails.adC_Server_Flg = false;
      this.SelectedExtraDetails.third_Party_server_Flg = true;
    }
  }

  togglePopup() {
    this.SelectedPromoImageToBeAdded = "";

    this.newChannel = {
      ...this.newChannel,
      name: '',
      image: '',
      d2C_Flg: true,
      b2B_Flg: false,
      freeAir_flg: true,
      subscription_Flg: false,
      comm_AD_Flg: true,
      info_AD_flg: false,
      channel_id: '',
      active: true,
    };

    this.isPopupVisible = !this.isPopupVisible;
  }

  async toggleFaceConnStatusTool(channel?: any) {

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ADCFACEConnectToChannel/${channel}`;

    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log("Face Connect Status:", res);

      this.isFaceCnnStatusVisible = !this.isFaceCnnStatusVisible;
    } catch (error) {
      console.log(error);
      this.showSnackbar("Face Connect Tool is not added yet!");
    }

  }

  onConferenceAllowedChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log('Conference Allowed:', isChecked);
    if (isChecked) {
      console.log('Conference is allowed.');
      this.addFaceConnect.conf_Flg = true;
    } else {
      console.log('Conference is not allowed.');
      this.addFaceConnect.conf_Flg = false;
    }
  }

  onWebinarAllowedChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log('webinar Allowed:', isChecked);
    if (isChecked) {
      console.log('webinar is allowed.');
      this.addFaceConnect.webinar_Flg = true;
    } else {
      console.log('webinar is not allowed.');
      this.addFaceConnect.webinar_Flg = false;
    }
  }

  onLiveStreamingAllowedChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log('live-streaming Allowed:', isChecked);
    if (isChecked) {
      console.log('live-streaming is allowed.');
      this.addFaceConnect.liveStreaming_Flg = true;
    } else {
      console.log('live-streaming is not allowed.');
      this.addFaceConnect.liveStreaming_Flg = false;
    }
  }

  onBillingAuditChange(selected: string): void {
    this.billingTypeSelected = true;
  
    if (selected === 'main') {
      this.addFaceConnect.billing_Chnl_Flg = true;
      this.addFaceConnect.billing_Partner_Flg = false;
    } else if (selected === 'partners') {
      this.addFaceConnect.billing_Chnl_Flg = false;
      this.addFaceConnect.billing_Partner_Flg = true;
    }
    console.log('Billing Audit Main Channel:', this.addFaceConnect.billing_Chnl_Flg);
    console.log('Billing Audit Partners Channel:', this.addFaceConnect.billing_Partner_Flg);
  }

  async toggleFaceConnectTool(channelId?: any) {

    this.addFaceConnect = {
      channelid: channelId,
      billing_Chnl_Flg: false,
      billing_Partner_Flg: false,
      adC_F_CONCT_Platfrm_Activ_Flg: false,
      conf_Flg: false,
      webinar_Flg: false,
      liveStreaming_Flg: false,
      min_User_Counts: 1,
      pay_Grow_Flg: false,
      smalL_Conf_Count: 10,
      big_Conf_Count: 200,
      max_Conf_host_Counts: 1,
      conf_Min_Minutes: 10,
      recording_Destination_URL: '',
      storage_Allocatd: '1',
      billing_Planid: ''
    }

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/GetFCONCTPackages';

    try {
      const response = await firstValueFrom(this.http.get<any[]>(apiUrl));
      if (response && response.length > 0) {
        this.packagelist = response.map(item => ({
          packId: item.packId || '',
          packName: item.packName || ''
        }));
      }
      console.log("Fetched Face Connect Packages:", this.packagelist);
    } catch (error) {
      console.error("Error fetching Face Connect Packages:", error);
    }

    this.isFaceConnectVisible = !this.isFaceConnectVisible;
  }

  connectTypeSelected = true;
  billingTypeSelected = true;

  async AddfaceConnect(formRef: NgForm){
    if (formRef.invalid) {
      return; 
    }

    if(!this.addFaceConnect.billing_Chnl_Flg && !this.addFaceConnect.billing_Partner_Flg){
      this.billingTypeSelected = false;
      return
    }else {
      this.billingTypeSelected = true;
    }

    if(!this.addFaceConnect.conf_Flg && !this.addFaceConnect.webinar_Flg && !this.addFaceConnect.liveStreaming_Flg){
      this.connectTypeSelected = false;
      return;
    } else {
      this.connectTypeSelected = true;
    }

    console.log("call hone ke liye taiyaar: ",this.addFaceConnect)

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/SaveADCFACEConnectToChannel';

    try {
      const response = await firstValueFrom(this.http.post<any[]>(apiUrl, this.addFaceConnect));
      console.log("responce: ", response);
      this.showSnackbar("Face connect added successfully.")
    } catch (error) {
      console.log("Error :", error);
      this.showSnackbar("Error while adding Face connect.")
    }

    this.isFaceConnectVisible = !this.isFaceConnectVisible;
  }

  toggleEditPopup(index: number, channel?: ChannelDetails): void {
    this.SelectedPromoImageToBeAdded = ""
    if (index === -1) {
      this.isEditPopupVisible = !this.isEditPopupVisible;
      this.resetForm();
    } else {
      if (channel) {
        this.SelectedChannel.adcMasterChannelActivFlg = channel.adcMasterChannelActivFlg,
          this.SelectedChannel.adcMasterChannelComrclAdAllowdFlg = channel.adcMasterChannelComrclAdAllowdFlg,
          this.SelectedChannel.adcMasterChannelInfoAdAllowdFlg = channel.adcMasterChannelInfoAdAllowdFlg,
          this.SelectedChannel.adcMastrChannelB2bFlg = channel.adcMastrChannelB2bFlg,
          this.SelectedChannel.adcMastrChannelD2cFlg = channel.adcMastrChannelD2cFlg,
          this.SelectedChannel.adcMastrChannelD2cFreeOnairFlg = channel.adcMastrChannelD2cFreeOnairFlg,
          this.SelectedChannel.adcMastrChannelD2cOnSubscrptnFlg = channel.adcMastrChannelD2cOnSubscrptnFlg,
          this.SelectedChannel.adcMastrChannelId = channel.adcMastrChannelId,
          this.SelectedChannel.adcMastrChannelImage = channel.adcMastrChannelImage,
          this.SelectedChannel.adcMastrChannelName = channel.adcMastrChannelName,
          this.SelectedChannel.adcMastrProdlineId = channel.adcMastrProdlineId,
          this.SelectedChannel.adcMastrVertId = channel.adcMastrVertId,
          this.SelectedChannel.verticalName = channel.verticalName,
          this.SelectedChannel.productLineName = channel.productLineName,
          this.tempimg = channel.adcMastrChannelImage
      }

      this.isEditPopupVisible = !this.isEditPopupVisible;
    }
  }

  private resetForm() {
    this.Countries = [];
    this.SelectedCountry = {};
    this.State = [];
    this.SelectedState = {};
    this.City = [];
    this.SelectedCity = {};
    this.Pincode = [];
    this.SelectedPincode = [];
  }

  getCountry = async () => {
    const apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetCountry`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg==',
    });

    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl, { headers }));
      console.log("Country code:", res);
      this.Countries = res;

    } catch (error) {
      console.log(error);
    }
  };

  getState = async (CountryId: number) => {
    const apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetState/${CountryId}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg==',
    });

    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl, { headers }));
      console.log("State code:", res);
      this.State = res;

    } catch (error) {
      console.log(error);
    }
  };

  getCity = async (CountryId: number, StateId: number) => {
    const apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetCity/${CountryId}/${StateId}`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg==',
    });

    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl, { headers }));
      console.log("City code:", res);
      this.City = res;

    } catch (error) {
      console.log(error);
    }
  };

  getPincode = async (StateName: string, CityName?: String) => {
    let apiUrl = ''

    if (CityName) {
      apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetZipCodes/${StateName}/${CityName}`;
    } else {
      apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetZipCodes/${StateName}`;
    }
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg==',
    });

    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl, { headers }));
      console.log("Pincode:", res);
      this.Pincode = res;

    } catch (error) {
      console.log(error);
    }
  };

  onCountrySelect = async (event: Event) => {
    const country = +(event.target as HTMLSelectElement).value;
    this.SelectedCountry = country;

    console.log("Selected Country:", this.SelectedCountry);

    this.getState(this.SelectedCountry);
  }

  onStateSelect = async (event: Event) => {
    const country = +(event.target as HTMLSelectElement).value;
    this.SelectedState = country;

    console.log("Selected State:", this.SelectedState);

    this.getCity(this.SelectedCountry, this.SelectedState);
  }

  onCitySelect = async (event: Event) => {
    const cityId = +(event.target as HTMLSelectElement).value;
    this.SelectedCity = cityId;

    console.log("Selected City:", this.SelectedCity);

    const selectedState = this.State.find(state => state.STATE_ID === this.SelectedState);
    console.log(selectedState)

    const selectedCity = this.City.find(city => city.CITY_ID === this.SelectedCity);
    console.log(selectedCity)

    this.getPincode(selectedState.STATE_NM.toLowerCase(), selectedCity.CITY_NM.toLowerCase());
  }

  fetchChannelDetails = async (channelId: number) => {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelDetail/${channelId}`;
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log(res);

      if (res) {
        this.SelectedExtraDetails.channel_id = this.SelectedChannel.adcMastrChannelId;
        this.SelectedExtraDetails.org_Name = res[0].adcChannelOrgName;
        this.SelectedExtraDetails.org_Address = res[0].adcChannelOrgAddress;
        this.SelectedExtraDetails.country_id = 0;
        this.SelectedExtraDetails.state_id = 0;
        this.SelectedExtraDetails.city_id = 0;
        this.SelectedExtraDetails.pincd = '';
        this.SelectedExtraDetails.adC_Server_Flg = res[0].adcChannelOnAdcServrFlg;
        this.SelectedExtraDetails.third_Party_server_Flg = res[0].adcChannelOn3rdServrFlg;
        this.SelectedExtraDetails.iP_Address = res[0].adcChannel3rdServrIpAddress;
        this.SelectedExtraDetails.other_Detail = res[0].adcChannelServrOtherDetails;
      }

    } catch (error) {
      console.log(error)
    }
  };

  toggleAddChannel(index: number, channel?: ChannelDetails): void {

    console.log("index", index)
    console.log("Shiva:", channel)

    if (index === -1) {
      console.log("closed called")
      this.SelectedExtraDetails.channel_id = 0;
      this.SelectedExtraDetails.org_Name = '';
      this.SelectedExtraDetails.org_Address = '';
      this.SelectedExtraDetails.country_id = 0;
      this.SelectedExtraDetails.state_id = 0;
      this.SelectedExtraDetails.city_id = 0;
      this.SelectedExtraDetails.pincd = '';
      this.SelectedExtraDetails.adC_Server_Flg = false;
      this.SelectedExtraDetails.third_Party_server_Flg = false;
      this.SelectedExtraDetails.iP_Address = '';
      this.SelectedExtraDetails.other_Detail = '';
      this.isPopupVisibleAddChannel = !this.isPopupVisibleAddChannel;

      this.resetForm();
    } else {
      if (channel) {
        this.SelectedChannel.adcMasterChannelActivFlg = channel.adcMasterChannelActivFlg;
        this.SelectedChannel.adcMasterChannelComrclAdAllowdFlg = channel.adcMasterChannelComrclAdAllowdFlg;
        this.SelectedChannel.adcMasterChannelInfoAdAllowdFlg = channel.adcMasterChannelInfoAdAllowdFlg;
        this.SelectedChannel.adcMastrChannelB2bFlg = channel.adcMastrChannelB2bFlg;
        this.SelectedChannel.adcMastrChannelD2cFlg = channel.adcMastrChannelD2cFlg;
        this.SelectedChannel.adcMastrChannelD2cFreeOnairFlg = channel.adcMastrChannelD2cFreeOnairFlg;
        this.SelectedChannel.adcMastrChannelD2cOnSubscrptnFlg = channel.adcMastrChannelD2cOnSubscrptnFlg;
        this.SelectedChannel.adcMastrChannelId = channel.adcMastrChannelId;
        this.SelectedChannel.adcMastrChannelImage = channel.adcMastrChannelImage;
        this.SelectedChannel.adcMastrChannelName = channel.adcMastrChannelName;
        this.SelectedChannel.adcMastrProdlineId = channel.adcMastrProdlineId;
        this.SelectedChannel.adcMastrVertId = channel.adcMastrVertId;
        this.SelectedChannel.verticalName = channel.verticalName;
        this.SelectedChannel.productLineName = channel.productLineName;
        this.tempimg = channel.adcMastrChannelImage;

        // this.fetchChannelDetails(channel.adcMastrChannelId);

      }

      this.getCountry();

      //   if (channel) {
      //     this.fetchChannelDetails(channel.adcMastrChannelId); // we have to add channer details in the placeholder
      //   }

      this.isPopupVisibleAddChannel = !this.isPopupVisibleAddChannel;
    }

  }

  toggleEditChannel(index: number, channel?: ChannelDetails): void {

    console.log("index", index)
    console.log("Shiva:", channel)

    if (index === -1) {
      console.log("closed called")
      this.SelectedExtraDetails.channel_id = 0;
      this.SelectedExtraDetails.org_Name = '';
      this.SelectedExtraDetails.org_Address = '';
      this.SelectedExtraDetails.country_id = 0;
      this.SelectedExtraDetails.state_id = 0;
      this.SelectedExtraDetails.city_id = 0;
      this.SelectedExtraDetails.pincd = '';
      this.SelectedExtraDetails.adC_Server_Flg = false;
      this.SelectedExtraDetails.third_Party_server_Flg = false;
      this.SelectedExtraDetails.iP_Address = '';
      this.SelectedExtraDetails.other_Detail = '';
      this.isPopupVisibleEditChannel = !this.isPopupVisibleEditChannel;

      this.resetForm();
    } else {
      if (channel) {
        this.SelectedChannel.adcMasterChannelActivFlg = channel.adcMasterChannelActivFlg;
        this.SelectedChannel.adcMasterChannelComrclAdAllowdFlg = channel.adcMasterChannelComrclAdAllowdFlg;
        this.SelectedChannel.adcMasterChannelInfoAdAllowdFlg = channel.adcMasterChannelInfoAdAllowdFlg;
        this.SelectedChannel.adcMastrChannelB2bFlg = channel.adcMastrChannelB2bFlg;
        this.SelectedChannel.adcMastrChannelD2cFlg = channel.adcMastrChannelD2cFlg;
        this.SelectedChannel.adcMastrChannelD2cFreeOnairFlg = channel.adcMastrChannelD2cFreeOnairFlg;
        this.SelectedChannel.adcMastrChannelD2cOnSubscrptnFlg = channel.adcMastrChannelD2cOnSubscrptnFlg;
        this.SelectedChannel.adcMastrChannelId = channel.adcMastrChannelId;
        this.SelectedChannel.adcMastrChannelImage = channel.adcMastrChannelImage;
        this.SelectedChannel.adcMastrChannelName = channel.adcMastrChannelName;
        this.SelectedChannel.adcMastrProdlineId = channel.adcMastrProdlineId;
        this.SelectedChannel.adcMastrVertId = channel.adcMastrVertId;
        this.SelectedChannel.verticalName = channel.verticalName;
        this.SelectedChannel.productLineName = channel.productLineName;
        this.tempimg = channel.adcMastrChannelImage;

        this.fetchChannelDetails(channel.adcMastrChannelId);

      }

      this.getCountry();

      //   if (channel) {
      //     this.fetchChannelDetails(channel.adcMastrChannelId); // we have to add channer details in the placeholder
      //   }

      this.isPopupVisibleEditChannel = !this.isPopupVisibleEditChannel;
    }

  }

  async toggleAddSuser(channel: any): Promise<void> {
    if (channel) {
      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelSuperUser/${channel.adcMastrChannelId}`;

      this.userData = {
        channel_id: channel.adcMastrChannelId,
        mobileNumber: '',
        firstName: '',
        lastName: '',
        emailId: '',
        userId: '',
        AdcMpPin: '',
        PortalPin: ''
      };

      try {
        const response: SuperUserResponse[] = await firstValueFrom(
          this.http.get<SuperUserResponse[]>(apiUrl)
        );

        console.log('Fetched data:', response);

        this.selectedChannel = channel;

        if (response && response.length > 0) {
          this.userData = {
            channel_id: channel.adcMastrChannelId,
            mobileNumber: response[0].adcCldtvRegstrdMobileNumbr,
            firstName: response[0].adcCldtvUserFirstName,
            lastName: response[0].adcCldtvUserLastName,
            emailId: response[0].adcCldtvUserEmailid,
            userId: response[0].adcCldtvUserId,
            AdcMpPin: response[0].adcCldtvUserAdcMpPin,
            PortalPin: response[0].adcCldtvUserPortalPin
          };
        } else {
          console.warn('No data found for the selected channel.');
        }
      } catch (error) {
        console.error('Error fetching channel superuser data:', error);
      }
    }

    // Toggle popup visibility
    this.isPopupVisibleAddSuser = !this.isPopupVisibleAddSuser;
  }

  async toggleViewSuser(channel: any): Promise<void> {
    if (channel) {
      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelSuperUser/${channel.adcMastrChannelId}`;

      this.userData = {
        channel_id: channel.adcMastrChannelId,
        mobileNumber: '',
        firstName: '',
        lastName: '',
        emailId: '',
        userId: '',
        AdcMpPin: '',
        PortalPin: ''
      };

      try {
        const response: SuperUserResponse[] = await firstValueFrom(
          this.http.get<SuperUserResponse[]>(apiUrl)
        );

        console.log('Fetched data:', response);

        this.selectedChannel = channel;

        if (response && response.length > 0) {
          this.userData = {
            channel_id: channel.adcMastrChannelId,
            mobileNumber: response[0].adcCldtvRegstrdMobileNumbr,
            firstName: response[0].adcCldtvUserFirstName,
            lastName: response[0].adcCldtvUserLastName,
            emailId: response[0].adcCldtvUserEmailid,
            userId: response[0].adcCldtvUserId,
            AdcMpPin: response[0].adcCldtvUserAdcMpPin,
            PortalPin: response[0].adcCldtvUserPortalPin
          };
        } else {
          console.warn('No data found for the selected channel.');
        }

        this.isPopupVisibleViewSuser = !this.isPopupVisibleViewSuser;
      } catch (error) {
        console.error('Error fetching channel superuser data:', error);
        this.showSnackbar("Super User is not added yet!")
      }
    } else {
      this.isPopupVisibleViewSuser = !this.isPopupVisibleViewSuser;
    }
  }

  async addChanneletails(data: any) {
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddCLDTVChannelDetail';

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, data));
      console.log("Channel Details added successfully:", response);
      this.showSnackbar("Channel Details added successfully!");

    } catch (error) {
      console.error("Error Adding Channel Details:", error);
      this.showSnackbar("Failed to Add Channel Details. Please try again.");
    }
  }

  async Editchanneldetails(data: any) {
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditCLDTVChannelDetail';

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, data));
      console.log("Channel Details edited successfully:", response);
      this.showSnackbar("Channel Details added successfully!");

    } catch (error) {
      console.error("Error in editing Channel Details:", error);
      this.showSnackbar("Failed to Edit Channel Details. Please try again.");
    }
  }

  saveChannelDetails() {
    console.log(this.SelectedExtraDetails);

    const data = {
      channel_id: this.SelectedChannel.adcMastrChannelId,
      org_Name: this.SelectedExtraDetails.org_Name,
      org_Address: this.SelectedExtraDetails.org_Address,
      country_id: this.SelectedExtraDetails.country_id,
      state_id: this.SelectedExtraDetails.state_id,
      city_id: this.SelectedExtraDetails.city_id,
      pincd: this.SelectedExtraDetails.pincd,
      adC_Server_Flg: this.SelectedExtraDetails.adC_Server_Flg,
      third_Party_server_Flg: this.SelectedExtraDetails.third_Party_server_Flg,
      iP_Address: this.SelectedExtraDetails.iP_Address,
      other_Detail: this.SelectedExtraDetails.other_Detail
    }

    console.log("data:", data)

    this.addChanneletails(data);

    this.toggleAddChannel(-1);
  }

  EditChannelDetails() {
    console.log(this.SelectedExtraDetails);

    const data = {
      channel_id: this.SelectedChannel.adcMastrChannelId,
      adC_Server_Flg: this.SelectedExtraDetails.adC_Server_Flg,
      third_Party_server_Flg: this.SelectedExtraDetails.third_Party_server_Flg,
      iP_Address: this.SelectedExtraDetails.iP_Address,
      other_Detail: this.SelectedExtraDetails.other_Detail
    }


    console.log("data:", data)

    this.Editchanneldetails(data);  // edit channel details

    this.toggleEditChannel(-1);
  }

  async saveSuser(formRef: NgForm): Promise<void> {

    if (formRef.invalid) {
      return;
    }

    console.log(this.userData);

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/AddChannelSuperUser`;

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, this.userData));
      console.log('SuperUser saved successfully:', response);
      this.showSnackbar('SuperUser saved successfully');
    } catch (error: any) {
      if (error?.error?.text === "Super User is already Created") {
        console.log("ho gaya")

        const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/EditChannelSuperUser`;

        const data = {
          channel_id: this.userData.channel_id,
          mobileNumber: this.userData.mobileNumber,
          userId: this.userData.userId,
          activeFlg: true
        }

        try {
          const response = await firstValueFrom(this.http.post(apiUrl, data));
          console.log('SuperUser saved successfully:', response);
          this.showSnackbar('SuperUser saved successfully');
        } catch (error) {
          console.error('Error saving SuperUser:', error);
          this.showSnackbar('Error saving SuperUser');
        }
      }
    }
    this.toggleAddSuser(null);
  }

  async addChannel(formRef: NgForm) {

    if (formRef.invalid) {
      return;
    }

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddCLDTVChannel';

    const channelData = {
      vert_id: Number(this.newChannel.vert_id),
      prodLine_id: Number(this.newChannel.prodLine_id),
      name: this.newChannel.name,
      image: this.newChannel.image,
      d2C_Flg: this.newChannel.d2C_Flg,
      b2B_Flg: this.newChannel.b2B_Flg,
      freeAir_flg: this.newChannel.freeAir_flg,
      subscription_Flg: this.newChannel.subscription_Flg,
      comm_AD_Flg: this.newChannel.comm_AD_Flg,
      info_AD_flg: this.newChannel.info_AD_flg,
    };

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, channelData));
      console.log("Channel added successfully:", response);
      this.showSnackbar("Channel added successfully!");
      this.togglePopup();

      this.fetchChannels(this.newChannel.vert_id, this.newChannel.prodLine_id.toString());

    } catch (error) {
      console.error("Error adding channel:", error);
      this.showSnackbar("Failed to add channel. Please try again.");
      this.togglePopup();
    }

    this.SelectedPromoImageToBeAdded = "";

  }

  SelectedPromoImageToBeAdded = '';

  async onFileChange(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.MAX_FILE_SIZE_MB) {
        this.resetMediaSelection();
        this.showSnackbar('Please upload an image less than 100 MB.');
        return;
      }

      this.fileSize = `${fileSizeMB.toFixed(1)} MB`;
      this.base64Image = await this.readFileAsBase64(file);
      this.SelectedPromoImageToBeAdded = this.base64Image
      this.base64Image = this.base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
      this.newChannel.image = this.base64Image || '';
      this.SelectedChannel.adcMastrChannelImage = this.base64Image || '';
      this.mediaRunCount = file.type.startsWith('image') ? 1 : await this.getMediaDuration(file);
      this.checkMediaRunCount();
    }
  }

  private async getMediaDuration(file: File): Promise<number | string> {
    if (file.type.startsWith('video') || file.type.startsWith('audio')) {
      try {
        const duration = await this.loadMediaDuration(file);
        return `${Math.round(duration)} sec`;
      } catch {
        this.showSnackbar('Error loading media. Please select a valid file.');
        this.resetMediaSelection();
      }
    }
    return 0;
  }

  private loadMediaDuration(file: File): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const mediaElement = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
      mediaElement.preload = 'metadata';
      mediaElement.onloadedmetadata = () => {
        resolve(mediaElement.duration);
        mediaElement.remove();
      };
      mediaElement.onerror = () => {
        reject();
        mediaElement.remove();
      };
      mediaElement.src = URL.createObjectURL(file);
      document.body.appendChild(mediaElement);
    });
  }

  private checkMediaRunCount(): void {
    if (typeof this.mediaRunCount === 'number' && this.mediaRunCount > 180) {
      this.resetMediaSelection();
      this.showSnackbar('The media should be less or equal to 180 seconds.');
    } else {
      console.log("Media ready for display.");
    }
  }

  private async readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject('Error reading file');
      reader.readAsDataURL(file);
    });
  }

  private resetMediaSelection(): void {
    this.base64Image = '';
    this.fileSize = '';
    this.mediaRunCount = 0;
  }

  async fetchVerticals(): Promise<void> {
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/GetDROPLISTCLDTVVERTICAL';
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log(res)
      this.verArr = res.map(item => ({
        vertId: item.d2cCldtvVerticalId,
        verName: item.d2cCldtvVerticalName,
      }));

      this.newChannel.verName = this.verArr[0]?.verName;
      this.newChannel.vert_id = this.verArr[0]?.vertId;


    } catch (error) {
      console.error(error);
      this.showSnackbar('Failed to fetch verticals');
    }
  }

  onVerSelect(event: Event) {
    const verName = (event.target as HTMLSelectElement).value;

    this.newChannel.verName = verName;

    const selectedData = this.verArr.find(data => data.verName === verName);

    this.newChannel.vert_id = selectedData ? selectedData.vertId : '';

    this.ProductLineArr = this.sampleData.filter(data => data.vertId === this.newChannel.vert_id);
    this.newChannel.productLineName = this.ProductLineArr[0]?.prouctName;
  }

  async fetchProductLine(): Promise<void> {
    const apiUrl = "http://www.shripatigroup.com/ADMedia/api/ADMedia/DispCLDTVProdline";
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log("API Response for Product Lines:", res);

      this.sampleData = res.map(item => ({
        vertId: String(item.adcMastrVertId),
        verName: (this.verArr.find(data => String(data.vertId) === String(item.adcMastrVertId))?.verName) || '', // Default to empty string
        productId: item.adcMastrProdlineId,
        prouctName: item.adcMastrProdlineName,
        image: "http://www.shripatigroup.com/" + item.adcMastrProdlineImage.substring(2),
        activeflg: item.adcMastrProdlineActivFlg,
      }));

      this.ProductLineArr = this.sampleData.filter(data => data.vertId === this.verArr[0].vertId);
      this.newChannel.productLineName = this.ProductLineArr[0]?.prouctName;
      this.newChannel.prodLine_id = this.ProductLineArr[0]?.productId;

      console.log("Sample data after assigning verName:", this.sampleData);

      try {
        this.fetchChannels(this.newChannel.vert_id, this.newChannel.prodLine_id.toString());
      } catch (error: any) {
        console.log(error)
      }

    } catch (error) {
      console.error(error);
      this.showSnackbar('No Channel');
      this.sampleData = [];
    }
  }

  async fetchChannels(vertid: string, prodlineid: string): Promise<void> {
    console.log("vertid:", vertid);
    console.log("prodlineid:", prodlineid);

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/DispCLDTVChannels/${vertid}/${prodlineid}`;
    try {
      // Fetch channels
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log("API Response for Channels:", res);

      // Map the response to the desired structure
      this.Channels = await Promise.all(res.map(async (item) => {
        const vertical = this.verArr.find(v => v.vertId === String(item.adcMastrVertId));
        const productLine = this.ProductLineArr.find(p => p.productId === item.adcMastrProdlineId);

        // Initialize the channel object
        const channel = {
          adcMasterChannelActivFlg: item.adcMasterChannelActivFlg,
          adcMasterChannelComrclAdAllowdFlg: item.adcMasterChannelComrclAdAllowdFlg,
          adcMasterChannelInfoAdAllowdFlg: item.adcMasterChannelInfoAdAllowdFlg,
          adcMastrChannelB2bFlg: item.adcMastrChannelB2bFlg,
          adcMastrChannelD2cFlg: item.adcMastrChannelD2cFlg,
          adcMastrChannelD2cFreeOnairFlg: item.adcMastrChannelD2cFreeOnairFlg,
          adcMastrChannelD2cOnSubscrptnFlg: item.adcMastrChannelD2cOnSubscrptnFlg,
          adcMastrChannelId: item.adcMastrChannelId,
          adcMastrChannelImage: "http://www.shripatigroup.com/" + item.adcMastrChannelImage.substring(2),
          adcMastrChannelName: item.adcMastrChannelName,
          adcMastrProdlineId: item.adcMastrProdlineId,
          adcMastrVertId: item.adcMastrVertId,
          verticalName: vertical ? vertical.verName : '',
          productLineName: productLine ? productLine.prouctName : '',
          isDetailsadded: false,
        };

        // Fetch channel details and update the flag
        try {
          const channelDetailUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelDetail/${item.adcMastrChannelId}`;
          const channelDetail = await firstValueFrom(this.http.get<any>(channelDetailUrl));

          console.log("Channe Id: ", item.adcMastrChannelId)
          console.log("Channel Dateils: ", channelDetail)

          if (channelDetail) {
            channel.isDetailsadded = true;  // Set the flag if details are found
          }
        } catch (detailError) {
          console.error(`Failed to fetch details for channel ID ${item.adcMastrChannelId}:`, detailError);
        }

        return channel;
      }));

      // Log the final channels with details added flag
      console.log(this.Channels);

    } catch (error) {
      console.error("Error fetching channels:", error);
      this.showSnackbar('No Data');
    }
  }


  async editChannel() {
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditCLDTVChannel';

    const updatedChannelData = {
      channel_id: this.SelectedChannel.adcMastrChannelId,
      name: this.SelectedChannel.adcMastrChannelName,
      // image: this.SelectedChannel.adcMastrChannelImage || this.tempimg,
      image: this.SelectedChannel.adcMastrChannelImage.startsWith("http") ? "" : this.SelectedChannel.adcMastrChannelImage,
      d2C_Flg: this.SelectedChannel.adcMastrChannelD2cFlg,
      b2B_Flg: this.SelectedChannel.adcMastrChannelB2bFlg,
      freeAir_flg: this.SelectedChannel.adcMastrChannelD2cFreeOnairFlg,
      subscription_Flg: this.SelectedChannel.adcMastrChannelD2cOnSubscrptnFlg,
      comm_AD_Flg: this.SelectedChannel.adcMasterChannelComrclAdAllowdFlg,
      info_AD_flg: this.SelectedChannel.adcMasterChannelInfoAdAllowdFlg,
      active: this.SelectedChannel.adcMasterChannelActivFlg
    };

    console.log("Udated Data:", updatedChannelData)

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, updatedChannelData));
      console.log("Channel updated successfully:", response);
      this.showSnackbar("Channel updated successfully!");

      // Close the edit popup
      this.toggleEditPopup(-1);

      // Refresh the list to reflect updated details
      this.fetchChannels(this.SelectedChannel.adcMastrVertId.toString(), this.SelectedChannel.adcMastrProdlineId.toString());

    } catch (error) {
      console.error("Error updating channel:", error);
      this.showSnackbar("Failed to update channel. Please try again.");
    }

    this.SelectedPromoImageToBeAdded = ""
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.fetchVerticals().then(() => {
      this.fetchProductLine();
    });
  }
}