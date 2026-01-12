import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../../services/shared.service';

interface ScreenDetails {
  accountid: number;
  subacctid: number;
  reg_Screen_id: number;
  scrn_Commercial_flg: boolean;
  scrn_Self_flg: boolean;
  scrn_hybrid_flg: boolean;
  scrn_Name: string;
  scrn_Placemnt_Catgryid: number;
  scrn_Countryid: number;
  scrn_Stateid: number;
  scrn_Cityid: number;
  scrn_Pincd: string;
  scrn_Disp_Typ: string;
  scrn_Place_Typ: string;
  scrn_Uptimeid: string;
  scrn_Layoutid: string;
  scrn_on_Slab: string;
  scrn_First_Slabid: string;
  scrn_Second_Slabid: string;
  scrn_Third_Slabid: string;
  scrn_Physical_Size: string;
  scrn_Make: string;
  scrm_Main_Pic: string; // Changed from byte[] to Uint8Array in TypeScript
  scrn_10S_IMP_DISPLAY_COST: number;
  scrn_10S_IMP_DISPLAY_COST2: number;
  scrn_10S_IMP_DISPLAY_COST3: number;
  scrn_Biz_User_modeid: number;
  ScreenType: string
}

interface ScreenData {
  accountid: number;
  subacctid: number;
  deviceUid: string;
  screenActivatedFlg: boolean;
  screenId: string;
  screenLocation: string;
  screenPaymentDoneFlg: boolean;
  screenValidatedWithMappedFlg: boolean;
  type: string
}

interface MoreImages {
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}

@Component({
  selector: 'app-manage-screen-subscription',
  standalone: true,
  imports: [NgClass,NgFor, NgIf, FormsModule],
  templateUrl: './manage-screen-subscription.component.html',
  styleUrl: './manage-screen-subscription.component.css'
})

export class ManageScreenSubscriptionComponent {

  userData: any;

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private sharedService: SharedService){}

  activeButton: string = 'manageScreens';

  ScreenArray:ScreenData[]=[];

  image2: string = '';
  image3: string = '';
  image4: string = '';
  image5: string = '';

  ExtraImages :MoreImages = {
    img2: '',
    img3: '',
    img4: '',
    img5: '',
  };

  ScreenIdForImage: string = '';

  newScreen: ScreenDetails = {
    accountid: 0,
    subacctid: 0,
    reg_Screen_id: 0,
    scrn_Commercial_flg: false,
    scrn_Self_flg: false,
    scrn_hybrid_flg: false,
    scrn_Name: "",
    scrn_Placemnt_Catgryid: 0,
    scrn_Countryid: 0,
    scrn_Stateid: 0,
    scrn_Cityid: 0,
    scrn_Pincd: "",
    scrn_Disp_Typ: "",
    scrn_Place_Typ: "",
    scrn_Uptimeid: "",
    scrn_Layoutid: "",
    scrn_on_Slab: "",
    scrn_First_Slabid: "",
    scrn_Second_Slabid: "",
    scrn_Third_Slabid: "",
    scrn_Physical_Size: "",
    scrn_Make: "",
    scrm_Main_Pic: "",
    scrn_10S_IMP_DISPLAY_COST: 0,
    scrn_10S_IMP_DISPLAY_COST2: 0,
    scrn_10S_IMP_DISPLAY_COST3: 0,
    scrn_Biz_User_modeid: 0,
    ScreenType: ""
  };

  PlacementCategory: any[]=[];
  Countries: any[]=[];
  SelectedCountry: any;
  State: any[]=[];
  SelectedState: any;
  City: any[]=[];
  SelectedCity: any;
  Pincode: any[]=[];
  SelectedPincode: any;
  

  showManageScreens = true;
  isPopupVisibleAddDetails = false;
  isPopupVisibleAddMoreImages = false;

  base64Image = '';
  fileSize = '';
  mediaRunCount: number | string = 0;
  MAX_FILE_SIZE_MB = 100;

  setActive(button: string): void {
    this.activeButton = button;

    if(button === 'manageScreens'){
      this.showManageScreens = true;

      const defaultEvent = new Event('change');
          Object.defineProperty(defaultEvent, 'target', {
            writable: false,
            value: { value: 'Commertial Screen' }, 
          });

          this.fetchScreenData(defaultEvent);

    } else {
      this.showManageScreens = false;
    }

    console.log("this.showManageScreens: ", this.showManageScreens)
  }

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";

  slabs: boolean[] = [false, false, false];
  lastSelected: number[] = []; 
  currentSelected: number = 0;
  
  SalbSelected() {
    if (this.newScreen.scrn_on_Slab === '1') {
      this.slabs = [true, false, false];
      this.lastSelected = [0];
      this.currentSelected = 1;
    } else if (this.newScreen.scrn_on_Slab === '2') {
      this.slabs = [true, true, false];
      this.lastSelected = [0, 1];
      this.currentSelected = 2;
    } else {
      this.slabs = [true, true, true];
      this.lastSelected = [0, 1, 2];
      this.currentSelected = 3;
    }

    this.newScreen.scrn_First_Slabid = this.slabs[0] ? '1' : '0';
    this.newScreen.scrn_Second_Slabid = this.slabs[1] ? '2' : '0';
    this.newScreen.scrn_Third_Slabid= this.slabs[2] ? '3' : '0';
  }
  
  updateScreenSlab(selectedSlab: number) {
    if (this.newScreen.scrn_on_Slab === '1') {
      if (this.currentSelected === 1) {
        this.slabs[this.lastSelected[0]] = false; 
      }
      this.slabs[selectedSlab] = true; 
      this.lastSelected = [selectedSlab]; 
    } else if (this.newScreen.scrn_on_Slab === '2') {
      // Double slab logic
      if (this.slabs[selectedSlab]) {
        // Deselect slab if already selected
        this.slabs[selectedSlab] = false;
        this.lastSelected = this.lastSelected.filter((idx) => idx !== selectedSlab);
      } else {
        if (this.currentSelected < 2) {
          // Select slab if less than two are selected
          this.slabs[selectedSlab] = true;
          this.lastSelected.push(selectedSlab);
        } else {
          // If two slabs are already selected, deselect the oldest one
          const deselectedIndex = this.lastSelected.shift();
          if (deselectedIndex !== undefined) {
            this.slabs[deselectedIndex] = false;
          }
          this.slabs[selectedSlab] = true;
          this.lastSelected.push(selectedSlab);
        }
      }
      this.currentSelected = this.lastSelected.length;
    } else {
      // Triple slab logic (always all selected)
      this.slabs = [true, true, true];
      this.lastSelected = [0, 1, 2];
      this.currentSelected = 3;
    }


    this.newScreen.scrn_First_Slabid = this.slabs[0] ? '1' : '0';
    this.newScreen.scrn_Second_Slabid = this.slabs[1] ? '2' : '0';
    this.newScreen.scrn_Third_Slabid= this.slabs[2] ? '3' : '0';
  }

  toggleAddDetail(Screen?:any) {
    
    if(Screen){
      this.getPlacementCategory()
      this.getCountry();

      console.log("Screen data: ",Screen)

      let subacc = 0;
      if (this.userData?.subaccT_ID) {
        subacc = this.userData.subaccT_ID;
      }

      this.newScreen = {
        accountid: this.userData.accT_ID,
        subacctid: subacc,
        reg_Screen_id: Screen.screenId,
        scrn_Commercial_flg: Screen.type === "Commertial",
        scrn_Self_flg: Screen.type === "Self Content",
        scrn_hybrid_flg: Screen.type === "Hybrid",
        scrn_Name: "",
        scrn_Placemnt_Catgryid: 0,
        scrn_Countryid: 0,
        scrn_Stateid: 0,
        scrn_Cityid: 0,
        scrn_Pincd: "",
        scrn_Disp_Typ: "",
        scrn_Place_Typ: "",
        scrn_Uptimeid: "",
        scrn_Layoutid: "",
        scrn_on_Slab: "",
        scrn_First_Slabid: "",
        scrn_Second_Slabid: "",
        scrn_Third_Slabid: "",
        scrn_Physical_Size: "",
        scrn_Make: "",
        scrm_Main_Pic: "",
        scrn_10S_IMP_DISPLAY_COST: 0,
        scrn_10S_IMP_DISPLAY_COST2: 0,
        scrn_10S_IMP_DISPLAY_COST3: 0,
        scrn_Biz_User_modeid: 0,
        ScreenType: Screen.type
      }
      
    } else {
      this.newScreen = {
        accountid: this.userData.accT_ID,
        subacctid: 0,
        reg_Screen_id: 0,
        scrn_Commercial_flg: false,
        scrn_Self_flg: false,
        scrn_hybrid_flg: false,
        scrn_Name: "",
        scrn_Placemnt_Catgryid: 0,
        scrn_Countryid: 0,
        scrn_Stateid: 0,
        scrn_Cityid: 0,
        scrn_Pincd: "",
        scrn_Disp_Typ: "",
        scrn_Place_Typ: "",
        scrn_Uptimeid: "",
        scrn_Layoutid: "",
        scrn_on_Slab: "",
        scrn_First_Slabid: "",
        scrn_Second_Slabid: "",
        scrn_Third_Slabid: "",
        scrn_Physical_Size: "",
        scrn_Make: "",
        scrm_Main_Pic: "",
        scrn_10S_IMP_DISPLAY_COST: 0,
        scrn_10S_IMP_DISPLAY_COST2: 0,
        scrn_10S_IMP_DISPLAY_COST3: 0,
        scrn_Biz_User_modeid: 0,
        ScreenType: ''
      }
    }

    this.isPopupVisibleAddDetails = !this.isPopupVisibleAddDetails;
  }

  toggleAddMoreImages(Id?: string) {
    if(Id)
    this.ScreenIdForImage = Id;

    this.isPopupVisibleAddMoreImages = !this.isPopupVisibleAddMoreImages;
  }

getCountry = async () => {
    const apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetCountry`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg==',
    });
  
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl, { headers }));
      console.log("Country code:",res);
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
      console.log("State code:",res);
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
      console.log("City code:",res);
      this.City = res;

    } catch (error) {
      console.log(error);
    }
};

getPincode = async (StateName: string, CityName?: String) => {
    let apiUrl=''

    if(CityName){
        apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetZipCodes/${StateName}/${CityName}`;
    } else {
        apiUrl = `http://www.shripatigroup.com/eppcommonapis/api/EPP/GetZipCodes/${StateName}`;
    }
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg==',
    });
  
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl, { headers }));
      console.log("Pincode:",res);
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

getPlacementCategory = async () => {
  const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetAllPlacementCategory`;

  try {
    const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
    console.log("Placement Category:",res);
    this.PlacementCategory = res;

  } catch (error) {
    console.log(error);
  }
};

async onFileChange(event: Event, pic:string): Promise<void> {
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
      this.base64Image = this.base64Image.replace(/^data:image\/[a-z]+;base64,/, '');

      if (pic === 'pic1'){
        this.newScreen.scrm_Main_Pic = this.base64Image || '';
      } else if (pic === 'pic2'){
        this.image2 = this.base64Image || '';
      } else if (pic === 'pic3'){
        this.image3 = this.base64Image || '';
      } else if (pic === 'pic4'){
        this.image4 = this.base64Image || '';
      } else if (pic === 'pic5'){
        this.image5 = this.base64Image || '';
      }

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

private showSnackbar(message: string): void {
  this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
  });
}

async AddImage(ImageId: number){

  let flags = {
    regScreenId: this.ScreenIdForImage,
    scrn_Pic: '',
    imagE2_FLG: false,
    imagE3_FLG: false,
    imagE4_FLG: false,
    imagE5_FLG: false
  };

  if(ImageId == 2){
    flags = {
      regScreenId: this.ScreenIdForImage,
      scrn_Pic: this.image2,
      imagE2_FLG: true,
      imagE3_FLG: false,
      imagE4_FLG: false,
      imagE5_FLG: false
    }
  } else if (ImageId == 3) {
    flags = {
      regScreenId: this.ScreenIdForImage,
      scrn_Pic: this.image3,
      imagE2_FLG: false,
      imagE3_FLG: true,
      imagE4_FLG: false,
      imagE5_FLG: false
    }
  } else if (ImageId == 4) {
    flags = {
      regScreenId: this.ScreenIdForImage,
      scrn_Pic: this.image4,
      imagE2_FLG: false,
      imagE3_FLG: false,
      imagE4_FLG: true,
      imagE5_FLG: false
    }
  } else if (ImageId == 5) {
    flags = {
      regScreenId: this.ScreenIdForImage,
      scrn_Pic: this.image5,
      imagE2_FLG: false,
      imagE3_FLG: false,
      imagE4_FLG: false,
      imagE5_FLG: true
    }
  }

  const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/AddSCREENMoreImage`

  console.log("flags: ", flags)

  try {
    const response = await firstValueFrom(
      this.http.post(apiUrl, flags)
    );
    console.log('Image added successfully:', response);
    this.showSnackbar("Image added successfully")
  } catch (error) {
    console.error('Error adding image:', error);
    this.showSnackbar("Error adding image")
  }

}

fetchAditionalImage(ScreenId: string, flags: any) {

  this.ScreenArray = [];

  const apiUrl = `http://www.shripatigroup.com/alcoolretail/api/ADMedia/GetAdditionalImage/${ScreenId}`;

  
}

fetchScreenData(event: Event) {

  this.ScreenArray = [];

  const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/GetRegScreens';

  const selectedScreenType = (event.target as HTMLSelectElement).value;

  if (!selectedScreenType) {
    console.error('No screen type selected');
    return;
  }

  let subacc = 0;
  if (this.userData?.subaccT_ID) {
    subacc = this.userData.subaccT_ID;
  }

  const flags = {
    accountid: this.userData.accT_ID,
    subacctid: subacc,
    comm_Flg: selectedScreenType === 'Commertial Screen',
    self_Flg: selectedScreenType === 'Self Content Screen',
    hybrid_Flg: selectedScreenType === 'Hybrid Screen',
  };


  let typ:string =''

  if(selectedScreenType === 'Commertial Screen'){
    typ = "Commertial"
  } else if (selectedScreenType === 'Self Content Screen') {
    typ = "Self Content"
  } else {
    typ = "Hybrid"
  }

  console.log("Flags sent to API:", flags);

  this.http.post<Partial<ScreenData>[]>(apiUrl, flags).subscribe({
    next: (response) => {
      console.log('API Response:', response);

      this.ScreenArray = response.map(item => ({
        accountid: this.userData.accT_ID,
        subacctid: subacc,
        deviceUid: item.deviceUid ?? '',
        screenActivatedFlg: item.screenActivatedFlg ?? false,
        screenId: item.screenId ?? '',
        screenLocation: item.screenLocation ?? '',
        screenPaymentDoneFlg: item.screenPaymentDoneFlg ?? false,
        screenValidatedWithMappedFlg: item.screenValidatedWithMappedFlg ?? false,
        type: typ
      }));

      console.log('Updated ScreenArray:', this.ScreenArray);
    },
    error: (error) => {
      console.error('Error fetching screen data:', error);
      this.showSnackbar("No Data");
    },
  });
}

async addScreenDetails() {
  const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddADCScreenINV';

  const Data = {
    accountid: +this.newScreen.accountid,
    subacctid: +this.newScreen.subacctid,
    reg_Screen_id: +this.newScreen.reg_Screen_id,
    scrn_Commercial_flg: this.newScreen.scrn_Commercial_flg,
    scrn_Self_flg: this.newScreen.scrn_Self_flg,
    scrn_hybrid_flg: this.newScreen.scrn_hybrid_flg,
    scrn_Name: this.newScreen.scrn_Name,
    scrn_Placemnt_Catgryid: +this.newScreen.scrn_Placemnt_Catgryid,
    scrn_Countryid: +this.newScreen.scrn_Countryid,
    scrn_Stateid: +this.newScreen.scrn_Stateid,
    scrn_Cityid: +this.newScreen.scrn_Cityid,
    scrn_Pincd: +this.newScreen.scrn_Pincd,
    scrn_Disp_Typ: this.newScreen.scrn_Disp_Typ,
    scrn_Place_Typ: this.newScreen.scrn_Place_Typ,
    scrn_Uptimeid: this.newScreen.scrn_Uptimeid,
    scrn_Layoutid: this.newScreen.scrn_Layoutid, 
    scrn_on_Slab: this.newScreen.scrn_on_Slab,
    scrn_First_Slabid: this.newScreen.scrn_First_Slabid,
    scrn_Second_Slabid: this.newScreen.scrn_Second_Slabid,
    scrn_Third_Slabid: this.newScreen.scrn_Third_Slabid,
    scrn_Physical_Size: this.newScreen.scrn_Physical_Size+" Inches",
    scrn_Make: this.newScreen.scrn_Make,
    scrm_Main_Pic: this.newScreen.scrm_Main_Pic,
    scrn_Pic2: "",
    scrn_Pic3: "",
    scrn_Pic4: "",
    scrn_Pic5: "",
    scrn_10S_IMP_DISPLAY_COST: +this.newScreen.scrn_10S_IMP_DISPLAY_COST,
    scrn_10S_IMP_DISPLAY_COST2: +this.newScreen.scrn_10S_IMP_DISPLAY_COST2,
    scrn_10S_IMP_DISPLAY_COST3: +this.newScreen.scrn_10S_IMP_DISPLAY_COST3,
    scrn_Biz_User_modeid: this.newScreen.scrn_Biz_User_modeid  
  };

  console.log("Udated Data:", Data)

  try {
      const response = await firstValueFrom(this.http.post(apiUrl, Data));
      console.log("Channel Details added successfully:", response);
      this.showSnackbar("Channel updated successfully!");

      // Close the edit popup
      this.toggleAddDetail();

  } catch (error) {if ((error as any)?.error === "Screen already available") {
        console.error("Error Adding Details channel:", error);
        this.showSnackbar("Screen already available");
      }
      this.showSnackbar("Error Adding Details channel. Please try again.");
      this.toggleAddDetail();
  }
}

ngOnInit(): void {
  this.sharedService.userData$.subscribe({
    next: (data) => {
      this.userData = data;
      console.log('Received userData:', this.userData);

      const defaultEvent = new Event('change');
          Object.defineProperty(defaultEvent, 'target', {
            writable: false,
            value: { value: 'Commertial Screen' }, 
          });

          this.fetchScreenData(defaultEvent);
    },
    error: (error) => {
      console.error('Error fetching userData:', error);
    },
  });
}

}
