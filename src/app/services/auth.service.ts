import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false); // Store login state
  private userData = new BehaviorSubject<any>(null); // Store user data

  constructor(private http: HttpClient, private router: Router) {
    // Initialize login state from localStorage if present
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');

    if (storedIsLoggedIn && storedUserData) {
      this.isLoggedIn.next(JSON.parse(storedIsLoggedIn));
      this.userData.next(JSON.parse(storedUserData));
    }
    console.log("User data is ",this.userData );
  }

  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  get userData$() {
    return this.userData.asObservable();
  }

  // login(payload: any) {
  //   return this.http.post<any>('your-login-api-endpoint', payload);
  // }

  setUserData(data: any) {
    this.userData.next(data);
    this.isLoggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(data));
  }

  logout() {
    this.isLoggedIn.next(false);
    this.userData.next(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
