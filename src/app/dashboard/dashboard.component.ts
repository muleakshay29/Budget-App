import { Component, OnInit } from '@angular/core';
import { ExpenseIncomeService } from "../API/expense-income.service";
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker'
import { FormGroup, FormBuilder } from '@angular/forms';
import { fbind } from 'q';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  incomeExpenseList = [];
  totalBudget: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;
  incomePercent: number = 50;
  expensePercent: number = 50;
  progressStack = [];
  isDropup = true;
  currentDate = new Date();
  changeDate: FormGroup;
  newData: Date;

  bsValue: any = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private expenseService: ExpenseIncomeService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.changeDate = this.fb.group({
      selectDate: [new Date()]
    });

    // this.getIncomeExpenseList();
  }

  get selectDate() {
    return this.changeDate.get('selectDate');
  }

  /* getIncomeExpenseListTest(selectedDate) {
    const data = {
      selectedDate: selectedDate
    }
    this.expenseService.getIncomeExpenseListTest(data)
      .subscribe();
  } */

  getIncomeExpenseList(budgetList) {
    /* this.expenseService.getIncomeExpenseList()
      .subscribe((budgetList) => {
        // console.log(budgetList)
        // const allBudget = budgetList.budgetData;
        const allBudget = budgetList;
        this.incomeExpenseList = budgetList;

        allBudget.forEach(ele => {
          if (ele.IncomeExpense_flag == 0) {
            this.totalIncome += ele.Amount;
          }
          else {
            this.totalExpense += ele.Amount;
          }
        });

        this.totalBudget = this.totalIncome - this.totalExpense;
        if (this.totalBudget <= 0) { this.totalBudget = 0; }

        this.expensePercent = Math.round((this.totalExpense / this.totalIncome) * 100);
        this.incomePercent = Math.round((this.totalBudget / this.totalIncome) * 100);
      }); */

    const allBudget = budgetList;
    this.incomeExpenseList = budgetList;
    this.totalIncome = 0, this.totalExpense = 0, this.expensePercent = 0, this.incomePercent = 0, this.totalBudget = 0;

    allBudget.forEach(ele => {
      if (ele.IncomeExpense_flag == 0) {
        this.totalIncome += ele.Amount;
      }
      else {
        this.totalExpense += ele.Amount;
      }
    });

    this.totalBudget = this.totalIncome - this.totalExpense;
    if (this.totalBudget <= 0) { this.totalBudget = 0; }

    this.expensePercent = Math.round((this.totalExpense / this.totalIncome) * 100);
    this.incomePercent = Math.round((this.totalBudget / this.totalIncome) * 100);

    this.progressStack.push({
      value: this.incomePercent,
      label: 'Income'
    });

    this.progressStack.push({
      value: this.expensePercent,
      label: 'Expense'
    });
  }

  deleteExpense(Budget_id) {
    this.expenseService.deleteBudget(Budget_id).subscribe(() => {
      this.totalBudget = 0; this.totalIncome = 0; this.totalExpense = 0;
      // this.getIncomeExpenseList();
    });
  }

  fetchDateRecord(value: Date) {
    this.newData = value;
    const smonth = this.newData.getMonth() < 10 ? `0${this.newData.getMonth() + 1}` : `${this.newData.getMonth()}`;
    const syear = this.newData.getFullYear();
    const startDate = `${syear}-${smonth}-01`;
    this.expenseService.getIncomeExpenseList(startDate).subscribe(data => {
      // console.log(data)
      this.getIncomeExpenseList(data);
    })
  }

}
