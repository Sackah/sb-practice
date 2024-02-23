import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountSetupService {
  constructor(private http: HttpClient) {}

  post(form: FormData) {
    return this.http.post(
      'https://7388-196-61-44-226.ngrok-free.app/api/v1/users/account/setup',
      form,
      {
        headers: {
          Authorization:
            'Bearer 25|EU5EqYezHsNAwXmivqX3HmpAfM52eYOGL2g4SeLNf9156517',
        },
      }
    );
  }
}
