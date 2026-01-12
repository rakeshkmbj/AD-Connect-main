import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUptimeComponent } from './manage-uptime.component';

describe('ManageUptimeComponent', () => {
  let component: ManageUptimeComponent;
  let fixture: ComponentFixture<ManageUptimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUptimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUptimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
