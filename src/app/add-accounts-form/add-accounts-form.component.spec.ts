import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountsFormComponent } from './add-accounts-form.component';

describe('AddAccountsFormComponent', () => {
  let component: AddAccountsFormComponent;
  let fixture: ComponentFixture<AddAccountsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
