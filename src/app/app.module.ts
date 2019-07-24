import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseIncomeService } from "./API/expense-income.service";
import { CategoryComponent } from './category/category.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CategoryListComponent } from './category-list/category-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ControlMsgComponent } from './_helper/control-msg.component';
import { UniqueRecordsDirective } from './_helper/unique-records.directive';
// import { BsDatepickerModule, ButtonsModule ,ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddExpenseComponent,
    CategoryComponent,
    TransactionListComponent,
    CategoryListComponent,
    ControlMsgComponent,
    UniqueRecordsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  // entryComponents: [CategoryComponent],
  providers: [ ExpenseIncomeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
