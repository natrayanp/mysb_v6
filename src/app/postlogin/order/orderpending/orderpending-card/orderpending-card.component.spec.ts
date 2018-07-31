import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpendingCardComponent } from './orderpending-card.component';

describe('OrderpendingCardComponent', () => {
  let component: OrderpendingCardComponent;
  let fixture: ComponentFixture<OrderpendingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderpendingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderpendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
