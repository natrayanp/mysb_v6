import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'orderplace-type',
  templateUrl: './orderplace-type.component.html',
  styleUrls: ['./orderplace-type.component.scss']
})
export class OrderplaceTypeComponent implements OnInit {
  @Input() prod;

  constructor() { }

  ngOnInit() {
  }

}
