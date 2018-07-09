import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'orderhistlist',
  templateUrl: './orderhistlist.component.html',
  styleUrls: ['./orderhistlist.component.scss']
})
export class OrderhistlistComponent implements OnInit {
  @Input() public freq: string;
  @Input() public prod: string;
  product: string;

  constructor() { }

  ngOnInit() {
    this.product = this.prod;
  }

}
