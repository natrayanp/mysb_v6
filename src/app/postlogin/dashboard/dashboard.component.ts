import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../natservices/dbservices.service';
import { PieChartConfig } from '../../googlechartservice/PieChartConfig';
import { linechartconfig } from '../../googlechartservice/linechart/linechartconfig';
// import { NoticommComponent } from '../../commonmodule/notificationmodule/noticomm/noticomm.component'
// import { NotifyService } from '../../natservices/notify.service';
// import { NotificationComponent } from '../../commonmodule/notificationmodule/notification/notification.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  idpsum = '';
  idpprods = [];
  ipfmain = '';

  lscreeid = 'dashboard';   // this is to send for notification display
  constructor() {}
  ngOnInit() {}
}
