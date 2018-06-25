import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../natservices/dashboard.service';

@Component({
  selector: 'app-prodlist',
  templateUrl: './prodlist.component.html',
  styleUrls: ['./prodlist.component.scss']
})
export class ProdlistComponent implements OnInit {

dpprod: any;
pfindex: number;
prodindex: number;
chartdata: any[];

  constructor(private dashb: DashboardService) { }

  ngOnInit() {
    this.dpprod = this.dashb.prod_dpprods;
    this.pfindex = this.dashb.prod_pfindex;
    this.prodindex = this.dashb.prod_prodindex;
  }

}
