import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceDeliveryComponent } from './licence-delivery.component';

describe('LicenceDeliveryComponent', () => {
  let component: LicenceDeliveryComponent;
  let fixture: ComponentFixture<LicenceDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenceDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenceDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
