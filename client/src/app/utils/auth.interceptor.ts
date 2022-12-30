import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ToastService } from "../services/toast.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private REFRESH = '/refresh';

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token = this.authService.accessToken;

    if (request.url.includes(this.REFRESH)) {
      token = this.authService.refreshToken;
    }
    
    request = this.addToken(request, token);

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this.handle401Error(request, next)
      }

      return throwError(() => err);
    }))
    
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }  
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler){
    if (request.url.includes(this.REFRESH)) {
      this.authService.logout();
      this.toastService.showErrorMessage("Your session expired.");
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((token: any) => {
          this.authService.setAccessToken(token);          
          this.refreshTokenSubject.next(token.accessToken);
          this.isRefreshing = false;
          return next.handle(this.addToken(request, this.authService.accessToken));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(request, `Bearer ${token}`)))
      )
    }
  }
}
