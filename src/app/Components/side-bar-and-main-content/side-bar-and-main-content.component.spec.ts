import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAndMainContentComponent } from './side-bar-and-main-content.component';

describe('SideBarAndMainContentComponent', () => {
  let component: SideBarAndMainContentComponent;
  let fixture: ComponentFixture<SideBarAndMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarAndMainContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarAndMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
