import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProdLinesComponent } from './manage-prod-lines.component';

describe('ManageProdLinesComponent', () => {
  let component: ManageProdLinesComponent;
  let fixture: ComponentFixture<ManageProdLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProdLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageProdLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
