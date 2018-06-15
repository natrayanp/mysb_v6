import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashlistComponent } from './dashlist.component';

describe('DashlistComponent', () => {
  let component: DashlistComponent;
  let fixture: ComponentFixture<DashlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
