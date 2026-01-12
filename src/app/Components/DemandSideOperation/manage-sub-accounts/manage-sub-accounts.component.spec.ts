import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubAccountsComponent } from './manage-sub-accounts.component';

describe('ManageSubAccountsComponent', () => {
  let component: ManageSubAccountsComponent;
  let fixture: ComponentFixture<ManageSubAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
