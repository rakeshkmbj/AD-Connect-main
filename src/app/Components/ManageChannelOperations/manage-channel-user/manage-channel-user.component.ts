import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';
import { RazorpayService } from '../../../razorpay.service';
import { PaymentStatusService } from '../../../services/payment-status.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Corporate {
  channelid: string;
  corpName: string;
  address: string;
  contName: string;
  mobileNo: string;
  emailId: string;
}

interface Invoices {
  cartClosedFlagDateTime: string;
  cartId: string;
  customerInvoiceNumber: string | null;
}

interface SubscriptionPackage {
  cldtvB2bSubsDiscountAvailableFlg: boolean;
  cldtvB2bSubsDiscountPercntg: number;
  cldtvB2bSubsGstinPercentage: number;
  cldtvB2bSubsPackCost: number;
  cldtvB2bSubsPackId: string;
  cldtvB2bSubsPackName: string;
  cldtvB2bSubsPackValdDuratnDays: number;
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

interface Division {
  corpId: string;
  divName: string;
  contName: string;
  mobileNo: string;
  emailId: string;
}

interface ManageB2BUser {
  channelid: string;
  corpId: string;
  divId: string;
  individual_Flg: boolean;
  corporate_Flg: boolean;
}

interface CorporateDivisionDetails {
  cldtvCorpId: string;
  cldtvDivActivFlg: boolean | null;
  cldtvDivConName: string;
  cldtvDivContEmailid: string;
  cldtvDivContMobNumbr: string;
  cldtvDivId: string;
}

interface B2BUserDetails {
  channelid: string;
  corpId: string;
  divid: string;
  pinNumber: string;
  first_Name: string;
  last_Name: string;
  mob_Numbr: string;
  genderid: string;
  emailid: string;
  prof_img: string;
  valid_Frm_Date: string;
  valid_to_Date: string;
  indi_Flg: boolean;
  corp_Flg: boolean;
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

interface B2BUser {
  b2bCddtvSubcribrLastName: string;
  b2bCldtvSubscribrEmailId: string;
  b2bCldtvSubscribrFirstName: string;
  b2bCldtvSubscribrGenderId: string;
  b2bCldtvSubscribrProfImage: string;
  b2bCldtvSubscribrRegid: string;
  credential_Found: number;
  valid_Frm_Date: string;
  valid_to_Date: string;
  indi_Flg: boolean;
  corp_Flg: boolean;
  corpId: string;
  divid: string;
  subRegId: string;
  channelId: string;
}

interface CartDetails {
  amountDueCalculated: number;
  amountPaid: string;
  b2bCldtvDiscntAmt: string;
  b2bCldtvGstinAmt: string;
  b2bCldtvCartId: string;
  currency: string;
  id: string;
}

interface Order {
  amount_Due_Calculated: number;
  amount_paid: number;
  currency: string;
  b2B_CLDTV_CART_ID: string;
  discount_Cost: string;
  gstiN_Cost: string;
  id: string;
  message: string;
}

interface ActivateLicenece {
  channelid: string;
  userid: string;
  otT_Flg: boolean;
  fconcT_Flg: boolean;
  system_Userid: string;
  subs_Planid: string;
  invoiceid: string;
}

interface Blacklist {
  userId: string;
  channelId: string;
  reasonId: string;
  systemUser: string;
}

interface Deactivate {
  channelid: string;
  userid: string;
  reasonId: string;
  system_Userid: string;
}

interface PaymentDetails {
  razpay_Signature: string;
  return_Orderid: string;
  paymt_Confirmatn_Flg: boolean;
  channelid: string;
  cartid: string;
  banK_TRANSFER_FLG: boolean;
  upI_PAYMNT_FLG: boolean;
  payablE_AMOUNT: number;
  amounT_PAID_BY_CUSTMR: number;
  paymenT_MADE_DATE: string;
  transid: string;
}

interface B2BPackageDetails {
  b2bCldtvDiscntPercntg: number; 
  b2bCldtvGstinPercntg: number; 
  b2bCldtvPackCost: number; 
  b2bCldtvPackname: string; 
  b2bCldtvTxnCurrency: string; 
  b2bCldtvUserLicnBoughtQuantity: number; 
  b2bCldtvUsrLicnDuratnInDays: number; 
  b2bFconctLicenceFlg: boolean;
  b2bIptvLicenseFlg: boolean; 
}

interface CldtvChannelPlan {
  cldtvChanelDuratnDays: number;
  cldtvChanelPlanCost: number;
  cldtvChanelSubsPlanName: string;
  cldtvChanlPlanDiscountFigr: number;
  cldtvChanlPlanGstPercntg: number;
  cldtvChanlelAtchComboId: string;
  cldtvChanlelSubsPlanid: string;
  cldtvFconctLicInclFlg: boolean;
  cldtvIptvLicInclFlg: boolean;
}

interface InvoiceDetails {
  amountPaidByCustomer: string; 
  batchGeneratedDateTime: string;
  channelOrgAddress: string; 
  channelOrgName: string; 
  channelOrgPincode: string; 
  channelServerDetails: string; 
  discountAmount: number; 
  discountPercent: number; 
  fconctLicenceFlg: boolean;
  gstAmount: number; 
  gstPercent: number; 
  iptvLicenseFlg: boolean; 
  licBatchNumber: string; 
  licenseBoughtQuantity: number;
  licenseDurationInDays: number; 
  licenseGenerated: number; 
  orgAddress: string; 
  orgGstin: string; 
  orgLogo: string; 
  orgName: string; 
  orgSupportEmail: string; 
  orgSupportPhone: string; 
  packCost: number; 
  packName: string; 
  paymentDoneFlg: boolean; 
  paymentMadeDate: string | null;
  paymentTransactionId: string; 
  performaInvoiceNumber: string; 
  totalPayableCost: number; 
}

@Component({
  selector: 'app-manage-channel-users',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './manage-channel-user.component.html',
  styleUrl: './manage-channel-user.component.css'
})

export class ManageChannelUsersComponent {

  private subscription: Subscription = new Subscription();

  isSidebarVisible: boolean = false;
  userData: any = {};

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private sharedService: SharedService,
    private authService: AuthService,
    private razorpayService: RazorpayService,
    private paymentStatusService: PaymentStatusService,
    private cdr: ChangeDetectorRef) { }

  edit = "../../../../../assets/editing.png";
  valid = "../../../../../assets/check.png";
  unvalid = "../../../../../assets/uncheck.png";
  action = "../../../../../assets/arrow.png";
  logo = "../../../../../assets/adConnectNewLogo.jpg";
  success = "../../../../../assets/checked.png"

  isManageB2BUserScreenVisible = false;
  isNonCorpUserVisible = false;
  isCorpUserVisible = true;
  isGetChannelInvoiceVisible = true;
  isChannelScreenSubscriptionVisible = false;
  isPlatformUsageDetailsVisible = false;
  isPopupManageCorporateVisible = false;
  isPopupDetailsVisible = false;
  isPopupDivDetailsVisible = false;
  isPopupAddCorpDivVisible = false;
  isPopupAddNewCorpVisible = false;
  isPopupEditCorpVisible = false;
  isPopupAddUserVisible = false;
  isCorporateSelected = false;
  isCorporateSelected2 = false;
  isCorporateSelected3 = false;
  isPopupManageUserAccessVisible = false;
  isPopupAddUserAccessVisible = false;
  isPopupGrantUserAccessVisible = false;
  isPopupAllocateUserVisible = false;
  isAllocateUSerProfileVisible = false;
  isManageB2BUserDistributionVisible = false;
  isPaymentAndUsageDashboardVisible = false;
  isPopupPaymentWindowVisible = false;
  isPopupMakeUserPaymentVisible = false;
  isPopupViewInvoiceVisible = false;
  isPopupViewCartVisible = false;
  isActivatePayment = false;
  isManageD2CUserVisible = true;
  isManageTvBackofficeUsers = false;

  isPopupActivateUserVisible = false;
  isPopupDeActivateUserVisible = false;

  isBlacklistVisible = false;

  licenceQuantity = 10;

  todayDate: string = '';

  mobNumberForCredentials = ''

  selectedCorp = '';
  selectedDiv = '';

  newCorporate: Corporate = {
    channelid: '',
    corpName: '',
    address: '',
    contName: '',
    mobileNo: '',
    emailId: '',
  }

  newDivision: Division = {
    corpId: '',
    divName: '',
    contName: '',
    mobileNo: '',
    emailId: '',
  }

  showCart: CartDetails = {
    amountDueCalculated: 0,
    amountPaid: '',
    b2bCldtvDiscntAmt: '',
    b2bCldtvGstinAmt: '',
    b2bCldtvCartId: '',
    currency: '',
    id: ''
  }

  newCart: Order = {
    amount_Due_Calculated: 0,
    amount_paid: 0,
    currency: '',
    b2B_CLDTV_CART_ID: '',
    discount_Cost: '',
    gstiN_Cost: '',
    id: '',
    message: ''
  }

  blackistUser: Blacklist = {
    userId: '',
    channelId: '',
    reasonId: '',
    systemUser: ''
  }

  deactivateUser: Deactivate = {
    channelid: '',
    userid: '',
    reasonId: '',
    system_Userid: ''
  }

  cartDetail: B2BPackageDetails = {
    b2bCldtvDiscntPercntg: 0, 
    b2bCldtvGstinPercntg: 0,
    b2bCldtvPackCost: 0, 
    b2bCldtvPackname: '', 
    b2bCldtvTxnCurrency: '', 
    b2bCldtvUserLicnBoughtQuantity: 0, 
    b2bCldtvUsrLicnDuratnInDays: 0, 
    b2bFconctLicenceFlg: false,
    b2bIptvLicenseFlg: false,
  }

  invoiceDetails: InvoiceDetails = {
    amountPaidByCustomer: '', 
    batchGeneratedDateTime: '',
    channelOrgAddress: '', 
    channelOrgName: '', 
    channelOrgPincode: '', 
    channelServerDetails: '', 
    discountAmount: 0, 
    discountPercent: 0, 
    fconctLicenceFlg: false,
    gstAmount: 0, 
    gstPercent: 0, 
    iptvLicenseFlg: false, 
    licBatchNumber: '', 
    licenseBoughtQuantity: 0,
    licenseDurationInDays: 0, 
    licenseGenerated: 0, 
    orgAddress: '', 
    orgGstin: '', 
    orgLogo: '', 
    orgName: '', 
    orgSupportEmail: '', 
    orgSupportPhone: '', 
    packCost: 0, 
    packName: '', 
    paymentDoneFlg: false, 
    paymentMadeDate: null,
    paymentTransactionId: '', 
    performaInvoiceNumber: '', 
    totalPayableCost: 0, 
  }

  B2BChannelInvoices: Invoices[] = [];
  corporateArr: CorporateDetails[] = [];
  divisionsArr: CorporateDivisionDetails[] = [];

  corporateArr2: CorporateDetails[] = [];
  divisionsArr2: CorporateDivisionDetails[] = [];

  corporateArrAddB2B: CorporateDetails[] = [];
  divisionsArrAddB2B: CorporateDivisionDetails[] = [];

  subscriptionPlanList: CldtvChannelPlan[] = [];

  B2BSubscriberArr: B2BSubscriber[] = [];

  arrSubscriptionPackage: SubscriptionPackage[] = [];

  manageb2buser: ManageB2BUser = {
    channelid: '',
    corpId: '0',
    divId: '0',
    individual_Flg: false,
    corporate_Flg: false
  }

  newB2BUser: B2BUserDetails = {
    channelid: '',
    corpId: '0',
    divid: '0',
    pinNumber: '',
    first_Name: '',
    last_Name: '',
    mob_Numbr: '',
    genderid: '',
    emailid: '',
    prof_img: '',
    valid_Frm_Date: '',
    valid_to_Date: '',
    indi_Flg: true,
    corp_Flg: false
  }

  userForAllocation: B2BUser = {
    b2bCddtvSubcribrLastName: '',
    b2bCldtvSubscribrEmailId: '',
    b2bCldtvSubscribrFirstName: '',
    b2bCldtvSubscribrGenderId: '',
    b2bCldtvSubscribrProfImage: '',
    b2bCldtvSubscribrRegid: '',
    credential_Found: 0,
    valid_Frm_Date: '',
    valid_to_Date: '',
    indi_Flg: true,
    corp_Flg: false,
    corpId: '0',
    divid: '0',
    subRegId: "",
    channelId: "",
  }

  activeteLicence: ActivateLicenece = {
    channelid: '',
    userid: '',
    otT_Flg: false,
    fconcT_Flg: false,
    system_Userid: '',
    subs_Planid: '',
    invoiceid: ''
  }

  paymentDetails: PaymentDetails = {
    razpay_Signature: '',
    return_Orderid: '',
    paymt_Confirmatn_Flg: false,
    channelid: '',
    cartid: '',
    banK_TRANSFER_FLG: false,
    upI_PAYMNT_FLG: false,
    payablE_AMOUNT: 0,
    amounT_PAID_BY_CUSTMR: 0,
    paymenT_MADE_DATE: '',
    transid: ''
  }

  selectedPackageDetailsObj = {
    cldtvB2bSubsDiscountAvailableFlg: false,
    cldtvB2bSubsDiscountPercntg: 0,
    cldtvB2bSubsGstinPercentage: 0,
    cldtvB2bSubsPackCost: 0,
    cldtvB2bSubsPackId: '',
    cldtvB2bSubsPackName: '',
    cldtvB2bSubsPackValdDuratnDays: 0
  }

  base64Image = '';
  fileSize = '';
  mediaRunCount: number | string = 0;
  MAX_FILE_SIZE_MB = 1000000;

  slectedPurchaseTypePayment = '';

  isShowCartVisible = false;


  // ---------------------------------------------

  // it is just for testing

  initiatePayment(orderId: string, amount: number, cartID: string) {

    this.paymentDetails = {
      razpay_Signature: '',
      return_Orderid: '',
      paymt_Confirmatn_Flg: true,
      channelid: this.userData.accT_ID,
      cartid: cartID,
      banK_TRANSFER_FLG: true,
      upI_PAYMNT_FLG: false,
      payablE_AMOUNT: amount,
      amounT_PAID_BY_CUSTMR: amount,
      paymenT_MADE_DATE: new Date().toISOString(),
      transid: ''
    }

    console.log(this.paymentDetails)
    console.log("OrderId: ", orderId)
    console.log("Amount: ", amount)

    this.razorpayService.payWithRazorpay(orderId, amount);
    this.isShowCartVisible = false;
    this.isPopupPaymentWindowVisible = false;
    this.isPopupMakeUserPaymentVisible = false;
  }

  // ----------------------------------------------

  generatePDF() {
    const element = document.getElementById('invoiceForm'); // Select the form element
    if (element instanceof HTMLElement) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('invoice.pdf'); // Save the PDF with the name 'invoice.pdf'
      });
    } else {
      console.error('Element not found for PDF generation.');
    }
  }

  toggleBlacklistPopup(userID?: string) {

    if (userID) {
      this.blackistUser = {
        userId: userID,
        channelId: this.userData.accT_ID,
        reasonId: '',
        systemUser: this.userData.useR_ID
      }
    }

    this.isBlacklistVisible = !this.isBlacklistVisible;
  }


  async toggleShowCartPopup() {

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ShowChannelOpenCart/${this.userData.accT_ID}`

    try {
      const response = await firstValueFrom(this.http.get<any>(apiUrl));

      console.log("New responce: ", response)

      this.showCart = {
        amountDueCalculated: response.amountDueCalculated,
        amountPaid: response.amountPaid,
        b2bCldtvDiscntAmt: response.b2bCldtvDiscntAmt,
        b2bCldtvGstinAmt: response.b2bCldtvGstinAmt,
        b2bCldtvCartId: response.b2bCldtvCartId,
        currency: response.currency,
        id: response.id
      }

      console.log("Responce: ", this.showCart);

      this.isShowCartVisible = !this.isShowCartVisible

    } catch (error) {
      console.log(error);
      this.showSnackbar("Your cart is Empty.");
    }

  }

  async deleteCart(number?: number) {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/DeleteChannelCart/${this.userData.accT_ID}`

    try {
      const response = await firstValueFrom(this.http.get<any>(apiUrl));
      console.log(response);

    } catch (error: any) {

      if (error.error.text === "Cart is deleted Successfully") {
        this.showSnackbar("Your cart has been deleted successfully.")
      } else {
        console.log(error);
        this.showSnackbar("Some error while deleting the cart.")
      }
    }

    if (number == -1) {
      this.isPopupPaymentWindowVisible = !this.isPopupPaymentWindowVisible
    } else {
      this.isShowCartVisible = !this.isShowCartVisible
    }

  }

  increaseQuantity() {
    this.licenceQuantity += 25;
  }

  decreaseQuantity() {
    if (this.licenceQuantity - 25 >= 10)
      this.licenceQuantity -= 25;
  }

  async onSelectReason(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Plan:', selectedValue);

    this.blackistUser.reasonId = selectedValue;
    this.deactivateUser.reasonId = selectedValue;
  }

  async onLicenceTypeSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Plan:', selectedValue);

    if (selectedValue === 'iptv') {
      this.activeteLicence.otT_Flg = true;
      this.activeteLicence.fconcT_Flg = false;
    } else if (selectedValue === 'face') {
      this.activeteLicence.otT_Flg = false;
      this.activeteLicence.fconcT_Flg = true;
    }

  }

  async DeactivateUser(formRef: NgForm) {
    if (formRef.invalid) {
      return;
    }

    console.log("Deactivate user: ", this.deactivateUser)

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/DeactivateCLDTVuser`

    try {
      const response = await firstValueFrom(this.http.post<[]>(apiUrl, this.deactivateUser));
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async BlacklistUser(formRef: NgForm) {
    if (formRef.invalid) {
      return;
    }

    console.log("Blackist user: ", this.blackistUser)

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/BlacklistCustomer`

    try {
      const response = await firstValueFrom(this.http.post<[]>(apiUrl, this.blackistUser));
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async ActivateLicence(formRef: NgForm) {

    if (formRef.invalid) {
      return;
    }

    console.log(this.activeteLicence);

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ActivateNewUserLicense`

    try {
      const response = await firstValueFrom(this.http.post<SubscriptionPackage[]>(apiUrl, this.activeteLicence));
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    this.isPopupActivateUserVisible = !this.isPopupActivateUserVisible;

  }

  async onPlanSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Plan:', selectedValue);

    if (selectedValue === 'iptv') {
      this.slectedPurchaseTypePayment = 'iptv'
    } else if (selectedValue === 'face') {
      this.slectedPurchaseTypePayment = 'face'
    }

    const data = {
      channelId: this.userData.accT_ID,
      iptV_LICENSE_Flg: this.slectedPurchaseTypePayment == 'iptv',
      fconcT_LICENSE_Flg: this.slectedPurchaseTypePayment == 'face'
    }

    console.log(data)

    this.arrSubscriptionPackage = [];

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GeLicensePackages`;

    try {
      const response = await firstValueFrom(this.http.post<SubscriptionPackage[]>(apiUrl, data)); // Expecting an array

      this.arrSubscriptionPackage = response.map(pkg => ({
        cldtvB2bSubsDiscountAvailableFlg: pkg.cldtvB2bSubsDiscountAvailableFlg,
        cldtvB2bSubsDiscountPercntg: pkg.cldtvB2bSubsDiscountPercntg,
        cldtvB2bSubsGstinPercentage: pkg.cldtvB2bSubsGstinPercentage,
        cldtvB2bSubsPackCost: pkg.cldtvB2bSubsPackCost,
        cldtvB2bSubsPackId: pkg.cldtvB2bSubsPackId,
        cldtvB2bSubsPackName: pkg.cldtvB2bSubsPackName,
        cldtvB2bSubsPackValdDuratnDays: pkg.cldtvB2bSubsPackValdDuratnDays
      }));

      console.log('Mapped Subscription Packages:', this.arrSubscriptionPackage);


    } catch (error) {
      this.arrSubscriptionPackage = [];
      this.slectedPurchaseTypePayment = 'no packages';
      console.error("Error in getting packages:", error);
    }
  }

  ActivatePayment() {
    this.isActivatePayment = true;
  }

  async toggleActivateUserPopup(userID?: string) {

    if (userID) {
      this.activeteLicence = {
        channelid: this.userData.accT_ID,
        userid: userID,
        otT_Flg: false,
        fconcT_Flg: false,
        system_Userid: this.userData.useR_ID,
        subs_Planid: '',
        invoiceid: ''
      }

      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetChannelSubscriptionList/${this.userData.accT_ID}`

      try {
        const response = await firstValueFrom(this.http.get<[CldtvChannelPlan]>(apiUrl));

        this.subscriptionPlanList = response.map(pkg => ({
          cldtvChanelDuratnDays: pkg.cldtvChanelDuratnDays,
          cldtvChanelPlanCost: pkg.cldtvChanelPlanCost,
          cldtvChanelSubsPlanName: pkg.cldtvChanelSubsPlanName,
          cldtvChanlPlanDiscountFigr: pkg.cldtvChanlPlanDiscountFigr,
          cldtvChanlPlanGstPercntg: pkg.cldtvChanlPlanGstPercntg,
          cldtvChanlelAtchComboId: pkg.cldtvChanlelAtchComboId,
          cldtvChanlelSubsPlanid: pkg.cldtvChanlelSubsPlanid,
          cldtvFconctLicInclFlg: pkg.cldtvFconctLicInclFlg,
          cldtvIptvLicInclFlg: pkg.cldtvIptvLicInclFlg
        }));

        console.log("Subscription Plan List: ", this.subscriptionPlanList)

      } catch (error) {
        console.log(error)
      }

    }

    this.isPopupActivateUserVisible = !this.isPopupActivateUserVisible
  }

  toggleDeActivateUserPopup(userId?: string) {

    if (userId) {
      this.deactivateUser = {
        channelid: this.userData.accT_ID,
        userid: userId,
        reasonId: '',
        system_Userid: this.userData.useR_ID
      }
    }

    this.isPopupDeActivateUserVisible = !this.isPopupDeActivateUserVisible
  }

  async togglePopupViewInvoiceVisible(InvoiceNumber?: string|null) {

    if(InvoiceNumber){
      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ViewChannelInvoice/${this.userData.accT_ID}/${InvoiceNumber}`

      try {
        const res = await firstValueFrom(this.http.get<InvoiceDetails>(apiUrl))

        this.invoiceDetails = res;

        console.log("responce: ", this.invoiceDetails)
      } catch (error) {
        console.log(error)
      }
    }

    this.isPopupViewInvoiceVisible = !this.isPopupViewInvoiceVisible;
  }

  currentCart = ''
  async togglePopupViewCartVisible(cartId?: string) {

    if(cartId){
      this.currentCart = cartId;
      
      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ShowChannelPAYMNTCartDetail/${cartId}`
  
      try {
        const res = await firstValueFrom(this.http.get<B2BPackageDetails>(apiUrl))

        this.cartDetail = {
          b2bCldtvDiscntPercntg: res.b2bCldtvDiscntPercntg,
          b2bCldtvGstinPercntg: res.b2bCldtvGstinPercntg,
          b2bCldtvPackCost: res.b2bCldtvPackCost,
          b2bCldtvPackname: res.b2bCldtvPackname,
          b2bCldtvTxnCurrency: res.b2bCldtvTxnCurrency,
          b2bCldtvUserLicnBoughtQuantity: res.b2bCldtvUserLicnBoughtQuantity,
          b2bCldtvUsrLicnDuratnInDays: res.b2bCldtvUsrLicnDuratnInDays,
          b2bFconctLicenceFlg: res.b2bFconctLicenceFlg,
          b2bIptvLicenseFlg: res.b2bIptvLicenseFlg,
        };

        console.log("responce: ", this.cartDetail)
      } catch (error) {
        console.log(error)
      }
    }

    this.isPopupViewCartVisible = !this.isPopupViewCartVisible;
  }

  toggleGetChannelInvoicePopup() {
    this.isGetChannelInvoiceVisible = true;
    this.isChannelScreenSubscriptionVisible = false;
    this.isPlatformUsageDetailsVisible = false;
  }

  toggleChannelScreenSubscriptionPopup() {
    this.isGetChannelInvoiceVisible = false;
    this.isChannelScreenSubscriptionVisible = true;
    this.isPlatformUsageDetailsVisible = false;
  }

  togglePlatformUsageDetailsPopup() {
    this.isGetChannelInvoiceVisible = false;
    this.isChannelScreenSubscriptionVisible = false;
    this.isPlatformUsageDetailsVisible = true;
  }

  async toggleAllocateUserProfilePopup() {
    if (!this.mobNumberForCredentials) {
      console.error("Mobile number is undefined or empty.");
      this.showSnackbar("Mobile number is required.");
      return;
    }

    this.mobNumberForCredentials = this.mobNumberForCredentials.trim();

    console.log("Ye he mob number: ", this.mobNumberForCredentials);

    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetB2BUserCredentials/${this.mobNumberForCredentials}`;

    try {
      const response = await firstValueFrom(this.http.get<B2BUser[]>(apiUrl)); // Expecting an array

      if (!Array.isArray(response) || response.length === 0) {
        throw new Error("Empty or invalid response format.");
      }

      const userData = response[0];

      this.userForAllocation = {
        b2bCddtvSubcribrLastName: userData.b2bCddtvSubcribrLastName || "",
        b2bCldtvSubscribrEmailId: userData.b2bCldtvSubscribrEmailId || "",
        b2bCldtvSubscribrFirstName: userData.b2bCldtvSubscribrFirstName || "",
        b2bCldtvSubscribrGenderId: userData.b2bCldtvSubscribrGenderId || "",
        b2bCldtvSubscribrProfImage: "http://www.shripatigroup.com/" + userData.b2bCldtvSubscribrProfImage.substring(2) || "",
        b2bCldtvSubscribrRegid: userData.b2bCldtvSubscribrRegid || "",
        credential_Found: userData.credential_Found || 0,
        valid_Frm_Date: '',
        valid_to_Date: '',
        indi_Flg: true,
        corp_Flg: false,
        corpId: '0',
        divid: '0',
        subRegId: this.userData.useR_ID,
        channelId: this.userData.accT_ID
      };

      console.log("User credentials fetched successfully:", this.userForAllocation);
    } catch (error) {
      console.error("Error in getting credentials of user:", error);
      this.showSnackbar("Failed to get user credentials. Please try again.");
    }

    this.isAllocateUSerProfileVisible = !this.isAllocateUSerProfileVisible;
  }

  toggleCloseAllocateUserProfilePopup() {
    this.isCorporateSelected3 = false;
    this.isAllocateUSerProfileVisible = !this.isAllocateUSerProfileVisible;
  }

  toggleAllocateUserPopup() {
    this.mobNumberForCredentials = '';
    this.isPopupAllocateUserVisible = !this.isPopupAllocateUserVisible;
  }

  toggleGrantUserAccessPopup() {
    this.isPopupGrantUserAccessVisible = !this.isPopupGrantUserAccessVisible;
  }

  toggleAddUserAccessPopup() {
    this.isPopupAddUserAccessVisible = !this.isPopupAddUserAccessVisible;
  }

  CorporateSelected3() {
    this.userForAllocation.indi_Flg = false;
    this.userForAllocation.corp_Flg = true;

    this.isCorporateSelected3 = true;

    this.fetchCorporate(3)
  }

  CorporateUnSelected3() {
    this.userForAllocation.indi_Flg = true;
    this.userForAllocation.corp_Flg = false;
    this.userForAllocation.corpId = '0';
    this.userForAllocation.divid = '0';

    this.isCorporateSelected3 = false;

    this.corporateArr2 = [];
    this.divisionsArr2 = [];
  }

  CorporateSelected2() {
    this.isCorporateSelected2 = true;
  }

  CorporateUnSelected2() {
    this.isCorporateSelected2 = false;
    this.newB2BUser.corpId = '';
    this.newB2BUser.divid = '';
  }

  CorporateSelected() {
    this.isCorporateSelected = true;
    this.newB2BUser.indi_Flg = false;
    this.newB2BUser.corp_Flg = true;

    this.newB2BUser.corpId = this.corporateArrAddB2B.length > 0 ? this.corporateArrAddB2B[0].cldtvCorpId : '0';
    this.newB2BUser.divid = this.divisionsArrAddB2B.length > 0 ? this.divisionsArrAddB2B[0].cldtvDivId : '0';
  }

  CorporateUnSelected() {
    this.isCorporateSelected = false;
    this.newB2BUser.indi_Flg = true;
    this.newB2BUser.corp_Flg = false;
    this.newB2BUser.corpId = '0'
    this.newB2BUser.divid = '0'
  }

  toggleCorpUserPopup() {
    this.isCorpUserVisible = true;
    this.isNonCorpUserVisible = false;
  }

  toggleNonCorpUserPopup() {
    this.isCorpUserVisible = false;
    this.isNonCorpUserVisible = true;
  }

  formatDate(dateString: string|null): string {
    if (!dateString) return ''; 
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Extract last two digits of the year
    return `${day}-${month}-${year}`;
  }


  async toggleManageUserAccessCorpPopup(Subscriber?: B2BSubscriber) {

    if (Subscriber) {

      const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetUserAccess/${this.userData.accT_ID}/${Subscriber.b2bCldtvSubscribrId}`;
      try {
        const res = await firstValueFrom(this.http.get<any[]>(apiUrl))
        console.log("responceeee: ", res)
      } catch (error) {
        console.log(error)
      }
    }

    this.isPopupManageUserAccessVisible = !this.isPopupManageUserAccessVisible;
  }

  toggleAddUserCorpPopup() {

    this.newB2BUser = {
      channelid: this.userData.accT_ID,
      corpId: '0',
      divid: '0',
      pinNumber: '',
      first_Name: '',
      last_Name: '',
      mob_Numbr: '',
      genderid: '',
      emailid: '',
      prof_img: '',
      valid_Frm_Date: '',
      valid_to_Date: '',
      indi_Flg: true,
      corp_Flg: false
    }

    this.isPopupAddUserVisible = !this.isPopupAddUserVisible;
  }

  toggleEditCorpPopup() {
    this.isPopupEditCorpVisible = !this.isPopupEditCorpVisible;
  }

  toggleAddNewCorpPopup() {

    this.newCorporate = {
      channelid: this.userData.accT_ID,
      corpName: '',
      address: '',
      contName: '',
      mobileNo: '',
      emailId: '',
    }

    this.isPopupAddNewCorpVisible = !this.isPopupAddNewCorpVisible;
  }

  toggleAddCorpDivPopup(corporate?: CorporateDetails) {

    if (corporate) {
      this.newDivision = {
        corpId: corporate.cldtvCorpId,
        divName: '',
        contName: '',
        mobileNo: '',
        emailId: '',
      }
    }

    this.isPopupAddCorpDivVisible = !this.isPopupAddCorpDivVisible;
  }

  toggleDetailsPopup() {
    this.isPopupDetailsVisible = !this.isPopupDetailsVisible;
  }

  toggleDivDetailsPopup() {
    this.isPopupDivDetailsVisible = !this.isPopupDivDetailsVisible;
  }

  toggleManageB2BUserPopup() {
    this.isManageB2BUserDistributionVisible = false;
    this.isManageB2BUserScreenVisible = true;
    this.isPaymentAndUsageDashboardVisible = false;
    this.isManageD2CUserVisible = false;
    this.isManageTvBackofficeUsers = false;
  }

  toggleManageB2BUserDistributionWindowPopup() {
    this.slectedPurchaseTypePayment = '';

    this.isManageB2BUserDistributionVisible = true;
    this.isManageB2BUserScreenVisible = false;
    this.isPaymentAndUsageDashboardVisible = false;
    this.isManageD2CUserVisible = false;
    this.isManageTvBackofficeUsers = false;
  }

  async togglePaymentAndUsageDashboardWindowPopup() {
    this.getChannelInvoices(); // fetch invoices

    this.isManageB2BUserDistributionVisible = false;
    this.isManageB2BUserScreenVisible = false;
    this.isPaymentAndUsageDashboardVisible = true;
    this.isManageD2CUserVisible = false;
    this.isManageTvBackofficeUsers = false;
  }

  toggleManadeD2CUsers() {
    this.isManageB2BUserDistributionVisible = false;
    this.isManageB2BUserScreenVisible = false;
    this.isPaymentAndUsageDashboardVisible = false;
    this.isManageD2CUserVisible = true;
    this.isManageTvBackofficeUsers = false;
  }

  toggleManageTvBacofficeUsers() {
    this.isManageB2BUserDistributionVisible = false;
    this.isManageB2BUserScreenVisible = false;
    this.isPaymentAndUsageDashboardVisible = false;
    this.isManageD2CUserVisible = false;
    this.isManageTvBackofficeUsers = true;
  }

  toggleManageCorporatePopup() {
    this.isPopupManageCorporateVisible = !this.isPopupManageCorporateVisible;
  }

  async togglePaymentWindowPopup(number?: number) {

    if (number == -1) {
      this.isPopupPaymentWindowVisible = !this.isPopupPaymentWindowVisible
      this.isPopupMakeUserPaymentVisible = !this.isPopupMakeUserPaymentVisible
    } else {
      if (this.selectedPackage === '') {
        this.showSnackbar("Please select a Package to proceed.")
      } else {
        const data = {
          channelId: this.userData.accT_ID,
          packId: this.selectedPackage,
          quantity: this.licenceQuantity,
          user_Licence_Flg: this.slectedPurchaseTypePayment === 'iptv',
          user_FCONCT_Flg: this.slectedPurchaseTypePayment === 'face'
        }

        console.log("Data: ", data);

        const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ChannelCheckoutPortal`;
        try {
          const res = await firstValueFrom(this.http.post<any>(apiUrl, data))

          console.log("New responce: ", res)

          this.newCart = {
            amount_Due_Calculated: res.amount_Due_Calculated,
            amount_paid: res.amount_paid,
            currency: res.currency,
            b2B_CLDTV_CART_ID: res.b2B_CLDTV_CART_ID,
            discount_Cost: res.discount_Cost,
            gstiN_Cost: res.gstiN_Cost,
            id: res.id,
            message: res.message
          }

          console.log("responce: ", this.newCart)

          this.isPopupPaymentWindowVisible = !this.isPopupPaymentWindowVisible;
          this.isActivatePayment = false;
        } catch (error: any) {
          console.log(error.error.text)
          this.showSnackbar("You have a pending cart. Please complete the payment or delete it to create a new one.")
          this.isPopupMakeUserPaymentVisible = !this.isPopupMakeUserPaymentVisible;
        }

      }
    }
  }

  formatDateToSixDigits(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with 0
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`; // Combine into DDMMYY format
  }

  async getChannelInvoices() {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/Getb2BhanneInvoices/${this.userData.accT_ID}`;
    try {
      const res = await firstValueFrom(this.http.get<any>(apiUrl))

      this.B2BChannelInvoices = res.map((invoice: Invoices) => ({
        cartClosedFlagDateTime: invoice.cartClosedFlagDateTime,
        cartId: invoice.cartId,
        customerInvoiceNumber: invoice.customerInvoiceNumber,
      }));

      console.log("responce: ", this.B2BChannelInvoices)

    } catch (error) {
      console.log(error)
    }
  }

  slectedPackageDetails() {

    this.selectedPackageDetailsObj = this.arrSubscriptionPackage.find(
      (pkg) => pkg.cldtvB2bSubsPackId === this.selectedPackage
    ) || {
      cldtvB2bSubsDiscountAvailableFlg: false,
      cldtvB2bSubsDiscountPercntg: 0,
      cldtvB2bSubsGstinPercentage: 0,
      cldtvB2bSubsPackCost: 0,
      cldtvB2bSubsPackId: '',
      cldtvB2bSubsPackName: '',
      cldtvB2bSubsPackValdDuratnDays: 0
    };

    console.log('Selected Package Details:', this.selectedPackageDetailsObj);
  }

  selectedPackage = '';

  toggleMakeUserPaymentPopup(number?: number) {

    this.selectedPackageDetailsObj = {
      cldtvB2bSubsDiscountAvailableFlg: false,
      cldtvB2bSubsDiscountPercntg: 0,
      cldtvB2bSubsGstinPercentage: 0,
      cldtvB2bSubsPackCost: 0,
      cldtvB2bSubsPackId: '',
      cldtvB2bSubsPackName: '',
      cldtvB2bSubsPackValdDuratnDays: 0
    }

    this.arrSubscriptionPackage = [];

    this.selectedPackage = ''

    if (number == -1) {
      this.isPopupMakeUserPaymentVisible = !this.isPopupMakeUserPaymentVisible;
    } else {
      this.isPopupMakeUserPaymentVisible = !this.isPopupMakeUserPaymentVisible;
    }
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async AllocateUser() {
    console.log("User to be allocated: ", this.userForAllocation);


    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AllocateUsertoChannel';

    const data = {
      subRegId: this.userForAllocation.subRegId,
      channelId: this.userForAllocation.channelId,
      corpId: this.userForAllocation.corpId,
      divid: this.userForAllocation.divid,
      valid_Frm_Date: new Date(this.userForAllocation.valid_Frm_Date).toISOString(),
      valid_to_Date: new Date(this.userForAllocation.valid_to_Date).toISOString(),
      indi_Flg: this.userForAllocation.indi_Flg,
      corp_Flg: this.userForAllocation.corp_Flg
    }

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, data));

      console.log(response);

    } catch (error: any) {
      console.error("Error Allocating B2B User:", error);

      const errorMessage = error?.error ?? "";
      console.log(errorMessage.text)

      if (errorMessage.text === "Subscriber is already Allocated to Channel") {
        this.showSnackbar("Subscriber is already Allocated to Channel");
      } else {
        this.showSnackbar("Failed to Allocate B2B User. Please try again.");
      }
    }

    this.isAllocateUSerProfileVisible = !this.isAllocateUSerProfileVisible;
    this.isPopupAllocateUserVisible = !this.isPopupAllocateUserVisible;
    this.isCorporateSelected3 = false;
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


  async fetchDivisions(selectedValue: string, type: number) {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetCorpDivisions/${selectedValue}`;
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));

      if (type == 1) {

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

      } else if (type == 2) {

        this.divisionsArrAddB2B = res.map(item => ({
          cldtvCorpId: item.cldtvCorpId,
          cldtvDivActivFlg: item.cldtvDivActivFlg,
          cldtvDivConName: item.cldtvDivConName,
          cldtvDivContEmailid: item.cldtvDivContEmailid,
          cldtvDivContMobNumbr: item.cldtvDivContMobNumbr,
          cldtvDivId: item.cldtvDivId
        }))

        this.newB2BUser.divid = this.divisionsArrAddB2B.length > 0 ? this.divisionsArrAddB2B[0].cldtvDivId : '';

        console.log(`all division for corid ${selectedValue}: `, this.divisionsArrAddB2B)

      } else if (type == 3) {
        this.divisionsArr2 = res.map(item => ({
          cldtvCorpId: item.cldtvCorpId,
          cldtvDivActivFlg: item.cldtvDivActivFlg,
          cldtvDivConName: item.cldtvDivConName,
          cldtvDivContEmailid: item.cldtvDivContEmailid,
          cldtvDivContMobNumbr: item.cldtvDivContMobNumbr,
          cldtvDivId: item.cldtvDivId
        }))

        console.log(`all division for corid ${selectedValue}: `, this.divisionsArr)

        this.userForAllocation.divid = this.divisionsArr2[0].cldtvDivId;
      }


    } catch (error) {
      console.error(error);
      // this.showSnackbar('No divisions for this corp');
    }
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
    this.newB2BUser.divid = selectedDivision;
    console.log('Selected DivId:', selectedDivision);

  }

  async onSelectCorporate2(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    const selectedItem = this.corporateArr[+selectedIndex]; // Retrieve the full object based on the index
    console.log('Selected Corp:', selectedItem);

    this.userForAllocation.corpId = selectedItem.cldtvCorpId;

    this.divisionsArr2 = [];

    this.fetchDivisions(selectedItem.cldtvCorpId, 3);
  }


  async onSelectDivision2(event: Event) {
    const selectedDivision = (event.target as HTMLSelectElement).value;
    this.userForAllocation.divid = selectedDivision;
    console.log('Selected DivId:', selectedDivision);
  }

  async onSelectAddCorporate(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).value;
    const selectedItem = this.corporateArr[+selectedIndex]; // Retrieve the full object based on the index
    console.log('Selected Corp:', selectedItem);

    this.newB2BUser.corpId = selectedItem.cldtvCorpId;
    this.newB2BUser.divid = '';

    this.divisionsArr = [];

    this.fetchDivisions(selectedItem.cldtvCorpId, 2);
  }


  async onSelectAddDivision(event: Event) {
    const selectedDivision = (event.target as HTMLSelectElement).value;
    console.log('Selected DivId:', selectedDivision);

    this.newB2BUser.divid = selectedDivision;

  }

  async addCorporate(formRef: NgForm) {
    if (formRef.invalid) {
      return; // Stop form submission if invalid
    }

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddB2BCorporate';

    console.log("new corporate: ", this.newCorporate)

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, this.newCorporate));
      console.log("Corporate added  successfully:", response);
      this.showSnackbar("Corporate added  successfully");

    } catch (error) {
      console.error("Error Adding Corporate:", error);
      this.showSnackbar("Failed to Add Corporate. Please try again.");
    }

    this.isPopupAddNewCorpVisible = !this.isPopupAddNewCorpVisible;
    this.fetchCorporate(1)
  }

  validFromDate: string = '';

  formatValidFromDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.value) {
      const date = new Date(input.value);
      this.newB2BUser.valid_Frm_Date = date.toISOString();
      console.log(this.newB2BUser.valid_Frm_Date);
    }
  }

  validToDate: string = '';

  formatValidToDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.value) {
      const date = new Date(input.value);
      this.newB2BUser.valid_to_Date = date.toISOString();
      console.log(this.newB2BUser.valid_to_Date);
    }
  }

  async addB2BUser(formRef: NgForm) {
    if (formRef.invalid) {
      return; // Stop form submission if invalid
    }
    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddB2BUser';

    console.log("New B2B User: ", this.newB2BUser)

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, this.newB2BUser));
      console.log("B2B User added  successfully:", response);
      this.showSnackbar("B2B User added  successfully");

    } catch (error: any) {

      if (error.error.text === "Individual user is added Successfully")
        this.showSnackbar("B2B User added  successfully");
      else {
        console.error("Error Adding B2B User:", error);
        this.showSnackbar("Failed to Add B2B User. Please try again.");
        console.error("res:", error.error.text);
      }

    }

    this.isPopupAddUserVisible = !this.isPopupAddUserVisible;
  }

  async addCorporateDivision(formRef: NgForm) {

    if (formRef.invalid) {
      return;
    }

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/AddCorpDivision';

    console.log("new div: ", this.newDivision)

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, this.newDivision));
      console.log("Corporate Div. added  successfully:", response);
      this.showSnackbar("Corporate Div. added  successfully");

    } catch (error: any) {
      console.error("res:", error.error.text);

      if (error.error.text === "Division Already Present")
        this.showSnackbar("This Corporate Div. is already added.");

      if (error.error.text === "Division is Added Successfully")
        this.showSnackbar("Corporate Div. added Successfully.");
    }

    this.isPopupAddCorpDivVisible = !this.isPopupAddCorpDivVisible;
  }

  async fetchCorporate(type: number): Promise<void> {
    const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/GetB2BCorporates/${this.userData.accT_ID}`; // to chnage the channelid
    console.log("fetchCorporate: ", apiUrl)
    try {
      const res = await firstValueFrom(this.http.get<any[]>(apiUrl));
      console.log(res)

      if (type == 1) { // this is for page
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
      } else if (type == 2) { // this is for add b2b user
        this.corporateArrAddB2B = res.map(item => ({
          cldtvCorpAddress: item.cldtvCorpAddress,
          cldtvCorpContEmailid: item.cldtvCorpContEmailid,
          cldtvCorpContMobNumbr: item.cldtvCorpContMobNumbr,
          cldtvCorpContPerson: item.cldtvCorpContPerson,
          cldtvCorpEnrolmentActivFlg: item.cldtvCorpEnrolmentActivFlg,
          cldtvCorpId: item.cldtvCorpId,
          cldtvCorpName: item.cldtvCorpName,
        }));

        console.log("all corporates: ", this.corporateArr)

        this.newB2BUser.corpId = this.corporateArr[0].cldtvCorpId;

        this.divisionsArrAddB2B = [];
        await this.fetchDivisions(this.newB2BUser.corpId, 2);
      } else if (type == 3) { // this is for add b2b user
        this.corporateArr2 = res.map(item => ({
          cldtvCorpAddress: item.cldtvCorpAddress,
          cldtvCorpContEmailid: item.cldtvCorpContEmailid,
          cldtvCorpContMobNumbr: item.cldtvCorpContMobNumbr,
          cldtvCorpContPerson: item.cldtvCorpContPerson,
          cldtvCorpEnrolmentActivFlg: item.cldtvCorpEnrolmentActivFlg,
          cldtvCorpId: item.cldtvCorpId,
          cldtvCorpName: item.cldtvCorpName,
        }));

        console.log("all corporates: ", this.corporateArr2)

        this.userForAllocation.corpId = this.corporateArr2[0].cldtvCorpId;

        this.divisionsArr2 = [];
        await this.fetchDivisions(this.userForAllocation.corpId, 3);
      }

    } catch (error) {
      console.error(error);
      // this.showSnackbar('No Corporate');
    }
  }

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.MAX_FILE_SIZE_MB) {
        this.resetMediaSelection();
        this.showSnackbar('Please upload a file less than 100 MB.');
        return;
      }

      this.fileSize = `${fileSizeMB.toFixed(1)} MB`;
      this.base64Image = await this.readFileAsBase64(file);
      this.base64Image = this.base64Image.replace(/^data:.*;base64,/, '');
      console.log("After replacing :", this.base64Image)
      this.newB2BUser.prof_img = this.base64Image || '';

    }
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


  async onPymentSuccess() {

    const apiUrl = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/ChannelSidePayment';

    const data = {
      channelid: this.userData.accT_ID,
      cartid: "string",
      banK_TRANSFER_FLG: true,
      upI_PAYMNT_FLG: true,
      payablE_AMOUNT: 0,
      amounT_PAID_BY_CUSTMR: 0,
      paymenT_MADE_DATE: "2025-02-13T23:36:01.286Z",
      transid: "string"
    }

    try {
      const response = await firstValueFrom(this.http.post(apiUrl, data));

      console.log(response);

    } catch (error: any) {
      console.log(error)
    }


  }

  cloyePaymentSuccessScreen() {
    this.showPaymentStatusPopup = false;
    this.showPaymentStatusTypePopup = false;
  }

  showPaymentStatusPopup: boolean = false;
  showPaymentStatusTypePopup: boolean = false;
  paymentStatus: any;

  ngOnInit(): void {

    this.paymentStatusService.paymentStatus$.subscribe(async status => {
      if (status) {
        this.paymentStatus = status;
        this.showPaymentStatusPopup = true;
        this.showPaymentStatusTypePopup = status.success;

        this.cdr.detectChanges();

        if (status.success) {
          const apiUrl = `http://www.shripatigroup.com/ADMedia/api/ADMedia/ChannelSidePayment`

          this.paymentDetails = {
            ...this.paymentDetails,
            razpay_Signature: status.paymentSignature,
            return_Orderid: status.orderId,
            transid: status.paymentId
          }

          try {
            const response = await firstValueFrom(this.http.post(apiUrl, this.paymentDetails));

            console.log(response);

          } catch (error: any) {
            console.log(error)
          }

          console.log("Payment Details After Successful Payment: ", this.paymentDetails)

        }

        console.log("Payment status: ", this.paymentStatus)
        console.log("PopUp dhikhana he: ", this.showPaymentStatusPopup)
        console.log("showPaymentStatusTypePopup: ", this.showPaymentStatusTypePopup)

      }
    });

    this.todayDate = new Date().toISOString().split('T')[0];

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

    this.fetchCorporate(1)
    this.fetchCorporate(2)
  }

}