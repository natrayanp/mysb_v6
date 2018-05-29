import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfpayconflandComponent } from './mfpayconfland.component';

describe('MfpayconflandComponent', () => {
  let component: MfpayconflandComponent;
  let fixture: ComponentFixture<MfpayconflandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfpayconflandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfpayconflandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
