import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScreenSurgeSetupsComponent } from './manage-screen-surge-setups.component';

describe('ManageScreenSurgeSetupsComponent', () => {
  let component: ManageScreenSurgeSetupsComponent;
  let fixture: ComponentFixture<ManageScreenSurgeSetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageScreenSurgeSetupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageScreenSurgeSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
