import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvAndOttViewersComponent } from './tv-and-ott-viewers.component';

describe('TvAndOttViewersComponent', () => {
  let component: TvAndOttViewersComponent;
  let fixture: ComponentFixture<TvAndOttViewersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvAndOttViewersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvAndOttViewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
