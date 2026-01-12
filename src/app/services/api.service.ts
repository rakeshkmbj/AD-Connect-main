import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  private bellCountSubject = new BehaviorSubject<any>(null);
  public bellCount$ = this.bellCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.getBellCount().subscribe();
  }

  // Declare the base URL  for Backoffice side
  BASE_URL_FOR_BACKOFFICE = "http://www.shripatigroup.com/ADMedia/api/ADMedia/";

  // Base URL for supply side
  BASE_URL_FOR_SUPPLY_SIDE = "http://www.shripatigroup.com/eppcommonapis/api/EPP/";

  // get zipcodes
  zip = "http://www.eguarddocshield.com/webapi/api/EPP/GetZipCodes/gujarat";

  // Declare the apiname as global (BACKOFFICE) 
  DISPLAY_INVNTRY_HOLDERS_ENDPOINT = "DisplayInvntryHolders";
  DISPLAY_ADVERTISERS_ENDPOINT = "DisplayAdvertisers";
  ADD_NEW_INVNTRY_HOLDERS_ACCT_ENDPOINT = "AddNewInvntryHoldrAcct";
  ADD_NEW_ADVERTISER_ENDPOINT = "AddNewAdvertiser";
  DISPLAY_PLAYLIST_ENDPOINT = "DisplayPlaylist";
  DISPLAY_LAYOUTS_ENDPOINT = "DisplayLayouts";
  ADD_PLAYLIST_ENDPOINT = "AddNewPlaylist";
  DISPLAY_SLABS_ENDPOINT = "DisplaySlabs";
  ADD_NEW_SLABS_ENDPOINT = "AddNewSlab";
  EDIT_SLAB_ENDPOINT = "EditNewSlab";
  DISPLAY_UPTIME_ENDPOINT = "DisplayUptime";
  EDIT_PLAYLIST_ENDPOINT = "EditPlaylist";
  ADD_UPTIME_ENDPOINT = "AddUptime";
  EDIT_UPTIME_ENDPOINT = "editUptime";
  EDIT_INVNTRY_HOLDERS_ACCT_ENDPOINT = "EditInvntryHoldrAcct";
  EDIT_ADVERTISER_ENDPOINT = "EditAdvertiser";
  ADD_SCREEN_LAYOUT_ENDPOINT = "AddScreenLayout";
  DISPLAY_BELL_COUNT = "BOBellCountdisplay";
  DISPLAY_PEND_MEDIA_4_VALIDATION = "DisplayPendMedia4Validation";
  VALIDATE_MEDIA_ENDPOINT = "MediaValidated";
  REJECT_MEDIA_ENDPOINT = "MediaRejected";
  VALIDATED_MEDIA_LIST_ENDPOINT = "DisplayBOResponseOnMedia";

  

  // declare apiname as global (supplyside)
  GET_COUNTRY_ENDPOINT = "GetCountry";
  GET_STATE_ENDPOINT = "GetState/";
  GET_CITY_ENDPOINT = "GetCity";
  GET_ZIPCODE_ENDPOINT = "GetZipCodes";
  GET_REGISTERED_SCREENS_ENDPOINT = "GetRegScreens";
  GET_PACEMENT_CATEGORY_ENDPOINT = "GetAllPlacementCategory";
  ADD_ADC_SCREEN_ENDPOINT = "AddADCScreenINV";
  GET_SCREEN_INV_DETAIL_ENDPOINT = "GetScreenINVDetail";
  EDIT_ADC_SCREEN_INV_ENDPOINT = "EditADCScreenINV";
  GET_REPOSITORY_ENDPOINT = "GetRepository";
  ACTIVATE_SCREEN_ENDPOINT = "ActivateScreen";

  // demandside
  ADD_NEW_CONTENT_ENDPOINT = "AddNewContent";
  GET_REPO_CONTENT = "GetRepoContent";
  MANAGE_COMM_DOOH_SCREN_ALLOCATN_ENDPOINT = "ManageCOMMDOOHScrnAllocatn";
  EDIT_DOOH_CONTENT_ENDPOINT = "EditMediaContent";

  // login
  loginEndpoint = "AdconnectLogin"; 

  

  // backoffice apis
  displayInvntryHoldersAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_INVNTRY_HOLDERS_ENDPOINT}`;
  displayAdvertisersAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_ADVERTISERS_ENDPOINT}`;
  addNewInvntryHoldrAcctAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_NEW_INVNTRY_HOLDERS_ACCT_ENDPOINT}`;
  addNewAdvertiserAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_NEW_ADVERTISER_ENDPOINT}`;
  displayPlaylistAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_PLAYLIST_ENDPOINT}`;
  displayLayoutsAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_LAYOUTS_ENDPOINT}`;
  addPlaylistsAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_PLAYLIST_ENDPOINT}`;
  displaySlabsAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_SLABS_ENDPOINT}`;
  addNewSlabsAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_NEW_SLABS_ENDPOINT}`;
  editSlabAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_SLAB_ENDPOINT}`;
  displayUptimeAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_UPTIME_ENDPOINT}`;
  editPlaylistAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_PLAYLIST_ENDPOINT}`;
  addUpTimeAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_UPTIME_ENDPOINT}`;
  editUptimeAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_UPTIME_ENDPOINT}`;
  editInvntryHoldrAcctAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_INVNTRY_HOLDERS_ACCT_ENDPOINT}`;
  editAdvertiserAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_ADVERTISER_ENDPOINT}`;
  addScreenLayoutAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_SCREEN_LAYOUT_ENDPOINT}`;
  getBOBellCount = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_BELL_COUNT}`;
  displayPendMedia4ValidationAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.DISPLAY_PEND_MEDIA_4_VALIDATION}`;
  mediaValidateAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.VALIDATE_MEDIA_ENDPOINT}`;
  rejectMediaAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.REJECT_MEDIA_ENDPOINT}`;
  getvalidatedMediaListAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.VALIDATED_MEDIA_LIST_ENDPOINT}`; 

  // demand side
  AddNewContentAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_NEW_CONTENT_ENDPOINT}`;
  getRepoContentAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.GET_REPO_CONTENT}`;
  manageCommDoohScrnAllocatnAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.MANAGE_COMM_DOOH_SCREN_ALLOCATN_ENDPOINT}`;
  editNewContentAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_DOOH_CONTENT_ENDPOINT}`;
  

  // supplyside apis
  getCountryAPI = `${this.BASE_URL_FOR_SUPPLY_SIDE}${this.GET_COUNTRY_ENDPOINT}`;
  getstateAPI = `${this.BASE_URL_FOR_SUPPLY_SIDE}${this.GET_STATE_ENDPOINT}`;
  getCityAPI = `${this.BASE_URL_FOR_SUPPLY_SIDE}${this.GET_CITY_ENDPOINT}`;
  getZipCodeAPI = `${this.BASE_URL_FOR_SUPPLY_SIDE}${this.GET_ZIPCODE_ENDPOINT}`;
  getRegisteredScreenAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.GET_REGISTERED_SCREENS_ENDPOINT}`;
  getPlacementCategoryAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.GET_PACEMENT_CATEGORY_ENDPOINT}`;
  addScreenAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ADD_ADC_SCREEN_ENDPOINT}`;
  getScreenINVDetailAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.GET_SCREEN_INV_DETAIL_ENDPOINT}`;
  EditADCScreenINVAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.EDIT_ADC_SCREEN_INV_ENDPOINT}`;
  getRepositoryAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.GET_REPOSITORY_ENDPOINT}`;
  activateScreenAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.ACTIVATE_SCREEN_ENDPOINT}`;

  // login apis
  loginAPI = `${this.BASE_URL_FOR_BACKOFFICE}${this.loginEndpoint}`;






  // functions for backoffice
  getInventoryHolders() {
    return this.http.get(this.displayInvntryHoldersAPI);
  }

  getAdvertisers() {
    return this.http.get(this.displayAdvertisersAPI);
  }

  getPlaylists() {
    return this.http.get(this.displayPlaylistAPI);
  }

  getLayouts() {
    return this.http.get(this.displayLayoutsAPI);
  }

  getSlabs() {
    return this.http.get(this.displaySlabsAPI);
  }

  getUptimes() {
    return this.http.get(this.displayUptimeAPI);
  }



  addNewAccountForInventory(formData: any): Observable<any> {
    return this.http.post(this.addNewInvntryHoldrAcctAPI, formData)
  }

  editAccountForInventory(formData: any): Observable<any> {
    return this.http.post(this.editInvntryHoldrAcctAPI, formData)
  }
  
  addNewAccountForAdvertiser(formData: any): Observable<any> {
    return this.http.post(this.addNewAdvertiserAPI, formData)
  }

  editADvertiser(formData: any): Observable<any> {
    return this.http.post(this.editAdvertiserAPI, formData)

  }

  addScreenLayout(formData: any): Observable<any> {
    return this.http.post(this.addScreenLayoutAPI, formData)
  }
  
  

  addNewPlaylist(payload: any): Observable<any> {
    return this.http.post(this.addPlaylistsAPI, payload);
  }

  addNewSlabs(payload: any): Observable<any> {
    return this.http.post(this.addNewSlabsAPI, payload);
  }

  addUpTime(payload: any): Observable<any> {
    return this.http.post(this.addUpTimeAPI, payload);
  }
  editSlab(payload: any): Observable<any> {
    return this.http.post(this.editSlabAPI, payload);
  }
  editPlaylist(payload: any): Observable<any> {
    return this.http.post(this.editPlaylistAPI, payload)
  }
  editUpTime(payload: any): Observable<any> {
    return this.http.post(this.editUptimeAPI, payload)
  }

  // functions for supply side
  getCountries() {
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg=='
    });

    return this.http.get<any>(this.getCountryAPI, { headers });
  }

  getStates(countryCode: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg=='
    });
    const url = `${this.getstateAPI}${countryCode}`;;
    return this.http.get(`${this.getstateAPI}${countryCode}`, { headers });
  }

  getCities(countryCode: number, stateId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg=='
    });

    const url = `${this.getCityAPI}/${countryCode}/${stateId}`;
    return this.http.get<any>(url, { headers });
  }

  getZipCodes(stateName: string, cityName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic cmFrZXNoazplcHBhcHBsaWNhdGlvbg=='
    });
    const url = `${this.getZipCodeAPI}/${stateName}/${cityName}`;
    return this.http.get<any>(url, { headers });
  }

  getRegisteredScreens(payload: any): Observable<any> {
    // const payLoad = {
    //   "accountid": 664419,
    //   "Subacctid": 0,
    //   "comm_Flg": true,
    //   "self_Flg": false,
    //   "hybrid_flg": false
    // };
    return this.http.post(this.getRegisteredScreenAPI, payload)
  }

  getPlacementcategory(): Observable<any> {
    return this.http.get<any>(this.getPlacementCategoryAPI)
  }

  addScreen(data: any): Observable<any> {
    return this.http.post<any>(this.addScreenAPI, data);
  }

  getEditDetails(ScreenId: any): Observable<any> {
    const url = `${this.getScreenINVDetailAPI}/${ScreenId}`;
    return this.http.get<any>(url);
  }

  editScreen(payload: any): Observable<any> {
    return this.http.post<any>(this.EditADCScreenINVAPI, payload);
  }

  getRepository(): Observable<any> {
    return this.authService.userData$.pipe(
      filter(userData => !!userData),  // Ensure userData is not null
      switchMap((userData) => {
        const accT_ID = userData.accT_ID; // Fetch accT_ID from userData
        const payload = {
          accountid: accT_ID,  // Use accT_ID here
          subacctid: 0,
          demand_Side_Flg: true,
          supply_Side_Flg: false
        };
        console.log("Payload is after login ---------------->",payload );

        return this.http.post<any>(this.getRepositoryAPI, payload);
      })
    );
  }

  savePromoForDOOH(payload: any): Observable<any> {
    // payload.
    return this.http.post<any>(this.AddNewContentAPI, payload);
  }


  getBellCount(): Observable<any> {
    const url = `${this.getBOBellCount}`;
    return this.http.get<any>(url)
  }

  getRepoContent(payload: any): Observable<any> {
  const url = `${this.getRepoContentAPI}`;
    console.log("Payload is --------------->", payload);
    const payLoad = {
        "repoID":payload
    }
  console.log("url is ", url);
  // Assuming the server expects the payload directly, not wrapped in an object
  return this.http.post(url, payLoad); 
}


  displayPendMedia4Validation(): Observable<any> {
    return this.http.get<any>(this.displayPendMedia4ValidationAPI)
  }

  validateMedia(mediaId: number): Observable<any> {
  return this.http.post(this.mediaValidateAPI, { mediaId: mediaId }, { responseType: 'text' });
  }
  
  rejectMedia(payload: any) {
    return this.http.post(this.rejectMediaAPI, payload, { responseType: 'text' });
  }

  getValidatedMediaList() {
    const payload = {
      validatedFlg:true,
      rejectedFlg:false
    }
    return this.http.post(this.getvalidatedMediaListAPI, payload); 
  }

  getRejectedmediaList() {
    const payload = {
      validatedFlg:false,
      rejectedFlg:true
    }
    return this.http.post(this.getvalidatedMediaListAPI, payload);
  }

  activeScreen(screenId: any) {  
    const payload = { regScreenId: screenId };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.activateScreenAPI, JSON.stringify(payload), { headers });
  }

  screenAllocation(payLoad: any) {
    return this.http.post(this.manageCommDoohScrnAllocatnAPI, payLoad);
      
  }

  editPromoForDOOH(payload: any) {
    return this.http.post<any>(this.editNewContentAPI, payload);
    // return
  }

  login(payload : any) {
    return this.http.post<any>(this.loginAPI, payload);

  }






}
