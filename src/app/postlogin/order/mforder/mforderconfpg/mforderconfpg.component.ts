import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { OrderservService } from '../../../../natservices/orderserv.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mforderconfpg',
  templateUrl: './mforderconfpg.component.html',
  styleUrls: ['./mforderconfpg.component.scss']
})
export class MforderconfpgComponent implements OnInit {

  displayedColumns = ['Unique Order#', 'portfolio name', 'Fund name', 'Amount', 'errors'];

  dataSourcesppy = new MatTableDataSource();
  dataSourcefai = new MatTableDataSource();
  dataSourceval = new MatTableDataSource();

  paginator: MatPaginator;
  paginator1: MatPaginator;
  paginator2: MatPaginator;
  sort: MatSort;
  Total = 'Total Amt';
  // paymentpopshown = false;
  totalSizesuc = 0;
  totalSizefai = 0;
  email = new FormControl([Validators.required]);

  @ViewChild(MatSort) set appBacon3(sort: MatSort) {
    this.sort = sort;
    this.dataSourcesppy.sort = this.sort;
  }


  @ViewChild( 'paginator') set appBacon(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSourcesppy.paginator = this.paginator;
  }


  @ViewChild('paginator1') set appBacon1(paginator1: MatPaginator) {
    this.paginator1 = paginator1;
    this.dataSourcefai.paginator = this.paginator1;
  }


  @ViewChild('paginator2') set appBacon2(paginator2: MatPaginator) {
    this.paginator2 = paginator2;
    this.dataSourceval.paginator = this.paginator2;
  }


  constructor(private orderservice: OrderservService,
              private router: Router,
              private route: ActivatedRoute){


    this.orderservice.mynoti.subscribe(rrr => {
      if ( rrr === 'success') {
      if (this.orderservice.urltyp === 'dirpayhtml') {
        this.popucomp();
      } else if (this.orderservice.urltyp === 'bsepayurl') {
        this.popu(this.orderservice.paylnk);
      }
      } else if ( rrr === 'ordersub'){
        this.dataSourcesppy.data = this.orderservice.ppy_success_recs;
        this.dataSourcefai.data = this.orderservice.error_recs;
        this.dataSourceval.data = this.orderservice.vali_comp_recs;
      }

    });

   }




   ngOnInit() {
    this.initpage();
  // this.dataSource = this.orderservice.error_recs;
  
  }


popucomp() {
  //<html> <META HTTP-EQUIV="Pragma" CONTENT="no-cache"> <META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997, 08:21:57 GMT"> <script language = "javascript"> function hitBankURL() { errorPage.submit(); } </script> <body onload = "javascript:hitBankURL()"> <Form name='errorPage' method='post' action='http://localhost:8000/orpost'> <input type='hidden' name='msg' value='BSEDSTRBTR|NA|NA|NA|6589.00|NA|NA|NA|NA|NA|R|bsedstrbtr|NA|NA|0002|NA|NA|NA|NA|NA|NA|NA|NA|ERR122|Sorry. We were unable to process your transaction. We apologise for the inconvenience and request you to try again later.|64AE03066AF1021BAB837772C26A9A6FB5C762A55EBB5A5312797A8A49D148D3'> <input name='hidRequestId' type='hidden' value='PGIBL1000'> <input name='hidOperation' type='hidden' value='B101'> </Form> </Body> </html>";
  this.router.navigate(['/paylnk']);
}

popu(paylnk) {
  // paylnk = 'http://bsestarmfdemo.bseindia.com/ClientOrderPayment.aspx?INtPvGmyOzdvVLRCAlRSyLep2wKQls+dik8REh8D/5RxmamsVZHD/ZCxz1O9mlWJWW2gsRaoYO5LPbCHI9HSrw==';
  window.location.href = paylnk;
}

initpage() {
  this.orderservice.reset();
  this.route.params.subscribe( params => {
    if ( params.id === 'full') {
      this.orderservice.fullload = true;
      this.orderservice.showtables = true;
      this.get_fulldata();
    } else {
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
