import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../natservices/notify.service';
// import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public notify: NotifyService,               private domSanitizer: DomSanitizer,
  ) {console.log(notify.notimsg); }

  ngOnInit() {
  }

  fomrat(content) {
    const str = content;
    const res = str.replace(/#/g, '\"');
    const res1 = res.replace(/!/g, '\'');
    console.log(res1);
    const longDesc = this.domSanitizer.bypassSecurityTrustHtml(res1);
    return longDesc;
    //return this.sanitizer.bypassSecurityTrustHtml(res1);
  }
  
}
