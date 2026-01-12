import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOemsComponent } from './manage-oems.component';

describe('ManageOemsComponent', () => {
  let component: ManageOemsComponent;
  let fixture: ComponentFixture<ManageOemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageOemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
