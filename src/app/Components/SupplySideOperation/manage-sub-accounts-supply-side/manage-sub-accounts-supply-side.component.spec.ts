import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubAccountsSupplySideComponent } from './manage-sub-accounts-supply-side.component';

describe('ManageSubAccountsSupplySideComponent', () => {
  let component: ManageSubAccountsSupplySideComponent;
  let fixture: ComponentFixture<ManageSubAccountsSupplySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubAccountsSupplySideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSubAccountsSupplySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
