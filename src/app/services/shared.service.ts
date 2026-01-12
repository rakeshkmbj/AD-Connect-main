import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private bellCountSource = new BehaviorSubject<number | null>(null);
  bellCount$ = this.bellCountSource.asObservable();
  private readonly getBOBellCount = 'http://www.shripatigroup.com/ADMedia/api/ADMedia/BOBellCountdisplay';

  private userDataSource = new BehaviorSubject<any>(null);
  userData$ = this.userDataSource.asObservable();

  updateUserData(data: any): void {
    this.userDataSource.next(data);
  }

  private sidebar = new BehaviorSubject<boolean>(true); 
  currentSidebar = this.sidebar.asObservable(); 

  constructor(private http: HttpClient) {}

  changeSideBar(value: boolean) {
    this.sidebar.next(value); 
  }
  updateBellCount(count: number) {
    this.bellCountSource.next(count);
  }

  fetchBellCount(): Observable<any> {
    const url = `${this.getBOBellCount}`;
    return this.http.get<any>(url).pipe(
      tap((data: number | null) => this.bellCountSource.next(data)),
      catchError((error: any) => {
        console.error('Error fetching bell count', error);
        return [];
      })
    );
  }

  initializeBellCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fetchBellCount().subscribe({
        next: () => resolve(true),
        error: (err) => reject(err),
      });
    });
  }
}

