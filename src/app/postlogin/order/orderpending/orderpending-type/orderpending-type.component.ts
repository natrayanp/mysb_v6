import { Component, OnInit, Input } from '@angular/core';
import { UserstateService } from '../../../../natservices/userstate.service';

@Component({
  selector: 'orderpending-type',
  templateUrl: './orderpending-type.component.html',
  styleUrls: ['./orderpending-type.component.scss']
})
export class OrderpendingTypeComponent implements OnInit {
  @Input() prod;
  @Input() showtran;
  @Input() showprod;
  trantypes: string[];

  constructor(private userserv: UserstateService) { }
  
  ngOnInit() {
    this.trantypes = this.userserv.get_all_trantypes(this.prod);
  }

}
