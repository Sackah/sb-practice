import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UpdateProfileDetails } from '../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateService {
  private http = inject(HttpClient);

  post(details: UpdateProfileDetails) {
    return this.http
      .put(`${environment.baseUrl}/admin/update-user`, details, {
        withCredentials: true,
        headers: this.headers.headers,
      })
      .pipe(catchError((err) => this.onError(err)));
  }

  private get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private onError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error.error);
      return throwError(() => ({
        message: 'Network Error. Check connectivity and try again',
      }));
    } else if (error.status === 500) {
      return throwError(() => ({
        message: 'Server Cannot be reached. Please try later',
      }));
    } else {
      console.error(error.error);
      return throwError(() => error.error.errors);
    }
  }
}
