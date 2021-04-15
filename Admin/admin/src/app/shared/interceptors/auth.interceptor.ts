import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let header = {
            key: "",
            value: ""
        }

        let modifiedReq = req.clone();

        if (this.authService.CurrentAdminValue != null) {
            header.key = 'Authorization';
            header.value = this.authService.CurrentAdminValue.token;

            modifiedReq = req.clone({
                headers: req.headers.set(header.key, header.value)
            });
        }


        return next.handle(modifiedReq).pipe(
            catchError((err, caught: Observable<HttpEvent<any>>) => {
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    this.router.navigate(['auth/login'], { queryParams: { returnUrl: req.url } });
                    return of(err as any);
                }
                throw err;
            })
        );
    }
}