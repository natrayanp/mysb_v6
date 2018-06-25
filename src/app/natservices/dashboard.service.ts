import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() {

  }
  pfmain: any;
  dpsum: any;
  dpprods: any;
  linedata: any[];
  // Navigate from PF details page to Product details page
  prod_dpprods: any;
  prod_dpproddets: any;
  prod_chartdata: any[];
  prod_pfindex: number;
  prod_prodindex: number;




}