import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderservService } from '../../../natservices/orderserv.service';
import { UserstateService } from '../../../natservices/userstate.service';

@Component({
  selector: 'app-orderplace',
  templateUrl: './orderplace.component.html',
  styleUrls: ['./orderplace.component.scss']
})
export class OrderplaceComponent implements OnInit, OnDestroy {

  products: any[];
  asyncTabs: any[];
  constructor(public orderservice: OrderservService,
              private userserv: UserstateService
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
    this.products = this.userserv.get_allowed_products('');
  }

}
