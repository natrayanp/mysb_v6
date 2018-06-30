import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() {

  }
  pfmain: any;  // Used in subsequent sections
  dpsum: any;
  dpprods: any;
  linedata: any[];
  // A. Navigate from PF details page to Product details page
  prod_dpprods: any;
  prod_dpproddets: any;
  prod_chartdata: any[];
  prod_pfindex: number;
  prod_prodindex: number;

  // B. Navigate from Product details page to individual fund details page
  // Values of A are all available here
  fund_fndsumdet: any;
  fund_fndid: any;
  fund_pfid: any;
  fund_prodtyp: any;
  fund_fndname: string;
}