import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router } from '@angular/router'; // Correct import for Router
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SideBarAndMainContentComponent } from './Components/side-bar-and-main-content/side-bar-and-main-content.component';
import { SharedService } from './services/shared.service';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive, NavBarComponent,HomePageComponent, SideBarAndMainContentComponent]
})
export class AppComponent {

  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    // Subscribe to isLoggedIn$ observable to get login state
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
     
    });
  }
  
}
