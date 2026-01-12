import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroChannelsComponent } from './micro-channels.component';

describe('MicroChannelsComponent', () => {
  let component: MicroChannelsComponent;
  let fixture: ComponentFixture<MicroChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroChannelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicroChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
