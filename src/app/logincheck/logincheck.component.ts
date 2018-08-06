import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthService } from '../natservices/auth.service';
import { NotifyService } from '../natservices/notify.service';

// import { FirebaseApp } from 'angularfire2';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase';
import { OrderservService } from '../natservices/orderserv.service';
// import { SetjwtService } from '../natservices/setjwtservice.service';
import {DomSanitizer} from '@angular/platform-browser';
import { DbservicesService } from '../natservices/dbservices.service';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest} from '@angular/common/http';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';


@Component({
  selector: 'app-logincheck',
  templateUrl: './logincheck.component.html',
  styleUrls: ['./logincheck.component.scss']
})
export class LogincheckComponent implements OnInit {

  data: any;
  providercode: any;
  longDesc: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private dbserivce: DbservicesService,
              private http: HttpClient,
              public auth: AuthService,
              private notify: NotifyService,
              // public app: AngularFireAuth, 
              // private setjwtservice: SetjwtService, 
              // @Inject(DOCUMENT) private document: any,
              private orderservice: OrderservService,) {
   }

  ngOnInit() {
   this.providercode = this.route.snapshot.queryParamMap.get('code');
   console.log(this.providercode);
    console.log('iam inside auth');
    this.getUsers();
  }

  getUsers() {
    const apiurl = 'http://127.0.0.1:8080/loginpost';
    const data = {'provider': 'upstox', 'operation' : 'logincode', 'code': this.providercode};
    this.http.post(apiurl, data, {observe: 'response'})
    .subscribe(
      datae => {
                  console.log(datae);
                  console.log(datae['body']);
                  this.signInWithCustomToken(datae['body']['token']);
            },
      error => {

        }
            );
  }


  signInWithCustomToken(token): void {
    this.auth.customTokenLogin(token)
    .then(res => {
      console.log(res);
      console.log(res.user);
      console.log(res.user.uid);
      console.log(res.additionalUserInfo);
      console.log(res.credential);
      console.log(res.operationType);
      console.log('Successfully authenticated with Firebase!');
      this.afterSignIn();
    })
    .catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error(`${errorCode} Could not log into Firebase: ${errorMessage}`);
    });
  }



  private afterSignIn(): void {
    this.auth.getall()
    .then((idTokenResult) => {
      console.log(idTokenResult.claims);
   })
   .catch((error) => {
     console.log(error);
   });
    }
    // Do after login stuff here, such router redirects, toast messages, etc.
    // this.router.navigate(['/']);

  }

}
