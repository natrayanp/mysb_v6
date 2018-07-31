import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'orderpending-type',
  templateUrl: './orderpending-type.component.html',
  styleUrls: ['./orderpending-type.component.scss']
})
export class OrderpendingTypeComponent implements OnInit {
  @Input() prod;
  @Input() showtran;
  @Input() showprod;

  constructor() { }
  

  ngOnInit() {
  }

}
