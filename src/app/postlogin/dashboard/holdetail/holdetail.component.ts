import { Component, OnInit } from '@angular/core';
import { PieChartConfig } from '../../../googlechartservice/PieChartConfig';
import { linechartconfig } from '../../../googlechartservice/linechart/linechartconfig';


@Component({
  selector: 'app-holdetail',
  templateUrl: './holdetail.component.html',
  styleUrls: ['./holdetail.component.scss']
})
export class HoldetailComponent implements OnInit {

 
  lscreeid = 'dashboard';   // this is to send for notification display
  constructor() {
 // constructor(private dbserivce: DbservicesService) {
                            //this.parseJwt(localStorage.getItem("natjwt"));
                          }
 config: PieChartConfig;
 elementId: string;
 data: any[];
 // pie = 'pie';

 config1: linechartconfig;
 linedata: any[];
 elementId1: string;
  ngOnInit() {
    // this.notificationfetch();
    this.data = [['Task', 'Hours per Day'],
    ['Eat',      3],
    ['Commute',  2],
    ['Watch TV', 5],
    ['Video games', 4],
    ['Sleep',    10]];
    this.config = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
    this.elementId = 'myPieChart1';

    this.config1 = new linechartconfig('line chart growth', 'line', 'top');
    this.linedata = [
      ['Year', 'sensex', 'birla', 'reliance'],
      [1,  37.8, 80.8, 41.8],
      [2,  30.9, 69.5, 32.4],
      [3,  25.4,   57, 25.7],
      [4,  11.7, 18.8, 10.5],
      [5,  11.9, 17.6, 10.4],
      [6,   8.8, 13.6,  7.7],
      [7,   7.6, 12.3,  9.6],
      [8,  12.3, 29.2, 10.6],
      [9,  16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11,  5.3,  7.9,  4.7],
      [12,  6.6,  8.4,  5.2],
      [13,  4.8,  6.3,  3.6],
      [14,  4.2,  6.2,  3.4]
    ];
    this.elementId1 = 'mylinechart';

  }
}
