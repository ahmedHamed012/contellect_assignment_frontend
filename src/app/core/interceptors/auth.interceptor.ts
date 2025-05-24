import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {
  const _router = inject(Router);
  const invalidTokenMessage = 'invalid token';
  const authToken = window.localStorage.getItem('contellect_token');

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (
        (error.error.message && error.error.message == invalidTokenMessage) ||
        error.statusText == 'Unknown Error'
      ) {
        _router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
