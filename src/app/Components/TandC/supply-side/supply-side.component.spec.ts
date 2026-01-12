import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplySideComponent } from './supply-side.component';

describe('SupplySideComponent', () => {
  let component: SupplySideComponent;
  let fixture: ComponentFixture<SupplySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplySideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
