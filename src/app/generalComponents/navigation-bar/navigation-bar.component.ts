import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIsLoggedIn,
  selectUser,
} from '../../../../State/authentication/auth/reducers';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  constructor(private store: Store) {}
  user!: string;
  email!: string;
  role!: string;
  isLoggedIn!: boolean;
  profileImg!: string;

  ngOnInit(): void {
    const user$ = this.store.select(selectUser);
    const isLogged$ = this.store.select(selectIsLoggedIn);

    isLogged$.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      },
    });

    user$.subscribe({
      next: (data) => {
        if (data) {
          this.user = data.username;
          this.email = data.email;
          this.role = data.role;
          this.profileImg = data.profilePicture;
        }
      },
    });
  }
}
