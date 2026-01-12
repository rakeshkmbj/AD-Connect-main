import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContentProvidersComponent } from './manage-content-providers.component';

describe('ManageContentProvidersComponent', () => {
  let component: ManageContentProvidersComponent;
  let fixture: ComponentFixture<ManageContentProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageContentProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageContentProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
