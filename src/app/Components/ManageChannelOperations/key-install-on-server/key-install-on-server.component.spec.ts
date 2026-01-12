import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyInstallOnServerComponent } from './key-install-on-server.component';

describe('KeyInstallOnServerComponent', () => {
  let component: KeyInstallOnServerComponent;
  let fixture: ComponentFixture<KeyInstallOnServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyInstallOnServerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyInstallOnServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
