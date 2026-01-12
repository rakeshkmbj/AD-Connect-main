import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDailyScreenRunsComponent } from './view-daily-screen-runs.component';

describe('ViewDailyScreenRunsComponent', () => {
  let component: ViewDailyScreenRunsComponent;
  let fixture: ComponentFixture<ViewDailyScreenRunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDailyScreenRunsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDailyScreenRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
