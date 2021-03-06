import { Component, OnInit, Input } from '@angular/core';
import { OrderservService } from '../../../../natservices/orderserv.service';
import { DbservicesService } from '../../../../natservices/dbservices.service';


@Component({
  selector: 'orderpending-list',
  templateUrl: './orderpending-list.component.html',
  styleUrls: ['./orderpending-list.component.scss']
})
export class OrderpendingListComponent implements OnInit {
  @Input() prod;
  @Input() tran;
  @Input() showprod;
  @Input() showtran;
  order_type: string;
  dataSourcesppy = [];
  dataSourcefai = [];
  dataSourceval = [];
  dataSourcesppp = [];
  fetchingdata = false;
  ppy_success_recs = [];
  error_recs = [];
  vali_comp_recs = [];
  subscri: string;

  constructor(public orderservice: OrderservService, private dbserivce: DbservicesService ) { }

  ngOnInit() {
    if (this.prod === 'BSEMF' && this.tran === 'sell') {
      this.order_type = 'BSMFsell';
    } else if (this.prod === 'BSEMF' && this.tran === 'buy') {
      this.order_type = 'One Time';
    }
  
    if (this.showprod === 'all' && this.showtran === 'all') {
    console.log('getting full data');
    this.get_fulldata();
  } else {
    console.log('getting part data');
    this.get_current_tran_data();
  }
  }

  get_current_tran_data() {
    console.log('before subscribe');

  this.orderservice.mynoti.subscribe(rrr => {
    if ( rrr === 'success') {
    if (this.orderservice.urltyp === 'dirpayhtml') {
      // this.popucomp();
    } else if (this.orderservice.urltyp === 'bsepayurl') {
      // this.popu(this.orderservice.paylnk);
    }
    } else if ( rrr === 'ordersub') {
      this.dataSourcesppy = this.orderservice.ppy_success_recs;
      this.dataSourcefai = this.orderservice.error_recs;
      this.dataSourceval = this.orderservice.vali_comp_recs;
      this.dataSourcesppp = this.orderservice.pay_initiated_recs;
    }
  });
  }



get_fulldata() {
  this.fetchingdata = true;

  this.ppy_success_recs = [];
  this.error_recs = [];
  this.vali_comp_recs = [];
  

  const orderrec = {'fromdate': null, 'todate' : null, 'order_type': this.order_type, 'record_type': 'ALL' };
  this.dbserivce.dbaction('mforder', 'details', orderrec )
  .subscribe(
    record => {
      console.log(record['body']);
      const tbdt = this.orderservice.get_data_for_tables(record['body']);
      this.dataSourcesppy = tbdt.tmp_ppy_success_recs;
      this.dataSourcefai = tbdt.tmp_error_recs;
      this.dataSourceval = tbdt.tmp_vali_comp_recs;
      this.dataSourcesppp = tbdt.tmp_pay_initiated_recs;
      this.fetchingdata = false;
    },
    error => {
      console.log('error');
      this.fetchingdata = false;
      // this.notify.update(error.message, 'error', 'alert');

    }
  ) ;
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
