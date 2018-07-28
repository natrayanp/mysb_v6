import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderplaceConfoptionsComponent } from './orderplace-confoptions.component';

describe('OrderplaceConfoptionsComponent', () => {
  let component: OrderplaceConfoptionsComponent;
  let fixture: ComponentFixture<OrderplaceConfoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderplaceConfoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderplaceConfoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
