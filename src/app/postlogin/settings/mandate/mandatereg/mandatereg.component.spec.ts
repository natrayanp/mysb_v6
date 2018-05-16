import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateregComponent } from './mandatereg.component';

describe('MandateregComponent', () => {
  let component: MandateregComponent;
  let fixture: ComponentFixture<MandateregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandateregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
