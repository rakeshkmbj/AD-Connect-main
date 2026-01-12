import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersDemandSideComponent } from './manage-users-demand-side.component';

describe('ManageUsersDemandSideComponent', () => {
  let component: ManageUsersDemandSideComponent;
  let fixture: ComponentFixture<ManageUsersDemandSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUsersDemandSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUsersDemandSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
