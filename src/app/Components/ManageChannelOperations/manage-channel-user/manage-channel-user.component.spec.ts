import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelUserComponent } from './manage-channel-user.component';

describe('ManageChannelUserComponent', () => {
  let component: ManageChannelUserComponent;
  let fixture: ComponentFixture<ManageChannelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageChannelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
