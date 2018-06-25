import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { DashboardService } from '../../../natservices/dashboard.service';
import { linechartconfig } from '../../../googlechartservice/linechart/linechartconfig';
import {Router} from '@angular/router';

@Component({
  selector: 'prodcard',
  templateUrl: './prodcard.component.html',
  styleUrls: ['./prodcard.component.scss']
})
export class ProdcardComponent implements OnInit {

  @Input() mode;
  @Input() idpprod;
  @Input() ipfindex;
  @Input() iprodindex;
  proddetfetch = false;
  prodchartfetch = false;
  apidata = {};
  dpprod: any;
  pfindex: number;
  prodindex: number;
  showchart = false;
  dpproddets: any[];
  // Chart: Start
  config: linechartconfig;
  linechartdata = [];
  elementid: string;
  chart_cnt = 0;
 // Chart: End

  displayedColumns = ['Fund', 'Units', 'AverageNAV', 'currentnav', 'Investedamount', 'Currentamount', 'growth'];

  dataSourceval = new MatTableDataSource();
  paginator: MatPaginator;

  @ViewChild('paginator') set appBacon2(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSourceval.paginator = this.paginator;
  }
 

  constructor(private router: Router,
              private dbserivce: DbservicesService,
              private dashb: DashboardService
             ) { }

  ngOnInit() {
    this.dpprod = this.idpprod;
    this.pfindex = this.ipfindex;
    this.prodindex = this.iprodindex;
    if (this.mode === 'integrated') {
      this.fetch_prod_det();
    } else if (this.mode === 'detach') {
      this.linechartdata = this.dashb.prod_chartdata;
      this.dataSourceval.data = this.dashb.prod_dpproddets;
    }
  }


  fetch_prod_det() {
    console.log(this.dpprod);
    this.proddetfetch = true;
    this.apidata = {
                    'pfid': this.dpprod['pfid'],
                    'prodtyp': this.dpprod['prodtyp'],
                    'datareq': 'prodfull'
                   };
    this.dbserivce.dbaction('dash', 'getdata', this.apidata)
    .subscribe(
        data => {
                  console.log(data['body']);
                  this.dpproddets = data['body']['proddetrecs'];
                  this.dataSourceval.data = this.dpproddets;
                  this.proddetfetch = false;
                },
        error => {
                    console.log(error);
                },
        ()   => {
                    this.proddetfetch = false;
                    console.log('after all completed');
                }
    );
  }

  fetch_chart_data() {
    this.prodchartfetch = true;
    this.apidata = {
      'pfid': this.dpprod['pfid'],
      'prodtyp': this.dpprod['prodtyp'],
      'datareq': 'prodfull'
     };

     this.dbserivce.dbaction('dash', 'chartdata', this.apidata)
     .subscribe(
         data => {
                   console.log(data['body']);
                   this.linechartdata = data['body']['prodfulldata'];
                   this.prodchartfetch = false;
                 },
         error => {
                     console.log(error);
                 },
         ()   => {
                     this.prodchartfetch = false;
                     console.log('after all completed');
                 }
     );
     this.chart_init();
  }

  chart_init() {
    this.chart_cnt = this.chart_cnt + 1;
    this.config = new linechartconfig('line chart growth', 'line', 'bottom');
    this.elementid = 'prodlinechart' + (this.pfindex + 1) + (this.prodindex + 1) + this.chart_cnt;
  }


  togglechart() {
    this.showchart = !this.showchart;
    if (this.showchart) {
      if (this.mode === 'integrated') {
        if (this.linechartdata.length < 1 ) {
          this.fetch_chart_data();
        }
      }
    }
  }

  getRecord(row) {
    console.log(row);
    this.router.navigate(['/securedpg/dafundetail']);
  }

  proddetailpg() {
    this.dashb.prod_dpprods = this.dpprod;
    this.dashb.prod_dpproddets = this.dpproddets;
    this.dashb.prod_chartdata = this.linechartdata;
    this.dashb.prod_pfindex = this.pfindex;
    this.dashb.prod_prodindex = this.prodindex;
    this.router.navigate(['/securedpg/daproddetail']);
  }

  gotofundfulldetpg() {
    this.dashb.prod_dpprods = '';
    this.dashb.prod_dpproddets = '';
    this.dashb.prod_chartdata = [];
    this.dashb.prod_pfindex = null;
    this.dashb.prod_prodindex = null;
    this.router.navigate(['/securedpg/dapffulldetail']);
  }

}
