import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ExpenseIncomeService } from "../API/expense-income.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from "@angular/common";
import { ExpenseCategoryService } from "../API/expense-category.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  addExpense: FormGroup;
  addFlag = false;
  updateFlag = false;
  expenseId: any;
  budgetDetails: any;
  bsValue = new Date();
  categoryList: any;
  bsModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseIncomeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private categoryService: ExpenseCategoryService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.addExpense = this.fb.group({
      Transaction_date: [this.bsValue, Validators.required],
      Description: ['', Validators.required],
      Amount: ['', Validators.required],
      IncomeExpense_flag: ['1', Validators.required],
      Category_id: ['', Validators.required]
    });

    this.expenseId = this.route.snapshot.paramMap.get('id');
    if (this.expenseId == null) {
      this.addFlag = true;
      this.updateFlag = false;
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchExpenseDetails();
    }

    this.getCategoryList();
  }

  get Transaction_date() {
    return this.addExpense.get('Transaction_date');
  }

  get Description() {
    return this.addExpense.get('Description');
  }

  get Amount() {
    return this.addExpense.get('Amount');
  }

  get IncomeExpense_flag() {
    return this.addExpense.get('IncomeExpense_flag');
  }

  get Category_id() {
    return this.addExpense.get('Category_id');
  }

  onAddExpense() {
    const formData = this.addExpense.value;
    if (this.expenseId == null) {
      this.expenseService.addExpense(formData).subscribe((data: {}) => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.expenseService.updateExpense(this.expenseId, formData).subscribe((data: {}) => {
        this.router.navigate(['/dashboard']);
      });
    }

  }

  fetchExpenseDetails() {
    this.expenseService.getBudgetDetails(this.expenseId)
      .subscribe((details) => {
        // this.budgetDetails = details.budgetData[0];
        this.budgetDetails = details;
        this.bsValue = new Date(this.budgetDetails.Transaction_date);
        
        this.addExpense.setValue({
          Transaction_date: this.bsValue,
          Description: this.budgetDetails.Description,
          Amount: this.budgetDetails.Amount,
          IncomeExpense_flag: `${this.budgetDetails.IncomeExpense_flag}`,
          Category_id: this.budgetDetails.Category_id
        });

      });
  }

  getCategoryList() {
    this.categoryService.getCategoryList()
      .subscribe( (categoryList) => {
        this.categoryList = categoryList;
      });
  }

  onCancel() {
    this.location.back();
  }

  openCategoryModal() {
    const initialState = {
      popUpFlag: true
    };
    this.bsModalRef = this.modalService.show(CategoryComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
