import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlaylistComponent } from './manage-playlist.component';

describe('ManagePlaylistComponent', () => {
  let component: ManagePlaylistComponent;
  let fixture: ComponentFixture<ManagePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
