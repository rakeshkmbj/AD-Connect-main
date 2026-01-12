import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsForMarketersComponent } from './brands-for-marketers.component';

describe('BrandsForMarketersComponent', () => {
  let component: BrandsForMarketersComponent;
  let fixture: ComponentFixture<BrandsForMarketersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsForMarketersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandsForMarketersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
