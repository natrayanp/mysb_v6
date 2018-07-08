import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MforderhistComponent } from './mforderhist.component';

describe('MforderhistComponent', () => {
  let component: MforderhistComponent;
  let fixture: ComponentFixture<MforderhistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MforderhistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MforderhistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
