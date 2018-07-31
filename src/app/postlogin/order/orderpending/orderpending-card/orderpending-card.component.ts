import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'orderpending-card',
  templateUrl: './orderpending-card.component.html',
  styleUrls: ['./orderpending-card.component.scss']
})
export class OrderpendingCardComponent implements OnInit {
  @Input() prod;
  @Input() tran;

  constructor() { }

  ngOnInit() {
  }

}
