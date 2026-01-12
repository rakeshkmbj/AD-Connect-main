import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersSupplySideComponent } from './manage-users-supply-side.component';

describe('ManageUsersSupplySideComponent', () => {
  let component: ManageUsersSupplySideComponent;
  let fixture: ComponentFixture<ManageUsersSupplySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUsersSupplySideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUsersSupplySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
