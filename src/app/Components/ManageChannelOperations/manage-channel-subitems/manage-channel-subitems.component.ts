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
import { InputCounter } from 'flowbite';

interface ChannelSubItem {
  channel_id: number,
  itemId: number,
  itemName: string,
  adcSubitemId: string,
  adcSubitemName: string,
  adcSubitemImage: string,
  adcSubitemType: string,
  adcSubitemDurationInSecnds: number,
  adcSubitemSingleLangFlg: boolean,
  adcSubitemMultiLangFlg: boolean,
  adcSubitemMediaType: string,
  adcSubitemActivFlg: boolean
}

interface channelItemsIdArr {
  adcChannelItemId: number,
  adcChannelItemName: string,
}

interface AdcTrailerPromo {
  adcTrailerPromoActivFlg: boolean;
  adcTrailerPromoCountSec: number;
  adcTrailerPromoId: string;
  adcTrailerPromoMediaFile: string;
  adcTrailerPromoMediaLink: string;
}

interface AdcPlaymedia {
  adcLanguageId: string; 
  adcPlaymediaActivFlg: boolean; 
  adcPlaymediaId: string;
  adcPlaymediaLink: string;
  message: string; 
}

interface selectedPlayMedia {
  subItemId: string;
  playMediaId: string;
  activeFlg: boolean;
  mediaLink: string
}

interface MediaItem {
  subItemId: string;
  mediaFile: string;
  duration: number;
  mediaType: string;
}

interface PlayMediaItem { 
  subItemId: string;
  lanuageId: string;
  mediaLink: string;
}

interface selectedPromo {
  promoId: string;
  subItemId: string;
  mediaFile: string;
  duration: number;
  mediaType: string;
}


@Component({
  selector: 'app-manage-channel-subitems',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './manage-channel-subitems.component.html',
  styleUrl: './manage-channel-subitems.component.css'
})
export class ManageChannelSubitemsComponent {

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
  people:string = "../../../../../assets/people.png";
  promo:string = "../../../../../assets/promo.png";
  monetization:string = "../../../../../assets/monetization.png";
  cineam:string = "../../../../assets/cineam.png";
  subtitle:string = "../../../../assets/subtitle.png";
  media: string = "../../../../assets/document.png";

  isPopupVisible1 = false;
  isPopupVisible2 = false;
  isPopupVisible3 = false;
  isPopupVisible4 = false;
  isPopupVisible5 = false;
  isPopupVisible6 = false;
  isPopupVisible7 = false;
  isPopupVisible8 = false;
  iseditopenad = false;
  isaddopenad = false;
  iseditopenpromo = false;
  isaddopenpromo = false;
  iseditopenplayer = false;
  isaddopenplayer = false;
  iseditopensubtitle = false;
  isaddopensubtitle = false;
  isShowMediaVisible = false;
  isShowPromo = false;
  mediaToShow = "";
  mediaToShowType = "";
  promoToShow = "";

  AddChannelSubItem : ChannelSubItem = {
    channel_id: 0,
    itemId: 0,
    itemName: "",
    adcSubitemId: "",
    adcSubitemName: "",
    adcSubitemImage: "",
    adcSubitemType: "",
    adcSubitemDurationInSecnds: 0,
    adcSubitemSingleLangFlg: true,
    adcSubitemMultiLangFlg: false,
    adcSubitemMediaType: "",
    adcSubitemActivFlg: false
  }

  SubitemData: any = {}

  ChannelItemsIdArr: channelItemsIdArr []= [];
  ChannelSubitemsArr: ChannelSubItem [] = [];
  PromoArr: AdcTrailerPromo []=[];
  PlayMediaArr: AdcPlaymedia []=[];
  selectedItemId = 0;


  SelectedPromo : selectedPromo = {
    promoId: '',
    subItemId: '',
    mediaFile: '',
    duration: 0,
    mediaType: '',
  }

  NewPromo: MediaItem = {
    subItemId: '',
    mediaFile: '',
    duration: 0,
    mediaType: ''
  }

  SelectedPlayMedia : selectedPlayMedia = {
    subItemId: '',
    playMediaId: '',
    activeFlg: true,
    mediaLink: ''
  }

  NewPlayMedia: PlayMediaItem = {
    subItemId: '',
    lanuageId: '',
    mediaLink: ''
  }

  SelectedSubItem: ChannelSubItem = {
    channel_id: 0,
    itemId: 0,
    itemName: "",
    adcSubitemId: "",
    adcSubitemName: "",
    adcSubitemImage: "",
    adcSubitemType: "",
    adcSubitemDurationInSecnds: 0,
    adcSubitemSingleLangFlg: true,
    adcSubitemMultiLangFlg: false,
    adcSubitemMediaType: "",
    adcSubitemActivFlg: false
  }

  base64Image = '';
  fileSize = '';
  mediaRunCount: number | string = 0;
  MAX_FILE_SIZE_MB = 1000000;

  disableMediaInput: boolean = true;
  fileAcceptType: string = "";

  onSubitemTypeChange(event: any) {
      const selectedType = event.target.value;
      
      switch (selectedType) {
          case "audio":
              this.fileAcceptType = "audio/*";
              break;
          case "video":
              this.fileAcceptType = "video/*";
              break;
          case "digitaltext":
              this.fileAcceptType = ".txt, .pdf, .docx";
              break;
          case "imagerepository":
              this.fileAcceptType = "image/*";
              break;
          default:
              this.fileAcceptType = "";
      }
      
      this.disableMediaInput = !selectedType; // Disable input if no type is selected
  }


  toggleAddSubitem() {

    this.selectedFileType = ''

    this.fileAcceptType = ''

    this.SelectedVerticalImageToBeAdded = ""

    this.AddChannelSubItem = {
      channel_id: 0,
      itemId: 0,
      itemName: "",
      adcSubitemId: "",
      adcSubitemName: "",
      adcSubitemImage: "",
      adcSubitemType: "",
      adcSubitemDurationInSecnds: 0,
      adcSubitemSingleLangFlg: true,
      adcSubitemMultiLangFlg: false,
      adcSubitemMediaType: "",
      adcSubitemActivFlg: false
    }

    console.log("Selected Item id: ", this.selectedItemId)
    this.isPopupVisible1 = !this.isPopupVisible1
  }

  togglePopup2(Subitem?:ChannelSubItem) {

    this.selectedFileType = '';
    this.fileAcceptType = '';
    this.SelectedVerticalImageToBeAdded = ''

    if(Subitem){

      this.SelectedSubItem = {
        channel_id: Subitem.channel_id,
        itemId: Subitem.itemId,
        itemName: Subitem.itemName,
        adcSubitemId: Subitem.adcSubitemId,
        adcSubitemName: Subitem.adcSubitemName,
        adcSubitemImage: Subitem.adcSubitemImage,
        adcSubitemType: Subitem.adcSubitemType,
        adcSubitemDurationInSecnds: Subitem.adcSubitemDurationInSecnds,
        adcSubitemSingleLangFlg: Subitem.adcSubitemSingleLangFlg,
        adcSubitemMultiLangFlg: Subitem.adcSubitemMultiLangFlg,
        adcSubitemMediaType: Subitem.adcSubitemMediaType,
        adcSubitemActivFlg: Subitem.adcSubitemActivFlg
      }

      console.log(this.SelectedSubItem)

      if(this.SelectedSubItem.adcSubitemType === 'audio'){
        this.selectedFileType = 'audio'
      } else if (this.SelectedSubItem.adcSubitemType === 'video'){
        this.selectedFileType = 'video'
      } else if (this.SelectedSubItem.adcSubitemType === 'digitaltext'){
        this.selectedFileType = 'digitaltext'
      } else if (this.SelectedSubItem.adcSubitemType === 'imagerepository'){
        this.selectedFileType = 'image'
      }

      switch (this.SelectedSubItem.adcSubitemType) {
        case "audio":
            this.fileAcceptType = "audio/*";
            break;
        case "video":
            this.fileAcceptType = "video/*";
            break;
        case "digitaltext":
            this.fileAcceptType = ".txt, .pdf, .docx";
            break;
        case "imagerepository":
            this.fileAcceptType = "image/*";
            break;
        default:
            this.fileAcceptType = "";
    }

      console.log("selected subitem type: ", this.SelectedSubItem.adcSubitemType)
      console.log("subitem type: ", this.selectedFileType)
      console.log("fileaccept type: ", this.fileAcceptType)

      this.SelectedVerticalImageToBeAdded = this.SelectedSubItem.adcSubitemImage;
      console.log("Selected Media: ", this.SelectedVerticalImageToBeAdded)
    }

    this.isPopupVisible2 = !this.isPopupVisible2
  }

  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3
  }

  togglePopup4() {
    this.isPopupVisible4 = !this.isPopupVisible4
  }

  togglePopup8() {
    this.isPopupVisible8 = !this.isPopupVisible8
  }

  async showPromo(subItemId?: string) {

    this.PromoArr =[];

    if(subItemId){
      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetSubitemPromo/${subItemId}`;
      try {
          const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
          console.log("Promos: ",res)

          this.PromoArr = res.map(item => ({
              adcTrailerPromoActivFlg: item.adcTrailerPromoActivFlg,
              adcTrailerPromoCountSec: item.adcTrailerPromoCountSec,
              adcTrailerPromoId: item.adcTrailerPromoId,
              adcTrailerPromoMediaFile: "http://www.shripatigroup.com/" + item.adcTrailerPromoMediaFile.substring(2),
              adcTrailerPromoMediaLink: "http://www.shripatigroup.com/" + item.adcTrailerPromoMediaLink.substring(2),
          }));

          this.promoToShow = this.PromoArr[0].adcTrailerPromoMediaLink;
          console.log("Ye he link: ", this.promoToShow)
          this.isShowPromo = true;

      } catch (error){
        console.log("error to fetch promo: ", error)
        this.showSnackbar("No promo added")
      }
    } else {
      this.isShowPromo = false;
    }
  }

  showMedia(media?: string, type?: string) {

    this.mediaToShow = "";
    this.mediaToShowType = "";

    if(media && type){
      this.mediaToShow = media
      this.mediaToShowType = type
    }

    console.log("Media to show type: ",this.mediaToShowType)
    console.log("Media to show : ",this.mediaToShow)

    this.isShowMediaVisible = !this.isShowMediaVisible
  }

  async togglePopup5(item?:ChannelSubItem) {
    if(item){
      this.SelectedSubItem = item;
      console.log(this.SelectedSubItem)

      this.PromoArr = [];

        const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetSubitemPromo/${this.SelectedSubItem.adcSubitemId}`;
        try {
            const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
            console.log("Promos: ",res)

            this.PromoArr = res.map(item => ({
              adcTrailerPromoActivFlg: item.adcTrailerPromoActivFlg,
              adcTrailerPromoCountSec: item.adcTrailerPromoCountSec,
              adcTrailerPromoId: item.adcTrailerPromoId,
              adcTrailerPromoMediaFile: "http://www.shripatigroup.com/" + item.adcTrailerPromoMediaFile.substring(2),
              adcTrailerPromoMediaLink: "http://www.shripatigroup.com/" + item.adcTrailerPromoMediaLink.substring(2),
          }));

          console.log("Ye he sare promos: ", this.PromoArr);
    
        } catch (error) {
            console.error(error);
            this.showSnackbar('Failed to fetch Promos');
        }

    }
    this.isPopupVisible5 = !this.isPopupVisible5
  }

  async togglePopup6(item?:ChannelSubItem) {
    if(item){
      this.SelectedSubItem = item;
      console.log(this.SelectedSubItem)

      this.PlayMediaArr = [];

        const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetSubitemPlaymedialist/${this.SelectedSubItem.adcSubitemId}`;
        try {
            const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
            console.log("PLayMedia: ",res)

            this.PlayMediaArr = res.map(item => ({
              adcLanguageId: item.adcLanguageId, 
              adcPlaymediaActivFlg: item.adcPlaymediaActivFlg,
              adcPlaymediaId: item.adcPlaymediaId,
              adcPlaymediaLink: item.adcPlaymediaLink,
              message: item.message
            }))

          console.log("play medias: ", this.PlayMediaArr);
    
        } catch (error) {
            console.error(error);
            this.showSnackbar('Failed to fetch PlayMedia');
        }

    }
    this.isPopupVisible6 = !this.isPopupVisible6
  }

  togglePopup7() {
    this.isPopupVisible7 = !this.isPopupVisible7
  }

  toggleEditad() {
    this.iseditopenad = !this.iseditopenad
  }

  toggleAddad() {
    this.isaddopenad = !this.isaddopenad
  }

  toggleEditpromo(promo: AdcTrailerPromo) {

    this.SelectedPromo = {
      promoId: promo.adcTrailerPromoId,
      subItemId: this.SelectedPromo.subItemId,
      mediaFile: promo.adcTrailerPromoMediaFile,
      duration: promo.adcTrailerPromoCountSec,
      mediaType: '',
    }

    this.iseditopenpromo = !this.iseditopenpromo
  }

  toggleAddpromo() {
    this.isaddopenpromo = !this.isaddopenpromo
  }

  toggleEditplayer(media : AdcPlaymedia) {

    this.SelectedPlayMedia = {
      subItemId: this.SelectedSubItem.adcSubitemId,
      playMediaId: media.adcPlaymediaId,
      activeFlg: media.adcPlaymediaActivFlg,
      mediaLink: media.adcPlaymediaLink
    }

    this.iseditopenplayer = !this.iseditopenplayer
  }

  toggleAddplayer() {
    this.isaddopenplayer = !this.isaddopenplayer
  }

  toggleEditsubtitle() {
    this.iseditopensubtitle = !this.iseditopensubtitle
  }

  toggleAddsubtitle() {
    this.isaddopensubtitle = !this.isaddopensubtitle
  }

async addPromo() {
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddSubitemPromo';

    console.log("ye he data: ", this.NewPromo)

    if(this.NewPromo.duration <= 120){
      try {
          this.showSnackbar("Please wait.");
          const response = await firstValueFrom(this.http.post(apiUrl, this.NewPromo));
          console.log("Promo added successfully:", response);
          this.showSnackbar("Promo added successfully!");
  
      } catch (error) {
          console.error("Error Adding Promo:", error);
          this.showSnackbar("Failed to Add Promo. Please try again.");
      }
    } else {
          console.error("Promo duration should be less that 2 min.");
          this.showSnackbar("Promo duration should be less that 2 min.");
    }

}

async addPlayMedia() {
  const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddPlayMedia';

    this.NewPlayMedia.subItemId = this.SelectedSubItem.adcSubitemId;

    console.log("ye he data: ", this.NewPlayMedia)

    try {
        this.showSnackbar("Please wait.");
        const response = await firstValueFrom(this.http.post(apiUrl, this.NewPlayMedia));
        console.log("Play Media added successfully:", response);
        this.showSnackbar("Play Media added successfully!");

    } catch (error) {
        console.error("Error Adding Play Media:", error);
        this.showSnackbar("Failed to Add Play Media. Please try again.");
    }
}

async EditPromo() {
  const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditSubitemPromo';

  console.log("ye he data: ", this.SelectedPromo)

  if(this.SelectedPromo.duration <= 120){
    try {
        this.showSnackbar("Please wait.");
        const response = await firstValueFrom(this.http.post(apiUrl, this.SelectedPromo));
        console.log("Promo saved successfully:", response);
        this.showSnackbar("Promo saved successfully!");
  
    } catch (error) {
        console.error("Error saving Promo:", error);
        this.showSnackbar("Failed to save Promo. Please try again.");
    }
  } else {
        console.error("Promo duration should be less that 2 min.");
        this.showSnackbar("Promo duration should be less that 2 min.");
  }

}

async EditPlayMeddia() {
  const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditPlayMedia';

  console.log("ye he data: ", this.SelectedPlayMedia)

  try {
      this.showSnackbar("Please wait.");
      const response = await firstValueFrom(this.http.post(apiUrl, this.SelectedPlayMedia));
      console.log("Playmedia saved successfully:", response);
      this.showSnackbar("Playmedia saved successfully!");

  } catch (error) {
      console.error("Error saving Playmedia:", error);
      this.showSnackbar("Failed to save Playmedia. Please try again.");
  } 
}

private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
    });
}

private async convertFileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
          if (reader.result) {
              resolve(reader.result.toString());
          } else {
              reject('Error converting file to Base64');
          }
      };
      reader.onerror = () => reject('Error reading file');
      reader.readAsDataURL(file);
  });
}

selectedFileType: string = "";

async onFileChange(event: any, type: number): Promise<void> {
  const file = event.target.files[0];
  if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      // if (fileSizeMB > this.MAX_FILE_SIZE_MB && type!=1) {
      //     this.resetMediaSelection();
      //     this.showSnackbar('Please upload a file less than 100 MB.');
      //     return;
      // }

      this.fileSize = `${fileSizeMB.toFixed(1)} MB`;

      if (type === 1) {
          // Handle image,audio, video, text file
          this.base64Image = await this.readFileAsBase64(file);
          this.selectedFileType = this.getFileType(file.type);
          this.SelectedVerticalImageToBeAdded = this.base64Image;
          // check for audio, video, text file
          this.base64Image = this.base64Image.replace(/^data:.*;base64,/, '');
          console.log("After replacing :", this.base64Image)
          this.AddChannelSubItem.adcSubitemImage = this.base64Image || '';
          this.SelectedSubItem.adcSubitemImage = this.base64Image || '';
      } else if (type === 2) {
          // Handle video
          try {
              const byteArray = await this.convertFileToBase64(file);
              this.NewPromo.mediaFile = byteArray.replace(/^data:video\/[a-zA-Z0-9-+.]+;base64,/, '');
              this.NewPromo.mediaType = file.type;
              this.NewPromo.subItemId = this.SelectedSubItem.adcSubitemId
              const dur = await this.getMediaDuration(file);
              this.NewPromo.duration = dur
              console.log("ye add wala h")
              console.log("Video Base64: ", this.NewPromo.mediaFile);
              console.log("Video Duration: ", this.NewPromo.duration);
              console.log("Video Media Type: ", this.NewPromo.mediaType);

          } catch (error) {
              this.showSnackbar('Error processing video. Please select a valid file.');
              return;
          }
      } else if (type == 3) {
          try {
            const byteArray = await this.convertFileToBase64(file);
            this.SelectedPromo.mediaFile = byteArray.replace(/^data:video\/[a-zA-Z0-9-+.]+;base64,/, '');
            this.SelectedPromo.mediaType = file.type;
            this.SelectedPromo.subItemId = this.SelectedSubItem.adcSubitemId;
            const dur = await this.getMediaDuration(file);
            this.SelectedPromo.duration = dur
            console.log("Ye edit wala h")
            console.log("Video Base64: ", this.SelectedPromo.mediaFile);
            console.log("Video Duration: ", this.SelectedPromo.duration);
            console.log("Video Media Type: ", this.SelectedPromo.mediaType);

        } catch (error) {
            this.showSnackbar('Error processing video. Please select a valid file.');
            return;
        }
      }

      // this.mediaRunCount = file.type.startsWith('image') 
      //     ? 1 
      //     : await this.getMediaDuration(file);
      this.checkMediaRunCount();
  }
}

getFileType(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (["application/pdf", "text/plain", "application/msword"].includes(mimeType)) return "digitaltext";
  return "unknown";
}

private async getMediaDuration(file: File): Promise<number> {
  if (file.type.startsWith('video') || file.type.startsWith('audio')) {
      try {
          const duration = await this.loadMediaDuration(file);
          return Math.round(duration); // Return only the numeric value
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

      // When metadata is loaded, resolve the duration and clean up
      mediaElement.onloadedmetadata = () => {
          // Revoke the object URL to release memory
          URL.revokeObjectURL(mediaElement.src);
          // Resolve with the duration (rounded)
          resolve(mediaElement.duration);
          // Remove the element from DOM
          mediaElement.remove();
      };

      // In case of error, reject and clean up
      mediaElement.onerror = () => {
          reject(new Error('Failed to load media metadata'));
          URL.revokeObjectURL(mediaElement.src);  // Revoke URL on error as well
          mediaElement.remove(); // Clean up
      };

      // Set the source and append the media element to the DOM
      mediaElement.src = URL.createObjectURL(file);
      // document.body.appendChild(mediaElement); // Append temporarily for metadata extraction
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

  async fetchChannelitems(): Promise<void> {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelItems/${this.userData.accT_ID}`; // to chnage the channelid
    try {
        const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
        console.log(res)
        this.ChannelItemsIdArr = res.map(item => ({
          adcChannelItemId: item.adcChannelItemId,
          adcChannelItemName: item.adcChannelItemName,
        }));

        if(this.ChannelItemsIdArr.length > 0){
          this.selectedItemId = this.ChannelItemsIdArr[0].adcChannelItemId;
        }

        console.log("Items: ", this.ChannelItemsIdArr);

        if (this.ChannelItemsIdArr.length > 0) {
          await this.fetchChannelSubitems(undefined, this.ChannelItemsIdArr[0]);
        }


    } catch (error) {
        console.error(error);
        this.showSnackbar('No Channel Subitem');
    }
  }

  private getSelectedChannelItem(event: Event): channelItemsIdArr {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    return this.ChannelItemsIdArr[selectedIndex];
  }

  async fetchChannelSubitems(event?: Event, obj?: channelItemsIdArr): Promise<void> {

    const { adcChannelItemId: id, adcChannelItemName: name } = event
    ? this.getSelectedChannelItem(event)
    : obj || { adcChannelItemId: 0, adcChannelItemName: '' };

    this.selectedItemId = id;

    this.ChannelSubitemsArr = [];

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelItemSubitems/${this.userData.accT_ID}/${id}`; // to chnage the channelid
    try {
        const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
        this.ChannelSubitemsArr = res.map(item => ({
          channel_id: this.userData.accT_ID, // need to change this
          itemId: id,
          itemName: name,
          adcSubitemId: item.adcSubitemId,
          adcSubitemName: item.adcSubitemName,
          adcSubitemImage: "http://www.shripatigroup.com/" + item.adcSubitemImage.substring(2),
          adcSubitemType: item.adcSubitemType,
          adcSubitemDurationInSecnds: item.adcSubitemDurationInSecnds,
          adcSubitemSingleLangFlg: item.adcSubitemSingleLangFlg,
          adcSubitemMultiLangFlg: item.adcSubitemMultiLangFlg,
          adcSubitemMediaType: item.adcSubitemMediaType,
          adcSubitemActivFlg: item.adcSubitemActivFlg
        }));

        console.log(this.ChannelSubitemsArr)

    } catch (error) {
        console.error(error);
    }
  }

  SelectedVerticalImageToBeAdded = "";

  async addChannelItem(formRef: NgForm) {

        if (formRef.invalid) {
          return; // Stop form submission if invalid
        }

        this.snackBar.open("Uploading file please wait...", 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });    

        const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddChannelSubItem'; 
        
        this.SubitemData =  {
          channel_id: this.userData.accT_ID, // also need to change
          itemId: this.selectedItemId, // need to be changed
          name: this.AddChannelSubItem.adcSubitemName,
          image: this.AddChannelSubItem.adcSubitemImage,
          subItemType: this.AddChannelSubItem.adcSubitemType,
          duration: this.AddChannelSubItem.adcSubitemDurationInSecnds,
          singleLangFlg: this.AddChannelSubItem.adcSubitemSingleLangFlg,
          multipleLangFlg: this.AddChannelSubItem.adcSubitemMultiLangFlg,
          mediaType: this.AddChannelSubItem.adcSubitemMediaType
       }
       console.log("Subitem data: ", this.SubitemData)

       try {
        const response = await firstValueFrom(this.http.post(apiUrl, this.SubitemData));
        console.log("Channel Subitem added successfully:", response);

        this.snackBar.dismiss()
        
        this.showSnackbar("Channel Subitem added successfully!");

        } catch (error) {
            this.snackBar.dismiss()
            console.error("Error Adding Channel Subitem:", error);
            this.showSnackbar("Failed to Add Channel Subitem. Please try again.");
        }
      
        this.AddChannelSubItem =  {
          channel_id: 0,
          itemId: 0,
          itemName: "",
          adcSubitemId: "",
          adcSubitemName: "",
          adcSubitemImage: "",
          adcSubitemType: "",
          adcSubitemDurationInSecnds: 0,
          adcSubitemSingleLangFlg: true,
          adcSubitemMultiLangFlg: false,
          adcSubitemMediaType: "",
          adcSubitemActivFlg: false
        }

        await this.fetchChannelitems()
        this.toggleAddSubitem()
  }

  async editChannelItem(){

    console.log("Edit Selected Subitem: ", this.SelectedSubItem)
    this.isPopupVisible2 = !this.isPopupVisible2;

    this.snackBar.open("Uploading file please wait...", 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
    });    

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/EditChannelSubItem'; 

    const data: any = {
      subItemId: this.SelectedSubItem.adcSubitemId,
      itemId: this.SelectedSubItem.itemId,
      name: this.SelectedSubItem.adcSubitemName,
      image: this.SelectedSubItem.adcSubitemImage.startsWith('http') 
      ? '' 
      : this.SelectedSubItem.adcSubitemImage,
      subItemType: this.SelectedSubItem.adcSubitemType,
      duration: this.SelectedSubItem.adcSubitemDurationInSecnds,
      singleLangFlg: this.SelectedSubItem.adcSubitemSingleLangFlg,
      multipleLangFlg: this.SelectedSubItem.adcSubitemMultiLangFlg,
      mediaType: this.SelectedSubItem.adcSubitemMediaType,
      activeFlg: this.SelectedSubItem.adcSubitemActivFlg
    }

  console.log("Subitem data: ", data)

  try {
    const response = await firstValueFrom(this.http.post(apiUrl, data));
    console.log("Channel Subitem Edited successfully:", response);

    this.snackBar.dismiss()
    
    this.showSnackbar("Channel Subitem Edited successfully!");

    } catch (error) {
        this.snackBar.dismiss()
        console.error("Error Edited Channel Subitem:", error);
        this.showSnackbar("Failed to Edit Channel Subitem. Please try again.");
    }

    this.SelectedSubItem = {
      channel_id: 0,
      itemId: 0,
      itemName: "",
      adcSubitemId: "",
      adcSubitemName: "",
      adcSubitemImage: "",
      adcSubitemType: "",
      adcSubitemDurationInSecnds: 0,
      adcSubitemSingleLangFlg: true,
      adcSubitemMultiLangFlg: false,
      adcSubitemMediaType: "",
      adcSubitemActivFlg: false
    }

    await this.fetchChannelitems()
    this.isPopupVisible2 = false;

  }

  onAddLanguageChange(selection: string): void {
    if (selection === 'single') {
      this.AddChannelSubItem.adcSubitemSingleLangFlg = true;
      this.AddChannelSubItem.adcSubitemMultiLangFlg = false;
    } else if (selection === 'multi') {
      this.AddChannelSubItem.adcSubitemSingleLangFlg = false;
      this.AddChannelSubItem.adcSubitemMultiLangFlg = true;
    }
  }

  onEditLanguageChange(selection: string): void {
    if (selection === 'single') {
      this.SelectedSubItem.adcSubitemSingleLangFlg = true;
      this.SelectedSubItem.adcSubitemMultiLangFlg = false;
    } else if (selection === 'multi') {
      this.SelectedSubItem.adcSubitemSingleLangFlg = false;
      this.SelectedSubItem.adcSubitemMultiLangFlg = true;
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

    this.fetchChannelitems()

  }

}
