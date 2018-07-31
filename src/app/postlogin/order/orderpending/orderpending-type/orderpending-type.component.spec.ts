import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpendingTypeComponent } from './orderpending-type.component';

describe('OrderpendingTypeComponent', () => {
  let component: OrderpendingTypeComponent;
  let fixture: ComponentFixture<OrderpendingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderpendingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderpendingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
