import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleToString'
})
export class RoleToStringPipe implements PipeTransform {

  transform(role: number): string {
    switch(role) {
      case 0: 
        return 'Admin'
      case 1: 
        return 'Manager'
      case 2:
        return 'User'
      default:
        return 'Guest'
    }
  }

}
