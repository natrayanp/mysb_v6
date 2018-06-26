import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { DashboardService } from '../../../natservices/dashboard.service';


@Component({
  selector: 'app-dashlist',
  templateUrl: './dashlist.component.html',
  styleUrls: ['./dashlist.component.scss']
})
export class DashlistComponent implements OnInit {
  @Input() mode: string;
  @Input() idpsum;
  @Input() idpprods;
  @Input() ipfmain;

  constructor(private router: Router,
              private dbserivce: DbservicesService,
              private dashb: DashboardService
              ) { }

  pfs = [];
  pfmainfetch = true;

  ngOnInit() {
    this.pfmainfetch = true;
    if (this.mode === 'less') {
    this.dbserivce.dbaction('pfmain', 'fetch', '')
      .subscribe(
          data => {
                    this.pfs = data['body'];
                    console.log('this.pfs');
                    console.log(this.pfs);
                    this.pfmainfetch = false;
                  },
          error => {
                      console.log(error);
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

}