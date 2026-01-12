import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomWorflowComponent } from './ecom-worflow.component';

describe('EcomWorflowComponent', () => {
  let component: EcomWorflowComponent;
  let fixture: ComponentFixture<EcomWorflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcomWorflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcomWorflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
