import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpendingListComponent } from './orderpending-list.component';

describe('OrderpendingListComponent', () => {
  let component: OrderpendingListComponent;
  let fixture: ComponentFixture<OrderpendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderpendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderpendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
