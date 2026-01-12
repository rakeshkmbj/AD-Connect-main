import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADCampaignsComponent } from './adcampaigns.component';

describe('ADCampaignsComponent', () => {
  let component: ADCampaignsComponent;
  let fixture: ComponentFixture<ADCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADCampaignsComponent]
    });
    fixture = TestBed.createComponent(ADCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
