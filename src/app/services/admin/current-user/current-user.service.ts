import { Injectable, signal } from '@angular/core';
import { User } from '../../../State/authentication/auth.state';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public user = signal<User | undefined>(undefined);
  setAdmin(user: User) {
    this.user.set(user);
  }

  clearAdmin() {
    this.user.set(undefined);
  }
}
