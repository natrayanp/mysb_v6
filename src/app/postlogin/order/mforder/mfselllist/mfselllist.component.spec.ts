import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfselllistComponent } from './mfselllist.component';

describe('MfselllistComponent', () => {
  let component: MfselllistComponent;
  let fixture: ComponentFixture<MfselllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfselllistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfselllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
