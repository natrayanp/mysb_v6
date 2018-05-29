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
  loc: HTMLElement;

  
  constructor(private router: Router,
    private domSanitizer: DomSanitizer,
    private orderservice: OrderservService, ) {

    }

  ngOnInit() {
    this.longDesc = this.domSanitizer.bypassSecurityTrustHtml(this.orderservice.paylnk);
    this.loc = window.document.getElementById('myiframe');
  }


  ifrmloading() {
    console.log(this.loc.attributes);
    console.log((<HTMLIFrameElement>this.loc.attributes[0].ownerElement).contentDocument.location.href);
    if ((<HTMLIFrameElement>this.loc.attributes[0].ownerElement).contentDocument.location.href
          === 'http://localhost:4200/paycomp/no') {
      console.log('inside ifrmloadin');
      window.top.location.href = 'http://localhost:4200/paycomp/yes';
    }
    console.log('inside ifrmloadin before end');
  }

}
