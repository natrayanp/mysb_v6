import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserstateService } from '../natservices/userstate.service';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-postlogin',
  templateUrl: './postlogin.component.html',
  styleUrls: ['./postlogin.component.scss']
})
export class PostloginComponent implements OnInit {

  @ViewChild('navss') public myNav: MatSidenav;

 constructor(private userstate: UserstateService, private router: Router, private cdRef: ChangeDetectorRef ) {
  setTimeout(() => {
    this.myNav.open();
    this.cdRef.detectChanges();
  }, 20);
 }

  ngOnInit() {
    this.router.navigate(['/securedpg/dashboard']);
  }

}
