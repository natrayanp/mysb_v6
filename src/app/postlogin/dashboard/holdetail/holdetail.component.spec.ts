import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldetailComponent } from './holdetail.component';

describe('HoldetailComponent', () => {
  let component: HoldetailComponent;
  let fixture: ComponentFixture<HoldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
