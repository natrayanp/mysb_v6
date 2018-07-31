import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpendingComponent } from './orderpending.component';

describe('OrderpendingComponent', () => {
  let component: OrderpendingComponent;
  let fixture: ComponentFixture<OrderpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
