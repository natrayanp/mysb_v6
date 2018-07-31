import { Component, OnInit, Input } from '@angular/core';
import { UserstateService } from '../../../../natservices/userstate.service';

@Component({
  selector: 'orderplace-type',
  templateUrl: './orderplace-type.component.html',
  styleUrls: ['./orderplace-type.component.scss']
})
export class OrderplaceTypeComponent implements OnInit {
  @Input() prod;
  trantypes: string[];

  constructor(private userserv: UserstateService) { }

  ngOnInit() {
    this.trantypes = this.userserv.get_all_trantypes(this.prod);
  }

}
