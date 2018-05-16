import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-mandatereg',
  templateUrl: './mandatereg.component.html',
  styleUrls: ['./mandatereg.component.scss']
})
export class MandateregComponent implements OnInit {

  constructor() { }
  strtDate: Date;
  strdt: Date;

  ngOnInit(){
    this.strtDate = new Date();
    console.log(this.strtDate);
    this.nat1({'value': this.strtDate});
  }

  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());
  
  maxDate: Date;
selectedValue: string;
evenj = {};
mandatetypes = [{'name':'XSIP','type':'X'},
                {'name':'ISIP','type':'I'},
                {'name':' E-Mandate','type':'E'}];


acctyps = [{'acnum':'clientaccno1','actype':'SB','ifsc':'clientifsccode1','micr':'clientmicrno1','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno2','actype':'CA','ifsc':'clientifsccode2','micr':'clientmicrno2','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno3','actype':'NE','ifsc':'clientifsccode3','micr':'clientmicrno3','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno4','actype':'NO','ifsc':'clientifsccode4','micr':'clientmicrno4','bank':'ICICIBANK, EGMORE'},
{'acnum':'clientaccno5','actype':'SB','ifsc':'clientifsccode5','micr':'clientmicrno5','bank':'ICICIBANK, EGMORE'}
];

acctypscpy=JSON.parse(JSON.stringify(this.acctyps));
sortedList;
/*
webapp.uccclientmaster(

clientacctype1    
clientaccno1      
clientmicrno1     
clientifsccode1   
defaultbankflag1  
clientacctype2    
clientaccno2      
clientmicrno2     
clientifsccode2   
defaultbankflag2  
clientacctype3    
clientaccno3      
clientmicrno3     
clientifsccode3   
defaultbankflag3  
clientacctype4    
clientaccno4      
clientmicrno4     
clientifsccode4   
defaultbankflag4  
clientacctype5    
clientaccno5      
clientmicrno5     
clientifsccode5   
defaultbankflag5  
clientchequename5 
*/

nat(even){
  console.log(even);
  console.log(this.acctypscpy);
  console.log(even.source.value);  
  this.evenj = this.acctypscpy.filter(e => (e.acnum == even.source.value.acnum) );
  console.log(this.evenj);
}

nat1(even){
  console.log(even);
  var n = 100;
  var expireDate = new Date(even.value);
  console.log(expireDate.getDate());
  this.strdt = new Date(expireDate.setFullYear(expireDate.getFullYear() + 1 ));
  console.log(this.strdt);
  this.maxDate =  new Date(expireDate.setFullYear(expireDate.getFullYear() + n));
}


}

