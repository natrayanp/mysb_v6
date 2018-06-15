import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashfundComponent } from './dashfund.component';

describe('DashfundComponent', () => {
  let component: DashfundComponent;
  let fixture: ComponentFixture<DashfundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashfundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
