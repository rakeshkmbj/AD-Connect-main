import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageD2cComponent } from './manage-d2c.component';

describe('ManageD2cComponent', () => {
  let component: ManageD2cComponent;
  let fixture: ComponentFixture<ManageD2cComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageD2cComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageD2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
