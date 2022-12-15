import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(control: FormControl | null): unknown {
    if (control !== null) {
      if (control.hasError('required')) return 'Field is required';
      if (control.hasError('minlength')) return 'Content is too short';
      if (control.hasError('maxlength')) return 'Content is too long';
    }
    return '';
  }

}
