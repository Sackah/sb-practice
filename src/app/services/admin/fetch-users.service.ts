import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../../store/user';

@Injectable({
  providedIn: 'root',
})
export class FetchUsersService {
  private http = inject(HttpClient);

  // TODO: Change server to valid endpoint
  get() {
    return this.http
      .get<User[]>(`assets/Admin/store/userList.json`, this.options)
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
