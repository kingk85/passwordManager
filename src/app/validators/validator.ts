
import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { validUrl: true };
  }
  return null;
}

export function checkPasswords(group: FormGroup) 
{
  let pass = group.controls.password.value;
  let confirmPass = group.controls.passwordRepeat.value;

  console.log(pass);
  console.log(confirmPass);

  return pass === confirmPass ? null : { notSame: true }     
}