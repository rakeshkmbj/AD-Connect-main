import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContentRepositorySupplySideComponent } from './my-content-repository-supply-side.component';

describe('MyContentRepositorySupplySideComponent', () => {
  let component: MyContentRepositorySupplySideComponent;
  let fixture: ComponentFixture<MyContentRepositorySupplySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContentRepositorySupplySideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyContentRepositorySupplySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
