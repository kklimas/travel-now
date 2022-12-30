import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
    this.authService.user.subscribe(() => this.user = this.authService.getUser());
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRole = route.data['role'];
    if (this.user.role <= expectedRole) {
      return true
    } else {
      this.router.navigate(['/home']);
    }
    return false;
  }
}
