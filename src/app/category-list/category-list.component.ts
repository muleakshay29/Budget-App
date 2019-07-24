import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  @Input('categoryList') contentArray: any;
  @Output() deleteCategory = new EventEmitter();
  totalItems: number;
  currentPage = 1;
  returnedArray: any;
  showDirectionLinks = true;

  constructor() { }

  ngOnInit() {
    this.totalItems = this.contentArray.length;
    this.returnedArray = this.contentArray.slice(0,10);
  }

  categoryDelete(Category_id) {
    this.deleteCategory.emit(Category_id);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

}
