import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFieldsComponent } from './password-fields.component';

describe('PasswordFieldsComponent', () => {
  let component: PasswordFieldsComponent;
  let fixture: ComponentFixture<PasswordFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
