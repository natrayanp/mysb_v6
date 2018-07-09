import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderhist',
  templateUrl: './orderhist.component.html',
  styleUrls: ['./orderhist.component.scss']
})
export class OrderhistComponent implements OnInit {
  products: any[];
  asyncTabs: any[];
  constructor() { }

  ngOnInit() {
    this.products = ['Mutual Fund', 'Stocks'];
  }

}
