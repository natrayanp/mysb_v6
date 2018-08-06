import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { NotifyService } from '../../../../natservices/notify.service';
import { DialogsService } from '../../../../commonmodule/dialogs/dialogs.service';

@Component({
  selector: 'app-mandateinq',
  templateUrl: './mandateinq.component.html',
  styleUrls: ['./mandateinq.component.scss']
})
export class MandateinqComponent implements OnInit {

  dataSource = new MatTableDataSource();
  paginator: MatPaginator;
  sort: MatSort;
  mandate_fetch = false;
  showdetail = false;
  operation: string;
  rowdata = {};
  product = 'BSEMF';
  screenid: string;
  displayedColumns: string[];
  accounts = [];
  fetch_error = false;
  readmode = false;

  @ViewChild(MatSort) set appBacon4(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  @ViewChild('paginator') set appBacon(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }
  constructor(private dbserivce: DbservicesService,
              private notify: NotifyService,
              private dialogsService: DialogsService
             ) { }

  ngOnInit() {
    this.set_display_cols();
    this.get_mandate_details();
  }

  get_mandate_details() {
    this.fetch_error = false;
    this.mandate_fetch = true;
    const data_to_send = {
      'product' : this.product,
      'screen'  : this.screenid
    };
    this.dbserivce.dbaction('mfmandate', 'fetch', data_to_send)
  .subscribe(
    record => {
      console.log(record['body']);
      console.log(record['body']['mandates']);
      this.dataSource.data = record['body']['mandates'];
      this.accounts = record['body']['accounts'];
      this.set_display_cols();
      this.mandate_fetch = false;
      this.showdetail = false;
      this.operation = '';
      this.rowdata = {};
    },
    error => {
      console.log('error');
      this.fetch_error = true;
      this.notify.update(error['message'], 'error', 'alert', 'no');
      this.mandate_fetch = false;
      this.set_display_cols();
      this.showdetail = false;
    }
  ) ;
  
  }

  save_del(eve) {
    this.notify.clearalertmsg();
    
    console.log(eve);
    if (eve.btnclicked === 'confirm') {
      const mydialog  = this.dialogsService.showalert("Mandate Operation","We are working on your request, please wait");
      this.dbserivce.dbaction('mfmandate', 'operate', {'screenid': this.screenid, 'product': this.product, 'operation' : eve.operation, 'data': eve.data } )
      .subscribe(
        record => {
          console.log(record['body']);
          mydialog.close();
          this.notify.update('Mandate process successful.  Please check the details in the table', 'success', 'alert', 'yes');

          this.get_mandate_details();
          this.mandate_fetch = false;
          this.showdetail = false;
          this.operation = '';
          this.rowdata = {};
        },
        error => {
          console.log('error');
          this.notify.update('Mandate process failed.  Please redo the task', 'error', 'alert', 'yes');
          mydialog.close();
          // this.get_mandate_details();
          /*
          this.mandate_fetch = false;
          this.showdetail = true;
          */
        }
      ) ;

    } else if (eve.btnclicked === 'cancel') {
      this.mandate_fetch = false;
      this.showdetail = false;
      this.operation = '';
      this.rowdata = {};
    }
    this.set_display_cols();
  }

  del_mandate(row) {
    console.log(row);
    this.showdetail = true;
    this.operation = 'del';
    this.rowdata = row;
    this.set_display_cols();
    this.readmode = false;
  }

  edit_mandate(row) {
    console.log(row);
    this.showdetail = true;
    this.operation = 'edit';
    this.rowdata = row;
    this.set_display_cols();
    this.readmode = false;
  }

  new_mandate() {
    if (this.accounts.length < 1) {
      this.notify.update('No accounts added yet for the user.  To add Mandate, user should atleast have one registered account', 'error', 'alert', 'yes');
    } else {
      this.showdetail = true;
      this.operation = 'new';
      this.rowdata = {};
      this.set_display_cols();
      this.readmode = false;
    }
  }

  set_display_cols() {
    switch (this.product) {
      case 'BSEMF': {
        this.screenid = 'mandate';
        if (this.showdetail) {
          this.displayedColumns = ['mandateid', 'Type', 'Amount', 'Account', 'Bank', 'Ifsc', 'Enddate', 'status'];
        } else {
          this.displayedColumns = ['mandateid', 'Type', 'Amount', 'Account', 'Bank', 'Ifsc', 'Enddate', 'status'];
        }
        break;
      }
    }
  }

  test() {
    this.dbserivce.dbaction('te', 'st', {'screenid': this.screenid } )
      .subscribe(
        record => {
                  console.log('record');
                  console.log(record);
                }
              );
  }

}
