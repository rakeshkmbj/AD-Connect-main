import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D2cUsersComponent } from './d2c-users.component';

describe('D2cUsersComponent', () => {
  let component: D2cUsersComponent;
  let fixture: ComponentFixture<D2cUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D2cUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D2cUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
