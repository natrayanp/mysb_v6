import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderservService } from '../../../natservices/orderserv.service';


@Component({
  selector: 'app-orderplace',
  templateUrl: './orderplace.component.html',
  styleUrls: ['./orderplace.component.scss']
})
export class OrderplaceComponent implements OnInit, OnDestroy {

  products: any[];
  asyncTabs: any[];
  constructor(public orderservice: OrderservService
              ) { }

  ngOnInit() {
    this.fetchprodforcust();
    this.orderservice.testval = 'creating';
    console.log('inside ngoninit' + this.orderservice.testval);
  }

  ngOnDestroy() {
    this.orderservice.reset_gotodb();
    console.log('inside ngondestroy' + this.orderservice.testval);
  }

  fetchprodforcust() {
    this.products = ['BSEMF', 'EQ'];
  }

}
