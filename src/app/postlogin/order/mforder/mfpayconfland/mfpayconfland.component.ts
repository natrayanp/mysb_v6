import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderservService } from '../../../../natservices/orderserv.service';


@Component({
  selector: 'app-mfpayconfland',
  templateUrl: './mfpayconfland.component.html',
  styleUrls: ['./mfpayconfland.component.scss']
})
export class MfpayconflandComponent implements OnInit {

  constructor(private orderservice: OrderservService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      if ( params.id === 'yes') {
        this.orderservice.get_order_status();
        // this.router.navigate(['/securedpg/dashboard']);
      }
  });

}
}
