import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { NotifyService } from '../../../../natservices/notify.service';

@Component({
  selector: 'orderhistcard',
  templateUrl: './orderhistcard.component.html',
  styleUrls: ['./orderhistcard.component.scss']
})
export class OrderhistcardComponent implements OnInit {
  @Input() public freq: string;
  @Input() public product: string;

  crdprod: string;
  crdfreq: string;
  submit_date = {};
  trandetfetch: boolean;
  adhocfrmld: boolean;
  tranadfetch: boolean;

  displayedColumns = ['trandate', 'Units', 'Invested Amount', 'currentnav'];

  dataSourceval = new MatTableDataSource();
  paginator: MatPaginator;

  @ViewChild('paginator') set appBacon2(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSourceval.paginator = this.paginator;
  }


  constructor(private dbserivce: DbservicesService,
              private notify: NotifyService
            ) { }

  ngOnInit() {
    this.crdprod = this.product;
    this.crdfreq = this.freq;
    if (this.crdfreq !== 'adhoc') {
      this.get_tran_details();
    } else if (this.crdfreq === 'adhoc') {
      this.tranadfetch = true;
      this.adhocfrmld = true;
      this.init_form();
    }

  }

  init_form() {
    this.adhocfrmld = false;
  }

  get_tran_details() {
    this.tranadfetch = true;
    this.trandetfetch = true;
    this.submit_date = {
      'product': this.crdprod,
      'freq': this.crdfreq  // today,week,month,adhoc
    };
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
        this.adhocfrmld = false;
        this.tranadfetch = false;
      },
      error => {
          this.trandetfetch = false;
          this.adhocfrmld = false;
          this.tranadfetch = false;
          console.log('error dta fetch');
          this.notify.update(error['error']['failreason'], 'error', 'alert');
          console.log(error);

      },

    );
  }

}
