import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalConsultationComponent } from './digital-consultation.component';

describe('DigitalConsultationComponent', () => {
  let component: DigitalConsultationComponent;
  let fixture: ComponentFixture<DigitalConsultationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalConsultationComponent]
    });
    fixture = TestBed.createComponent(DigitalConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
