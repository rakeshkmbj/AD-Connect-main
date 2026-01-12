import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePromosComponent } from './allocate-promos.component';

describe('AllocatePromosComponent', () => {
  let component: AllocatePromosComponent;
  let fixture: ComponentFixture<AllocatePromosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocatePromosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllocatePromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
