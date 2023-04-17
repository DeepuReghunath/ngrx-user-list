import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createAction, createActionGroup, createFeature, createReducer, emptyProps, props } from "@ngrx/store";

const UsersStoreKey = "users";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
}

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

interface SaveInitialUsersPayload {
    users: User[];
}

interface AddUserPayload {
    user: User;
}

interface UpdateUserPayload {
    user: User;
}

interface DeleteUserPayload {
    id: string;
}

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<SaveInitialUsersPayload>(),
        AddUser: props<AddUserPayload>(),
        UpdateUser: props<UpdateUserPayload>(),
        DeleteUser: props<DeleteUserPayload>(),
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer((initialState:any, builder:any) => {
        builder
            .addCase(UsersActions.adduser, (state: any, action: { user: User; }) => {
                return usersAdapter.addOne(action.user, state);
            })
            .addCase(UsersActions.updateuser, (state: any, action: { user: { id: any; }; }) => {
                return usersAdapter.updateOne({
                    id: action.user.id,
                    changes: action.user
                }, state);
            })
            .addCase(UsersActions.deleteuser, (state: any, action: { id: string; }) => {
                return usersAdapter.removeOne(action.id, state);
            })
            .addDefaultCase((state: any) => state);
    })
});

