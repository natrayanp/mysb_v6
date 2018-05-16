import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
// import { FirebaseApp } from 'angularfire2';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase';
import { OrderservService } from '../natservices/orderserv.service';
// import { SetjwtService } from '../natservices/setjwtservice.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-logincheck',
  templateUrl: './logincheck.component.html',
  styleUrls: ['./logincheck.component.scss']
})
export class LogincheckComponent implements OnInit {

  data: any;
  natkey: any;
  longDesc: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              // public app: AngularFireAuth, 
              // private setjwtservice: SetjwtService, 
              // @Inject(DOCUMENT) private document: any,
              private orderservice: OrderservService,) {
   }

  ngOnInit() {
   /* this.natkey=this.route.snapshot.queryParamMap.get("natkey");
    console.log("iam inside auth");
    if(localStorage.getItem("natjwt") === null){
        this.getUsers(this.natkey);       
      }else{
        window.opener.location="/securedpg/dashboard";  
        window.close(); 
      }
    */
   //this.goToUrl(this.orderservice.paylnk);
   //var link = 'http://bsestarmfdemo.bseindia.com/ClientOrderPayment.aspx?INtPvGmyOzdvVLRCAlRSyLep2wKQls+dik8REh8D/5RxmamsVZHD/ZCxz1O9mlWJWW2gsRaoYO5LPbCHI9HSrw==';
   //this.goToUrl(link);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
   console.log(this.orderservice.paylnk);
   this.longDesc = this.domSanitizer.bypassSecurityTrustHtml(this.orderservice.paylnk);

   
  }
/*
  getUsers(natkey) {
    this.setjwtservice
    .login(natkey)
    .subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        localStorage.setItem("natjwt",JSON.stringify(this.data['natjwt']));
        window.opener.location="/securedpg/dashboard";        
        window.close();         
      }, 
      (error) => {
        console.log('error ' + error);
      });
    }
*/

    goToUrl(link): void {
      console.log(link);
      //window.location.href = link;
      
      window.opener.location="/securedpg/dashboard";
  }



}
