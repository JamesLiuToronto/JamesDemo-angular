import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenStringValidator(forbiddenName: RegExp) : ValidatorFn {
    return (control: AbstractControl) : {[key:string]:any}|null => {
        const forbidden = forbiddenName.test(control.value) ;
        return forbidden? {"forbiddenString" :control.value} : null ;
    }
}

export function passwordValidator(control :AbstractControl) : {[key:string]:boolean}|null  {
    const password = control.get('password') ;
    const confirm_password = control.get('confirm_password');
    if (password?.pristine || confirm_password?.pristine)
        return null ;

    return password && confirm_password && password.value !== confirm_password.value?
        {'passwordMisMatch2' : true} : null ;
}

export function matchString(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl):{[key:string]:any}|null => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (control?.pristine || checkControl?.pristine)
        return null ;

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({'passwordMisMatch': true });
        return { 'passwordMisMatch': true };
      } else {
        return null;
      }
    };
  }
