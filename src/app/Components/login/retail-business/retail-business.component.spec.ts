import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailBusinessComponent } from './retail-business.component';

describe('RetailBusinessComponent', () => {
  let component: RetailBusinessComponent;
  let fixture: ComponentFixture<RetailBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetailBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
