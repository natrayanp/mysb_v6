import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderservService } from '../../../../natservices/orderserv.service';

@Component({
  selector: 'app-mforderconfpg',
  templateUrl: './mforderconfpg.component.html',
  styleUrls: ['./mforderconfpg.component.scss']
})
export class MforderconfpgComponent implements OnInit {

  constructor(private orderservice: OrderservService, ) {
    this.orderservice.mynoti.subscribe(rrr => {
        this.popu(this.orderservice.paylnk);
    });
   }
   paymentpopshown = false;
  ngOnInit() {
  }

popu(paylnk) {
  // paylnk = 'http://bsestarmfdemo.bseindia.com/ClientOrderPayment.aspx?INtPvGmyOzdvVLRCAlRSyLep2wKQls+dik8REh8D/5RxmamsVZHD/ZCxz1O9mlWJWW2gsRaoYO5LPbCHI9HSrw==';
  const myWindow = window.open(paylnk, 'paymentlink', 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=4000,height=4000');
  this.paymentpopshown = true;
}

ngOnDestroy() {
  this.paymentpopshown = false;
}

}
