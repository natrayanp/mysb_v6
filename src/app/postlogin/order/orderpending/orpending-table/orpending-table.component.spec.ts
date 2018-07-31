import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrpendingTableComponent } from './orpending-table.component';

describe('OrpendingTableComponent', () => {
  let component: OrpendingTableComponent;
  let fixture: ComponentFixture<OrpendingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrpendingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrpendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
