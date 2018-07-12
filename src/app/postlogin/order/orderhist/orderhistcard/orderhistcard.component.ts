import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { NotifyService } from '../../../../natservices/notify.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'orderhistcard',
  templateUrl: './orderhistcard.component.html',
  styleUrls: ['./orderhistcard.component.scss'],
})
export class OrderhistcardComponent implements OnInit {
  @Input() public freq: string;
  @Input() public product: string;

  crdprod: string;
  crdfreq: string;
  submit_date = {};
  trandetfetch: boolean;
  tranadfetch: boolean;
  dtFormgrp: FormGroup;


  displayedColumns = ['trandate', 'Units', 'Invested Amount', 'currentnav'];

  dataSourceval = new MatTableDataSource();
  paginator: MatPaginator;

  @ViewChild('paginator') set appBacon2(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSourceval.paginator = this.paginator;
  }


  constructor(private dbserivce: DbservicesService,
              private notify: NotifyService,
              @Inject(LOCALE_ID) private locale: string,
              private fb: FormBuilder,
            ) {this.createdtForm(); }

  ngOnInit() {
    
    this.crdprod = this.product;
    this.crdfreq = this.freq;
    if (this.crdfreq !== 'adhoc') {
      this.get_tran_details();
    }
  }

  get_tran_details() {
    this.tranadfetch = true;
    this.trandetfetch = true;
    this.dataSourceval.data = [];
    

    if (this.crdfreq !== 'adhoc') {
      this.submit_date = {
        'product': this.crdprod,
        'freq': this.crdfreq  // today,week,month,adhoc
      };
    } else if (this.crdfreq === 'adhoc') {
      this.submit_date = {
        'product': this.crdprod,
        'freq': this.crdfreq,  // today,week,month,adhoc
        'startdt' : formatDate(this.dtFormgrp.controls.frmdt.value, 'yyyy-MM-dd', this.locale),
        'enddt' : formatDate(this.dtFormgrp.controls.todat.value, 'yyyy-MM-dd', this.locale)
      };
    }

    this.dbserivce.dbaction('orderhist', 'fetch', this.submit_date)
    .subscribe(
      data => {
        if (this.crdfreq === 'today') {
          this.dataSourceval.data = data['body']['todaydata'];
        } else if (this.crdfreq === 'week') {
          this.dataSourceval.data = data['body']['weekdata'];
        } else if (this.crdfreq === 'month') {
          this.dataSourceval.data = data['body']['monthdata'];
        } else if (this.crdfreq === 'adhoc') {
          this.dataSourceval.data = data['body']['daterange'];
        }
        this.trandetfetch = false;
        this.tranadfetch = false;
      },
      error => {
          this.trandetfetch = false;
          this.tranadfetch = false;
          console.log('error dta fetch');
          if ('failreason' in error['error']) {
            this.notify.update(error['error']['failreason'], 'error', 'alert');
          } else {
            this.notify.update(error['message'], 'error', 'alert');
          }

          console.log(error);

      },

    );
  }

  createdtForm() {
    this.dtFormgrp = this.fb.group({
      frmdt: ['',  Validators.compose([Validators.required])],
      todat: ['',  Validators.compose([Validators.required])]
    });
  }

  submitdts() {
    this.get_tran_details();
  }

}
