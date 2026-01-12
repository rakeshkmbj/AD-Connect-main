import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDaySlabsComponent } from './manage-day-slabs.component';

describe('ManageDaySlabsComponent', () => {
  let component: ManageDaySlabsComponent;
  let fixture: ComponentFixture<ManageDaySlabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDaySlabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDaySlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
