import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UsersActions } from '@app/_state/users/users-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select((state:any) => state.users.entities);
    this.users$.subscribe((u) => console.log(u));
    this.store.dispatch(UsersActions.init());
  }

  updateUser(user: User) {
    this.store.dispatch(UsersActions.updateuser({ user }));
  }
}
