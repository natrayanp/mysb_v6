import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { NotifyService } from '../../../natservices/notify.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'noticomm',
  templateUrl: './noticomm.component.html',
  styleUrls: ['./noticomm.component.scss']
})
export class NoticommComponent implements OnInit {
  lazldid = '';
  showspinner = true;
  shownoticontainer = true;
  @Input() screenid;


  constructor( private notify: NotifyService,
               private dbserivce: DbservicesService) { }

  ngOnInit() {
    console.log('this.screenid' + this.screenid);
    this.notificationfetch();
  }


  notificationfetch() {
    console.log(this.screenid);
    const submitdata = {lazldid : this.lazldid, module : this.screenid};
    console.log('data is' + JSON.stringify(submitdata));
    this.dbserivce.dbaction('notifi', 'fetch', submitdata).subscribe(
    datas => {
            console.log('inside success dbservice');
            console.log(datas);
            this.showspinner = false;

            const data1 = datas['body']['data'];
            console.log(data1);
            this.notify.clearnotifcation();
           // console.log(data.body['lazyloadid']);
            if( data1 != null ) {
              this.lazldid = data1['lazyloadid'];
              data1.forEach(element => {
                console.log(element);
                console.log(element['nfumessage']);
                this.notify.update(element['nfumessage'], 'success', 'notification');
              });
            } else {
              this.shownoticontainer = false;
            }
            // this.lazldid=data.lazldid;
          },
    error => {
            console.log('inside error dbservice');
            console.log(error);
            // this.showspinner = false;
            // this.shownoticontainer = false;

        }
          );
  }
}
