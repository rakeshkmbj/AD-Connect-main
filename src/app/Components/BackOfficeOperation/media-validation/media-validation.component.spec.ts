import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaValidationComponent } from './media-validation.component';

describe('MediaValidationComponent', () => {
  let component: MediaValidationComponent;
  let fixture: ComponentFixture<MediaValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
