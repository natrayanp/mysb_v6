import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdplacePfwiselistComponent } from './ordplace-pfwiselist.component';

describe('OrdplacePfwiselistComponent', () => {
  let component: OrdplacePfwiselistComponent;
  let fixture: ComponentFixture<OrdplacePfwiselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdplacePfwiselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdplacePfwiselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
