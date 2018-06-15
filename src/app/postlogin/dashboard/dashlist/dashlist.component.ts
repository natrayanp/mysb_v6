import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashlist',
  templateUrl: './dashlist.component.html',
  styleUrls: ['./dashlist.component.scss']
})
export class DashlistComponent implements OnInit {
  @Input() mode: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navitodashbrd() {
    this.router.navigate(['/securedpg/dashboard']);
  }

}
