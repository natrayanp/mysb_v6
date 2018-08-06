  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  
//  import * as firebase from 'firebase/app';
  import { firebase } from '@firebase/app';
  import { auth } from 'firebase';
  import { AngularFireAuth } from 'angularfire2/auth';
  // import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
  import { NotifyService } from './notify.service';
  
  import { Observable } from 'rxjs';
  import { switchMap } from 'rxjs/operators';
  
  interface User {
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
  }
  
  // https://github.com/codediodeio/angular-firestarter
  
  @Injectable()
  export class AuthService {

    authState: any = null;
    user: Observable<User | null>;
    error:any;
    credential:any;
    idToken:any;
  
    constructor(private afAuth: AngularFireAuth,
                // private afs: AngularFirestore,
                private router: Router,
                private notify: NotifyService) {
  
                  this.afAuth.authState.subscribe((auths) => {
                    this.authState = auth;
                  });
    }
  

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

    ////// OAuth Methods /////
    googleLogin() {
      const provider = new auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
     });
      return this.oAuthLogin(provider);
    }
  
    githubLogin() {
      const provider = new auth.GithubAuthProvider();
      return this.oAuthLogin(provider);
    }
  
    facebookLogin() {
      const provider = new auth.FacebookAuthProvider();
      provider.setCustomParameters({
        auth_type : 'rerequest'
      });
      return this.oAuthLogin(provider);
    }
  
    twitterLogin() {
      const provider = new auth.TwitterAuthProvider();
      return this.oAuthLogin(provider);
    }
    
    customTokenLogin(token) {
      
      return this.afAuth.auth.signInWithCustomToken(token)

    }
  
    getall() {
      return this.afAuth.auth.currentUser.getIdTokenResult();
    }


    private oAuthLogin(provider: any) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.credential = credential;
          // this.idToken=this.afAuth.app.auth().currentUser.getIdToken();
          return('success');
          // return this.updateUserData(credential.user);
        })
        .catch((error) => this.handleError(error) );
    }
  
    //// Anonymous Auth ////
    anonymousLogin() {
      return this.afAuth.auth.signInAnonymously()
        .then((user) => {
          this.notify.update('Welcome to Firestarter!!!', 'success','alert');
          console.log(user);          
          return(user);
          
          //return this.updateUserData(user); // if using firestore
        })
        .catch((error) => {
          console.error(error.code);
          console.error(error.message);
          //this.handleError(error);
        });
    }
  
    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.notify.update('Welcome to Firestarter!!!', 'success','alert');
          console.log(user);
          return(user);
          //return this.updateUserData(user); // if using firestore
        })
        .catch((error) => this.handleError(error) );
    }
  
    emailLogin(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.notify.update('Welcome to Firestarter!!!', 'success','alert');
          console.log(user);
          return(user);
          //return this.updateUserData(user); // if using firestore
        })
        .catch((error) => this.handleError(error) );
    }
  
    // Sends email allowing user to reset password
    resetPassword(email: string) {
      const fbAuth = auth();
  
      return fbAuth.sendPasswordResetEmail(email)
        .then(() => this.notify.update('Password reset link sent to your email', 'info','alert'))
        .catch((error) => this.handleError(error));
    }


  
    signOut(postaction) {
      this.afAuth.auth.signOut().then(() => {
          if(postaction="nonavigation"){
            console.log("not navigated");
          }else{
          this.router.navigateByUrl('/');
          }
      });
    }
  
    // If error, console log and notify user
    private handleError(error: Error) {
      console.log("insider service handle error");
            this.error=error;
            console.error(error);
            console.log("insider service handle error");
            //this.notify.update(error.message, 'error');
          return("error");
    }
  
    // Sets user data to firestore after succesful login
   /* private updateUserData(user: User) {
  
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      };
      return userRef.set(data);
    }*/
  }