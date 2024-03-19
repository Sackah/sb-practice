import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SurveyTemplate, User } from '../../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class UserActionsService {
  private http = inject(HttpClient);
  public selectedUser = signal<User | undefined>(undefined);

  // TODO: Change server to valid endpoint
  getUsers(page: number, limit: number) {
    '/get-users?page=page&limit=limit';
    'assets/Admin/store/userList.json';
    return this.http
      .get<{ users: User[]; totalPages: number }>(
        `${environment.baseUrl}/public/get-users?page=${page}&limit=${limit}`,
        this.options
      )
      .pipe(catchError((err) => this.onError(err)));
  }

  inviteUser(email: string) {
    return this.http
      .post(
        `${environment.baseUrl}/public/user/invite`,
        { email },
        this.options
      )
      .pipe(catchError((err) => this.onError(err)));
  }

  deleteUser(id: string) {
    return this.http
      .patch(
        `${environment.baseUrl}/public/account-management`,
        {
          id,
          status: 'DELETE',
        },
        this.options
      )
      .pipe(catchError((err) => this.onError(err)));
  }

  // TODO: change to a valid endpoint
  getTemplates(userId: string) {
    return this.http
      .get<SurveyTemplate[]>(
        `${environment.baseUrl}/public/survey/templates/${userId}`,
        this.options
      )
      .pipe(catchError((err) => this.onError(err)));
  }

  toggleUserActivation(status: boolean, id: string) {
    if (!status) {
      return this.http
        .patch(
          `${environment.baseUrl}/public/account-management`,
          {
            id,
            status: 'DEACTIVATE',
          },
          this.options
        )
        .pipe(catchError((err) => this.onError(err)));
    } else {
      return this.http
        .patch<{}>(
          `${environment.baseUrl}/public/account-management`,
          {
            id,
            status: 'ACTIVATE',
          },
          this.options
        )
        .pipe(catchError((err) => this.onError(err)));
    }
  }

  selectUser(user: User) {
    this.selectedUser.set(user);
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
