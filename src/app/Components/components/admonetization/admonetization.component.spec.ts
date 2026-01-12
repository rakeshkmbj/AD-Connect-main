import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADMonetizationComponent } from './admonetization.component';

describe('ADMonetizationComponent', () => {
  let component: ADMonetizationComponent;
  let fixture: ComponentFixture<ADMonetizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADMonetizationComponent]
    });
    fixture = TestBed.createComponent(ADMonetizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
