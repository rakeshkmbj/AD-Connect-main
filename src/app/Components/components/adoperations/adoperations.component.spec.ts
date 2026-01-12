import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADOperationsComponent } from './adoperations.component';

describe('ADOperationsComponent', () => {
  let component: ADOperationsComponent;
  let fixture: ComponentFixture<ADOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADOperationsComponent]
    });
    fixture = TestBed.createComponent(ADOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
