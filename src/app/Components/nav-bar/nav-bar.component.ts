import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { APIService } from '../../services/api.service';
import { privateDecrypt } from 'crypto';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  // private subscription: Subscription | null = null;

  constructor( private router: Router, private apiService: APIService, private sharedService: SharedService, private authservice:AuthService , private eRef: ElementRef) { 

  }

  val: boolean = false

  changeVariable() {
    this.val = !this.val;
    this.sharedService.changeSideBar(!this.val); // Call 'changeVariable' to update the value
  }

  bellCount: any[] = [];
  userData: any = {};
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {

      // Subscribe to userData$ to get user data from AuthService
    this.subscription.add(
      this.authservice.userData$.subscribe({
        next: (data) => {
          this.userData = data;
          this.sharedService.updateUserData(data);
          // Perform any additional logic with userData here
        },
        error: (error) => {
          console.error('Error fetching user data', error);
        }
      })
    );

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


  }

  isProfileDropdownOpen = false;

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Check if the click is outside the component
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileDropdownOpen = false; // Close the dropdown
    }
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
