import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PieChartConfig } from '../../../googlechartservice/PieChartConfig';
import { linechartconfig } from '../../../googlechartservice/linechart/linechartconfig';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Router} from '@angular/router';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { DashboardService } from '../../../natservices/dashboard.service';


@Component({
  selector: 'app-dashcard',
  templateUrl: './dashcard.component.html',
  styleUrls: ['./dashcard.component.scss']
})
export class DashcardComponent implements OnInit {

  displayedColumns = ['Fund', 'Units', 'Invested Amount', 'Amount'];
  
  dataSourceval = new MatTableDataSource();
  paginator2: MatPaginator;

  @ViewChild('paginator2') set appBacon2(paginator2: MatPaginator) {
    this.paginator2 = paginator2;
    this.dataSourceval.paginator = this.paginator2;
  }

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
  dpprods: any[];

  config1: linechartconfig;
  linedata = [[]];
  elementId1: string;
  selectedRowIndex = -1;
  dailyposfetch: boolean;
  dashcharfetch: boolean;

  constructor(private router: Router,
              private dbserivce: DbservicesService,
              private dashb: DashboardService
            ) { }

  ngOnInit() {
    this.dashcharfetch = true;


    this.dataSourceval.data = [
      {'fundname': 'Birla Sun life MNC', 'units': 150, 'invamt': 400000, 'amount': 500563.25},
      {'fundname': 'HDFC Midcap', 'units': 11550, 'invamt': 4000, 'amount': 7800.25},
      {'fundname': 'Principal fund', 'units': 150, 'invamt': 400000, 'amount': 500563.25},
      {'fundname': 'Quantum equity fund', 'units': 150.23456, 'invamt': 400000, 'amount': 500563.25},
    ];

    this.data = [['Task', 'Hours per Day'],
    ['Eat',      3],
    ['Commute',  2],
    ['Watch TV', 5],
    ['Video games', 4],
    ['Sleep',    10]];
    this.config = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
    this.elementId1 = 'myPieChart2';

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
        // this.dpprods.push(this.idpprods);
        this.dailyposfetch = false;
        console.log(this.pfmain);
        console.log(this.mode);
        console.log(this.dpsum);
        console.log(this.dpprods);
        this.dailyposfetch = false;
        this.dashcharfetch = false;
        /*
        const fetch_data = {'pfid': this.pfmain['pfportfolioid'], 'prodid': this.dpprods['prodid']};
        this.dbserivce.dbaction('dash', 'proddet', fetch_data)
        .subscribe(
            data => {
                      console.log(data['body']);
                      console.log(data['body']['sumrec']);
                      this.dpsum = data['body']['sumrec'];
                      this.dpprods = data['body']['prodrecs'];
                      this.dailyposfetch = false;
                    },
            error => {
                        console.log(error);
                    },
            ()   => {
                        this.dailyposfetch = false;
                        console.log('after all completed');
                    }
        );
        */

    } else {
      this.dbserivce.dbaction('dash', 'pfdet', this.pfmain['pfportfolioid'])
      .subscribe(
          data => {
                    console.log(data['body']);
                    console.log(data['body']['sumrec']);
                    this.dpsum = data['body']['sumrec'];
                    this.dpprods = data['body']['prodrecs'];
                    this.dailyposfetch = false;
                  },
          error => {
                      console.log(error);
                  },
          ()   => {
                      this.dailyposfetch = false;
                      console.log('after all completed');
                  }
      );
      this.chart_init();
      const dataa = {'pfid': this.pfmain['pfportfolioid']};
      this.dbserivce.dbaction('dash', 'chart', dataa)
      .subscribe(
          data => {
                    console.log(data['body']);
                    this.linedata = data['body']['data'];
                    console.log(this.linedata);
                    this.dashcharfetch = false;
                  },
          error => {
                    this.dashcharfetch = false;
                    console.log(error);
                  },
          ()   => {
                    this.dashcharfetch = false;
                    console.log('after all completed');
                  }
      );
      /*
      this.linedata = [
        ['Year', 'sensex', 'birla'],
        ["2018-06-19", 4.2,  6.2 ],
        ["2018-06-20", 4.8,  6.3 ],
        ["2018-06-21", 5.3,  7.9 ],
        ["2018-06-22", 6.6,  8.4 ],
        ["2018-06-23", 7.6,  12.3],
        ["2018-06-24", 8.8,  13.6],
        ["2018-06-25", 11.7, 17.6],
      ];

           this.linedata = [        ['Year', 'sensex, 'birla', 'reliance'],
        1, 4.2,  6.2 , 3.4],
        [2, 4.8,  6.3 , 3.6],
        [3, 5.3,  7.9 , 4.7],
        [4, 6.6,  8.4 , 5.2],
        [5, 7.6,  12.3, 7.7],
        [6, 8.8,  13.6, 9.6],
        [7, 11.7, 17.6, 10.4],
        [8, 11.9, 18.8, 10.5],
        [9, 12.3, 29.2, 10.6],
        [10, 12.8, 30.9, 11.6],
        [11, 16.9, 42.9, 14.8],
        [12, 25.4, 57  , 25.7],
        [13, 30.9, 69.5, 32.4],
        [14, 37.8, 80.8, 41.8]
      ];
      */
      console.log(this.linedata);
    }
  }

  chart_init() {
    this.config1 = new linechartconfig('line chart growth', 'line', 'bottom');
    this.elementId = 'mylinechart' + (this.myind + 1);
  }


  getRecord(row) {
    console.log(row);
    this.router.navigate(['/securedpg/dafundetail']);
  }

  navigatedetailspg() {
    this.dashb.dpprods = this.dpprods;
    this.dashb.dpsum = this.dpsum;
    this.dashb.pfmain = this.pfmain;
    this.dashb.linedata = this.linedata;
    this.router.navigate(['/securedpg/dapffulldetail']);
  }

}
