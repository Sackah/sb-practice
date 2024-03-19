import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SurveyTemplate, Template } from '../../../shared/types';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TemplateActionsService {
  private http = inject(HttpClient);

  getTemplates(page: number, limit: number, tab: 'all' | 'deactivated') {
    'assets/Admin/store/templates.json';

    return this.http
      .get<SurveyTemplate[]>(
        `${environment.baseUrl}/templates?page=${page}&limit=${limit}&tab=${tab}`,
        this.options
      )
      .pipe(catchError((err) => this.onError(err)));
  }

  deleteTemplate(id: string) {
    return this.http
      .delete(`${environment.baseUrl}/public/survey/${id}`, this.options)
      .pipe(catchError((err) => this.onError(err)));
  }

  deactivateTemplate(id: string) {
    return this.http
      .patch(
        `${environment.baseUrl}/public/flag-survey`,
        {
          id,
          status: 'DEACTIVATE',
        },
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
