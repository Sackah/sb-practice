import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UpdatePassword, UpdateProfileDetails } from '../../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateService {
  private http = inject(HttpClient);

  postDetails(details: UpdateProfileDetails) {
    return this.http
      .put(`${environment.baseUrl}/admin/update-user`, details, this.options)
      .pipe(catchError((err) => this.onError(err)));
  }

  postPassword(details: UpdatePassword) {
    return this.http
      .put(
        `${environment.baseUrl}/admin/update-password`,
        details,
        this.options
      )
      .pipe(catchError((err) => this.onError(err)));
  }

  private get options() {
    return {
      withCredentials: true,
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
