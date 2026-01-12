import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContentrepositoryDemandSideComponent } from './my-contentrepository-demand-side.component';

describe('MyContentrepositoryDemandSideComponent', () => {
  let component: MyContentrepositoryDemandSideComponent;
  let fixture: ComponentFixture<MyContentrepositoryDemandSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContentrepositoryDemandSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyContentrepositoryDemandSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
