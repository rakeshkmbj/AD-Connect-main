import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeiaAndLivestreamComponent } from './meia-and-livestream.component';

describe('MeiaAndLivestreamComponent', () => {
  let component: MeiaAndLivestreamComponent;
  let fixture: ComponentFixture<MeiaAndLivestreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeiaAndLivestreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeiaAndLivestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
