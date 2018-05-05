import { Component, OnInit } from '@angular/core';
import { OrderservService } from '../../../../natservices/orderserv.service';

@Component({
  selector: 'app-mforderconfpg',
  templateUrl: './mforderconfpg.component.html',
  styleUrls: ['./mforderconfpg.component.scss']
})
export class MforderconfpgComponent implements OnInit {

  constructor(private orderservice: OrderservService, ) {
    this.orderservice.mynoti.subscribe {
        this.popu();
    }
   }

  ngOnInit() {
  }

popu() {
  const myWindow = window.open(this.orderservice.paylnk, 'paymentlink', 'width=200,height=100');
}


}
