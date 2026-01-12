import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSPPlatformComponent } from './dspplatform.component';

describe('DSPPlatformComponent', () => {
  let component: DSPPlatformComponent;
  let fixture: ComponentFixture<DSPPlatformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DSPPlatformComponent]
    });
    fixture = TestBed.createComponent(DSPPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
