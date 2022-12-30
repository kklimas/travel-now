import { Pipe, PipeTransform } from '@angular/core';
import { User, UserFilter } from 'src/app/models/User';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[], filter: UserFilter): User[] {
    return users.filter(user => {
      let usernameMatch = true;
      let roleMatch = true;
      let statusMatch = true;
      
      if (filter.username !== null && filter.username !== undefined) {
        usernameMatch = user.username.includes(filter.username);
      }
      if (filter.role !== null && filter.role !== undefined) {
        roleMatch = user.role === filter.role;
      }
      if (filter.banned !== null && filter.banned !== undefined) {
        statusMatch = user.banned === filter.banned;
      }

      return usernameMatch && roleMatch && statusMatch;
    })
  }

}
