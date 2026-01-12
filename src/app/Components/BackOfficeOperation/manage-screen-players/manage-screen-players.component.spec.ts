import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenPlayersComponent } from './manage-screen-players.component';

describe('ManageScreenPlayersComponent', () => {
  let component: ManageScreenPlayersComponent;
  let fixture: ComponentFixture<ManageScreenPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageScreenPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageScreenPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
