import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { DashboardService } from '../../../natservices/dashboard.service';
import { NotifyService } from '../../../natservices/notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashlist',
  templateUrl: './dashlist.component.html',
  styleUrls: ['./dashlist.component.scss']
})
export class DashlistComponent implements OnInit, OnDestroy {
  @Input() mode: string;
  @Input() idpsum;
  @Input() idpprods;
  @Input() ipfmain;
  mySubscription: Subscription; // Set a variable for your subscription

  constructor(private router: Router,
              private dbserivce: DbservicesService,
              private dashb: DashboardService,
              private notify: NotifyService
              ) { }

  pfs = [];
  pfmainfetch = true;

  ngOnInit() {
    this.pfmainfetch = true;
    if (this.mode === 'less') {
      this.mySubscription = this.dbserivce.dbaction('pfmain', 'fetch', '')
      .subscribe(
          data => {
                    this.pfs = data['body'];
                    if (this.pfs.length < 1 ) {
                      this.pfs = [{}];
                    }
                    console.log('this.pfs');
                    console.log(this.pfs);
                    this.pfmainfetch = false;
                  },
          error => {
                      console.log(error);
                      if ('failreason' in error['error']) {
                        this.notify.update(error['error']['failreason'], 'error', 'alert');
                      } else {
                        this.notify.update(error['message'], 'error', 'alert');
                      }
                      this.pfmainfetch = false;
                   },
          ()   => {
                      this.pfmainfetch = false;
                      console.log('after all completed');
                  }
      );
    } else if (this.mode === 'detail') {
      this.pfs.push(this.ipfmain);
      console.log(this.pfs);
      console.log(this.mode);
      console.log(this.idpsum);
      console.log(this.idpprods);
      this.pfmainfetch = false;
    }
  }

  navitodashbrd() {
    this.dashb.dpprods = [];
    this.dashb.dpsum = {};
    this.dashb.pfmain = {};
    this.router.navigate(['/securedpg/dashboard']);
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(this.mySubscription);
    console.log(this.mySubscription.closed);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
  }

}