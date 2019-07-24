import { FormControl } from "@angular/forms";
import { ExpenseCategoryService } from "../API/expense-category.service";

export class CustomValidations {

    constructor(categoryService: ExpenseCategoryService) {}

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) 
    {
      let config = 
        {
            'null': 'Required',
            'required': 'Required',
            'email': 'Invalid email',
            'invalidFormat': 'Only characters are allowed',
            'alreadyExist': 'Already exist',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };
  
      return config[validatorName];
    }
}