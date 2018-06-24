import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../natservices/dashboard.service';



@Component({
  selector: 'app-holdetail',
  templateUrl: './holdetail.component.html',
  styleUrls: ['./holdetail.component.scss']
})
export class HoldetailComponent implements OnInit {

 
  lscreeid = 'dashboard';   // this is to send for notification display

  constructor(private dashb: DashboardService) {}

  idpsum: any;
  idpprods: any[];
  ipfmain: any;

  ngOnInit() {
    this.idpsum = this.dashb.dpsum;
    this.idpprods = this.dashb.dpprods;
    this.ipfmain = this.dashb.pfmain;
    console.log(this.idpsum);
    console.log(this.idpprods);
    console.log(this.ipfmain);
  }

}
