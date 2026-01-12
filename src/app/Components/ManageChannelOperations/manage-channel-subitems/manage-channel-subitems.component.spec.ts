import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelSubitemsComponent } from './manage-channel-subitems.component';

describe('ManageChannelSubitemsComponent', () => {
  let component: ManageChannelSubitemsComponent;
  let fixture: ComponentFixture<ManageChannelSubitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelSubitemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageChannelSubitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
