import { Component, OnInit, ViewChild } from '@angular/core';
import { PieChartConfig } from '../../../googlechartservice/PieChartConfig';
import { linechartconfig } from '../../../googlechartservice/linechart/linechartconfig';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashfund',
  templateUrl: './dashfund.component.html',
  styleUrls: ['./dashfund.component.scss']
})
export class DashfundComponent implements OnInit {

  displayedColumns = ['Fund', 'Units', 'Invested Amount', 'Amount'];
  
  dataSourceval = new MatTableDataSource();
  paginator2: MatPaginator;

  @ViewChild('paginator2') set appBacon2(paginator2: MatPaginator) {
    this.paginator2 = paginator2;
    this.dataSourceval.paginator = this.paginator2;
  }

  detailmode: boolean;
  config: PieChartConfig;
  elementId: string;
  data: any[];

  config1: linechartconfig;
  linedata: any[];
  elementId1: string;

  constructor(private router: Router) { }

  ngOnInit() {

    this.dataSourceval.data = [
      {'fundname':'Birla Sun life MNC', 'units': 150, 'invamt': 400000, 'amount': 500563.25},
      {'fundname':'HDFC Midcap', 'units': 11550, 'invamt': 4000, 'amount': 7800.25},
      {'fundname':'Principal fund', 'units': 150, 'invamt': 400000, 'amount': 500563.25},
      {'fundname':'Quantum equity fund', 'units': 150.23456, 'invamt': 400000, 'amount': 500563.25},
    ];

    this.data = [['Task', 'Hours per Day'],
    ['Eat',      3],
    ['Commute',  2],
    ['Watch TV', 5],
    ['Video games', 4],
    ['Sleep',    10]];
    this.config = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
    this.elementId = 'myPieChart2';


    this.config1 = new linechartconfig('line chart growth', 'line', 'bottom');

    this.linedata = [
      ['Year', 'sensex', 'birla', 'reliance'],
      [1, 4.2,  6.2 , 3.4],
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
    this.elementId1 = 'mylinechart1';
  }

  gotofundfulldetpg() {
    this.router.navigate(['/securedpg/dapffulldetail']);
  }

}
