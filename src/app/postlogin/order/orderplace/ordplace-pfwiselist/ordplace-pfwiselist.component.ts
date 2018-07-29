import { Component, OnInit, OnDestroy, AfterViewChecked, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NotifyService } from '../../../../natservices/notify.service';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { OrderservService } from '../../../../natservices/orderserv.service';
import { ChangeDetectorRef } from '@angular/core';
import { DialogsService } from '../../../../commonmodule/dialogs/dialogs.service';

@Component({
  selector: 'ordplace-pfwiselist',
  templateUrl: './ordplace-pfwiselist.component.html',
  styleUrls: ['./ordplace-pfwiselist.component.scss']
})
export class OrdplacePfwiselistComponent implements OnInit {


  selectedinvtyp: string[] = [];
  selectedfundlists: string[] = [];
  selectedpfs: string[] = [];
  fundnames = [];
  fundnamescpy = [];
  shofndselect = false;

  showit: boolean;
  onAddpfmode = false;
  onAddmfmode = false;
  onfetch = true;
  message1 = 'You don\'t have any portfolio yet.....Click on Add to start your journey';
  editi: number;
  totalpf: number;
  isEAModeon = false;
  editmode = true;
  alluse = 'allused';
  pfdetails;
  pfcpydetails;


  onpffetch = false;
  mforderdetails = [];
  pfdistnames = [];
  pfdistnamescpy = [];
  removeitemindex = [];
  onsavelater = false;
  norecordtosave = false;
  onetimeamtacrosspf = 0;
  sipamtacrosspf = 0;
  @Input() prod;
  @Input() trantype;


  empty_pfdetails =  {
    pfportfolioid: null,
    pfuserid: null,
    pfscreen: 'ord',
    pfnameadd: null,
    pfportfolioname: null,
    pfpurpose: null,
    pfbeneUsers: null,
    pfstartdt: null,
    pftargetdt: null,
    pftargetintrate: null,
    pfplannedinvamt: 0,
    pfinvamtfeq: null,
    pfstkamtsplittype: '%',
    pfmfamtsplittype: '%',
    pfsummed: null,
    pfshowadcrtbtn: '',
    pfsiptotal: 0,
    pfonetimetotal: 0,
    pfstklist: [
     /* {
        pfstexchange: "",
        pfsttradingsymbl: "",
        pfstltp: 0,
        pfstamt: 0,
        pfstpercent: 0,
        pfstallotedamt: 0,
        pfsttotunit: 0
      }*/
    ],
    pfmflist: [
    /*  {
        pfmffundname: "",
        pfmfnav: 0,
        pfmfamt: 0,
        pfmfpercent: 0,
        pfmfallotedamt: 0
      }*/
    ]
  };

  selected_mandate = '';
  selected_accnum = '';
  public orForm: FormGroup;

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

  constructor(private orfb: FormBuilder,
              private notify: NotifyService,
              public orderservice: OrderservService,
              private dbserivce: DbservicesService,
              private cdRef: ChangeDetectorRef,
              private dialogsService: DialogsService
            ) { }

  ngOnInit() {
    this.showit = true;
    this.fetchsavedorderdata();
    this.orderservice.listdata = 'init';
    console.log('listdate oninit'+ this.orderservice.listdata+ this.prod + this.trantype);

  }
/*
  ngAfterViewChecked() {
    this.getordchanged();
  }
*/
  ngOnDestroy() {
    this.orderservice.listdata = 'destroyed';
    this.fundnames = [];
    if (!this.onfetch && !this.onpffetch ) {
      this.store_orderdata_inservice();
    }
    console.log('listdate ondestry' + this.orderservice.listdata + this.prod + this.trantype);
  }

  fetchsavedorderdata() {
      this.onfetch = true;
      if (!this.is_data_inservice()) {
        const data_to_api = {
          'prod': this.prod,
          'trantype' : this.trantype
        };

        console.log(data_to_api);
        this.dbserivce.dbaction('mforder', 'fetch', data_to_api).subscribe(
          data =>
                {
                  this.mforderdetails = data['body']['orderdata'];
                  this.onfetch = false;
                  this.get_pf_details();
                  console.log("order tracker");
                  console.log(this.mforderdetails);
                  console.log("order tracker");
                },
          error =>
                {
                  this.mforderdetails = [];
                  if ('failreason' in error['error']) {
                    this.notify.update(error['error']['failreason'], 'error', 'alert');
                  } else {
                    this.notify.update(error.message, 'error', 'alert');
                  }
                  this.onfetch = false;
                }
        );
      } else {
        this.onfetch = false;
      }
  }

  store_orderdata_inservice() {
    switch (this.prod + this.trantype) {
      case('BSEMFbuy'): {
        this.orderservice.mfb_mforderdetails = this.mforderdetails.slice();
        this.orderservice.mfb_pfdistnames = this.pfdistnames.slice();
        this.orderservice.mfb_gotodb = false;
        break;
      }
      case('BSEMFsell'): {
        this.orderservice.mfs_mforderdetails = this.mforderdetails.slice();
        this.orderservice.mfs_pfdistnames = this.pfdistnames.slice();
        this.orderservice.mfs_gotodb = false;
        break;
      }
    }
    this.orderservice.fullpflist = this.pfdistnamescpy.slice();
  }

  is_data_inservice() {
    let datainsrv = false;
    switch (this.prod + this.trantype) {
      case('BSEMFbuy'): {
        if (this.orderservice.mfb_gotodb) {
          datainsrv = false;
        } else {
          // This means data is set in the current run.  So don't hit db again.
          this.mforderdetails = this.orderservice.mfb_mforderdetails.slice();
          this.pfdistnames = this.orderservice.mfb_pfdistnames.slice();
          datainsrv = true;
        }
        break;
      }
      case('BSEMFsell'): {
        if (this.orderservice.mfs_gotodb) {
          datainsrv = false;
        } else {
          // This means data is set in the current run.  So don't hit db again.
          this.mforderdetails = this.orderservice.mfs_mforderdetails.slice();
          this.pfdistnames = this.orderservice.mfs_pfdistnames.slice();
          datainsrv = true;
        }
        break;
      }
    }
    if ( (typeof(this.orderservice.fullpflist) !== 'undefined') && (this.orderservice.fullpflist.length > 0)) {
      this.pfdistnamescpy = this.orderservice.fullpflist.slice();
    } else {
      datainsrv = false;
    }
    console.log('inside isdatainservice' + datainsrv);

    return(datainsrv);
  }

  get_dist_pfnames() {
    this.pfdistnames = this.orderservice.fullpflist.slice();
    this.mforderdetails.forEach ((mfordrec) => {
      const index = this.pfdistnames.findIndex(item => item.pfportfolioid === mfordrec.pfportfolioid);
      if ( index > -1 ) {
        this.pfdistnames.splice(index, 1);
      }
    });
  }

  get_pf_details() {
    this.onpffetch = true;
    const data = [];
    this.dbserivce.dbaction('pfmain', 'fetch', data)
    .subscribe(
      record => {
                  this.pfdistnamescpy = record['body'].slice();
                  // Below is the steps to get pfdistnames
                  this.orderservice.fullpflist = record['body'].slice();
                  this.get_dist_pfnames();
                  console.log(this.pfdistnames);
                  this.onpffetch = false;
                  // if there are no saved orders add an empty pfcard
                  if (this.mforderdetails.length === 0 ) {
                    this.addEmptypf();
                  }
                },
      error => {
                  if ('failreason' in error['error']) {
                    this.notify.update(error['error']['failreason'], 'error', 'alert');
                  } else {
                    this.notify.update(error['message'], 'error', 'alert');
                  }
                  this.onpffetch = false;
                }
    );

  }

  addEmptypf() {
    const dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
    dd.pfnameadd = 'edit';
    this.mforderdetails.push(dd);
    this.isEAModeon = true;
  }

  addNewPortfolio() {
    this.addEmptypf();
  }

  confirmpfselection(eve) {
    console.log('confirmpfwiselist');
    console.log(this.pfdistnames);
    const eventrec = this.pfdistnames.filter(rec => rec.pfportfolioname === eve.selected);
    if (eventrec.length === 1) {
      this.mforderdetails.splice(eve.index, 1, eventrec[0]);
      this.mforderdetails[eve.index].pfnameadd = '';
      this.isEAModeon = false;
      // remove the item from fundnames to ensure it has pf's not in order list: START
        let removeitemindex = -1;
        this.pfdistnames.forEach((cure, inder) => {
          if (cure.pfportfolioname === eve.selected) {
            removeitemindex = inder;
          }
        });
        if (removeitemindex !== -1) {
          this.pfdistnames.splice(removeitemindex, 1);
        }
      // remove the item from fundnames to ensure it has pf's not in order list: END
      }

      if ((this.prod + this.trantype) === 'BSEMFsell') {
        console.log('t');
      } else {
        this.orderservice.formref.controls.pfPortfolioname.setErrors({'nameincorct': true});
      }
}


  savordforlater() {
    this.norecordtosave = false;

    if (this.prod === 'BSEMF') {
    if (this.mforderdetails.length === 0) {
      this.norecordtosave = true;
    } else if (this.mforderdetails.length > 0) {
      this.mforderdetails.forEach((cure) => {
        if (cure.pfportfolioid === null) {
          this.norecordtosave = true;
        }
        if (cure.pfmflist === null || cure.pfmflist.lenght === 0 ) {
          this.norecordtosave = true;
        } else if (cure.pfmflist.length > 0 ) {
          console.log(cure.pfmflist);
          cure.pfmflist.forEach ((mflis) => {
            console.log(mflis);
            if (mflis.ormffundname === '') {
              this.norecordtosave = true;
            }
          });
        }

      });
    }
  }

    if ( this.norecordtosave ) {
          this.notify.update('No orders to save', 'info', 'alert');
    } else {
          this.onsavelater = true;
          this.dbserivce.dbaction('mforder', 'saveforlater', this.mforderdetails).subscribe(
            data =>
                  {
                    // this.fetchsavedmforderdata();
                    this.onsavelater = false;
                    this.showit = false;
                    this.notify.update('Orders saved', 'info', 'alert');
                  },
            error => 
                  { 
                    this.onsavelater = false;
                    this.mforderdetails = [];
                    this.notify.update(error.message, 'error', 'alert');
                  },
            () => {
                    this.onsavelater = false;
                    this.showit = false;
                  }
          );
    }
  }

  get_total() {
    this.showit = true;
    this.notify.clearall();
    this.onetimeamtacrosspf = 0;
    this.sipamtacrosspf = 0;
    this.mforderdetails.forEach((cure) => {
      const pfonetimeto = cure.pfonetimetotal;
      this.onetimeamtacrosspf = Number(cure.pfonetimetotal) + Number(this.onetimeamtacrosspf);
      this.sipamtacrosspf = Number(cure.pfsiptotal) + Number(this.sipamtacrosspf);
    });
  }

  placeorder() {
    this.savordforlater();
    // this.fundnames = this.orderservice.fundnames;
    this.editmode = false;
  }

  confirmorder() {
    this.orderservice.mforderdetails = this.mforderdetails;
    this.orderservice.screenid = this.mforderdetails[0].pfscreen;
    this.orderservice.placeorder();
  }

  backbtn() {
    this.showit = true;
    this.editmode = true;
  }

  addonestklst() {
    this.onAddpfmode = !this.onAddpfmode;
  }

  removeapf(ind) {
    this.openDialog(ind);
  }

  public openDialog(ind) {
    console.log(ind);
    console.log(this.pfdistnamescpy);
    console.log(this.mforderdetails[ind].pfportfolioid);
    this.dialogsService
      .deletealert('Delete Alert', 'Are you sure you want to do this?')
      .subscribe(res => {
        if (res) {
          const eventrec = this.pfdistnamescpy.filter(rec => rec.pfportfolioid === this.mforderdetails[ind].pfportfolioid);
          console.log(eventrec);
          if (eventrec.length === 1) {
            this.pfdistnames.push(eventrec[0]);
            this.mforderdetails.splice(ind, 1);
          } else {
            this.notify.update('Technical issue, please contact admin', 'error', 'alert');
          }
        }
      }
      );
  }









  addNewPortfolio1() {
    console.log('inside [] outside');
    console.log(this.fundnames.length === 0);

    if (this.fundnames.length === 0) {
      this.onpffetch = true;
      console.log('inside []');
      this.dbserivce.dbaction('pfmain', 'fetch', this.mforderdetails )
      .subscribe(
        record => {
                    console.log('fetchfetch');
                    console.log(record['body']);
                    console.log(record['body'].length);
                    if ( record['body'].length > 0 ) {
                        console.log('fetchfetch true');
                        this.fundnames = record['body'];
                        this.fundnamescpy = this.fundnames;
                        let dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
                        dd.pfnameadd = 'edit';
                        this.mforderdetails.push(dd);
                        this.isEAModeon = true;
                    } else {
                      this.notify.update('All Porfolios are already in order list', 'info', 'alert');
                    }
                  /*  let fundnamess = record['body'][0];
                    fundnamess.filter(recs => recs.pfportfolionam == );
                    console.log(this.fundnames);
                    let result = allrecord.filter(recs => recs.orMFfundordelsfreq == trigerrec.orMFfundordelsfreq.value && recs.orMFfundordelsstdt ==trigerrec.orMFfundordelsstdt.value); */
                    this.onpffetch = false;
        }
      );
    }
    /*else if (this.fundnames.length === 0) {
      console.log('inside [] allused');
      this.notify.update('All Porfolios are already in order list', 'info', 'alert');
    }*/ else if (this.fundnames.length > 0) {
        console.log('inside [] have record');
        let dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
        dd.pfnameadd = 'edit';
        this.mforderdetails.push(dd);
        this.isEAModeon = true;
    }
  }


  cardasave1(ind) {
    const eventrec = this.pfdistnames.filter(rec => rec.pfportfolioname === this.orderservice.selected2);
    if (eventrec.length === 1) {
      this.mforderdetails.splice(ind, 1, eventrec[0]);
      this.mforderdetails[ind].pfnameadd = '';
      this.isEAModeon = false;
      // remove the item from fundnames to ensure it has pf's not in order list: START
        let removeitemindex = -1;
        this.pfdistnames.forEach((cure, inder) => {
          if (cure.pfportfolioname === this.orderservice.selected2) {
            removeitemindex = inder;
          }
        });
        if (removeitemindex !== -1) {
          this.pfdistnames.splice(removeitemindex, 1);
        }
      // remove the item from fundnames to ensure it has pf's not in order list: END
      } else {
        this.orderservice.formref.controls.pfPortfolioname.setErrors({'nameincorct': true});
      }
  }

/*
  getordchanged() {
    if (this.orderservice.ordchanged === 'YES'){
      console.log('inside getorderchanged true');
      this.showit = true;
    } else {
      console.log('inside getorderchanged false');
      this.showit = false;
    }
    this.cdRef.detectChanges();
  }

  savordforlater1(){
    this.orderservice.saveorder();
    this.orderservice.getfundnames();
    this.fundnames = this.orderservice.fundnames;
    this.showit = false;
  }

  placeorder1(){
    this.orderservice.saveorder();
    this.orderservice.getfundnames();
    this.fundnames = this.orderservice.fundnames;
    this.editmode = false;
  }

  confirmorder1() {
    this.orderservice.placeorder();
  }


  showbtn() {
    if (this.pfdetails.pfmflist.length < 0) {
      return false;
    } else {
      return true;
    }

  }
*/
  sipmanselchg(evn) {
    console.log('selection change triggered');
    console.log(evn);
  }

}
