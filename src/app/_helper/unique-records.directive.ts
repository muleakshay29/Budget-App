import { Directive } from '@angular/core';
import { ExpenseCategoryService } from "../API/expense-category.service";
import { AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export function categoryCheckValidator(categoryService: ExpenseCategoryService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return categoryService.checkCategory({ Category_name: c.value }).pipe(
      map(categories => {
        return categories && categories.length > 0 ? { 'alreadyExist':true } : null
      })
    );
  }
}


@Directive({
  selector: '[UniqueRecords]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueRecordsDirective, multi: true }]
})
export class UniqueRecordsDirective implements AsyncValidator {

  constructor(private categoryService: ExpenseCategoryService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return categoryCheckValidator(this.categoryService)(c);
  }

}
