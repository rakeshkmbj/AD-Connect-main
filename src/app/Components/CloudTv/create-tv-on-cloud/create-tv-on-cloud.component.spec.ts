import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTvOnCloudComponent } from './create-tv-on-cloud.component';

describe('CreateTvOnCloudComponent', () => {
  let component: CreateTvOnCloudComponent;
  let fixture: ComponentFixture<CreateTvOnCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTvOnCloudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTvOnCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
