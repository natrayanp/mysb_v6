import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdplacePfwisecardComponent } from './ordplace-pfwisecard.component';

describe('OrdplacePfwisecardComponent', () => {
  let component: OrdplacePfwisecardComponent;
  let fixture: ComponentFixture<OrdplacePfwisecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdplacePfwisecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdplacePfwisecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
