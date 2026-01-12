import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScreenMISComponent } from './my-screen-mis.component';

describe('MyScreenMISComponent', () => {
  let component: MyScreenMISComponent;
  let fixture: ComponentFixture<MyScreenMISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyScreenMISComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyScreenMISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
