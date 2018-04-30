import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordViewerComponent } from './password-viewer.component';

describe('PasswordViewerComponent', () => {
  let component: PasswordViewerComponent;
  let fixture: ComponentFixture<PasswordViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
