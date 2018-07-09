import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderhistcardComponent } from './orderhistcard.component';

describe('OrderhistcardComponent', () => {
  let component: OrderhistcardComponent;
  let fixture: ComponentFixture<OrderhistcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderhistcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderhistcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
