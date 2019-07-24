import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {

  @Input() budgetList: any;
  @Output() deleteBudget = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  budgetDelete(Budget_id) {
    this.deleteBudget.emit(Budget_id);
  }

}
