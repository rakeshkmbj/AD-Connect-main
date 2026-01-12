import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenSubscriptionComponent } from './manage-screen-subscription.component';

describe('ManageScreenSubscriptionComponent', () => {
  let component: ManageScreenSubscriptionComponent;
  let fixture: ComponentFixture<ManageScreenSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageScreenSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageScreenSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
