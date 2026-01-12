import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageB2bComponent } from './manage-b2b.component';

describe('ManageB2bComponent', () => {
  let component: ManageB2bComponent;
  let fixture: ComponentFixture<ManageB2bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageB2bComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageB2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
