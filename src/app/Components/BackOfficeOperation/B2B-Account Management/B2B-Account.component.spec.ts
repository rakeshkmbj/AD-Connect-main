import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2BAccountManagementComponent } from './B2B-Account.component';

describe('ManageUsersComponent', () => {
  let component: B2BAccountManagementComponent;
  let fixture: ComponentFixture<B2BAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2BAccountManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B2BAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
