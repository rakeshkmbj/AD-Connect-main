import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { APIService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-side-bar-and-main-content',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgSwitch, NgSwitchCase],
  templateUrl: './side-bar-and-main-content.component.html',
  styleUrls: ['./side-bar-and-main-content.component.css']
})
export class SideBarAndMainContentComponent implements OnInit, OnDestroy {

  // Dropdown flags
  isDropdownOpenForBackOffice = false;
  isDropdownOpenForDemand = true;
  DropdownOpenForSupply = true;
  DropdownOpenForCloudTv1 = false;
  DropdownOpenForCloudTv2 = false;
  DropdownOpenForCloudTv3 = false;
  DropdownOpenForCloudTv4 = false;
  SupplySideManageUsers = false;
  SupplySideManageScreen = false;
  SupplySideMyAccountMonetization = false;
  DemandSideManageUsers = false;
  BackOfficeManageScreen = false;
  BackOfficeManageWorkFlow = false;
  CloudTvSettings = false;
  CloudTvChronology = false;
  CloudTvContent = false;
  CloudTvContentPartners = false;
  CloudTvDevicePartners = false;
  CloudTvConsumers = false;
  CloudTvPackages = false;
  CloudTvMarketPlaces = false;
  CloudTvAdCampaigns = false;

  private subscription: Subscription = new Subscription();

  bellCount: any[] = [];

  constructor(
    private router: Router,
    private apiService: APIService,
    private sharedService: SharedService,
    private authService: AuthService,
  ) { }

   userData: any = {}; // Initialize with an empty object or a default value
   isSidebarVisible: boolean = false;

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
    
    this.subscription = this.sharedService.bellCount$.subscribe({
      next: (count) => {
        if (Array.isArray(count)) {
          this.bellCount = count;
        } else {
          console.error('Unexpected data format for bellCount', count);
        }
      },
      error: (error) => {
        console.error('Error fetching bell count', error);
      },
      complete: () => {
      }
    });

    // Subscribe to router events to handle route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.updateSidebarVisibility();
      }
    });

    console.log("User Data: ", this.userData);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isProfileDropdownOpen = false;

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  // Toggle functions for dropdowns
  toggleDropdownForBackOffice() {
    this.isDropdownOpenForBackOffice = !this.isDropdownOpenForBackOffice;
  }

  toggleDropdownForDemand() {
    this.isDropdownOpenForDemand = !this.isDropdownOpenForDemand;
  }

  toggleDropdownForSupply() {
    this.DropdownOpenForSupply = !this.DropdownOpenForSupply;
  }

  toggleDropdownForCloudTv1() {
    this.DropdownOpenForCloudTv1 = !this.DropdownOpenForCloudTv1;
  }
  toggleDropdownForCloudTv2() {
    this.DropdownOpenForCloudTv2 = !this.DropdownOpenForCloudTv2;
  }
  toggleDropdownForCloudTv3() {
    this.DropdownOpenForCloudTv3 = !this.DropdownOpenForCloudTv3;
  }
  toggleDropdownForCloudTv4() {
    this.DropdownOpenForCloudTv4 = !this.DropdownOpenForCloudTv4;
  }

  toggleDropdownCloudTvSettings() {
    this.CloudTvSettings = !this.CloudTvSettings;
  }

  toggleDropdownSupplySideManageUsers() {
    this.SupplySideManageUsers = !this.SupplySideManageUsers;
  }

  toggleDropdownSupplySideManageScreens() {
    this.SupplySideManageScreen = !this.SupplySideManageScreen;
  }

  toggleDropdownSupplySideMyAccountMonetization() {
    this.SupplySideMyAccountMonetization = !this.SupplySideMyAccountMonetization;
  }

  toggleDropdownDemandSideManageUsers() {
    this.DemandSideManageUsers = !this.DemandSideManageUsers;
  }

  toggleDropdownBackOfficeManageScreen() {
    this.BackOfficeManageScreen = !this.BackOfficeManageScreen;
  }

  toggleDropdownBackOfficeManageWorkFlow() {
    this.BackOfficeManageWorkFlow = !this.BackOfficeManageWorkFlow;
  }

  toggleDropdownCloudTvChronology() {
    this.CloudTvChronology = !this.CloudTvChronology;
  }

  toggleDropdownCloudTvContent() {
    this.CloudTvContent = !this.CloudTvContent;
  }

  toggleDropdownCloudTvContentPartners() {
    this.CloudTvContentPartners = !this.CloudTvContentPartners;
  }

  toggleDropdownCloudTvDevicePartners() {
    this.CloudTvDevicePartners = !this.CloudTvDevicePartners;
  }

  toggleDropdownCloudTvConsumers() {
    this.CloudTvConsumers = !this.CloudTvConsumers;
  }

  toggleDropdownCloudTvPackages() {
    this.CloudTvPackages = !this.CloudTvPackages;
  }

  toggleDropdownCloudTvMarketPlaces() {
    this.CloudTvMarketPlaces = !this.CloudTvMarketPlaces;
  }

  toggleDropdownCloudTvAdCampaigns() {
    this.CloudTvAdCampaigns = !this.CloudTvAdCampaigns;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
