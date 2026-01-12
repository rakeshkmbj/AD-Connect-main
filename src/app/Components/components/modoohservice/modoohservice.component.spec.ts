import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MODOOHServiceComponent } from './modoohservice.component';

describe('MODOOHServiceComponent', () => {
  let component: MODOOHServiceComponent;
  let fixture: ComponentFixture<MODOOHServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MODOOHServiceComponent]
    });
    fixture = TestBed.createComponent(MODOOHServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
