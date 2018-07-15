import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderplaceTypeComponent } from './orderplace-type.component';

describe('OrderplaceTypeComponent', () => {
  let component: OrderplaceTypeComponent;
  let fixture: ComponentFixture<OrderplaceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderplaceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderplaceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
