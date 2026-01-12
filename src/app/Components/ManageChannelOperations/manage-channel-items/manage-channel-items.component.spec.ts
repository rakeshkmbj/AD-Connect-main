import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelTemsComponent } from './manage-channel-items.component';

describe('ManageChannelItemsComponent', () => {
  let component: ManageChannelTemsComponent;
  let fixture: ComponentFixture<ManageChannelTemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelTemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageChannelTemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
