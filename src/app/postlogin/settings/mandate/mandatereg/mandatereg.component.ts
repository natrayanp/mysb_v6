import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MandateDetails } from '../../../../natdatamodel/natdatamodel';


@Component({
  selector: 'mandatereg',
  templateUrl: './mandatereg.component.html',
  styleUrls: ['./mandatereg.component.scss']
})
export class MandateregComponent implements OnInit {

  constructor(private orfb: FormBuilder) { }
  strtDate: Date;
  strdt: Date;
  title_txt: string;
  colr: string;
  sav_bt_txt: string;
  @Input() public oper;
  @Input() public readmode;
  @Input() public accounts;
  @Input() public detaildata: MandateDetails[];
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  public mandForm: FormGroup;
  empty_man_det = new MandateDetails;
  acctyps = [];
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());

  maxDate: Date;
selectedValue: string;
evenj = {};
mandatetypes = [
                // {'name':'XSIP','type':'X'},
                {'name':'ISIP','type':'I'},
                //{'name':' E-Mandate','type':'E'}
              ];

/*
acctyps = [{'acnum':'clientaccno1','actype':'SB','ifsc':'clientifsccode1','micr':'clientmicrno1','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno2','actype':'CA','ifsc':'clientifsccode2','micr':'clientmicrno2','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno3','actype':'NE','ifsc':'clientifsccode3','micr':'clientmicrno3','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno4','actype':'NO','ifsc':'clientifsccode4','micr':'clientmicrno4','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno5','actype':'SB','ifsc':'clientifsccode5','micr':'clientmicrno5','bank':'ICICIBANK, EGMORE'}
];
*/
acctypscpy = JSON.parse(JSON.stringify(this.acctyps));
sortedList;



  ngOnInit() {
    console.log(this.empty_man_det);
    this.get_title_text();
    this.acctyps = this.accounts;
    console.log(this.detaildata);
    if (JSON.stringify(this.detaildata) === '{}' ) {
      this.mandForm  = this.init_forms(this.empty_man_det); // man_status will be "new"
    } else {
      this.mandForm  = this.init_forms(this.detaildata);
    }

    this.evenj = this.detaildata;
    console.log(this.detaildata);
    this.strtDate = new Date();
    console.log(this.strtDate);
    this.nat1({'value': this.strtDate});
  }

  init_forms(valuelist) {

    const mymanform = new FormGroup({
      man_accno: new FormControl(this.get_account(valuelist.man_accno), Validators.compose([Validators.required])),
      man_amount: new FormControl(valuelist.man_amount, Validators.compose([Validators.required])),
      man_bankbranch: new FormControl(valuelist.man_bankbranch),
      man_bankname: new FormControl(valuelist.man_bankname),
      man_bsemandateid: new FormControl(valuelist.man_bsemandateid),
      man_enddate: new FormControl(new Date(valuelist.man_enddate), Validators.compose([Validators.required])),
      man_ifsc: new FormControl(valuelist.man_ifsc),
      man_mandatetype: new FormControl(this.get_mandate_type(valuelist.man_mandatetype), Validators.compose([Validators.required])),
      man_startdate: new FormControl(new Date(valuelist.man_startdate), Validators.compose([Validators.required])),
      man_status: new FormControl(valuelist.man_status),
      man_acctype: new FormControl(valuelist.man_acctype),
      man_internalid: new FormControl(valuelist.man_internalid),
    });
/*
    console.log(mymanform);

    mfform.get('orMFFundname').valueChanges 
    .pipe( debounceTime(200),
          distinctUntilChanged(),
          switchMap((query) =>  ((query.length > 2) ? this.dbserivce.dbaction('fund', 'fetch', query.toUpperCase() ) : empty()))
  )
    .subscribe(
        queryField => {
                        console.log(queryField['body']);
                        this.fundnames = queryField['body'];
                        this.fundnames.length > 0 ? console.log(this.fundnames) : 0 ;
                        console.log(this.fundnames);
                        if(this.fundnames.length === 1) {

                          // this.mypfdet.pfmflist[k].push(this.fundnames);
                          mfform.get('orMFDathold').patchValue(this.fundnames.length > 0? this.fundnames :{});
                          mfform.get('orMFFndcode').patchValue(this.fundnames.length == 1? this.fundnames[0]['fndschcdfrmbse'] :{});
                          mfform.get('orMFNatAmccode').patchValue(this.fundnames.length == 1? this.fundnames[0]['fndamcnatcode'] :{});

                          /* Intention of this code is to populated hint values (like sipminamt etc..)
                             but it is not working as expected.  So commenting out.
                             Future work to be done to acheive this.

                          if(mfform.get('orMFDathold')!= {}){
                            this.populateform1();
                          }

                         

                        }

                      },
        error =>      {
                          this.notify.update("All Porfolios' are already in order list", 'info', 'alert');
                      },
        () =>         {

                      }
                    );

*/
    return mymanform;
  }
  



  
nat(even) {
  console.log(even);
  console.log(this.accounts);
  console.log(even.source.value);
  this.evenj = this.accounts.filter(e => (e.acnum === even.source.value) );
  console.log(this.evenj);
  this.mandForm.get('man_acctype').patchValue(this.evenj[0].actype);
  this.mandForm.get('man_ifsc').patchValue(this.evenj[0].ifsc);
  this.mandForm.get('man_bankname').patchValue(this.evenj[0].bank);
}
/*
"acnum": "clientaccno5",
"actype": "SB",
"ifsc": "clientifsccode5",
"micr": "clientmicrno5",
"bank": "ICICIBANK, EGMORE"
*/

nat1(even){
  console.log(even);
  var n = 100;
  var expireDate = new Date(even.value);
  console.log(expireDate.getDate());
  this.strdt = new Date(expireDate.setFullYear(expireDate.getFullYear() + 1 ));
  console.log(this.strdt);
  this.maxDate =  new Date(expireDate.setFullYear(expireDate.getFullYear() + n));
}

confirmb(btnclick) {
  const emit_data = {
    'operation' : this.oper,
    'btnclicked' : btnclick,
    'data' : this.mandForm.value
  };
  this.confirm.emit(emit_data);
}

confirmIt() {
  this.confirmb('confirm');
}

backIt() {
  this.readmode = false;
}

saveIt() {
  this.readmode = true;
}

cancelt() {
  this.confirmb('cancel');
}

get_title_text() {
  switch (this.oper) {
    case 'del': {
      this.title_txt = 'Delete Mandate';
      this.colr = 'warn';
      this.sav_bt_txt = 'Delete';
      break;
    }
    case 'new': {
      this.title_txt = 'Add New Mandate';
      this.colr = 'primary';
      this.sav_bt_txt = 'Save';
      break;
    }
    case 'edit': {
      this.title_txt = 'Edit Mandate';
      this.colr = 'primary';
      this.sav_bt_txt = 'Save';
      break;
    }
  }
}

get_mandate_type(name) {
  const evenj = this.mandatetypes.filter(e => (e.name === name) );
  if (evenj.length === 1) {
    return evenj[0].type;
  } else {
    return 'I';
  }
}

get_account(act) {
  const evenj = this.acctyps.filter(e => (e.acnum === act) );
  if (evenj.length === 1) {
    return evenj[0].acnum;
  } else {
    return '';
  }
}

}

