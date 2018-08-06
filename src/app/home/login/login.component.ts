import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../natservices/auth.service';

import { NotifyService } from '../../natservices/notify.service';
import { NotificationComponent } from '../../commonmodule/notificationmodule/notification/notification.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DbservicesService } from '../../natservices/dbservices.service';
import { UserstateService } from '../../natservices/userstate.service';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest} from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    // dialogRef: MatDialogRef<any>;
    userpasswdlgForm: FormGroup;

    constructor(public auth: AuthService,
        private router: Router,
        private notify: NotifyService,
        // private setjwtservice: SetjwtService,
        // public dialog: MatDialog,
        private dbserivce: DbservicesService,
        private fb: FormBuilder,
        private http: HttpClient,
        private userstate: UserstateService ) {
          this.createloginForm();
        }

    ngOnInit() {   }

/*    config: MatDialogConfig = {
        disableClose: true,
        hasBackdrop: true,
        backdropClass: '',
        width: '300',
        height: '500',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
        },
        data: {
          message: 'Login in Progress'
        }
      };
    
      open() {
        this.dialogRef = this.dialog.open(Dialog1Component,this.config);
        this.dialogRef.componentInstance.param1 = "test value";
        this.dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          this.dialogRef = null;
      });
    }
    
    */

    // passwordregex = '/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{8,}$/';

    createloginForm() {
      this.userpasswdlgForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
        password:['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
      });
    }
    
     /// Social Login
  signInWithGithub(): void {
    this.auth.githubLogin()
    .then((user) => {
                      console.log('inside user');
                      this.afterSignIn(user);
                  }
        );
  }

  signInWithGoogle(): void {
    this.auth.googleLogin()
    .then((user) => {
                      console.log('inside user');
                      console.log(user);
                      this.afterSignIn(user);
                  }
        );
  }

  signInWithFacebook(): void {
    this.auth.facebookLogin()
    .then((user) => {
                      console.log('inside user');
                      this.afterSignIn(user);
                  }
        );
  }

  signInWithTwitter(): void {
    this.auth.twitterLogin()
      .then((user) => {
                        console.log('inside user');
                        this.afterSignIn(user);
                    }
            );
  }

  signInWithUpstox(): void {
    const apiurl = 'http://127.0.0.1:8080/redirecturl';
    const data = {'provider': 'upstox', 'operation' : 'loginurl'};
    this.http.post(apiurl, data, {observe: 'response'})
    .subscribe (
      res => {
        console.log(res);
        window.location.href = res['body'];
      }
  );
    // window.location.href = 'https://api.upstox.com/index/dialog/authorize?apiKey=9Rt7ZkV5TM8HaFVZN4bi03f86JDWft6E4hu5Krpl&redirect_uri=http://127.0.0.1:4200/upstox&response_type=code';
  }


  emaillogin(): void {
    // this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    this.auth.emailLogin('natrayan@gmail.com', 'password')
    .then((user) => {
                    console.log('inside user');
                    this.afterSignIn(user);
                   }
            );
  }

  /// Anonymous Sign In
  signInAnonymously() {
    this.auth.anonymousLogin()
      .then((user) => this.afterSignIn(user));
  }

  logout(){
    this.auth.signOut('nonavigation');
  }

  mymessage = 'Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content. Whenever you need to, be sure to use margin utilities to keep things nice and tidy.'

print() {
    this.notify.update(this.mymessage, 'success', 'alert');
}


  /// Shared
  private afterSignIn(status): void {
    switch (status) {
        case 'success': {
            console.log('succcesssssssssssssssssssssssssssssssssssssssss');
            console.log(this.auth.credential.user);
            console.log(this.auth.credential);
            this.getUsers(this.auth.credential.user);
            break;
        }
        case 'error': {
             this.notify.update('There is some error!!!' + this.auth.error.message, 'error', 'alert');
        }
    }
    // Do after login stuff here, such router redirects, toast messages, etc.
    // this.router.navigate(['/']);

  }



getUsers(natkey) {
  this.dbserivce.dbaction('Set', 'Jwt', {'natkey': natkey}).subscribe(
    datae => {
            const body = datae['body'];
            localStorage.setItem('natjwt', (body['natjwt']));
            this.userstate.parseJwt();
            // this.router.navigateByUrl('/securedpg/dashboard');
            this.router.navigate(['/securedpg']);
          },
    error => {
      if (error.hasOwnProperty('error')) {
        this.notify.update('Error!!!' + error.error.statusdetails, 'error', 'alert');
      } else {
        this.notify.update('Error!!!' + error.statusText, 'error', 'alert');
      }
        }
          );
}
  }