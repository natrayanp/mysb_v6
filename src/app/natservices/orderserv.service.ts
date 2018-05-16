import { Injectable } from '@angular/core';
import { DbservicesService } from '../natservices/dbservices.service';
import { NotifyService } from '../natservices/notify.service';
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
  paylnk = '';
  allsubmitrecs: any;
  show = false; // this is used to display 
  urltyp = '';
  // ordchanged= new BehaviorSubject("YES");
  sipamtacrosspf= new BehaviorSubject(0);
  onetimeamtacrosspf = new BehaviorSubject(0);
  mynoti = new BehaviorSubject('nofull');
  error_recs = [];
  success_recs = [];
  vali_comp_recs = [];
  paymentpopshown = false;
  has_ontime_rec = false;

  /*
  private _sipamt = new Subject<any | null>();
  onetimeamtacrosspfob = this._onetimeamt.asObservable();
  sipacrosspfob = this._sipamt.asObservable();
*/
getmforderdata(){
    this.onfetch = true;
    this.dbserivce.dbaction('mforder', 'fetch', '').subscribe(
      data =>
            {
              this.mforderdetails = data['body'];
              console.log(this.mforderdetails);
              // this.totalpf=this.pfdetails.length;
              // this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
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
  }else {
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
    this.validateprogress = true;
    this.router.navigate(['securedpg/mfordcof', '']);
    this.dbserivce.dbaction('mforder', 'validate', this.mforderdetails )
  .subscribe(
    record => {
                console.log(record['body']);
                this.has_ontime_rec = record['body'].has_ontime_rec;
                if(this.has_ontime_rec) {

                if (record['body'].success_recs !== null && record['body'].success_recs.length > 0) {
                  this.submitorder(record['body'].success_recs);
                  this.validateprogress = false;
                  this.orderplacment = true;
                } else if (record['body'].failure_recs.length > 0 ) {
                  this.orderplacment = false;
                  this.bsevalidationfail = true;
                  console.log('data error');
                  this.error_recs = record['body'].failure_recs;
                } else if ((record['body'].success_recs === null || record['body'].success_recs.length < 1 ) &&
                          (record['body'].failure_recs === null || record['body'].failure_recs.length < 1)) {
                  this.notify.update('Internal error occured, please contact assetscube', 'error', 'alert');
                  this.validateprogress = false;
                }


              } else {
                  console.log('no one time records');
                  this.paymentpopshown = true;
              }
              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
                this.validateprogress = false;
              }
          ) ;
}

submitorder(succrecs) {
  this.validatefail = false;

  console.log(succrecs);
  this.dbserivce.dbaction('mforder', 'submit', succrecs )
  .subscribe(
    record => {
                console.log('submitorder');
                console.log(record['body']);
                this.allsubmitrecs = record['body'];
                console.log(this.allsubmitrecs);
                this.subsub(record['body']);
                if (this.error_recs.length < 1 && this.success_recs.length > 0) {
                  this.order_payment_link(this.success_recs);
                } else {

                }
              },
    error =>  {

                this.validatefail = false;

                this.notify.update(error.message, 'error', 'alert');
              }
          ) ;
}

order_payment_link(orderrec) {
  this.bsevalidationfail = false;
  this.paymentlink = true;
  console.log('insider order payment');
  console.log(orderrec);
  this.dbserivce.dbaction('mforder', 'payment', orderrec )
  .subscribe(
    record => {
                console.log('payment link');
                console.log(record['body']);
                this.urltyp = record['body'].url_type;
                this.paylnk = record['body'].payment_url;
                console.log(this.paylnk);
                this.mynoti.next('success');
                this.paymentlink = false;

              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
                this.paymentlink = true;
              }
          ) ;
}


get_order_detailss() {

  const orderrec = {'fromdate': null, 'todate' : null, 'order_type': 'One Time', 'record_type': 'ALL' };

  this.dbserivce.dbaction('mforder', 'details', orderrec )
  .subscribe(
    record => {
      console.log(record['body']);
      this.subsub(record['body']);
    }
  ) ;
}


ordercancel(recs) {
  console.log(recs);
  console.log(this.allsubmitrecs);
}


subsub(rec) {
  console.log(rec);
  rec = rec.one_time;
  console.log(rec);

if ((rec.failure_recs === null || rec.bse_failure_recs === null)
      && (rec.success_recs.length > 0) ) {
        this.bsevalidationfail = false;
        this.order_payment_link(rec.success_recs);
} else {
      console.log('data error');
      this.orderplacment = false;
      this.bsevalidationfail = true;
      this.error_recs = [];
      console.log(this.error_recs );
      console.log(rec.failure_recs);
      // if (rec.failure_recs !== null && rec.failure_recs !== '') {
      if (rec.failure_recs.length > 0) {
            rec.failure_recs.forEach(element => {
              this.error_recs.push(element);
            });
      }
      console.log(this.error_recs );

      // if (rec.bse_failure_recs !== null && rec.bse_failure_recs !== '') {
        if (rec.bse_failure_recs.length > 0) {
            rec.bse_failure_recs.forEach(element => {
              this.error_recs.push(element);
            });
      }
      console.log(this.error_recs );
      // this.error_recs = this.error_recs[0];
      this.success_recs = rec.paypending_recs;
      console.log(this.success_recs);
      

      this.vali_comp_recs = rec.success_recs;
      console.log(this.vali_comp_recs );

}
this.orderplacment = false;
this.mynoti.next('ordersub');

}


reset() {
  this.validateprogress = false;
  this.orderplacment = false;
  this.validatefail = false;
  this.bsevalidationfail= false;
  this.paymentlink = false;
  this.success_recs = [];
  this.error_recs = [];
}

}
