import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActions, User } from './users-store';
import { UserService } from './user.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.init),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users: User[]) =>
            UsersActions.saveInitialUsers({ users })
          ),
          catchError(() => of({ type: 'Load Users Error' }))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateuser),
      mergeMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map(() => UsersActions.init()),
          catchError(() => of({ type: 'Update User Error' }))
        )
      )
    )
  );

}

