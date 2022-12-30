import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleToColor'
})
export class RoleToColorPipe implements PipeTransform {

  transform(role: number): string {
    switch(role) {
      case 0: 
        return 'warn'
      case 1: 
        return 'accent'
      default:
        return 'primary'
    }
  }

}
