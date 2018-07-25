import { Component, OnInit, Input, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { NotifyService } from '../../../../natservices/notify.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'mfselllist',
  templateUrl: './mfselllist.component.html',
  styleUrls: ['./mfselllist.component.scss']
})
export class MfselllistComponent implements OnInit {

  @Input() prod;
  @Input() trantype;
  @Input() public mypfdet: any;
  rowerror = false;
  msgd: string;
  msgdlastlineadded = false;

  empty_pfmflist_dlypos = {
    ormflistid: '',
    orportfolioid: '',
    ormffundname: '',
    ormffndcode: '',
    ormfnatamccode: '',
    ormffndnameedit: 'edit',
    ormfdathold: '',
    ormffundorderlists: '',
    ormfexecuteshow: 'dontshow',
    // All fields in dailyposition,
    dailyposition: {},
    dpos_schemecd: '',
    dpos_schmname: '',
    dpos_invamount: '',
    dpos_unit: '',
    dpos_avgnav: '',
    dpos_curnav: '',
    dpos_curvalue: '',
    dpos_totalpnl: '',
    dpos_pfportfolioid: '',
    dpos_producttype: ''
  };

  emptyinitfundordlist = {
    orormflistid: '',
    orormfpflistid: '',
    ormffundordelstrtyp : '',
    ormffundordelsfreq: '',
    ormffundordelsstdt: 0,
    ormffundordelsamt: 0,
    ormfsipinstal: 0,
    ormfsipendt: null,
    // holding select SIP data
    ormfsipdthold: '',
    ormfselctedsip: '',
    orormfprodtype: 'BSEMF', // MF,EQ,IN
    orormftrantype: '', // New(N),Mod(M),Cxl(C)
    orormfwhattran: '',  // Pur (PU),Redem (RE) ,SwiOut(SO) ,SwiIn (SI)
    ormffndstatus: '',
    rowselected: false
  };


  displayedColumns = ['schemname', 'currentnav', 'Units',   'sellunit', 'select'];

  dataSourceval = new MatTableDataSource();
  paginator: MatPaginator;
  sort: MatSort;


  @ViewChild('paginator') set appBacon2(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSourceval.paginator = this.paginator;
  }

  @ViewChild('matsort') set appBacon(sort: MatSort) {
    this.sort = sort;
    this.dataSourceval.sort = this.sort;
  }




  selection = new SelectionModel(true, []);

  constructor(private dbserivce: DbservicesService,
              private notify: NotifyService,
              @Inject(LOCALE_ID) private locale: string,
              private fb: FormBuilder
            ) { }

  ngOnInit() {
    if ((this.prod + this.trantype) === 'BSEMFsell') {
      if ( this.mypfdet.pfportfolioid !== '') {
        // Fetch data from api for empty_pfmflist_dlypos
        this.get_data_for_pf();
      }
    }
    }


      /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceval.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
        this.selection.clear();
        // Clear all the row select value
        this.dataSourceval.data.forEach(row => {
          this.sellselect(row);
        });
      } else {
        this.dataSourceval.data.forEach(row => {
          if (!this.rowerror) {
          this.selection.select(row);
          this.sellselect(row);
          } else {
            if (!this.msgdlastlineadded) {
              this.msgd = this.msgd + '\n' + 'Please correct the error before placing next order';
              this.notify.update(this.msgd, 'error', 'alert');
              this.msgdlastlineadded = true;
            }
          }
        });
      }
  }

  rowToggle(row) {
    console.log(this.selection.isSelected(row));
    console.log(this.rowerror);
    if (!this.rowerror) {
      this.selection.toggle(row);
      this.sellselect(row);
    } else {
      if (this.selection.isSelected(row)) {
        console.log('rowtoggle else if');
        this.selection.toggle(row);
        this.sellselect(row);
      } else if (!this.msgdlastlineadded) {
        if (this.selection.isSelected(row)) {
          this.selection.toggle(row);
          this.sellselect(row);
        }
        this.msgd = this.msgd + '\n' + 'Please correct the error before placing next order';
        this.notify.update(this.msgd, 'error', 'alert');
        this.msgdlastlineadded = true;
      }
    }
  }

  sellselect(row) {
    row.ormffundorderlists[0].orderselect = this.selection.isSelected(row);
    if (!row.ormffundorderlists[0].orderselect) {
      row.ormffundorderlists[0].ormffundordunit = 0;
      this.reset_err_msg();
    }
  }

  get_data_for_pf() {
    const data_to_post = {
      'prod' : this.prod,
      'trantype': this.trantype
    }
    this.dbserivce.dbaction('placeorderdetail', 'fetch', data_to_post)
    .subscribe(
      data =>
              {
                console.log(data['body']);
                this.mypfdet['pfmflist'] = data['body']['orderdata'];
                this.dataSourceval.data = this.mypfdet['pfmflist'];
              },
      error =>
            {
              console.log(error);
              if ('failreason' in error['error']) {
                this.notify.update(error['error']['failreason'], 'error', 'alert');
              } else {
                this.notify.update(error['message'], 'error', 'alert');
              }
            }
    );
  }

  onSearchChange( selluni, holding) {
      if (selluni > holding) {
        this.msgd = ('Ordered unit (' + selluni + ') is greater than holding (' + holding + ')');
        this.notify.update(this.msgd, 'error', 'alert');
        this.rowerror = true;
      } else if (selluni <= holding) {
        this.notify.clearalertmsg();
        this.rowerror = false;
        this.msgd = '';
        this.msgdlastlineadded = false;
      }
  }

  reset_err_msg() {
    this.notify.clearalertmsg();
    this.rowerror = false;
    this.msgd = '';
    this.msgdlastlineadded = false;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceval.filter = filterValue;
  }
}
