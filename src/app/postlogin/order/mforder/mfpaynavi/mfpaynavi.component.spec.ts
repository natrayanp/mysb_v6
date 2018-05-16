import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfpaynaviComponent } from './mfpaynavi.component';

describe('MfpaynaviComponent', () => {
  let component: MfpaynaviComponent;
  let fixture: ComponentFixture<MfpaynaviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfpaynaviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfpaynaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
