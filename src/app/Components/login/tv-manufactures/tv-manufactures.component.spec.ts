import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvManufacturesComponent } from './tv-manufactures.component';

describe('TvManufacturesComponent', () => {
  let component: TvManufacturesComponent;
  let fixture: ComponentFixture<TvManufacturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvManufacturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvManufacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
