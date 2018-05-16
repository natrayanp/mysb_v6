import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderservService } from '../../../../natservices/orderserv.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-mfpaynavi',
  templateUrl: './mfpaynavi.component.html',
  styleUrls: ['./mfpaynavi.component.scss']
})
export class MfpaynaviComponent implements OnInit {
  longDesc: any;
  constructor(private router: Router,
    private domSanitizer: DomSanitizer,
    private orderservice: OrderservService, ) {}

  ngOnInit() {
    this.longDesc = this.domSanitizer.bypassSecurityTrustHtml(this.orderservice.paylnk);
  }

}
