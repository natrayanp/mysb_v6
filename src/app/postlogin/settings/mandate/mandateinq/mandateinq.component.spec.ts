import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateinqComponent } from './mandateinq.component';

describe('MandateinqComponent', () => {
  let component: MandateinqComponent;
  let fixture: ComponentFixture<MandateinqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandateinqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateinqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
