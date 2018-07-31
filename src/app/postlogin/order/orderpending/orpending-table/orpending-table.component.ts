import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { OrderservService } from '../../../../natservices/orderserv.service';


@Component({
  selector: 'orpending-table',
  templateUrl: './orpending-table.component.html',
  styleUrls: ['./orpending-table.component.scss']
})
export class OrpendingTableComponent implements OnInit {
  @Input() prod;
  @Input() tran;
  @Input() tbldata;

  displayedColumns = ['product', 'Unique Order#', 'buysell', 'portfolio name', 'Fund name', 'Amount', 'Qty','errors'];

  dataSource = new MatTableDataSource();
  paginator: MatPaginator;
  sort: MatSort;
  Total = 'Total Amt';
  totalSizesuc = 0;
  totalSizefai = 0;

  @ViewChild(MatSort) set appBacon4(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  @ViewChild('paginator') set appBacon(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }
  constructor(public orderservice: OrderservService) { }

  ngOnInit() {
    console.log("inside table");
    console.log(this.tbldata);
    this.dataSource.data = this.tbldata;
  }


  getTotalamt() {
    return this.tbldata.map(t => t.mfor_amount).reduce((acc, value) => acc + value, 0);
  }

  getTotalqty() {
    return this.tbldata.map(t => t.mfor_qty).reduce((acc, value) => acc + value, 0);
  }


}
