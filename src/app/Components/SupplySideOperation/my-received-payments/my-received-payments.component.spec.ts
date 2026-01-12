import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReceivedPaymentsComponent } from './my-received-payments.component';

describe('MyReceivedPaymentsComponent', () => {
  let component: MyReceivedPaymentsComponent;
  let fixture: ComponentFixture<MyReceivedPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReceivedPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyReceivedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
