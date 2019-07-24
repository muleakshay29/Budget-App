import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ExpenseCategoryService } from "../API/expense-category.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CustomValidations } from "../_helper/custom-validation";
import { UniqueRecordsDirective, categoryCheckValidator } from "../_helper/unique-records.directive";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html"
})
export class CategoryComponent implements OnInit {
  addCategory: FormGroup;
  categoryId: any;
  addFlag = false;
  updateFlag = false;
  categoryList: any;
  categoryDetails: any;
  popUpFlag: boolean = false;
  bsModalRef: BsModalRef | null;

  constructor(
    private fb: FormBuilder,
    private categoryService: ExpenseCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.addCategory = this.fb.group({
      Category_name: ["", Validators.required, categoryCheckValidator(this.categoryService)],
      Category_icon: [""]
    });

    this.categoryId = this.route.snapshot.paramMap.get("id");
    if (this.categoryId == null) {
      this.addFlag = true;
      this.updateFlag = false;
      this.getCategoryList();
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchCategoryDetails();
    }
  }

  hideModel() {
    if (!this.bsModalRef) {
      return;
    }

    this.bsModalRef.hide();
    this.bsModalRef = null;
  }

  get Category_name() {
    return this.addCategory.get("Category_name");
  }

  get Category_icon() {
    return this.addCategory.get("Category_icon");
  }

  onAddCategory() {
    const formData = this.addCategory.value;

    if (this.categoryId == null) {
      this.categoryService.addCategory(formData).subscribe((data: {}) => {
        this.addCategory.reset();
        this.getCategoryList();
        this.router.navigate(["/add-category"]);        
      });
    } else {
      this.categoryService
        .updateCategory(this.categoryId, formData)
        .subscribe((data: {}) => {
          this.router.navigate(["/add-category"]);
        });
    }
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(categoryList => {
      this.categoryList = categoryList.categoryData;
    });
  }

  fetchCategoryDetails() {
    this.categoryService
      .getCategoryDetails(this.categoryId)
      .subscribe(details => {
        this.categoryDetails = details.categoryData[0];

        this.addCategory.setValue({
          Category_name: this.categoryDetails.Category_name,
          Category_icon: this.categoryDetails.Category_icon
        });
      });
  }

  deleteCategory(Category_id) {
    this.categoryService.deleteCategory(Category_id).subscribe(deleted => {
      this.getCategoryList();
    });
  }

  onCancel() {
    if (this.categoryId == null) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.router.navigate(["/add-category"]);
    }
  }
}
