import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ImageSliderComponent } from "../image-slider/image-slider.component";
import { LoginComponent } from "../login/login.component";
import { MeiaAndLivestreamComponent } from '../login/meia-and-livestream/meia-and-livestream.component';
import { MicroChannelsComponent } from '../login/micro-channels/micro-channels.component';
import { TvAndOttViewersComponent } from '../login/tv-and-ott-viewers/tv-and-ott-viewers.component';
import { TvManufacturesComponent } from '../login/tv-manufactures/tv-manufactures.component';
import { BrandsForMarketersComponent } from '../login/brands-for-marketers/brands-for-marketers.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RetailBusinessComponent } from "../login/retail-business/retail-business.component";
import { SupplySideComponent } from '../TandC/supply-side/supply-side.component';
import { DemandSideComponent } from '../TandC/demand-side/demand-side.component';
import { PrivatePolicyComponent } from '../Policies/private-policy/private-policy.component';
import { CancellationRefundComponent } from '../Policies/cancellation-refund/cancellation-refund.component';
import { LicenceDeliveryComponent } from '../Policies/licence-delivery/licence-delivery.component';
import { ContactComponent } from '../Contact/contact/contact.component';
import { IptvComponent } from '../Products/iptv/iptv.component';
import { DoohComponent } from '../Products/dooh/dooh.component';
import { LicencePricingComponent } from '../Products/licence-pricing/licence-pricing.component';
import { SupportComponent } from '../Support/support/support.component';
import { ADCampaignsComponent } from '../components/adcampaigns/adcampaigns.component';
import { DSPPlatformComponent } from '../components/dspplatform/dspplatform.component';
import { MODOOHServiceComponent } from '../components/modoohservice/modoohservice.component';
import { DigitalConsultationComponent } from '../components/digital-consultation/digital-consultation.component';
import { ADOperationsComponent } from '../components/adoperations/adoperations.component';
import { ADMonetizationComponent } from '../components/admonetization/admonetization.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ImageSliderComponent, SupportComponent, LicencePricingComponent, DoohComponent, IptvComponent, ContactComponent, PrivatePolicyComponent, CancellationRefundComponent, LicenceDeliveryComponent, SupplySideComponent, DemandSideComponent, TvManufacturesComponent, TvAndOttViewersComponent, MicroChannelsComponent, MeiaAndLivestreamComponent, BrandsForMarketersComponent, LoginComponent, RouterOutlet, RouterLink, RouterLinkActive, NgClass, NgIf, RetailBusinessComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  @ViewChild('dialogTemplateForBrands') dialogTemplateForBrands!: TemplateRef<any>;
  @ViewChild('dialogTemplateForRetail') dialogTemplateForRetail!: TemplateRef<any>;
  @ViewChild('dialogTemplateForLogin') dialogTemplateForLogin!: TemplateRef<any>;
  @ViewChild('dialogTemplateForMediaLivestream') dialogTemplateForMediaLivestream!: TemplateRef<any>;
  @ViewChild('dialogTemplateForTvManufactures') dialogTemplateForTvManufactures!: TemplateRef<any>;
  @ViewChild('dialogTemplateForMicroChannels') dialogTemplateForMicroChannels!: TemplateRef<any>;
  @ViewChild('dialogTemplateForTvOttViewers') dialogTemplateForTvOttViewers!: TemplateRef<any>;
  @ViewChild('dialogTemplateForDemanSide') dialogTemplateForDemanSide!: TemplateRef<any>;
  @ViewChild('dialogTemplateForSupplySide') dialogTemplateForSupplySide!: TemplateRef<any>;

  @ViewChild('dialogTemplateForPrivacyPolicy') dialogTemplateForPrivacyPolicy!: TemplateRef<any>;
  @ViewChild('dialogTemplateForCancellationRefund') dialogTemplateForCancellationRefund!: TemplateRef<any>;
  @ViewChild('dialogTemplateForLicenceDelivery') dialogTemplateForLicenceDelivery!: TemplateRef<any>;

  @ViewChild('dialogTemplateForContact') dialogTemplateForContact!: TemplateRef<any>;

  @ViewChild('dialogTemplateForSupport') dialogTemplateForSupport!: TemplateRef<any>;

  @ViewChild('dialogTemplateForIPTV') dialogTemplateForIPTV!: TemplateRef<any>;
  @ViewChild('dialogTemplateForDOOH') dialogTemplateForDOOH!: TemplateRef<any>;
  @ViewChild('dialogTemplateForLicencePricing') dialogTemplateForLicencePricing!: TemplateRef<any>;

  dialogRef!: MatDialogRef<any>;
  carouselInterval: any;

  isMenuOpen = false;
  isLoginVisible: boolean = false;
  isSolutionsVisible: boolean = false;
  isDropdownVisibleForSolution: boolean = false;
  isDropdownVisibleForTC: boolean = false;
  isDropdownVisibleForPolicies: boolean = false;
  isDropdownVisibleForProducts: boolean = false;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.checkRoute();
    // Listen for navigation end events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.checkRoute());

    this.checkRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.checkRoute());

    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  showLoginComponent() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForLogin, {
        width: '',
        height: 'auto'
      });
    }, 50);
  }

  private checkRoute() {
    // Check if the current route is '/login'
    this.isLoginVisible = this.router.url.includes('/login');
    this.isSolutionsVisible = this.router.url.includes('/brands-for-marketers');
    console.log("isSolutionsVisible", this.isSolutionsVisible);
  }

  //  isDropdownVisibleForSolution: boolean = false;
  hideTimeout: any;

  showDropdown(): void {
    this.isDropdownVisibleForSolution = true;
    clearTimeout(this.hideTimeout);
  }

  hideDropdown(): void {
    this.isDropdownVisibleForSolution = false;
  }

  showDropdownForPolicy(): void {
    this.isDropdownVisibleForPolicies = true;
    clearTimeout(this.hideTimeout);
  }

  hideDropdownForPolicy(): void {
    this.isDropdownVisibleForPolicies = false;
  }

  showDropdownForProduct(): void {
    this.isDropdownVisibleForProducts = true;
    clearTimeout(this.hideTimeout);
  }

  hideDropdownForProduct(): void {
    this.isDropdownVisibleForProducts = false;
  }

  showDropdownTC(): void {
    this.isDropdownVisibleForTC = true;
    clearTimeout(this.hideTimeout);
  }

  carouselIndex = 0;
  carouselSlides = [
    {
      img: '../../../assets/ad-monetization/banner1.jpg',
      caption: {
        h3: 'Next Generation Advertising Solutions',
        h1: 'DSPs & SSPs',
        p: 'Grow your BRAND with Performance driven Advertising'
      }
    },
    {
      img: '../../../assets/ad-monetization/banner2.jpg',
      caption: {
        h3: 'Tech that ups your monetization game',
        h1: 'Contextual Ads - MarketPlace - Programmatic',
        p: ''
      }
    },
    {
      img: '../../../assets/ad-monetization/banner3.jpg',
      caption: {
        h3: 'Monetization',
        h1: 'Maximize your Revenue',
        p: ''
      }
    }
  ];

  nextSlide() {
    this.carouselIndex = (this.carouselIndex + 1) % this.carouselSlides.length;
  }

  prevSlide() {
    this.carouselIndex = (this.carouselIndex - 1 + this.carouselSlides.length) % this.carouselSlides.length;
  }

  hideDropdownTC(): void {
    this.isDropdownVisibleForTC = false;
  }

  delayedHideDropdown(): void {
    // Set a delay before hiding the dropdown
    this.hideTimeout = setTimeout(() => {
      this.hideDropdown();
    }, 200); // Delay of 200ms (you can adjust this delay as needed)
  }

  delayedHideDropdownForProduct(): void {
    // Set a delay before hiding the dropdown
    this.hideTimeout = setTimeout(() => {
      this.hideDropdownForProduct();
    }, 200); // Delay of 200ms (you can adjust this delay as needed)
  }

  delayedHideDropdownForPolicy(): void {
    // Set a delay before hiding the dropdown
    this.hideTimeout = setTimeout(() => {
      this.hideDropdownForPolicy();
    }, 200); // Delay of 200ms (you can adjust this delay as needed)
  }

  delayedHideDropdownTC(): void {
    // Set a delay before hiding the dropdown
    this.hideTimeout = setTimeout(() => {
      this.hideDropdownTC();
    }, 200); // Delay of 200ms (you can adjust this delay as needed)
  }


  openPopupForIPTV() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForIPTV, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForDOOH() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForDOOH, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForLicencePricing() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForLicencePricing, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForPrivacyPolicy() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForPrivacyPolicy, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForContact() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForContact, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForSupport() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForSupport, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForCancellationRefund() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForCancellationRefund, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForLicenceDelivery() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForLicenceDelivery, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForSupplySide() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForSupplySide, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForDemandSide() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForDemanSide, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForTvOttViewers() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForTvOttViewers, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForMicroChannels() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForMicroChannels, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForTvManufactures() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForTvManufactures, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForMediaLivestream() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForMediaLivestream, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForRetailBusiness() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForBrands, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  openPopupForBrandAndMarketers() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.dialogTemplateForRetail, {
        width: '80%',
        height: '80%'
      });
    }, 50);
  }

  toggleMenu() {
    // Toggle the menu open/close
    this.isMenuOpen = !this.isMenuOpen;

    // If the menu is closed, also close the dropdown
    if (!this.isMenuOpen) {
      this.isDropdownVisibleForSolution = false;
    }
  }

  showDropdownForSolution() {
    this.isDropdownVisibleForSolution = true;
  }

  // Hide Solutions dropdown
  hideDropdownForSolution() {
    this.isDropdownVisibleForSolution = false;
  }

  toggleDropdownForSolution() {
    this.isDropdownVisibleForSolution = !this.isDropdownVisibleForSolution;
  }

  toggleDropdownForPolicies() {
    this.isDropdownVisibleForPolicies = !this.isDropdownVisibleForPolicies
  }

  toggleDropdownForProducts() {
    this.isDropdownVisibleForProducts = !this.isDropdownVisibleForProducts
  }

  showDropdownForTC() {
    this.isDropdownVisibleForTC = true;
  }

  hideDropdownForTC() {
    this.isDropdownVisibleForTC = false;
  }

  toggleDropdownForTC() {
    this.isDropdownVisibleForTC = !this.isDropdownVisibleForTC;
  }

  showadmonetization = false;
  bsModalRef?: MatDialogRef<any>;
  scrollPosition?: number;

  showAdMonetization() {
    this.showadmonetization = !this.showadmonetization;
  }

  openADCampaignsModal() {
    this.bsModalRef = this.dialog.open(ADCampaignsComponent, {
      width: '80%',
      height: '80%'
    });
  }

  openDSPPlatformModal() {
    this.bsModalRef = this.dialog.open(DSPPlatformComponent, {
      width: '80%',
      height: '80%'
    });
  }

  openMOModal() {
    this.bsModalRef = this.dialog.open(MODOOHServiceComponent, {
      width: '80%',
      height: '80%'
    });
  }

  openDCModal() {
    this.bsModalRef = this.dialog.open(DigitalConsultationComponent, {
      width: '80%',
      height: '80%'
    });
  }

  openADOperationModal() {
    this.bsModalRef = this.dialog.open(ADOperationsComponent, {
      width: '80%',
      height: '80%'
    });
  }

  openADMonetizationModal() {
    this.bsModalRef = this.dialog.open(ADMonetizationComponent, {
      width: '80%',
      height: '80%'
    });
  }

  openPrivacyPolicyModal() {
    this.bsModalRef = this.dialog.open(PrivacyPolicyComponent, {
      width: '80%',
      height: '80%'
    });
  }
  showActiveClass: boolean = false;
  @HostListener('window:scroll')
  handleScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionOffsetTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionOffsetTop && scrollPosition < sectionOffsetTop + sectionHeight) {
        this.activeLink = sectionId;
      }
    });

    this.showActiveClass = true;

    // Remove the active class after 1 second
    setTimeout(() => {
      this.showActiveClass = false;
    }, 1000);
  }

  activeLink: string | null = null;

  scrollToSection(sectionId: string) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const scrollToPosition = sectionElement.offsetTop - 80;
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  }


}