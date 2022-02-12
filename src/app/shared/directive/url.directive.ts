import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive } from '@angular/core';

export function url() {
  return (control: AbstractControl): { [key: string]: any } | null =>
    validateUrl(control.value) ? null : { wrongUrl: control.value };
}

function validateUrl(str: string) {
  const pattern = new RegExp(
    /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  );
  return !!pattern.test(str);
}
@Directive({
  selector: '[urlDirective]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return url()(control);
  }
}
