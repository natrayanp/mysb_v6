import { Injectable } from '@angular/core';
import { DbservicesService } from './dbservices.service';
import { NotifyService } from './notify.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Injectable()
export class OrderservService {

  constructor(private dbserivce: DbservicesService,
              private notify: NotifyService,
              private route: ActivatedRoute,
              private router: Router) { this.selectedfund = {}; }

  mforderdetails;
  // errormessage:string;
  selectedfund: any;
  formref: any;
  selected2: string;
  onfetch = false;
  onsavelater = false;
  ordchanged = 'YES';
  fundnames = [];
  validateprogress= false;
  orderplacment = false;
  validatefail = false;
  bsevalidationfail= false;
  paymentlink = false;
  fullload = true;
  paylnk = '';
  allsubmitrecs: any;
  show = false; // this is used to display 
  urltyp = '';
  // ordchanged= new BehaviorSubject("YES");
  sipamtacrosspf = new BehaviorSubject(0);
  onetimeamtacrosspf = new BehaviorSubject(0);
  mynoti = new BehaviorSubject('nofull');
  error_recs = [];
  ppy_success_recs = [];
  vali_comp_recs = [];
  pay_initiated_recs = [];
  bse_submitted_recs = [];
  onlysiporder = false;
  has_ontime_rec = false;
  selected_mandate = '';
  selected_accnum = '';
  showtables = false;
  failpaylink = false;
  fetchingdata = false;
  testval: string;
  listdata: string;
  savelater = true;
  hassellorder = false;

  // ###########################
  // Data for all products
  fullpflist: any[];
  screenid: string;
  // Data for BSEMF buy
  mfb_pfdistnames =  null;
  mfb_mforderdetails = null;
  mfb_gotodb = true;


  // Data for BSEMF sell
  mfs_pfdistnames = null;
  mfs_mforderdetails = null;
  mfs_gotodb = true;
  

// ###########################
  
  mandateids = [{
    'mandate_id':'BSE000000016247',
    'bank' : 'ICICI BANK LIMITED',
    'branch': 'CHENNAI - CENOTAPH ROAD',
    'bank_id' : 'IC01',
    'mandate_type' : 'I'  // ISIP OR XSIP
  },
  {
    'mandate_id':'BSE000000016248',
    'bank' : 'ICICI BANK LIMITED',
    'branch': 'CHENNAI - CENOTAPH ROAD',
    'bank_id' : 'IC01',
    'mandate_type' : 'I'  // ISIP OR XSIP
  }];
// 1114 in mforder.py
  regisaccts = [{
    'acnum': '123456789123',
    'bank' : 'ICICI BANK',
    'branch': 'Egmore',
    'bank_id' : 'ICI',
    'ifsc': 'ICIC0000001',
    'mode' : 'DIRECT'
  },
  {
    'acnum': '12345671',
    'bank' : 'ALLAHABAT BANK',
    'branch': 'Guindy',
    'bank_id' : 'AL02',
    'ifsc': 'ALALAL00001',
    'mode' : 'Modal'
  },

];





  /*
  private _sipamt = new Subject<any | null>();
  onetimeamtacrosspfob = this._onetimeamt.asObservable();
  sipacrosspfob = this._sipamt.asObservable();
*/
getmforderdata() {
    this.onfetch = true;
    this.dbserivce.dbaction('mforder', 'fetch', '').subscribe(
      data =>
            {
              console.log(data['body']);
              this.mforderdetails = data['body'];
              console.log(this.mforderdetails);
              this.onfetch = false;
            },
      error =>
            {
              this.onfetch = false;
              this.mforderdetails = [];
              this.notify.update(error.message, 'error', 'alert');
            },
      () => {
              this.onfetch = false;
            }
    );
  }


  gettotalacrosspf(){
    let onetimeamtacrosspfs = 0;
    let sipamtacrosspfs = 0;

    console.log('gettotal');
    console.log(this.mforderdetails);
    this.mforderdetails.forEach((cure, inder) => {
      if(cure.pfonetimetotal != null) {
     onetimeamtacrosspfs = onetimeamtacrosspfs + Number(cure.pfonetimetotal);
      }
      if(cure.pfsiptotal != null){
        sipamtacrosspfs = sipamtacrosspfs + Number(cure.pfsiptotal);}
     });
     this.ordchanged = 'YES';
     this.onetimeamtacrosspf.next(onetimeamtacrosspfs);
     this.sipamtacrosspf.next(sipamtacrosspfs);
    // this._onetimeamt.next(this.onetimeamtacrosspf);
     // this._sipamt.next(this.sipamtacrosspf);
  }

  addfund(index, value) {
    console.log(index);
    console.log(value);
    console.log(this.mforderdetails);
    this.mforderdetails.splice(index, 1, value);
  }

  setfund(fundname) {
  console.log(fundname);
  console.log(this.selectedfund);
  if (fundname) {
    this.selectedfund = JSON.parse(JSON.stringify(fundname));
    return (fundname ? fundname.pfportfolioname : undefined);
  } else {
    return undefined;
  }
}

saveorder() {
  this.onsavelater = true;
  this.dbserivce.dbaction('mforder', 'saveforlater', this.mforderdetails).subscribe(
    data =>
          {
            this.getmforderdata();
            // this.mforderdetails = data['body'];
            console.log( data['body']);
            this.onsavelater = false;
          },
    error => 
          { 
            this.onsavelater = false;
            this.mforderdetails = [];
            this.notify.update(error.message, 'error', 'alert');
          },
    () => {
            this.onsavelater = false;
          }
  );
}



getfundnames() {

  this.dbserivce.dbaction('pfmain', 'fetch', this.mforderdetails )
  .subscribe(
    record => {
                console.log('fetchfetch');
                console.log(record['body'][0]);
                console.log(record['body'][0].length);
                if ( record['body'][0].length > 0 ) {
                    this.fundnames = record['body'][0];
                }
              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
              }
          ) ;

}

placeorder() {
    this.router.navigate(['securedpg/mfordcof', '']);
    const submit_recs = {
      'succrecs': this.mforderdetails,
      'one_time_pay': this.selected_accnum,
      'sip_pay': this.selected_mandate,
      'userid' : '',
      'entityid' : '',
      'screenid' : this.screenid
    };

    this.dbserivce.dbaction('mforder', 'validate', submit_recs )
  .subscribe(
    record => {
                console.log(record['body']);
                this.has_ontime_rec = record['body'].has_ontime_rec;
                const rec = record['body'].one_time;

                // This is common route for ordBSEMFbuy and ordBSEMFsell
                if ( this.has_ontime_rec) {
                  if (rec.val_success_recs.length > 0) {
                    // This is path where we have atleast one success record
                    console.log(rec.val_success_recs);
                    this.validateprogress = false;
                    this.submitorder(rec.val_success_recs);
                  } else if (rec.failure_recs.length > 0 ) {

                    // This is path where we have not even one success record
                    console.log('validation failed for all records');
                    this.update_data_for_tables(record['body']);
                    this.validateprogress = false;
                    this.showtables = true;
                    this.selected_accnum = '';
                    this.selected_mandate = '';

                  } else if ((rec.val_success_recs.length < 1 ) &&
                            (rec.failure_recs.length < 1)) {
                    this.notify.update('Internal error occured, please contact us', 'error', 'alert');
                    this.validateprogress = false;
                  }
                } else {
                  // Go to Final screen
                  console.log('no one time records');
                  this.validateprogress = false;
                  this.router.navigate(['/securedpg/orderhistory']);
                }
              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
                this.validateprogress = false;
              }
          ) ;
}


submitorder(succrecs) {
  this.orderplacment = true;
  // this.validatefail = false;
  const submit_recs = {
    'succrecs': succrecs,
    'one_time_pay': this.selected_accnum,
    'sip_pay': this.selected_mandate,
    'userid' : '',
    'entityid' : '',
    'screenid' : this.screenid
  };
  console.log(succrecs);
  this.dbserivce.dbaction('mforder', 'submit', submit_recs )
  .subscribe(
    record => {
                console.log('submitorder');
                console.log(record['body']);
                this.allsubmitrecs = record['body'];
                console.log(this.allsubmitrecs);
                this.update_data_for_tables(record['body']);
                console.log(this.screenid);
                // In case of sell  after submitting to BSE go to final screen
                if (this.screenid === 'ordBSEMFsell') {
                  if ( this.error_recs.length > 0 ) {
                    this.orderplacment = false;
                    this.showtables = true;
                    this.selected_accnum = '';
                    this.selected_mandate = '';
                  } else if (this.bse_submitted_recs.length > 0) {
                    // Go to Final screen
                    console.log('no one time records');
                    this.orderplacment = false;
                    this.router.navigate(['/securedpg/orderhistory']);
                  }
                } else if (this.screenid === 'ordBSEMFbuy') {
                  if (this.error_recs.length < 1 && this.ppy_success_recs.length > 0) {
                    this.order_payment_link(this.ppy_success_recs);
                    this.orderplacment = false;
                  } else if ( this.error_recs.length > 0 ) {
                    this.orderplacment = false;
                    this.showtables = true;
                    this.selected_accnum = '';
                    this.selected_mandate = '';
                  } else if ( this.error_recs.length < 1 && this.ppy_success_recs.length < 1 ) {
                    this.notify.update('Internal error occured, please contact us', 'error', 'alert');
                    this.orderplacment = false;
                  }
                }
              },
    error =>  {

                this.orderplacment = false;
                this.notify.update(error.message, 'error', 'alert');
              }
          ) ;
}

order_payment_link(orderrec) {
  this.paymentlink = true;
  console.log('insider order payment');
  console.log(orderrec);
  const submit_recs = {
    'succrecs': orderrec,
    'one_time_pay': this.selected_accnum,
    'sip_pay': this.selected_mandate,
    'userid' : '',
    'entityid' : '',
    'screenid' : this.screenid
  };
  this.dbserivce.dbaction('mforder', 'payment', submit_recs)
  .subscribe(
    record => {
                console.log('payment link');
                console.log(record['body']);
                this.paymentlink = false;
                if ( record['body'].status === 'success') {
                  this.urltyp = record['body'].url_type;
                  this.paylnk = record['body'].payment_url;
                  console.log(this.paylnk);
                  this.mynoti.next('success');
                } else if ( record['body'].status === 'failed') {
                     this.failpaylink = true;
                }

              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
                this.paymentlink = false;
              }
          ) ;
}


get_order_detailss() {
  this.fetchingdata = true;

  this.ppy_success_recs = [];
  this.error_recs = [];
  this.vali_comp_recs = [];
  

  const orderrec = {'fromdate': null, 'todate' : null, 'order_type': 'One Time', 'record_type': 'ALL' };
  this.dbserivce.dbaction('mforder', 'details', orderrec )
  .subscribe(
    record => {
      console.log(record['body']);
      const tabledata = this.prepare_data_for_tables(record['body']);
      this.fetchingdata = false;
      return tabledata;
    },
    error => {
      console.log('error');
      this.fetchingdata = false;
      this.notify.update(error.message, 'error', 'alert');

    }
  ) ;
}


ordercancel(recs) {
  console.log(recs);
  console.log(this.allsubmitrecs);
}


get_data_for_tables(rec) {
  const tbdt = this.prepare_data_for_tables(rec);
  return tbdt;
}

update_data_for_tables(rec) {
  const tbdt = this.prepare_data_for_tables(rec);
  this.error_recs = tbdt.tmp_error_recs;
  this.ppy_success_recs = tbdt.tmp_ppy_success_recs;
  this.vali_comp_recs = tbdt.tmp_vali_comp_recs;
  this.pay_initiated_recs = tbdt.tmp_pay_initiated_recs;
  this.bse_submitted_recs = tbdt.tmp_bse_submitted_recs;

  this.mynoti.next('ordersub');
}


prepare_data_for_tables(rec) {

    console.log(rec);
    rec = rec.one_time;
    console.log(rec);
    // this.orderplacment = false;
    // this.bsevalidationfail = true;
    const tmp_error_recs = [];
    console.log(rec.failure_recs);
    // if (rec.failure_recs !== null && rec.failure_recs !== '') {
    if (rec.failure_recs.length > 0) {
          rec.failure_recs.forEach(element => {
            tmp_error_recs.push(element);
          });
    }
    console.log(tmp_error_recs);

    // if (rec.bse_failure_recs !== null && rec.bse_failure_recs !== '') {
      if (rec.bse_failure_recs.length > 0) {
          rec.bse_failure_recs.forEach(element => {
            tmp_error_recs.push(element);
          });
    }
    console.log(tmp_error_recs);
    // this.error_recs = this.error_recs[0];

    // PPY records
    const tmp_ppy_success_recs = rec.paypending_recs;
    console.log(tmp_ppy_success_recs);

    // VAS records
    const tmp_vali_comp_recs = rec.val_success_recs;
    console.log(tmp_vali_comp_recs );

    /// PPP records
    const tmp_pay_initiated_recs = rec.pay_initiated_recs;
    console.log(tmp_pay_initiated_recs);

    /// SBE (Submitted to BSE succesfully)
    const tmp_bse_submitted_recs = rec.bse_submitted_recs;
    console.log(tmp_bse_submitted_recs);

    // }
    // this.orderplacment = false;

    const data_to_return = {
      'tmp_error_recs' : tmp_error_recs,
      'tmp_ppy_success_recs': tmp_ppy_success_recs,
      'tmp_vali_comp_recs' : tmp_vali_comp_recs,
      'tmp_pay_initiated_recs': tmp_pay_initiated_recs,
      'tmp_bse_submitted_recs': tmp_bse_submitted_recs
    };

    return data_to_return;
}


reset() {
  this.validateprogress = false;
  this.orderplacment = false;
  this.validatefail = false;
  this.bsevalidationfail= false;
  this.paymentlink = false;
  this.ppy_success_recs = [];
  this.error_recs = [];
  // this.selected_mandate = '';
  // this.selected_accnum = '';
  this.paylnk = '';
  this.showtables = false;
  this.failpaylink = false;
  // this.screenid = '';
}

get_order_status() {
  this.dbserivce.dbaction('mfpay', 'status', '' )
  .subscribe(
    record => {
      console.log('payment status');
      console.log(record['body']);
        this.router.navigate(['/securedpg/orderhistory']);
    },
    error => {
      console.log('error');
      this.notify.update(error.message, 'error', 'alert');

    }
  ) ;
}

reset_gotodb() {
  this.mfb_gotodb = true;
  this.mfs_gotodb = true;
}

}
