import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { OrderservService } from '../../../natservices/orderserv.service';
import { UserstateService } from '../../../natservices/userstate.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-orderpending',
  templateUrl: './orderpending.component.html',
  styleUrls: ['./orderpending.component.scss']
})
export class OrderpendingComponent implements OnInit {

  Total = 'Total Amt';
  // paymentpopshown = false;
  totalSizesuc = 0;
  totalSizefai = 0;
  showtran: string;
  showprod: string;
  products: string[];
  email = new FormControl([Validators.required]);


  constructor(public orderservice: OrderservService,
              private router: Router,
              private route: ActivatedRoute,
              private userserv: UserstateService) {
    this.orderservice.mynoti.subscribe(rrr => {
      if ( rrr === 'success') {
      if (this.orderservice.urltyp === 'dirpayhtml') {
        this.popucomp();
      } else if (this.orderservice.urltyp === 'bsepayurl') {
        this.popu(this.orderservice.paylnk);
      }
      } else if ( rrr === 'ordersub') {
          console.log('dont do anything here');
      }

    });

   }


   ngOnInit() {
    this.orderservice.paylnk = '';
    this.initpage();
  // this.dataSource = this.orderservice.error_recs;
  }


popucomp() {
  console.log('inside popucomp');
  //<html> <META HTTP-EQUIV="Pragma" CONTENT="no-cache"> <META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997, 08:21:57 GMT"> <script language = "javascript"> function hitBankURL() { errorPage.submit(); } </script> <body onload = "javascript:hitBankURL()"> <Form name='errorPage' method='post' action='http://localhost:8000/orpost'> <input type='hidden' name='msg' value='BSEDSTRBTR|NA|NA|NA|6589.00|NA|NA|NA|NA|NA|R|bsedstrbtr|NA|NA|0002|NA|NA|NA|NA|NA|NA|NA|NA|ERR122|Sorry. We were unable to process your transaction. We apologise for the inconvenience and request you to try again later.|64AE03066AF1021BAB837772C26A9A6FB5C762A55EBB5A5312797A8A49D148D3'> <input name='hidRequestId' type='hidden' value='PGIBL1000'> <input name='hidOperation' type='hidden' value='B101'> </Form> </Body> </html>";
  this.router.navigate(['/paylnk']);
}

popu(paylnk) {
  // paylnk = 'http://bsestarmfdemo.bseindia.com/ClientOrderPayment.aspx?INtPvGmyOzdvVLRCAlRSyLep2wKQls+dik8REh8D/5RxmamsVZHD/ZCxz1O9mlWJWW2gsRaoYO5LPbCHI9HSrw==';
  window.location.href = paylnk;
}

initpage() {
  this.orderservice.reset();
  this.products = this.userserv.get_allowed_products('');
  this.route.params.subscribe( params => {
    if ( params.id === 'full') {
      this.orderservice.fullload = true;
      this.orderservice.showtables = true;
      this.showtran = 'all';
      this.showprod = 'all';
      // this.get_fulldata();
    } else {
      console.log('how to check');
      console.log(this.orderservice.screenid);
      if (this.orderservice.screenid === 'ordBSEMFsell') {
        this.showtran = 'sell';
        this.showprod = 'BSEMF';
      } else if  (this.orderservice.screenid === 'ordBSEMFbuy') {
        this.showtran = 'buy';
        this.showprod = 'BSEMF';
      }
      this.orderservice.validateprogress = true;
      this.orderservice.fullload = false;

    }
  } );
  console.log(this.orderservice.validateprogress);
}


get_fulldata() {
  this.orderservice.get_order_detailss();
}



ngonDestroy() {
  // reset values at service
  this.orderservice.reset();
}

getTotalCost_suc() {
  return this.orderservice.vali_comp_recs.map(t => t.mfor_amount).reduce((acc, value) => acc + value, 0);
}

getTotalCost_fai() {
  return this.orderservice.error_recs.map(t => t.mfor_amount).reduce((acc, value) => acc + value, 0);
}

getTotalCost_penpay() {
  return this.orderservice.ppy_success_recs.map(t => t.mfor_amount).reduce((acc, value) => acc + value, 0);
}

getpaylnk() {
  const vali = this.orderservice.ppy_success_recs;
  this.orderservice.reset();
  this.orderservice.fullload = false;
  this.orderservice.order_payment_link(vali);
}

send_submit() {
  const vali = this.orderservice.vali_comp_recs;
  this.orderservice.reset();
  this.orderservice.fullload = false;
  this.orderservice.orderplacment = true;
  this.orderservice.submitorder(vali);
}

}