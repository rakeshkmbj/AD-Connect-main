import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoohComponent } from './dooh.component';

describe('DoohComponent', () => {
  let component: DoohComponent;
  let fixture: ComponentFixture<DoohComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoohComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
