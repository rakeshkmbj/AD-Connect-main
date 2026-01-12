import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CldtvUsersComponent } from './cldtv-users.component';

describe('CldtvUsersComponent', () => {
  let component: CldtvUsersComponent;
  let fixture: ComponentFixture<CldtvUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CldtvUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CldtvUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
