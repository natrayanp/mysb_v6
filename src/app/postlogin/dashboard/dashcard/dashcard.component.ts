import { Component, OnInit, Input } from '@angular/core';
import { PieChartConfig } from '../../../googlechartservice/PieChartConfig';
import { linechartconfig } from '../../../googlechartservice/linechart/linechartconfig';
import {Router} from '@angular/router';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { DashboardService } from '../../../natservices/dashboard.service';
import { NotifyService } from '../../../natservices/notify.service';

@Component({
  selector: 'app-dashcard',
  templateUrl: './dashcard.component.html',
  styleUrls: ['./dashcard.component.scss']
})
export class DashcardComponent implements OnInit {

  @Input() mode;
  @Input() pfmain;
  @Input() idpsum;
  @Input() idpprods;
  @Input() myind;

  
  dailypos = {};
  detailmode: boolean;
  config: PieChartConfig;
  elementId: string;
  data: any[];
  dpsum: any;
  dpprods = [];

  config1: linechartconfig;
  linedata = [[]];
  elementId1: string;
  selectedRowIndex = -1;
  dailyposfetch: boolean;
  dashcharfetch: boolean;

  constructor(private router: Router,
              private dbserivce: DbservicesService,
              private dashb: DashboardService,
              private notify: NotifyService
            ) { }

  ngOnInit() {
    this.dashcharfetch = true;
    this.dailyposfetch = true;

    if (this.mode === 'detail') {
      console.log(this.mode);
      this.detailmode = true;
    } else if (this.mode === 'less') {
      this.detailmode = false;
    }

    if (this.detailmode) {
        this.dpsum = this.idpsum;
        this.dpprods = this.idpprods;
        this.chart_init();
        this.linedata =  this.dashb.linedata;
        this.dailyposfetch = false;
        console.log(this.pfmain);
        console.log(this.mode);
        console.log(this.dpsum);
        console.log(this.dpprods);
        this.dailyposfetch = false;
        this.dashcharfetch = false;

    } else {
      if (JSON.stringify(this.pfmain) !== '{}') {
        this.get_data();
      } else {
        this.dashcharfetch = false;
        this.dailyposfetch = false;
      }

    }
    console.log(this.detailmode);
  }

  get_data() {
    const apidata1 = {
      'pfid': this.pfmain['pfportfolioid'],
      'datareq': 'pffull',
      'offset':0
     };
    this.dbserivce.dbaction('dash', 'getdata', apidata1 )
    .subscribe(
        data => {
                  console.log(data['body']);
                  console.log(data['body']['pfsumrec']);
                  this.dpsum = data['body']['pfsumrec'];
                  this.dpprods = data['body']['prodsumrec'];

                  this.dailyposfetch = false;
                  if ( this.dpprods.length > 0 ) {
                    this.get_chart_data();
                  } else {
                    this.dashcharfetch = false;
                  }
                },
        error => {
                    console.log('error dta fetch');
                    this.notify.update(error['error']['failreason'], 'error', 'alert');
                    console.log(error);
                    this.dailyposfetch = false;
                    this.dashcharfetch = false;
                },
    );

  }

  get_chart_data() {
    this.chart_init();
    const apidata = {
      'pfid': this.pfmain['pfportfolioid'],
      'datareq': 'pffull'
     };
    this.dbserivce.dbaction('dash', 'chartdata', apidata)
    .subscribe(
        data => {
                  console.log('printing chart data');
                  console.log(data['body']);
                  this.linedata = data['body']['pffulldata'];
                  console.log(this.linedata);
                  this.dashcharfetch = false;
                },
        error => {
                  this.notify.update(error['error']['failreason'], 'error', 'alert');
                  this.dashcharfetch = false;
                  console.log(error);
                },

    );

    console.log(this.linedata);
  }



  chart_init() {
    this.config1 = new linechartconfig('line chart growth', 'line', 'bottom');
    this.elementId = 'mylinechart' + (this.myind + 1);
  }


  navigatedetailspg() {
    this.dashb.dpprods = this.dpprods;
    this.dashb.dpsum = this.dpsum;
    this.dashb.pfmain = this.pfmain;
    this.dashb.linedata = this.linedata;
    this.router.navigate(['/securedpg/dapffulldetail']);
  }

}
