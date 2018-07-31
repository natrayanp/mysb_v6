import { Injectable } from '@angular/core';

@Injectable()
export class UserstateService {

  constructor() { }

  username: string;
  lastlogin: Date;
  userstatus: string;
  tknexpiry: Date;
  products = [];
  trantypes = [];

  buy_conf = {'name':'buy', 'dispname': 'Buy'};
  sell_conf = {'name':'sell', 'dispname': 'Sell'};
  stp_conf = {'name':'stp', 'dispname': 'Systematic Transfer'};
  mf_conf = {'name':'BSEMF', 'dispname': 'Mutual Fund'};
  eq_conf = {'name':'EQ', 'dispname': 'Equity'};

  parseJwt () {
    var token = localStorage.getItem('natjwt');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var decodedJwtJsonData = window.atob(base64);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    // this.uid=decodedJwtData.uid;
    console.log('jwtData: ' + base64Url);
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
    console.log('decodedJwtData: ' + decodedJwtData);
    console.log('username: ' + decodedJwtData.username);
    this.username = decodedJwtData.username;
    console.log('expiry: ' + decodedJwtData.exp);
    console.log('type of expiry: ' + typeof(decodedJwtData.exp));
    console.log('userstatus: ' + decodedJwtData.userstatus);
    this.userstatus = decodedJwtData.userstatus;
    console.log(this.userstatus);
    // console.log('usertype: '+decodedJwtData.usertype);
    // return JSON.parse();
}

get_allowed_products (cust_type) {
  switch (cust_type) {
    case 'EQ': {
      this.products = [this.eq_conf];
      break;
    }
    case 'MF': {
      this.products = [this.mf_conf];
      break;
    }
    default: {
      this.products = [this.mf_conf, this.eq_conf];

    }
  }
  return this.products;
}

get_all_trantypes (prod) {
  switch (prod) {
    case 'BSEMF': {
      this.trantypes = [this.buy_conf, this.sell_conf, this.stp_conf];
      break;
    }
    case 'EQ': {
      this.trantypes = [this.buy_conf, this.sell_conf];
      break;
    }
    default: {
      this.trantypes = [this.buy_conf, this.sell_conf, this.stp_conf];
    }
  }
  return this.trantypes;
}

}
