import { GoogleChartsBaseService } from '../google-charts.base.service';
import { Injectable } from '@angular/core';
import { linechartconfig } from './linechartconfig';

declare var google: any;

@Injectable()
export class GooglelineChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildLineChart(elementId: String, data: any[], config: linechartconfig) : void {  
    var chartFunc = () => { return new google.visualization.LineChart(document.getElementById(<string>elementId)); };
    var options = {
            title:  config.title,
            curveType:  config.curveType,
            theme: 'material',
            legend: { position: config.legendposition }
      };

    this.buildChart(data, chartFunc, options);
  }

}