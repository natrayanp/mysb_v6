import { Component, OnInit, ViewChild } from '@angular/core';
import { linechartconfig } from '../../../googlechartservice/linechart/linechartconfig';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { DashboardService } from '../../../natservices/dashboard.service';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashfund',
  templateUrl: './dashfund.component.html',
  styleUrls: ['./dashfund.component.scss']
})
export class DashfundComponent implements OnInit {

  displayedColumns = ['trandate', 'Units', 'Invested Amount', 'currentnav'];

  dataSourceval = new MatTableDataSource();
  paginator: MatPaginator;

  @ViewChild('paginator') set appBacon2(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSourceval.paginator = this.paginator;
  }

  fnddetfetch: boolean;
  fndcharfetch: boolean;
  config: linechartconfig;
  elementid: string;
  linedata: any[];
  fndid: any;
  pfid: any;
  prodtype: any;
  fnd_chart_cnt = 0;
  fndtrandets: any;
  fundname: any;
  fnddetail: any;
  pfname: any;

  constructor(private router: Router,
              private dbserivce: DbservicesService,
              private dashb: DashboardService
            ) { }

  ngOnInit() {

    this.fnddetail = this.dashb.fund_fndsumdet;
    this.fndid = this.dashb.fund_fndid;
    this.pfid = this.dashb.fund_pfid;
    this.prodtype = this.dashb.fund_prodtyp;
    this.fundname = this.dashb.fund_fndsumdet['schemename'];
    this.pfname = this.dashb.pfmain['pfportfolioname'];

   const apidata1 = {
    'pfid': this.pfid,
    'prodtyp': this.prodtype,
    'fundid': this.fndid,
    'datareq': 'fndfull',
    'offset': 0
   };
  this.dbserivce.dbaction('dash', 'getdata', apidata1 )
  .subscribe(
      data => {
                console.log(data['body']);
                this.fndtrandets = data['body']['funddetrec'];                
                this.dataSourceval.data = this.fndtrandets;
                this.fnddetfetch = false;
              },
      error => {
                  console.log(error);
              },
      ()   => {
                  this.fnddetfetch = false;
                  console.log('after all completed');
              }
  );
  this.chart_init();
  const apidata = {
    'pfid': this.pfid,
    'prodtyp': this.prodtype,
    'fundid': this.fndid,
    'datareq': 'fndfull',
    'offset': 0
   };
  this.fndcharfetch = true;
  this.dbserivce.dbaction('dash', 'chartdata', apidata)
  .subscribe(
      data => {
                console.log(data['body']);
                this.linedata = data['body']['fundfulldata'];
                console.log(this.linedata);
                this.fndcharfetch = false;
              },
      error => {
                this.fndcharfetch = false;
                console.log(error);
              },
      ()   => {
                this.fndcharfetch = false;
                console.log('after all completed');
              }
  );
  }

  chart_init() {
    this.config = new linechartconfig('line chart growth', 'line', 'bottom');
    this.elementid = 'mylinechart' + (this.fnd_chart_cnt + 1);
    this.fnd_chart_cnt = this.fnd_chart_cnt + 1;
  }

  gotofundfulldetpg() {
    this.router.navigate(['/securedpg/dapffulldetail']);
  }

}
