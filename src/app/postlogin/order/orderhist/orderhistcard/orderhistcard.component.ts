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
    this.get_tran_details();
  }

  get_tran_details() {
    this.submit_date = {
      'product': this.crdprod,
      'freq': this.crdfreq  // today,week,month,adhoc
    };
    this.dbserivce.dbaction('orderhist', 'fetch', this.submit_date)
    .subscribe(
      data => {
        console.log(data['body']);
      },
error => {
          console.log('error dta fetch');
          this.notify.update(error['error']['failreason'], 'error', 'alert');
          console.log(error);

      },

    );
  }

}
