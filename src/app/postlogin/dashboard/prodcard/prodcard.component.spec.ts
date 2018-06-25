import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcardComponent } from './prodcard.component';

describe('ProdcardComponent', () => {
  let component: ProdcardComponent;
  let fixture: ComponentFixture<ProdcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
