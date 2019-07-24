import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { CustomValidations } from "./custom-validation";

@Component({
  selector: 'error-msg',
  template: `<p class="text-danger" *ngIf="errorMsg !== null"><small>{{errorMsg}}</small></p>`
})
export class ControlMsgComponent {

  @Input() control: FormControl;

  constructor() { }

  get errorMsg() {
    for(let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.invalid && (this.control.dirty || this.control.touched) ) 
      {
        return CustomValidations.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
