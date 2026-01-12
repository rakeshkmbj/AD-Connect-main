import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bUsersComponent } from './b2b-users.component';

describe('B2bUsersComponent', () => {
  let component: B2bUsersComponent;
  let fixture: ComponentFixture<B2bUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2bUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B2bUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
