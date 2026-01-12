import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencePricingComponent } from './licence-pricing.component';

describe('LicencePricingComponent', () => {
  let component: LicencePricingComponent;
  let fixture: ComponentFixture<LicencePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicencePricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicencePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
